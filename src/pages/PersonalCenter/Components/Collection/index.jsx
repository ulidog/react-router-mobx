import React,{Component} from 'react'

import {get} from 'utils/request'
import {myCollection} from 'utils/api'
import InfoItem from 'components/InfoItem'
import './index.scss'

class Collection extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataList: [],
        }
    }
    componentDidMount(){
        this.initData()
    }
    initData = async () => {
        await get({data:{},url:myCollection}).then((result)=>{
            if (result.code === 0) {
                this.setState({dataList:result.data.records})
            }
        })
    }
    cancelAll = () => {

    }
    render(){
        const {dataList} = {...this.state}
        return(
            <div className="collection">
                <div className="title">
                    <div>我的收藏</div>
                    {/* <p onClick={this.cancelAll}>全部取消</p> */}
                </div>
                <div className="contain">
                    {
                        dataList.length>0?(dataList.map((item,index)=>{
                            return (<InfoItem data={item} key={index} cancel={true} callBack={this.initData}/>)
                        })):(
                            <div className="nocollect">
                                <img alt=""  src={require("images/img/nocollect.png")} />
                                <div className="tips">还没有收藏哦</div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Collection