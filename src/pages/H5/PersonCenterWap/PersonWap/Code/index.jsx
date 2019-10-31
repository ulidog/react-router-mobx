import React,{Component} from 'react'
import {withRouter } from 'react-router-dom'
import { inject,observer } from 'mobx-react';
import QRCode  from 'qrcode.react';
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import './index.scss'

@inject('LoginStore')
@observer
class Code extends Component{
    render(){
        const qrcode = Base64.stringify(Utf8.parse("https://testadmin.ebuyhouse.com:8060friend"+this.props.LoginStore.huanxinId))
        return(
            <div className="code_wap">
                <div className="title">
                    <div className="left" onClick={()=>this.props.history.go(-1)}></div>
                    <div className="cent">我的二维码</div>
                    <div className="right"></div>
                </div>
                <div className="name_li">
                    <QRCode
                        value={qrcode}  //value参数为生成二维码的链接
                        size={200} //二维码的宽高尺寸
                        fgColor="#000000"  //二维码的颜色
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Code)