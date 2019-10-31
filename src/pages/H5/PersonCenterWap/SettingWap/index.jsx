import React,{Component} from 'react'
import { inject,observer } from 'mobx-react';
import {withRouter } from 'react-router-dom'
import './index.scss'

@inject('LoginStore')
@observer
class SettingWap extends Component{
    render(){
        return(
            <div className="setting_wap">
                <div className="title">
                    <div className="left" onClick={()=>this.props.history.go(-1)}></div>
                    <div className="cent">账号设置</div>
                    <div className="right"></div>
                </div>
                <div className="name_li" onClick={()=>this.props.history.push("/wap/person/psw")}>
                    <div className="right">
                    修改密码
                    </div>
                    <div className="arrow"></div>
                </div>
            </div>
        )
    }
}

export default withRouter(SettingWap)