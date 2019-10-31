import React,{Component} from "react"
import { inject,observer } from 'mobx-react';
import {withRouter } from 'react-router-dom'
import { Upload,  message } from 'antd';
import {userDetail,uploadImg,updNamePoto} from 'utils/api'
import {get,post} from 'utils/request'
import TxX from 'images/icon/Tx_x'
import "./index.scss"
@inject('LoginStore')
@observer
 class PersonWap extends Component{
    constructor(props){
        super(props);
        this.state = {
            userDetail: {},
            loading: false,
            imageUrl: "",
            idcardState:0
        }
    }

    componentDidMount(){
        this.getPersonDetail()
    }
    getPersonDetail = async ()=>{
        await get({data:{},url:userDetail}).then((result)=>{
            if (result.code === 0) {
                this.setState({userDetail:result.data,imageUrl:result.data['imageUrl'],idcardState:result.data['idcardState']})
            }
        })
    }
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG/PNG文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === "done") {
            //message.success(`${info.file.name} 文件上传成功`);
            let response = info.file.response
            if (response.code === 0) {
                this.setState({
                    imageUrl:response.data[0],
                    loading:false
                },()=>{
                    post({data:{ImageUrl:response.data[0]},url:updNamePoto}).then((result)=>{
                        if (result.code === 0) {
                            message.success("已更新头像")
                        }
                    }).catch(error => message.error(error))
                })
            }
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} 文件上传失败`);
        }
    };
    toNick = ()=> {
        const userDetail = this.state.userDetail
        this.props.history.push(`/wap/person/name/${userDetail.nickName}`)

    }
    toAuth = (sts)=>{
        this.props.history.push(`/wap/person/auth/${sts}`)
    }
    toCode = ()=>{
        this.props.history.push(`/wap/person/code`)
    }
     render() {
         const userCount = this.props.LoginStore.userCount
         const {imageUrl} = {...this.state}
         return (
             <div className="person_wap">
                <div className="title">
                    <div onClick={()=>this.props.history.go(-1)}></div>
                    个人中心
                </div>
                <div className="personer_li">
                    <div className="left">头像</div>
                    <div className="right">
                        <Upload
                            name="files"
                            listType="picture"
                            className="avatar-uploader"
                            showUploadList={false}
                            headers={{SIGN: 1,token:localStorage.getItem("token")}}
                            action={uploadImg}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl !== undefined ? (<img alt="" className="poto_img" src={imageUrl} />) : (<TxX width=".8rem" height=".8rem" className="poto_img"></TxX>)}
                        </Upload>
                        <div className="togo"></div>
                    </div>
                </div>
                <div className="personer_li" onClick={()=>{this.toNick()}}>
                    <div className="left">昵称</div>
                    <div className="right">
                    {userCount.nickName}
                        <div className="togo"></div>
                    </div>
                </div>
                <div className="personer_li" onClick={()=>{this.toAuth(userCount.idcardState)}}>
                    <div className="left">实名认证</div>
                    <div className="right">
                    {userCount.idcardState===1?"已认证":"未认证"}
                        <div className="togo"></div>
                    </div>
                </div>
                <div className="personer_li" onClick={()=>{this.toCode()}}>
                    <div className="left">二维码</div>
                    <div className="right">
                        <img alt="" className="qrcode" src={require('images/h5/qrcode.png')} />
                        <div className="togo"></div>
                    </div>
                </div>
                <div className="personer_li">
                    <div className="left">手机号</div>
                    <div className="right" style={{paddingRight:0}}>
                        {userCount.phone}
                    </div>
                </div>
             </div>
         )
     }
 }

 export default withRouter(PersonWap)