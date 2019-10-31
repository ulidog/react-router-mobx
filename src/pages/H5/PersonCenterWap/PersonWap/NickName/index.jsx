import React,{Component} from 'react'
import { Alert,message } from 'antd';
import { inject,observer } from 'mobx-react';
import {withRouter } from 'react-router-dom'
import {testNickName} from "utils/common"
import {post} from 'utils/request'
import {updNamePoto} from 'utils/api'
import './index.scss'

@inject('LoginStore')
@observer
class NickName extends Component{
    constructor(props){
        super(props)
        this.state = {
            nickname: "",
            checkNick: false,
            nickTip: ""
        }
    }
    cancel = () => {
        this.refT.value = ""
    }
    componentDidMount(){
        const nick = this.props.match.params.nick; 
        this.refT.value = nick;
        this.setState({
            nickname:nick
        })
    }
    checkNickName = () => {
        const name = this.refT.value
        let sts = false
        if(testNickName(name)){
            this.setState({checkNick:false,nickTip:""})
            sts = true;
        }else{
            this.setState({checkNick:true,nickTip:"昵称不符合要求(汉字加字母)"})
            sts = false;
        }
        return sts
    }
    changeName = () => {
        const name = this.refT.value
        if(!this.checkNickName()) return false
        post({data:{nickName:name},url:updNamePoto}).then((result)=>{
            if (result.code === 0) {
                message.success("昵称已更新")
                this.props.LoginStore.setUserCount(Object.assign({...this.props.LoginStore.userCout},{nickName:name}))
            }
        }).catch(error => message.error(error))
    }
    render(){
        const {checkNick,nickTip} = {...this.state}
        return(
            <div className="nickname">
                <div className="title">
                    <div className="left" onClick={()=>this.props.history.go(-1)}></div>
                    <div className="cent">昵称</div>
                    <div className="right" onClick={this.changeName}>确认</div>
                </div>
                <div className="name_li">
                    <input type="text" ref={el => this.refT = el} onChange={this.checkNickName}/>
                    
                    <div className="right" onClick={this.cancel}>
                        <img alt="" style={{width:".3rem",height:".3rem"}} src={require("images/h5/canncel.png")}/>
                    </div>
                </div>
                {
                    checkNick?<Alert message={nickTip} style={{width:"95%"}} type="error" /> : null
                }
                <div className="tip">昵称由2-20个中英文组成</div>
            </div>
        )
    }
}

export default withRouter(NickName)