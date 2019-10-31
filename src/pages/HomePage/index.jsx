import React, { Component} from 'react';
import { Tabs,Pagination } from 'antd';
import {withRouter } from 'react-router-dom'
import {inject,observer } from 'mobx-react';
import Pane from './Pane'
//import Kf2 from 'images/icon/Kf2'
import {newsType,newsList,banner} from "utils/api"
import {get,post} from "utils/request"
//import Fenzu from "images/icon/Fenzu"
import Search from "images/icon/Search"
import Recommend from "components/Recommend"
import { Carousel } from 'antd';
import "./index.scss";

const { TabPane } = Tabs;
@inject('HomeStore')
@observer
class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeList: [],
            newsList: [],
            activeType: "",
            page:1,
            pageSize:10,
            total:0,
            currIndex:0,
            bannerT:{},
            banner:[],
        }
    }
    componentDidMount(){
        this.initNewsType()
        this.getBanner()
    }
    getBanner = async () => {
        await post({data:{pageNum:1,pageSize:3},url:banner}).then((result)=>{
            if (result.code === 0) {
                this.setState({banner:result.data.records})
            }
        })
        
    }
    toBannerDetail = (page,url,item)=>{
        if(page  === undefined || page === ""){
            window.open(url)
        }else{
            this.props.HomeStore.bannerDetailO(item)
            this.props.history.push("/banner/detail")
        }
    }
    initNewsType = async () => {
        await get({data:{},url:newsType}).then((result)=>{
            if (result.code === 0) {
                const typeName = result.data[0].typeName;
                this.setState({typeList:result.data,activeType:typeName},()=>{this.getNewsList(result.data[0].typeName)})
            }
        })
    }
    getNewsList = async (type,page=this.state.page,pageSize=this.state.pageSize)=>{
        await get({data:{typeName:type,pageNum:page,pageSize},url:newsList}).then((result)=>{
            if (result.code === 0) {
                this.setState({page,pageSize,total:result.data.total,newsList:result.data.records,activeType:type})
            }
        })
    }
    changeTab = (activeKey)=> {
        this.setState({page:1,pageSize:10},()=>this.getNewsList(activeKey))
        
    }
    toSearch = () => {
        this.props.history.push(`/search/${"N"}`)
    }
    render() {
        const {typeList,newsList,activeType,total,page,pageSize,banner} = {...this.state}
        return (
            <div className="homeContain">
                <div  className="lunbo" >
                    <Carousel autoplay>
                        {
                            banner.length>0?(banner.map((item,index)=>{
                                return(
                                    <div onClick={()=>this.toBannerDetail(item.editPage,item.bannerUrl,item)} 
                                    className="banner" key={index}>
                                        <img alt="" src={item["bannerImg"]} />
                                        <div className="bannerTip2" >{item["bannerName"]}</div>
                                    </div>
                                )
                            })):null
                        }
                    </Carousel>
                </div>
                <Recommend />
                <div className="newsList">
                    <div className="searchBar" onClick={()=>{this.toSearch()}}>
                        {/* <input ref={(el)=>this.searchRef=el} type="text" className="searchInput" placeholder="搜索你感兴趣的内容" /> */}
                        <div className="searchIcon" >
                            <Search  width="25px" height="25px"/>
                        </div>
                        <div className="shousuo">搜索</div>
                    </div>
                    <Tabs defaultActiveKey={typeList.length>0?"" + typeList[0]["typeName"] : "0"} size="large" tabBarStyle={{
                        display:"flex",
                        alignItems:"center",
                        color:"rgba(153,153,153,1)",
                        fontSize:".24rem",
                        borderRadius:"5px",
                        border: "solid 0.01rem rgba(242,242,242,1)",
                        padding: ".1rem .6rem",
                        height:"1.2rem"
                        }} onChange={(activeKey)=>{this.changeTab(activeKey)}}>
                        {
                            typeList.length>0 ? (
                                typeList.map((item,index)=>{
                                    return activeType === item.typeName?(
                                        <TabPane tab={item.typeName} key={item.typeName}>
                                            <Pane newsItem={newsList}/>
                                        </TabPane>
                                    ):(
                                        <TabPane tab={item.typeName} key={item.typeName}>
                                            暂无{item.typeName}数据
                                        </TabPane>
                                    )
                                })
                            ):(<TabPane tab="类型" key="类型">
                                未获取到资讯类型
                            </TabPane>)
                        }
                    </Tabs>
                </div>
                <div className="forpage" style={{margin:".2rem 0"}}>
                    <Pagination hideOnSinglePage={true} current={page} onChange={(page, pageSize)=>this.getNewsList(activeType,page, pageSize)} pageSize={pageSize} total={total} />
                </div>
            </div>
        );
    }
}

export default withRouter(HomePage);