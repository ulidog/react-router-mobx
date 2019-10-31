import React,{Component} from 'react'
import {messageAll,} from "utils/api" //messageDel,messageUnread,messageToRead
import {post} from "utils/request"
import './index.scss'
import Messages from 'components/Messages'

class Msg extends Component {
    constructor(props){
        super(props);
        this.state = {
            msgList: []
        }
    }
    componentDidMount(){
        this.getMsgList()
    }
    getMsgList = async () => {
        //6活动消息 7.系统消息 8.动态消息
        await post({data:{type:6},url:messageAll}).then((result)=>{
            if (result.code === 0) {
                this.setState({msgList:result.data.records})
            }
        })
    }
    render(){
        const {msgList} = {...this.state}
        return(
            <div className="msg">
                <div className="title">消息中心</div>
                <div className="contain">
                    {
                        msgList.length>0 ? (msgList.map((item,index)=>{
                            return(<Messages data={item} key={index}/>)
                        })) : (
                            <div className="nomsg">
                                <img alt=""  src={require("images/img/nomsg.png")} />
                                <div className="tips">还没有消息哦</div>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        )
    }
}

export default Msg