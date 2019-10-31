import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'
import Dzb from "images/icon/Dz_b"
import Dzs from "images/icon/Dz_s"
import {advisoryDz,advisoryDzCancel,myCollectDel} from "utils/api"
import {post} from "utils/request"
import Message from 'images/icon/Message'
import moment from 'moment'
import {IsPC} from "utils/common"
import "./index.scss"
import { message } from 'antd';

class InfoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dz:false,
        }
    }

    componentDidMount() {
        
    }

    toDetail = (id)=>{
        this.props.history.push(`/news/detail/${id}`)
    }
    like = async (id) => {
        const {dz} = this.state
        const url = dz?advisoryDzCancel:advisoryDz
        await post({data:{advisoryId:id},url:url}).then((result)=>{
            if (result.code === 0) {
                message.success(dz?"取消点赞成功":"点赞成功")
                this.setState({dz:!dz})
            }
        }).catch(error=>message.error(error))
    }
    cancelColltet = async(id) => {
        await post({data:{advisoryId:id},url:myCollectDel}).then((result)=>{
            if (result.code === 0) {
                message.success("取消收藏成功")
                this.props.callBack()
            }
        }).catch(error=>message.error(error))
    }
    render() {
        const {dz }= {...this.state}
        const info = this.props.data
        const id = info.id || info.advisoryId;
        //console.log(info)
        return (
            <div className="infomation">
                <div className="infoImg"  onClick={()=>{this.toDetail(id)}}>
                    <img alt="" src={info.coverImg} />
                </div>
                {/* {info.coverImg !== undefined ? (<img src={info.coverImg} alt="" className="infoImg" onClick={()=>{this.toDetail(id)}}/>) : 
                (<div className="infoImg" style={{background: url(info.coverImg)}} onClick={()=>{this.toDetail(id)}}></div>)} */}
                <div className="infoContain" >
                    <div className="infoTitle" >
                        <div onClick={()=>{this.toDetail(id)}}>{info.newsTitle}</div>
                        <p onClick={()=>this.cancelColltet(id)}>{this.props.cancel?"取消收藏":null}</p>
                    </div>
                    <div className="infoDes" onClick={()=>{this.toDetail(id)}}>{info.newsDescribe}</div>
                    <div className="infoFoot">
                        <div className="footName">
                            <p onClick={()=>{this.toDetail(id)}}>{info.author}</p>
                            <p style={{display:this.props.showTime && IsPC()?"flex":"none"}}>{moment(info.addTime).format("YYYY-MM-DD HH:mm")}</p>
                        </div>
                        <div className="fingerEye">
                            <div className="fingerNice" onClick={()=>{this.like(id)}}>
                            {
                                dz? (<Dzs className="curserP" width=".15rem" height=".15rem" />) : (<Dzb className="curserP" width=".15rem" height=".15rem" />) 
                            }
                            </div>
                            <div className="fingerNum">{info.giveCount}</div>
                            <div className="eyePoto">
                                <Message className="msgEye" width=".15rem" height=".15rem" />
                            </div>
                            <div className="eyeNum">{info.commentCount}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

const defaultProps  = {
    data : {},
    cancel:false,
    callBack:()=>{},
    showTime:false
}

InfoItem.defaultProps = defaultProps;

InfoItem.propTypes = {
    data: PropTypes.object,
    cancel:PropTypes.bool,
    callBack:PropTypes.func,
    showTime:PropTypes.bool,
};

export default withRouter(InfoItem)