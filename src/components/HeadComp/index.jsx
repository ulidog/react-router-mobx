import React,{Component} from 'react'
import {withRouter } from 'react-router-dom'
import { inject,observer } from 'mobx-react';
import {message } from 'antd';
import NavMessage from 'images/icon/NavMessage'
import NavPhoto from 'images/icon/NavPhoto'
import Logo from 'images/icon/Logo'
import Quxiao from 'images/icon/Quxiao'


import "./index.scss"
@inject('LoginStore')
@observer
class HeadComp extends Component {
    constructor(props){
        super(props);
        this.state = {
            showMenu:false,
        }
    }

    toInfomation = ()=>{
        this.props.LoginStore.activeStsO("a")
        this.props.history.push("/")
    }
    toAppDes = () => {
        this.props.LoginStore.activeStsO("b")
        this.props.history.push("/app.html")
    }
    toAboutUs= () => {
        this.props.LoginStore.activeStsO("c")
        this.props.history.push("/weare")
    }
    toMsg = () => {
        const token = localStorage.getItem("token")
        if(token!==null && token.length>0){
            this.props.history.push("/personal/msg")
        }else{
            message.error("请点击头像登录")
        }
    }
    isLogin = () => {
        const token = localStorage.getItem("token")
        if(token!==null && token.length>0){
            this.props.LoginStore.setPersonState(true)
        }else{
            this.props.LoginStore.setPersonState(false)
            this.props.LoginStore.showPop()
        }
        
    }
    showMenu = () => {
        this.setState({showMenu:!this.state.showMenu})
    }
    toWapLogin =()=>{
        this.props.history.push("/wap/person")
    }
    render(){
        const {showMenu} = {...this.state}
        const imageUrl = this.props.LoginStore.userCount !== {} && this.props.LoginStore.userCount["imageUrl"] !== undefined;
       
        return (
            <div className="headP">
                <div className="headInfo">
                    <div className="logo">
                        <div className="logoDiv" onClick={this.toInfomation}>
                            <img alt="" style={{width:"1.64rem", height:".46rem"}} src={require("images/img/logo2.png")} />
                        </div>
                    </div>
                    <div className="chooseType">
                        <div onClick={()=>this.toInfomation()}   className={this.props.LoginStore.activeSts.a?"choose1":"choose2"}>首页</div>
                        <div onClick={()=>{this.toAppDes()}}   className={this.props.LoginStore.activeSts.b?"choose1":"choose2"}>App介绍</div>
                        <div onClick={()=>{this.toAboutUs()}}  className={this.props.LoginStore.activeSts.c?"choose1":"choose2"}>关于我们</div>
                    </div>
                    <div className="loginInfo">
                        <div onClick={this.toMsg} style={{cursor:"pointer"}}>
                            <NavMessage className="msgPoto" width={".24rem"} height={".24rem"} />
                        </div>
                        <div className="loginPoto" onClick={() => {this.isLogin()}}>
                            {/* <Tx className="msgPoto"  width={".22rem"} height={".22rem"} /> */}
                            {
                                imageUrl? 
                                (<img className="userImg"  alt="" src={this.props.LoginStore.userCount["imageUrl"]} />)
                                 : (<NavPhoto className="userImg"  width={".4rem"} height={".4rem"} />)
                            }
                        </div>
                    </div>
                </div>
                <div className="headInfo-small">
                    <div className="top">
                        <div className="left" onClick={this.showMenu}>
                            <img alt="" src={require('images/h5/nav.png')} />
                        </div>
                        <div className="center">类风湿互助</div>
                        <div className="right" onClick={() => {this.toWapLogin()}}>
                            <img alt="" src={require('images/h5/me_120.png')} />
                        </div>
                    </div>
                </div>
                <div className="leftmenu" style={{display:showMenu?"flex":"none"}}>
                    <div className="poto">
                        <div className="left">
                            <Logo className="logoImg" width=".44rem" height=".44rem"/>
                            <div>类风湿互助</div>
                        </div>
                        <div onClick={this.showMenu}>
                            <Quxiao width=".44rem" height=".44rem" />
                        </div>
                    </div>
                    <div className="menuLi" onClick={()=>{this.toInfomation();this.showMenu()}}>首页</div>
                    <div className="menuLi" onClick={()=>{this.toAppDes();this.showMenu()}}>APP介绍</div>
                    <div className="menuLi" onClick={()=>{this.toAboutUs();this.showMenu()}}>关于我们</div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeadComp);