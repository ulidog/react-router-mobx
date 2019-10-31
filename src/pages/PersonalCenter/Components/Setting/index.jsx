import React,{Component} from 'react'
import {inject,observer } from 'mobx-react';
import {message} from 'antd'
import {post,getKey} from 'utils/request'
import { sendCode,password} from 'utils/api'
import Eye  from 'images/icon/eye'
import Visible  from 'images/icon/Visible'
import ImageCode from 'components/ImageCode'
import './index.scss'

@inject("LoginStore")
@observer
class Setting extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible1: false,
            visible2: false,
            show:false,
            isSend:false,
            tip:"",
            checkSts: {sts:false,phone:"",codeType:""},
            timeNum:180,
        }
    }
    changePsw = () => {
        const show = this.state.show
        this.setState({show:!show})
    }
    visible = (type) => {
        const {visible1,visible2} = {...this.state}
        switch(type){
            case 1 : this.refPsw.type = visible1? "password":"text";
                     this.setState({visible1:!visible1})
                     break;
            case 2 : this.refPswR.type = visible2? "password":"text";
                     this.setState({visible2:!visible2})
                     break;
            default: break;
        }
    }
    sendCodeReal = () => {
        const {phone,codeType} = {...this.state.checkSts}
        this.setState({checkSts:{sts:false,phone,codeType}},()=>{
            getKey({data:{phone,codeType},url:sendCode}).then((result)=>{
                if (result.code === 0 ) {
                    message.success("已发送验证码");
                    const time = setInterval(()=>{
                        const {timeNum} = {...this.state}
                        if(timeNum === 0){
                            clearInterval(time)
                            this.setState({timeNum:180,isSend:false})
                        }else{
                            this.setState({timeNum:timeNum-1,isSend:true})
                        }
                    },1000)
                }
            }).catch((error)=>{
                message.error(error);
            })
        })
        
    }
    sendCode = () => {
        this.setState({checkSts:{sts:true,phone:this.props.LoginStore.userCount.phone,codeType:"3"}})
        //1注册，2登录，3找回密码
    }
    toCommit = async ()=>{
        const code = this.refCode.value
        const psw = this.refPsw.value
        const pswR = this.refPswR.value
        if(code === ""){this.setState({tip:"请输入验证码"});return false}
        if(psw === "" ){this.setState({tip:"请输入新密码"});return false}
        if(psw !== pswR){this.setState({tip:"两次输入密码不一致"});return false}
            await post({data:{phone:this.props.LoginStore.userCount.phone,code,password:psw},url:password}).then((result)=>{
                if (result.code === 0) {
                    this.changePsw()
                    message.success("设置新密码成功");
                }}).catch((error)=>{
                    message.error(error);
            })
    }
    render(){
        const {visible1,visible2,show,isSend,timeNum,tip,checkSts} = {...this.state}
        return(
            <div className="setting">
                <ImageCode
                        imageUrl={this.props.LoginStore.checkImg}
                        onReload={this.props.LoginStore.onReload}
                        check = {checkSts.sts}
                        onMatch={() => {
                            this.sendCodeReal()
                        }}
                    />
                <div className="title">密码设置</div>
                <div className="contain">
                    <p>密码</p>
                    <p>*********</p>
                    <p style={{cursor:"pointer"}} onClick={()=>{this.changePsw()}}>修改密码</p>
                </div>
                <div className="op" style={{display: show?"flex":"none"}}>
                    <div className="inputDiv">
                        <input ref={(el) => { this.refCode = el }} placeholder="请输入验证码" className="inputPsw" />
                        {
                            isSend?(<p className="timeNum">{timeNum}秒后重新发送</p>):(<p className="showBtn" onClick={()=>{this.sendCode()}}>验证码</p>)
                        }
                    </div>
                    <div className="inputDiv">
                        <input  ref={(el) => { this.refPsw = el }} placeholder="请输入新密码" className="inputPsw" type="password" />
                        <div className="showEye" onClick={()=>{this.visible(1)}}>
                                {visible1?(<Visible width={".2rem"} height={".1rem"} color={"#999999"}/>):
                            (<Eye width={".2rem"} height={".1rem"} color={"#999999"} className="showEye" />)}
                        </div>
                    </div>
                    <div className="inputDiv">
                        <input  ref={(el) => { this.refPswR = el }} placeholder="请再次确认新密码" className="inputPsw" type="password" />
                        <div className="showEye" onClick={()=>{this.visible(2)}}>
                                {visible2?(<Visible width={".2rem"} height={".1rem"} color={"#999999"}/>):
                            (<Eye width={".2rem"} height={".1rem"} color={"#999999"} className="showEye" />)}
                        </div>
                    </div>
                    <div >{tip}</div>
                    <button onClick={this.toCommit}>确认</button>
                </div>
            </div>
        )
    }
}

export default Setting