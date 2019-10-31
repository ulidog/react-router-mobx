import React,{Component} from 'react'
import moment from 'moment'
import { Modal,message } from "antd"
import {get,post} from "utils/request"
import {newsDetail,commentList,comment,advisoryCollection,advisoryCollectionDel,
    advisoryDz,advisoryDzCancel,commentDz,commentDzCancel,browseCount} from "utils/api"
import QRCode from "qrcode.react"
import Reply from "./Reply"
import Sc from "images/icon/Sc"
import Scs from "images/icon/Sc_s"
import Dzb from "images/icon/Dz_b"
import Dzs from "images/icon/Dz_s"
import WeixinD from "images/icon/Weixin_dark"
import WeixinL from "images/icon/Weixin_light"
import Qqdark from "images/icon/Qqdark"
import Message from 'images/icon/Message'
import Qqlight from "images/icon/Qqlight"
import Visible from "images/icon/Visible"
import Tx from "images/icon/Tx_b"
import Totop from "images/icon/Totop"
import HeadComp from 'components/HeadComp'
import "./index.scss";
class NewsDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            detailData: {},
            sc: false,
            scNum:0,
            dz: false,
            commentDz: false,
            commentList: [],
            replyId: "",
            showfoot: false,
            showQRCode: false,
            replySts:false
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id; 
        this.browseCount(id)
        document.addEventListener('scroll', this.handleScroll);	
     
    }
    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll = ()=>{
        let html = document.documentElement || document.body;
        let targetHeight = html.clientHeight;
        const scrollTop = window.scrollY;
        this.setState({showfoot:scrollTop>targetHeight-200})
    }
    browseCount = async (id) => {
        await post({data:{id},url:browseCount}).then((result)=>{
            if (result.code === 0) {
                this.getDetail(id)
            }
        })
    }
    getDetail = async (id) => {
        await get({data:{id},url:newsDetail}).then((result)=>{
            if (result.code === 0) {
                this.getCommentList(result.data.id)
                this.setState({detailData:result.data,
                    sc:result.data.collectStatus === "1"? true :false,
                    dz:result.data.advisoryGiveStatus === "1"? true :false,
                    scNum: result.data.collectCount
                })
            }
        })
    }
    //资讯评论列表
    getCommentList = async (id) => {
        await get({data:{id},url:commentList}).then((result)=>{
            if (result.code === 0) {
                //初始化查看更改状态
                const list = result.data.records
                let stsMap = {}
                for(let val of list){
                    stsMap[val.id] = false
                }
                this.setState({commentList:list,replySts:stsMap})
            }
        })
    }
    //资讯评论
    replyA = async () => {
        let commentText = this.commentRef.value
        const nickAt = this.commentRef.placeholder;
        if(nickAt.indexOf("@")>=0){
            commentText = nickAt + ":" + commentText;
        }
        const {detailData,replyId} = {...this.state}
        const data = replyId===""?{advisoryId:detailData.id,commentContent:commentText} : {advisoryId:detailData.id,commentContent:commentText,parentId:replyId}
        await post({data,url:comment}).then((result)=>{
            if (result.code === 0) {
                message.success("回复成功")
                this.getCommentList(detailData.id)
                this.replyCancel()
            }
        }).catch(err => message.error(err))
    }
    focusText = (replyId,nickName)=>{
        this.commentRef.placeholder= `@${nickName}`
        this.commentRef.focus()
        this.setState({replyId,isreply:true})
    }
    replyCancel = () => {
        this.commentRef.placeholder= `欢迎留下你得评论`
        this.commentRef.value = ""
        this.setState({replyId:"",isreply:false})
    }
    collect = async (id) => {
        const {sc,scNum} = this.state
        const url = sc?advisoryCollectionDel:advisoryCollection
        await post({data:{advisoryId:id},url:url}).then((result)=>{
            if (result.code === 0) {
                sc?message.success("取消收藏成功"):message.success("收藏成功")
                this.setState({sc:!sc,scNum:sc?scNum-1:scNum+1})
            }
        }).catch((err)=>message.error(err))
    }
    like = async (id) => {
        const {dz} = this.state
        const url = dz?advisoryDzCancel:advisoryDz
        await post({data:{advisoryId:id},url:url}).then((result)=>{
            if (result.code === 0) {
                dz?message.success("取消点赞成功"):message.success("点赞成功")
                this.setState({dz:!dz})
            }
        }).catch((err)=>message.error(err))
    }
    commentLike = async (id,sts,adId) => {
        const url = sts?commentDzCancel:commentDz
        await post({data:{commentId:id},url:url}).then((result)=>{
            if (result.code === 0) {
                sts?message.success("取消评论点赞成功"):message.success("评论点赞成功")
                this.getCommentList(adId)
            }
        }).catch((err)=>message.error(err))
    }
    toTop = ()=>{
        var four;
        four=setInterval(()=>{
            if(document.documentElement && document.documentElement.scrollTop) //IE
                {
                    if(document.documentElement.scrollTop<=0){
                        clearInterval(four);
                    }else{
                        window.scrollBy(0,-30);
                    }
                }else{ //Chrome不支持documentElement.scrollTop
                    if(document.body.scrollTop<=0){
                        clearInterval(four);
                    }else{
                        window.scrollBy(0,-30);
                    }
                }
        },10);
    }
    // 分享
    share = type => {

        if(type === 'wechat') {
            this.setState({ showQRCode: true })
        }else {
            let ftit = "标题";
            let lk = "https://img.jpg";

            window.open('http://connect.qq.com/widget/shareqq/index.html?url='+document.location.href+'?sharesource=qzone&title='+ftit+'&pics='+lk+'&summary='+document.querySelector('meta[name="description"]').getAttribute('content')+'&desc=分享描述');
        }
    }
    showAllComment = (sts,id)=>{
        let replaySts = this.state.replySts
        replaySts[id] = sts
        this.setState({replySts:replaySts})
    }
    render(){
        const {detailData,sc,scNum,dz,commentList,isreply,showfoot,replySts} = {...this.state}
        const img = detailData["newsImg"]
        const htmlstr = "<html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\"><style>img{max-width: 100%; width:100%; height:auto;}*{margin:0px;}</style><style>video{max-width: 100%; width:100%; height:auto;}*{margin:0px;}</style></head><body>" + detailData.newsDescribe + "</body></html>"
        return (
            <div className="newsDetail">
                <HeadComp />
                <div className="derit"><p style={{cursor:"pointer"}} onClick={()=>{this.props.history.push("/")}}>健康资讯</p>><p>资讯详情</p></div>
                <div className="contain">
                    <div className="containTop">
                        <p className="title">{detailData.newsTitle}</p>
                        <div className="containInfo">
                            <div className="left">
                                {
                                    img===undefined || img ==="" ? (<Tx width=".3rem" height=".3rem"/>)
                                    : <img alt="" className="img" src={img } />
                                }
                                <p>{detailData.author}</p>
                                <p>{moment(detailData.add_time).format("YYYY-MM-DD HH:mm")}</p>
                            </div>
                            <div className="right">
                                <div className="fingerEye">
                                    <Visible width=".15rem" height=".15rem" />
                                    <p className="fingerNum">{detailData.browseCount}</p>
                                    <Message width=".15rem" height=".15rem" />
                                    <p className="eyeNum">{detailData.replyCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="infoDes" dangerouslySetInnerHTML={{
                        __html: htmlstr
        
                        }} />
                    <div className="op">
                        <div onClick={()=>{this.collect(detailData.id)}}>
                        {
                            sc? (<Scs className="curserP" width=".24rem" height=".24rem"></Scs>) : (<Sc className="curserP" width=".24rem" height=".24rem"></Sc>)
                        }
                        </div>
                        
                        <p>{scNum}</p>
                        <div onClick={()=>{this.like(detailData.id)}}>
                        {
                            dz? (<Dzs className="curserP" width=".24rem" height=".24rem" />) : (<Dzb className="curserP" width=".24rem" height=".24rem" />) 
                        }
                        </div>
                        <p className="ppp">分享至</p>
                        <div className="fx" onClick={() => this.share("wechat")}>
                            <WeixinL width=".24rem" height=".24rem" />
                            <p>微信朋友</p>
                        </div>
                        <div className="fx" onClick={() => this.share("qq")}>
                            <Qqlight width=".24rem" height=".24rem"/>
                            <p>QQ好友</p>
                        </div>
                    </div>
                    <div className="comment">
                        <p>评论</p>
                        <div className="textContain">
                            <textarea ref={(el)=>{this.commentRef=el}} maxLength="180" className="textA" placeholder="欢迎留下你的评论"></textarea>
                            <div className="publish">
                                <p>180个字内</p>
                                <button style={{display:isreply?"block":"none",width:"1.2rem",marginRight:".05rem"}} onClick={()=>{this.replyCancel()}}>取消回复</button>
                                <button  onClick={()=>{this.replyA()}}>发布</button>
                            </div>
                        </div>
                    </div>
                    
                    {
                        commentList.length>0?(commentList.map((item,index)=>{
                            return (
                                <div className="reply" key={index}>
                                    <div className="level1top">
                                        <div className="left">
                                            {
                                                item['imageUrl']===undefined || item['imageUrl'] ==="" ? (<Tx width=".3rem" height=".3rem"/>)
                                                : <img alt="" className="img" src={item['imageUrl'] } />
                                            }
                                            <p>{item.nickName}</p>
                                            <p>{moment(item.addTime).format("YYYY-MM-DD HH:mm")}</p>
                                        </div>
                                        <div className="fingerEye">
                                            <div className="fingerNice">
                                                <div onClick={()=>{this.commentLike(item.id,item.commentGiveStatus === "1",detailData.id)}}>
                                                    {
                                                        item.commentGiveStatus === "1"?(<Dzs className="curserP" width=".15rem" height=".15rem" />):
                                                        (<Dzb className="curserP" width=".15rem" height=".15rem" />)
                                                    }
                                                </div>
                                                
                                            </div>
                                            <p className="fingerNum">{item.commentGiveCount}</p>
                                            <div className="eyePoto" onClick={()=>{this.focusText(item.id,item.nickName)}}>
                                                <Message className="curserP" width=".15rem" height=".15rem" />
                                            </div>
                                            <p className="eyeNum">{item.replyCount}</p>
                                        </div>
                                    </div>
                                    <div className="replyContain">
                                        <div className="comment1">{item.commentContent}</div>
                                        {
                                            item.LevelList1.length>0?(item.LevelList1.map((item2,index)=>{
                                                if(index<3){
                                                    return (<Reply data={item2} key={index} focusText={(name)=>this.focusText(item.id,name)}
                                                    callBack={(msg)=>{message.success(msg);this.getCommentList(detailData.id)}}/>)
                                                }else if(index===3){
                                                    return (
                                                    <div key={index} className="seeDetail">
                                                        <div className="showAllDiv" onClick={()=>this.showAllComment(true,item.id)} style={{display:replySts[item.id]?"none":"flex",cursor:"pointer",lineHeight:".4rem"}}>查看详情>></div>
                                                        <Reply data={item2} displayIs={replySts[item.id]?"flex":"none"}  focusText={(name)=>this.focusText(item.id,name)}
                                                            callBack={(msg)=>{message.success(msg);this.getCommentList(detailData.id)}}/>
                                                        {
                                                            index === item.LevelList1.length-1?(<div style={{display:replySts[item.id]?"flex":"none",cursor:"pointer",lineHeight:".4rem"}} onClick={()=>this.showAllComment(false,item.id)}>收起</div>):null
                                                        }
                                                    </div>)
                                                }else if(index === item.LevelList1.length-1){
                                                    return (<div key={index}><Reply data={item2}  displayIs={replySts[item.id]?"flex":"none"} focusText={(name)=>this.focusText(item.id,name)}
                                                    callBack={(msg)=>{message.success(msg);this.getCommentList(detailData.id)}}/>
                                                    <div style={{display:replySts[item.id]?"flex":"none",cursor:"pointer",lineHeight:".4rem"}} onClick={()=>this.showAllComment(false,item.id)}>收起</div></div>)
                                                }else{
                                                    return (<Reply data={item2} displayIs={replySts[item.id]?"flex":"none"} key={index} focusText={(name)=>this.focusText(item.id,name)}
                                                    callBack={(msg)=>{message.success(msg);this.getCommentList(detailData.id)}}/>)
                                                }
                                                
                                            })):(null)
                                        }
                                    </div>
                                </div>
                            )
                        })):(<div className="reply">暂无评论</div>)
                    }
                </div>
                <div className={showfoot?"detailFootA":"detailFoot"} >
                    <div className="left">
                        <input type="text" placeholder="欢迎留下你的评论" className="footInput" onFocus={()=>{this.commentRef.focus()}}/>
                    </div>
                    <div className="right">
                        {
                            sc? (<Scs className="curserP" width=".24rem" height=".24rem"></Scs>) :
                             (<Sc className="curserP" width=".24rem" height=".24rem"></Sc>)
                        }
                        <p className="num">{scNum}</p>
                        {
                            dz? (<Dzs className="curserP" width=".24rem" height=".24rem" />) : 
                            (<Dzb className="curserP" width=".24rem" height=".24rem" />) 
                        }
                        <p className="PPP">分享至</p>
                        <div className="fx" onClick={() => this.share("wechat")}>
                            <WeixinD width=".24rem" height=".24rem" />
                            <p>微信朋友</p>
                        </div>
                        <div className="fx" onClick={() => this.share("qq")}>
                            <Qqdark width=".24rem" height=".24rem"/>
                            <p>QQ好友</p>
                        </div>
                        <div onClick={()=>{this.toTop()}} style={{cursor:"pointer"}}>
                            <Totop width=".24rem" height=".24rem" />
                        </div>
                    </div>
                </div>

                <Modal 
                    visible={this.state.showQRCode}
                    footer={null}
                    onCancel={() => this.setState({ showQRCode: false })}
                >
                    <div className="shareQRCode">
                        <p className="codeTxt">扫码分享到微信</p>
                        <QRCode
                            value={"https://www.baidu.com"}
                            size={200}
                            fgColor="#000000" 
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default NewsDetail