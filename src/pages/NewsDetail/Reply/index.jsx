import React,{Component} from 'react'
import {Popconfirm} from 'antd'
import PropTypes from 'prop-types';
import moment from 'moment'
import Tx from "images/icon/Tx_b"
import {cancelComment} from "utils/api"
import {post} from "utils/request"
import "./index.scss"

// id: "1185093252080418818"
// parentId: "1185075240132624385"
// userId: "147765879332274176"
class Reply extends Component{
    replyC = async (id) => {
        await post({data:{id},url:cancelComment}).then((result)=>{
            if (result.code === 0) {
                this.props.callBack("评论删除成功")
            }
        })
    }
    render(){
        const {data,displayIs} = {...this.props}
        return (
            <div className="reply1" style={{display:displayIs}}>
                <div className="level2top">
                    <div className="left">
                        {
                            data['imageUrl']===undefined || data['imageUrl'] ==="" ? (<Tx width=".3rem" height=".3rem"/>)
                            : <img className="img" alt="" src={data['imageUrl'] } />
                        }
                        <p>{data.nickName}</p>
                        <p>{moment(data.addTime).format("YYYY-MM-DD HH:mm")}</p>
                    </div>
                    <div className="fingerEye">
                        {
                            data.miReply === "1" ? (
                                <div>
                                <Popconfirm
                                    title="确定要删除评论吗?"
                                    onConfirm={()=>this.replyC(data.id)}
                                    onCancel={()=>{}}
                                    okText="是"
                                    cancelText="否"
                                >
                                    <p className="fingerNum">删除</p>
                                </Popconfirm>
                                
                                </div>
                                
                            ):
                            (
                                <p className="fingerNum" onClick={()=>this.props.focusText(data.nickName)}>回复</p>
                            )
                        }
                    </div>
                </div>
                <p className="replyContain2">{data.commentContent}</p>
            </div>
        )
    }
}

const defaultProps  = {
    data : {},
    focusText: ()=>{},
    displayIs:"flex"
}

Reply.defaultProps = defaultProps;

Reply.propTypes = {
    data: PropTypes.object,
    focusText: PropTypes.func,
    displayIs: PropTypes.string,
};

export default Reply