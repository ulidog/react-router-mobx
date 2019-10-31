import React,{Component} from 'react'
import {inject,observer } from 'mobx-react';
import {post,getKey} from 'utils/request'
import {enroll, sendCode} from 'utils/api'//exit,
import ImageCode from 'components/ImageCode'
import Eye  from 'images/icon/eye'
import Visible  from 'images/icon/Visible'
import "./index.scss"
import ErrorTip from 'components/ErrorTip';
import UserAgreement from 'components/HeadInfo/UserAgreement'
import { message } from 'antd';

@inject('LoginStore')
@observer
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            errorMsg:"",
            errorShow:false,
            errorPhone: true,
            visible1:false,
            inviteNum:"",
            timeNum:180,
            isSend:false,
            checkSts: {sts:false,phone:"",codeType:""},
            invaite:"",
        }
    }
    componentDidMount(){
        this.setState({invaite:this.props.match.params.invaite}) 	
     
    }
    testPhone = (e)=>{
        const regx = /^1\d{10}$/
        const errorPhone = this.state.errorPhone;
        if(e.target.value.length>0 && !regx.test(e.target.value)){
            errorPhone&&this.setState({errorPhone:false})
            return false;
        }else{
            this.setState({errorPhone:true})
        }
    }
    sendCode = () => {
        if(this.refPhone.value === ""){
            this.commitError("请填写手机号码");
            return false;
        }
        //1注册，2登录，3找回密码
        this.setState({checkSts:{sts:true,phone:this.refPhone.value,codeType:1}})
        
    }
    sendCodeReal = () => {
        const {phone,codeType} = {...this.state.checkSts}
        console.log(codeType)
        this.setState({checkSts:{sts:false,phone,codeType}},()=>{
            getKey({data:{phone,codeType},url:sendCode}).then((result)=>{
                if (result.code === 0 ) {
                    this.commitError("已发送验证码");
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
                this.commitError(error);
            })
        })
        
    }
    toCommit = ()=>{
        const invaite = this.state.invaite;
        
        if(this.requireMust()) return false
        const phone = this.refPhone.value
        const code = this.refCode.value
        const psw = this.refPsw.value
        post({data:{inviteCode:invaite,phone:phone,code:code,password:psw},url:enroll}).then((result)=>{
            if (result.code === 0) {
                message.success("注册成功")
            }
        }).catch((error)=>{
            message.error(error)
        })
    }
    requireMust = () => {
        if(this.refPhone.value === ""){
            this.commitError("请填写手机号码");
            return true;
        }
        if(this.refCode.value === ""){
            this.commitError("请填写验证码");
            return true;
        }
        if(this.refPsw.value === ""){
            this.commitError("请填写密码");
            return true;
        }
    }
    visible = () => {
        const {visible1} = {...this.state}
        this.refPsw.type = visible1? "password":"text";
        this.setState({visible1:!visible1})
    }
    commitError = (error)=>{
        this.setState({errorShow:true,errorMsg:error},()=>{
            setTimeout(()=>{
            this.setState({errorShow:false,errorMsg:""})
            },1500)
        })
    }
    render(){
        const {errorShow, errorMsg, errorPhone,visible1,timeNum,isSend,checkSts} = {...this.state}
        return (
            <div className="register">
                <UserAgreement isShow={this.props.LoginStore.userAgreement} />
                <ImageCode
                    imageUrl={this.props.LoginStore.checkImg}
                    onReload={this.props.LoginStore.onReload}
                    check = {checkSts.sts}
                    onMatch={() => {
                        this.sendCodeReal()
                    }}
                />
                <ErrorTip isShow={errorShow} msg={errorMsg}/>
                {/* <span className="closebtn" onClick={() => {this.props.LoginStore.hidePop();this.closeLogin()}}></span> */}
                <div className="loginPanel">
                    <p className="loginTitle">邀请注册</p>
                    <input ref={(el)=>{this.refPhone = el}} placeholder="请输入手机号" className="inputPhone" onChange={(value)=>{this.testPhone(value)}}/>
                    
                    <div className="errorPhone" style={{display: errorPhone?"none":"block"}}><p>请输入正确的手机号</p></div>
                    {/*短信验证码  */}
                    <div className="inputCodeDiv">
                        <input ref={(el) => { this.refCode = el }} placeholder="请输入验证码" className="inputPsw" />
                        {
                            isSend?(<p className="timeNum">{timeNum}秒后重新发送</p>):(<p className="showBtn" onClick={()=>{this.sendCode()}}>验证码</p>)
                        }
                    </div>
                    
                    {/*输入密码 */}
                    <div className="inputPswDiv">
                        <input  ref={(el) => { this.refPsw = el }} placeholder="请输入密码" className="inputPsw" type="password" />
                        <div className="showEye" onClick={()=>{this.visible()}}>
                            {visible1?(<Visible width={".3rem"} height={".1rem"} color={"#999999"}/>):
                            (<Eye width={".3rem"} height={".1rem"} color={"#999999"} className="showEye" />)}
                        </div>
                    </div>
                    
                    <p className="regTip2">注册即表示同意平台的<span onClick={()=>this.props.LoginStore.userAgreementO(true)}>《用户协议》</span></p>
                    <button className="buttonLogin" onClick={()=>{this.toCommit()}}>注册</button>
                </div>
            </div>
        )
    }
}

export default Register