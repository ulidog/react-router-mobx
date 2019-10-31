import React,{Component} from 'react'
import { inject } from 'mobx-react';
import './index.scss'

@inject('LoginStore')
class UserAgreement extends Component{
    render(){
        return(
            <div className="userAgree" style={{display:this.props.isShow?"flex":"none"}}>
                <div className="invaiteP">
                    <div className="closeBtn" onClick={()=>this.props.LoginStore.userAgreementO(false)}><img src={require("images/img/close.png")} alt="" /></div>
                    <p className="title">用户协议</p>
                    <div className="btn" >类风湿互助网以及其关联公司在此特别提醒您：
                    在注册成为类风湿互助用户之前，请认真阅读《用户注册服务使用协议》（以下简称“本协议”），
                    确保您充分理解本协议中各条款。本协议约定类风湿互助与用户之间关于“类风湿互助”软件服务
                    （以下简称“服务”）的权利义务，请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，
                    否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为您已认真阅读、
                    明确知晓并同意接受本协议各项条款的约束。 <br/>
                    1.定义 <br/>
                    1.1类风湿互助：指类风湿互助APP、类风湿互助网、湘潭胡泽民中医类风湿病医院；<br/> 
                    1.2类风湿互助软件/平台：指类风湿互助自主研发并依法享有版权以及使用权（类风湿互助平台，软件内容、种类随时保持更新）
                    的医患分享互助平台，该平台系用以提供给用户注册类风湿互助账号、登录、使用服务的互联网平台； <br/>
                    1.3“用户”是指注册、登录、使用类风湿互助平台服务的法人或自然人、组织。成为类风湿互助用户有两种方式：
                    一种是在类风湿互助平台获取邀请码注册账号成为用户；另一种是通过用户邀请获得邀请码授权注册登录。 <br/>
                    2.账号注册 <br/>
                    2.1 用户使用类风湿互助平台服务可以通过两种方式手机加验证码；用户在使用服务前需要注册一个“类风湿互助”账号。
                    “类风湿互助”账号应当使用经实名认证的手机号码绑定注册：请用户使用尚未与“类风湿互助”账号绑定的手机号码，
                    以及未被类风湿互助根据本协议封禁的手机号码注册账号。类风湿互助可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，
                    而无须事先通知用户。 <br/>
                    2.2 鉴于“类风湿互助”账号的绑定注册方式，
                    您同意类风湿互助在注册时将使用您提供的手机号码或自动提取您的手机号码及自动提取您的手机设备识别码等信息用于注册。 <br/>
                    2.3在用户注册及使用服务时，类风湿互助需要搜集能识别用户。
                    </div>
                </div>
            </div>
        )
    }
}

export default UserAgreement