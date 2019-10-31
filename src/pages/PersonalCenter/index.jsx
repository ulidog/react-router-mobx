import React,{Component} from 'react'
import { NavLink} from 'react-router-dom'
import {inject,observer} from 'mobx-react'

import HeadComp from 'components/HeadComp'
import TxX from 'images/icon/Tx_x'
import './index.scss'

@inject("LoginStore")
@observer
class PersonalCenter extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:"个人资料"
        }
    }
    copyInv = () => {
        this.refInv.select()
        document.execCommand("Copy");
    }
    title = (name) => {
        this.setState({title:name})
    }
    render(){
        const {nickName,imageUrl,inviteCode} = {...this.props.LoginStore.userCount}
        const title = this.state.title
        return (
            <div className="personal">
                <HeadComp />
                <div className="derict">
                    个人中心><p>{title}</p>
                </div>
                <div className="contain">
                    <div className="leftMenu">
                        <div className="choose1">
                            <NavLink to="/personal" onClick={()=>{this.title("个人资料")}} className="detail" >
                                <div className="poto">
                                    {
                                        imageUrl !== undefined ? (<img alt="" src={imageUrl} />):
                                        (<TxX width=".92rem" height=".92rem"></TxX>)
                                    }
                                </div>
                            
                            </NavLink>
                            <div className="nameInva">
                                <div className="name">{nickName}</div>
                                <div className="invariant">
                                    <p>邀请码：</p>
                                    <textarea readOnly="readOnly" ref={(el)=>this.refInv = el} defaultValue={inviteCode || ""}></textarea>
                                    <button onClick={()=>{this.copyInv()}}>复制</button>
                                </div>
                            </div>
                        </div>
                        <NavLink activeClassName="activeLink" to="/personal/collection" className="choose" onClick={()=>this.title("我的收藏")}>我的收藏</NavLink>
                        <NavLink activeClassName="activeLink" to="/personal/msg" className="choose" onClick={()=>this.title("消息中心")}>消息中心</NavLink>
                        <NavLink activeClassName="activeLink" to="/personal/setting" className="choose" onClick={()=>this.title("设置")}>设置</NavLink>
                    </div>
                    <div className="rightContain">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalCenter