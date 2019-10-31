import React,{Component} from 'react'
import {withRouter} from "react-router-dom"
import SearchIcon from 'images/icon/Search'
import { Pagination } from 'antd';
import {search} from "utils/api"
import {post} from "utils/request"
import HeadComp from 'components/HeadComp'
import './index.scss'
import InfoItem from '../InfoItem/index'

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchList : [],  
            total: 0,  
            page:1,
            pageSize:3,
        }
    }
    componentDidMount(){
        let searchVal = this.props.match.params.val
        if(searchVal !== "N"){
            searchVal = searchVal === undefined? "" : searchVal
            this.searchResult({searchVal})
        }
    }
    searchResult = async ({searchVal="",page=1,pageSize=3}) => {
        //if(this.searchR.value === "") return false;
        if(this.searchR.value === ""){
            this.searchR.value = searchVal=== undefined?"" :searchVal;
        }else{
            searchVal =  this.searchR.value
        }
        await post({data:{content:searchVal,pageNum:page,pageSize},url:search}).then((result)=>{
            if (result.code === 0) {
                this.setState({page,pageSize,total:result.data.total,searchList:result.data.records})
            }
        })
    }
    render(){
        const {searchList,total,page,pageSize} = {...this.state}
        return(
            <div className="search">
                <HeadComp />
                <div className="derict">
                    <p style={{cursor:"pointer"}} onClick={()=>{this.props.history.push("/")}}>健康资讯></p><p>搜索</p>
                </div>
                <div className="searchC">
                    <div className="closeIcon" onClick={()=>{this.props.history.push("/")}}>
                        <div className="closeD" ></div>
                    </div>
                    <div className="searchPanl">
                        <input ref={(el)=>{this.searchR=el}}  placeholder="搜索你感兴趣的内容" type="text" className="searchInpit"/>
                        <div className="searchIcon" onClick={()=>this.searchResult({})}>
                            <SearchIcon width={".2rem"} height=".2rem" />
                        </div>
                    </div>
                    <div className="resultPanl">
                        <p style={{margin:".2rem 0 .1rem 0"}}>{total}条搜索结果</p>
                        {
                            searchList.length>0 ? (
                                searchList.map((item,index)=>{
                                    return (
                                        <InfoItem data={item} key={index} />
                                    )
                                })
                            ):(null)
                        } 
                        <div className="forpage" style={{margin:".2rem 0"}}>
                            <Pagination hideOnSinglePage={true} current={page} onChange={(page, pageSize)=>this.searchResult({page, pageSize})} pageSize={pageSize} total={total} />
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default withRouter(Search)