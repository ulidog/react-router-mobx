import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {inject,observer } from 'mobx-react';
import {post,get,getKey} from 'utils/request'
import {enroll, login, password, sendCode,inviteCode,userCount,userDetail} from 'utils/api'//exit,
import ImageCode from 'components/ImageCode'
import Eye  from 'images/icon/eye'
import Visible  from 'images/icon/Visible'
import "./index.scss"
import ErrorTip from 'components/ErrorTip';
import { message } from 'antd';

const apiType = {
    1:enroll,
    2:login,
    3:password,
    4:login
}
@inject('LoginStore')
@observer

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            chooseDisplay:"visible",
            isPsw: true,
            isCode: true,
            title: "账号密码登录",
            buttonRegName: "注册",
            regTip: "none",
            regTip2: "none",
            buttonLogin : "登录",
            rePsw: false,
            buttonReg: "block",
            commitType: 1 ,//1 注册 2登录 3找回密码 4 验证码登录
            loginData: {},//登录注册数据
            errorMsg:"",
            errorShow:false,
            errorPhone: true,
            visible1:false,
            visible2:false,
            inviteNum:"",
            timeNum:180,
            isSend:false,
            checkSts: {sts:false,phone:"",codeType:""},
        }
    }
    switchLoginType = (type)=>{
        switch(type){
            case 1: this.rePsw(); this.clearText(); break;
            case 2: this.toCode(); this.clearText(); break;
            default: return false;
            
        } 
    }
    componentWillUnmount(){
        this.props.LoginStore.hidePop()
    }
    rePsw = ()=>{
        this.setState({
            title: "找回密码",
            buttonLogin: "确认提交",
            isCode:false,
            rePsw: true,
            chooseDisplay: "none",
            buttonReg: "none",
            errorPhone:true
        })
        
    }
    toPsw = ()=>{
        this.refPhone.placeholder = "请输入手机号"
    }

    toCode = ()=>{
        this.setState({ title: "验证码登录",isCode:false,isPsw: false, chooseDisplay:"hidden"})
    }
    //重置状态
    closeLogin = ()=>{
        this.toPsw()
        this.clearText()
        this.setState({
            chooseDisplay: "flex",
            isPsw: true,
            isCode: true,
            title: "账号密码登录",
            buttonRegName: "注册",
            regTip: "none",
            regTip2: "none",
            buttonLogin: "登录",
            rePsw: false,
            buttonReg: "block",
            commitType: 1,
            errorPhone:true,
        })
    }
    toReg = ()=>{
        this.refPhone.placeholder = "请输入邀请码";
        this.clearText(); 
        this.setState({ 
            title: "注册", 
            isCode:true,
            isPsw: false, 
            chooseDisplay: "none",
            buttonRegName: "已有账号，去登录", 
            regTip:"block" ,
            buttonLogin: "下一步",
            visible1: false,
            visible2: false,
            errorPhone:true
        })
    }
    sendCode = () => {
        if(this.refPhone.value === ""){
            this.commitError("请填写手机号码");
            return false;
        }
        const {buttonLogin} = {...this.state}
        //1注册，2登录，3找回密码
        const codeType = buttonLogin === "登录"? 2 : buttonLogin === "注册" ? 1 :  buttonLogin === "确认提交" ? 3 : 0
        this.setState({checkSts:{sts:true,phone:this.refPhone.value,codeType}})
        
    }
    sendCodeReal = () => {
        const {phone,codeType} = {...this.state.checkSts}
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
    clearText = () => {
        this.refPhone.value = ""
        this.refCode.value = ""
        this.refPsw.value = ""
        this.refPswR.value = ""
    }
    requireMust = () => {
        const {buttonLogin,isCode,isPsw} = {...this.state}
        if(this.refPhone.value === ""){
            this.commitError("请填写手机号码");
            return true;
        }
        if(this.refCode.value === "" && !isCode){
            this.commitError("请填写验证码");
            return true;
        }
        if(this.refPsw.value === "" && isPsw){
            this.commitError("请填写密码");
            return true;
        }
        if(this.refPswR.value === "" && buttonLogin === "确认提交"){
            this.commitError("请填写确认密码");
            return true;
        }
    }
    legalInvitaCode = async (invita) => {
        let ret = false;
        if(this.refPhone.value === ""){ret = true;}else{
            await post({data:{code:invita},url:inviteCode}).then((result)=>{
            if(result.code===0){
                ret = true;
            }
        }).catch((error)=>{
            this.commitError(error);
        })
        }
        return ret
    }
    toCommit = ()=>{
        const {buttonLogin,LoginData} = {...this.state};
        if(buttonLogin === "下一步"){
            
            if(!this.legalInvitaCode(this.refPhone.value)) return false
            this.toPsw()
            this.setState({
                title: "注册",
                isCode: false,
                isPsw: true,
                chooseDisplay: "none",
                regTip: "none",
                regTip2: "block",
                buttonLogin: "注册",
                buttonRegName: "注册",
                buttonReg: "none",
                errorPhone:true,
                LoginData: Object.assign({inviteCode: this.refPhone.value},{...LoginData})
            }, this.clearText() )
        }else{
            if(this.requireMust()) return false
            const phone = this.refPhone.value
            const regx = /^1\d{10}$/
            if(phone.length>0 && !regx.test(phone)){
                return false;
            }
            const code = this.refCode.value
            const psw = this.refPsw.value
            const pswR = this.refPswR.value
            if(buttonLogin === "确认提交" && psw !== pswR){this.commitError("两次输入密码不一致");return false}
            //1 注册 2登录 3找回密码 4 验证码登录
            const url = buttonLogin === "登录"? apiType[2] : buttonLogin === "注册" ? apiType[1] :  buttonLogin === "确认提交" ? apiType[3] : apiType[4]
            this.setState({loginData:{...LoginData,phone:phone,code:code,password:psw}},async ()=>{
                await getKey({data:{...this.state.loginData},url:url}).then((result)=>{
                    if (result.code === 0) {
                        if(buttonLogin === "登录" || buttonLogin === "注册") {
                            window.localStorage.setItem("token",result.token);
                            this.props.LoginStore.huanxinIdS(result.data.huanxinId)
                            this.getLoginInfo();//设置登录信息
                            this.closeLogin()
                            this.props.LoginStore.hidePop();
                            this.props.history.push("/")
                            message.success(buttonLogin+"成功")
                        }else{this.closeLogin()}
                    }
                }).catch((error)=>{
                    this.commitError(error);
                })
            })
        }
    }
    getLoginInfo = async () => {
        await get({data:{},url:userCount}).then((result)=>{
            if (result.code === 0) {
                const userCount = result.data
                    get({data:{},url:userDetail}).then((result)=>{
                        if (result.code === 0) {
                            this.props.LoginStore.setUserCount(Object.assign(userCount,{...result.data}))
                        }
                    }).catch((error)=>{
                        this.commitError(error);
                    })
            }
        }).catch((error)=>{
            this.commitError(error);
        })
    }
    commitError = (error)=>{
        this.setState({errorShow:true,errorMsg:error},()=>{
            setTimeout(()=>{
            this.setState({errorShow:false,errorMsg:""})
            },1500)
        })
    }
    testPhone = (e)=>{
        const buttonRegName = this.state.buttonRegName;
        if(buttonRegName === "已有账号，去登录") return false;
        const regx = /^1\d{10}$/
        const errorPhone = this.state.errorPhone;
        if(e.target.value.length>0 && !regx.test(e.target.value)){
            errorPhone&&this.setState({errorPhone:false})
            return false;
        }else{
            this.setState({errorPhone:true})
        }
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
    openInvaite = () => {
        this.props.LoginStore.hidePop();
        this.props.LoginStore.showInvaiteO(true)
        this.closeLogin()
    }
    render() {
        //const { isShow, } = { ...this.props }
        const {errorShow, errorMsg, isCode, isPsw, chooseDisplay, title, buttonRegName, regTip, 
            regTip2, buttonLogin, rePsw, buttonReg,errorPhone,visible1,visible2,timeNum,isSend,checkSts} = {...this.state}
        return (
            <div className={this.props.LoginStore.isShow ? "login" : "loginNone"}>
                <ImageCode
                    imageUrl={this.props.LoginStore.checkImg}
                    onReload={this.props.LoginStore.onReload}
                    check = {checkSts.sts}
                    onMatch={() => {
                        this.sendCodeReal()
                    }}
                />
                <ErrorTip isShow={errorShow} msg={errorMsg}/>
                <span className="closebtn" onClick={() => {this.props.LoginStore.hidePop();this.closeLogin()}}></span>
                <div className="loginPanel">
                    <div className="backTitle">
                        <div className="arrow">{"<"}</div>
                        <div className="name">类风湿互助</div>
                    </div>
                    <p className="loginTitle">{title}</p>
                    <input ref={(el)=>{this.refPhone = el}} placeholder="请输入手机号" className="inputPhone" onChange={(value)=>{this.testPhone(value)}}/>
                    <div className="errorPhone" style={{display: errorPhone?"none":"block"}}><p>请输入正确的手机号</p></div>
                    {/*短信验证码  */}
                    <div className="inputCodeDiv" style={{ display: isCode?"none":"flex" }}>
                        <input ref={(el) => { this.refCode = el }} placeholder="请输入验证码" className="inputPsw" />
                        {
                            isSend?(<p className="timeNum">{timeNum}秒后重新发送</p>):(<p className="showBtn" onClick={()=>{this.sendCode()}}>验证码</p>)
                        }
                    </div>
                    {/*输入密码 */}
                    <div className="inputPswDiv" style={{ display: isPsw ? "flex" : "none" }}>
                        <input  ref={(el) => { this.refPsw = el }} placeholder="请输入密码" className="inputPsw" type="password" />
                        <div className="showEye" onClick={()=>{this.visible(1)}}>
                            {visible1?(<Visible width={".3rem"} height={".1rem"} color={"#999999"}/>):
                            (<Eye width={".3rem"} height={".1rem"} color={"#999999"} className="showEye" />)}
                        </div>
                        <div className="showEye_h5" onClick={()=>{this.visible(1)}}>
                            {visible1?(<Visible width={".6rem"} height={".3rem"} color={"#999999"}/>):
                            (<Eye width={".6rem"} height={".3rem"} color={"#999999"} />)}
                        </div>
                    </div>
                    {/*确认密码 */}
                    <div className="inputPswDiv" style={{ display: rePsw?"flex":"none"}}>
                        <input ref={(el) => { this.refPswR = el }} placeholder="请再次确认密码" className="inputPsw" type="password" />
                        <div className="showEye_h5" onClick={()=>{this.visible(2)}}>
                            {visible2?(<Visible width={".6rem"} height={".3rem"} color={"#999999"}/>):
                        (<Eye width={".6rem"} height={".3rem"} color={"#999999"}  />)}
                            
                        </div>
                        <div className="showEye" onClick={()=>{this.visible(2)}}>
                            {visible2?(<Visible width={".3rem"} height={".1rem"} color={"#999999"}/>):
                        (<Eye width={".3rem"} height={".1rem"} color={"#999999"} className="showEye" />)}
                            
                        </div>
                    </div>
                    <p className="rePswTip" style={{ display: rePsw ? "block" : "none" }}>6-12位密码，由数字+字母组成</p>
                    {/*验证码登录 && 忘记密码 */}
                    <div className="helpChoose" style={{ "display": chooseDisplay}}>
                        <p onClick={()=>{this.switchLoginType(2)}}>验证码登录</p>
                        <p onClick={()=>{this.switchLoginType(1)}}>忘记密码</p>
                    </div>
                    {/*邀请码 */}
                    <div className="regTip" style={{display:regTip}}>
                        <p>填写邀请码立刻获得100元新人红</p>
                        <p onClick={this.openInvaite}>没有邀请码？</p>
                    </div>
                    <p className="regTip2" style={{ display: regTip2 }}>注册即表示同意平台的<span onClick={()=>this.props.LoginStore.userAgreementO(true)}>《用户协议》</span></p>
                    <button className="buttonLogin" onClick={()=>{this.toCommit()}}>{buttonLogin}</button>
                    <p className="buttonReg" style={{ display: buttonReg}} onClick={() => { buttonRegName === "注册" ? this.toReg() : this.closeLogin()}}>{buttonRegName}</p>
                </div>
            </div>
        )
    }
}

// const defaultProps = {
//     isShow: false,
// }

//Login.defaultProps = defaultProps;

// Login.propTypes = {
//     isShow: PropTypes.bool,
// };
export default withRouter(Login)