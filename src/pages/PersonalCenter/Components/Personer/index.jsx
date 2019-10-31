import React,{Component} from 'react'
import { Upload, Icon, message,Alert } from 'antd';
import {inject,observer } from 'mobx-react';
import {get,post} from 'utils/request'
import {userDetail,uploadImg,updNamePoto,updIdcard,userCount} from 'utils/api'
import {testRealName,testNickName,checkCertificateNo} from "utils/common"
import QRCode  from 'qrcode.react';
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import './index.scss'

@inject('LoginStore')
@observer
class Personer extends Component {

    constructor(props){
        super(props);
        this.state = {
            userDetail: {},
            loading: false,
            imageUrl: "",
            checkNick: false,
            checkName: false,
            checkIdcard: false,
            nickTip:"",
            nameTip:"",
            idCardTip:"",
            idcardState:0
        }
    }
    componentDidMount(){
        this.getPersonDetail()
    }
    getBase64 = (img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    getPersonDetail = async ()=>{
        await get({data:{},url:userDetail}).then((result)=>{
            if (result.code === 0) {
                // this.refIdcard.value = result.data['idcard'] || ""
                // this.refName.value = result.data['name'] || ""
                this.nickNameRef.value = result.data['nickName'] || ""
                this.setState({userDetail:result.data,imageUrl:result.data['imageUrl'],idcardState:result.data['idcardState']})
            }
        })
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === "done") {
            message.success(`头像上传成功`);
            let response = info.file.response
            if (response.code === 0) {
                this.setState({
                    imageUrl:response.data[0],
                    loading:false
                })
            }
        } else if (info.file.status === "error") {
            //${info.file.name}
            message.error(`头像上传失败`);
        }
    };
    commitP = async() => {
        if(!(this.checkNickName() && this.checkRealName() && this.checkIdC())) return false
        const ImageUrl = this.state.imageUrl;
        const nickName = this.nickNameRef.value;
        await post({data:{nickName,ImageUrl},url:updNamePoto}).then((result)=>{
            if (result.code === 0) {
                message.success("已更新头像和昵称")
            }
        }).catch(error => message.error(error))
        const idcardState =this.state.idcardState
        if(idcardState !== 1) {
            const name = this.refName.value;
            const Idcard = this.refIdcard.value;
            if(name !== "" && Idcard !== ""){
                await post({data:{Idcard,name},url:updIdcard}).then((result)=>{
                    if (result.code === 0) {
                        message.success("已更新身份证信息")
                    }
                }).catch(error => message.error(error))
            }
        }
        this.getLoginInfo()
    }
    getLoginInfo = async () => {
        await get({data:{},url:userCount}).then((result)=>{
            if (result.code === 0) {
                const userCount = result.data
                    get({data:{},url:userDetail}).then((result)=>{
                        if (result.code === 0) {
                            this.props.LoginStore.setUserCount(Object.assign(userCount,{...result.data}))
                            //window.location.reload()
                        }
                    }).catch((error)=>{
                        message.error(error);
                    })
            }
        }).catch((error)=>{
            message.error(error);
        })
    }
    checkNickName = () => {
        const name = this.nickNameRef.value
        let sts = false
        if(testNickName(name)){
            this.setState({checkNick:false,nickTip:""})
            sts = true;
        }else{
            this.setState({checkNick:true,nickTip:"昵称不符合要求(汉字加字母)"})
            sts = false;
        }
        return sts
    }
    checkRealName = () => {
        const name = this.refName.value
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
        const num = this.refIdcard.value
        if(checkCertificateNo(num)){
            this.setState({checkIdcard:false,idCardTip:""})
            sts = true;
        }else{
            this.setState({checkIdcard:true,idCardTip:"身份证不符合要求"})
            sts = false;
        }
        return sts
    }
    render(){
        const {userDetail,imageUrl,checkNick,checkName,
            checkIdcard,nickTip,nameTip,idCardTip} = {...this.state}
        const qrcode = Base64.stringify(Utf8.parse("https://testadmin.ebuyhouse.com:8060friend"+this.props.LoginStore.huanxinId))
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return(
            <div className="personer">
                <div className="title">个人资料</div>
                <div className="contain">
                    <div className="column">
                        <div className="leftTitle">头像</div>
                        <div className="poto">
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
                            {imageUrl && imageUrl !== undefined  ? <img src={imageUrl} alt="avatar" style={{ width: '.67rem',height:'.67rem' }} /> : uploadButton}
                        </Upload>
                            {/* {
                                userDetail["imageUrl"] !== undefined ? (<img alt="" style={{width:"1.08rem",height:"1.08rem"}} src={userDetail["imageUrl"]} />):
                                (<TxX width="1.08rem" height="1.08rem"></TxX>)
                            } */}
                        </div>
                    </div>
                    <div className="column">
                        <div className="leftTitle">昵称</div>
                        <div className="name">
                            <input type="text" onChange={this.checkNickName} ref={el => this.nickNameRef =el} />
                            {
                                checkNick?<Alert message={nickTip} style={{padding: "1px 15px",width:"3rem"}} type="error" /> : null
                            }
                            {/* {userDetail['nickName']}</p> */}
                            {/* <p onClick={() => {this.changeName()}}>修改</p> */}
                        </div>
                    </div>
                    <div className="column">
                        <div className="leftTitle">实名认证</div>
                        <div className="column2">
                            <p>请务必填写真实信息，您的信息我们将严格保密</p>
                            <div className="column3">
                                <p>真实姓名</p>
                                {
                                    userDetail['idcardState'] === 1?(<p style={{paddingLeft:".1rem"}}>{userDetail['name']}</p>):
                                    (<input ref={(el)=>{this.refName = el}} type="text"  placeholder="请输入真实姓名" 
                                readOnly={userDetail['idcardState'] === 1} onChange={this.checkRealName}/>)
                                }
                            </div>
                            {
                                checkName?<Alert message={nameTip} style={{padding: "1px 15px",width:"2rem"}} type="error" /> : null
                            }
                            <div className="column3">
                                <p>身份证号</p>
                                {
                                    userDetail['idcardState'] === 1?(<p style={{paddingLeft:".1rem"}}>{userDetail['idcard']}</p>):
                                    (<input ref={(el)=>{this.refIdcard = el}} type="text" placeholder="请输入15-18身份证号" 
                                readOnly={userDetail['idcardState'] === 1} onChange={this.checkIdC}/>)
                                }
                                
                            </div>
                            {
                                checkIdcard?<Alert message={idCardTip} style={{padding: "1px 15px"}} type="error" /> : null
                            }
                        </div>
                    </div>
                    <div className="column">
                        <div className="leftTitle">二维码</div>
                        <div className="column2">
                            <p>下载app扫一扫添加好友</p>
                            <div  className="poto">
                            <QRCode
                                value={qrcode}  //value参数为生成二维码的链接
                                size={87} //二维码的宽高尺寸
                                fgColor="#000000"  //二维码的颜色
                            />
                            {/* {userDetail['idcardState'] === 1 && userDetail['payeeNumber'] && userDetail['payeeNumber'] !== undefined  ? 
                            <img src={userDetail['payeeNumber']} alt="avatar" style={{ width: '100%' }} /> : "暂无二维码"} */}
                                
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="leftTitle">手机号</div>
                        <div className="column2">
                            <p>{userDetail['phone']?userDetail['phone'] : "暂无号码"}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="leftTitle"></div>
                        <div className="column2">
                            <button className="baocun" onClick={this.commitP}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Personer