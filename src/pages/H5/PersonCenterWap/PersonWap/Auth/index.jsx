import React,{Component} from 'react'
import { Alert,message } from 'antd';
import { inject,observer } from 'mobx-react';
import {withRouter } from 'react-router-dom'
import {testRealName,checkCertificateNo} from "utils/common"
import {updIdcard} from 'utils/api'
import {post} from 'utils/request'
import './index.scss'

@inject('LoginStore')
@observer
class Auth extends Component{
    constructor(props){
        super(props)
        this.state = {
            checkName: false,
            checkIdcard: false,
            sts:props.LoginStore.userCount.idcardState === 1,
            nameTip:"",
            idCardTip:"",
        }
    }
    checkRealName = () => {
        const name = this.refN.value
        let sts = false
        if(testRealName(name)){
            this.setState({checkName:false,nickTip:""})
            sts = true;
        }else{
            this.setState({checkName:true,nameTip:"姓名不符合要求(汉字)"})
            sts = false;
        }
        return sts
    }
    checkIdC = () => {
        let sts = false
        const num = this.refI.value
        if(checkCertificateNo(num)){
            this.setState({checkIdcard:false,idCardTip:""})
            sts = true;
        }else{
            this.setState({checkIdcard:true,idCardTip:"身份证不符合要求"})
            sts = false;
        }
        return sts
    }
    changeName = () => {
        const name = this.refN.value
        const Idcard = this.refI.value
        if(!(this.checkRealName() && this.checkIdC())){return false}
        post({data:{Idcard,name},url:updIdcard}).then((result)=>{
            if (result.code === 0) {
                message.success("已更新身份证信息")
                this.props.LoginStore.setUserCount(Object.assign({...this.props.LoginStore.userCout},
                    {idcard:Idcard,name:name,idcardState:1}))
            }
        }).catch(error => message.error(error))
    }
    render(){
        const {checkIdcard,checkName,nameTip,idCardTip,sts} = {...this.state}
        const userCount = this.props.LoginStore.userCount
        return(
            <div className="auth_wap">
                <div className="title">
                    <div className="left" onClick={()=>this.props.history.go(-1)}></div>
                    <div className="cent">完善实名信息</div>
                    <div className="right"></div>
                </div>
                <div className="tip">请务必填写真实信息，您的信息我们将严格保密。</div>
                <div className="name_li">
                    <div className="right">
                    真实姓名
                    </div>
                    {
                        sts?(<div className="hasdata">{userCount['name']}</div>):(
                            <input placeholder="请输入真实姓名" type="text" ref={el => this.refN = el} onChange={this.checkRealName}/>
                        )
                    }
                </div>
                {
                    checkName?<Alert message={nameTip} style={{padding: "1px 15px",width:"95%"}} type="error" /> : null
                }
                <div className="name_li">
                    <div className="right">
                    身份证号
                    </div>
                    {
                        sts?(<div className="hasdata">{userCount['idcard']}</div>):(
                            <input placeholder="请输入15-18身份证号" type="text" ref={el => this.refI = el} onChange={this.checkIdC}/>
                        )
                    }
                    
                </div>
                {
                    checkIdcard?<Alert message={idCardTip} style={{padding: "1px 15px",width:"95%"}} type="error" /> : null
                }
                {
                    sts?"":<button className="commit_btn" onClick={this.changeName}>提交</button>
                }
                
            </div>
        )
    }
}

export default withRouter(Auth)