import React,{Component} from "react"
import {withRouter } from 'react-router-dom'
import { inject,observer } from 'mobx-react';
import Logo from 'images/icon/Logo'
import NavPhoto from 'images/icon/NavPhoto'
import "./index.scss"
import { message } from "antd";

@inject('LoginStore')
@observer
class PersonCenterH5 extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginSts:false,
        }
    }
    componentDidMount(){
        
        const token = localStorage.getItem("token")
        this.setState({loginSts:token!==null && token.length>0})
    }
    toLogin = () => {
        this.props.history.push("/wap/person/login")
    }
    copyInv = () => {
        this.refInv.select()
        document.execCommand("Copy");
    }
    outLogin = ()=> {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userCount")
        this.props.LoginStore.setUserCount({})
        this.props.history.push("/")
    }
    toPersoner = (url)=> {
        const {loginSts} = {...this.state}
        if(loginSts){this.props.history.push(url)}else{message.error("请登陆")}
    }
    render(){
        const {loginSts} = {...this.state}
        const {nickName,imageUrl,inviteCode} = {...this.props.LoginStore.userCount}
        return(
            <div className="personCenter_h5">
                <div className="title_P">
                    <div className="left" onClick={()=>this.props.history.push("/")}>
                        <Logo className="logoImg" width=".44rem" height=".44rem"/>
                        <div className="title_name">类风湿互助</div>
                    </div>
                    {/* <div onClick={this.back} style={{marginLeft:".2rem"}}>
                        <Quxiao width=".44rem" height=".44rem" />
                    </div> */}
                </div>
                {
                    loginSts? 
                    (
                        <div className="login_poto">
                            {
                                imageUrl !== undefined? 
                                (<img className="userImg"  alt="" src={this.props.LoginStore.userCount["imageUrl"]} />)
                                 : (<NavPhoto className="userImg"  width={"1.5rem"} height={"1.5rem"} />)
                            }
                            <div>{nickName}</div>
                            <div className="son_info">
                                <div>邀请码：</div>
                                <textarea  ref={(el)=>this.refInv = el} defaultValue={inviteCode || ""}></textarea>
                                <button onClick={this.copyInv}>复制</button>
                            </div>
                        </div>
                        )
                        : (
                            <div className="login_poto" onClick={this.toLogin}>
                                <NavPhoto className="userImg"  width={"1.5rem"} height={"1.5rem"} />
                                <div>登录 / 注册</div>
                            </div>
                    )
                }
                <div className="person_li" onClick={()=>{this.toPersoner("/wap/person/collect")}}>
                    <img alt="" src={require('images/h5/collection.png')} />
                    <div>我的收藏</div>
                </div>
                <div className="person_li" onClick={()=>{this.toPersoner("/wap/person/msg")}}>
                    <img alt="" src={require('images/h5/message.png')} />
                    <div>消息中心</div>
                </div>
                <div className="person_li" onClick={()=>{this.toPersoner("/wap/person/my")}}>
                    <img alt="" src={require('images/h5/personal.png')} />
                    <div>个人信息</div>
                </div>
                <div className="person_li" onClick={()=>{this.toPersoner("/wap/person/setting")}}>
                    <img alt="" src={require('images/h5/setting.png')} />
                    <div>账号设置</div>
                </div>
                {
                    loginSts?(
                        <div className="btn_p">
                            <button className="btn" onClick={this.outLogin}>退出</button>
                        </div>
                    ):null
                }
                
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(PersonCenterH5)