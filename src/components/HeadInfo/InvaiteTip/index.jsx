import React,{Component} from 'react'
import { inject } from 'mobx-react';
import './index.scss'

@inject('LoginStore')
class InvaiteTip extends Component{
    render(){
        return(
            <div className="invaiteTip" style={{display:this.props.isShow?"flex":"none"}}>
                <div className="invaiteP">
                    <p className="title">获取邀请码</p>
                    <p>关注公众号获取</p>
                    <p>公众号：类风湿互助</p>
                    <div className="line"></div>
                    <div className="btn" onClick={()=>this.props.LoginStore.showInvaiteO(false)}>知道了</div>
                </div>
            </div>
        )
    }
}

export default InvaiteTip