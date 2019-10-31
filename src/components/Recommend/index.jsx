import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'
import {recomment} from "utils/api"
import {post} from "utils/request"
import Next from "images/icon/Next"
import moment from 'moment'
import "./index.scss"
import { message } from 'antd';
let timer = null;
class Recommend extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            recommentList : [],
            tempS: [],
            curr:0
        }
    }

    componentDidMount() {
        this.recommentList()
    }
    componentWillUnmount(){
       this.pase()
    }
    recommentList = async ()=>{
        await post({data:{pageNum:1,pageSize:9},url:recomment}).then((result)=>{
            if (result.code === 0) {
                const list = result.data.records
                let tempL = []
                let tempS = []
                for(let i=0;i<list.length;i++){
                    tempL.push(list[i])
                    if(tempL.length === 3){
                        tempS.push(tempL)
                        tempL = []
                    }
                }
                this.setState({tempS,recommentList:tempS[0]},this.start())
                
            }
        }).catch(error=>message.error(error))
    }
    toNext = ()=> {
        const {curr,tempS} = {...this.state}
        this.setState({curr:curr===2 ? 0:curr+1,recommentList:curr===2 ? tempS[0]:tempS[curr+1]})
    }
    toPrevious = ()=>{
        const {curr,tempS} = {...this.state}
        this.setState({curr:curr===0 ? 2:curr-1,recommentList:curr===0 ? tempS[2]:tempS[curr-1]})
    }
    toDetail = (id)=>{
        this.props.history.push(`/news/detail/${id}`)
    }
    pase = () => {
        clearInterval(timer)
    }
    start = () => {
        timer = setInterval(()=>{
            this.toNext() 
        },5000)
    }
    render() {
        const {recommentList }= {...this.state}
        return (
            <div className="recommend" onMouseOver={this.pase} onMouseOut={this.start}>
                <div className="previous" onClick={this.toPrevious}><Next width=".4rem" height=".4rem" /></div>
                <div className="nextPage" onClick={this.toNext}><Next width=".4rem" height=".4rem" /></div>
                {
                    recommentList.length>0?(
                        recommentList.map((item,index)=>{
                            return (
                                <div className="recommentItem" key={index} onClick={()=>{this.toDetail(item.id)}}>
                                    {item.coverImg !== undefined ? (<img src={item.coverImg} alt="" className="infoImg"/>) : 
                                    (<div className="infoImg" ></div>)}
                                    <div className="infoContain" >
                                        <div className="infoTitle" >
                                            <p >{item.newsTitle}</p>
                                        </div>
                                        <div className="infoDes" dangerouslySetInnerHTML={{
                                        __html: item.newsDescribe
                                        }} />
                                        <div className="infoFoot">
                                            <p className="footName" >{item.author}</p>
                                            <p className="footName" >{moment(item.addTime).format("YYYY-MM-DD HH:mm")}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ):(
                        null
                    )
                }
            </div>
        );
    }
}

const defaultProps  = {
    data : {},
    cancel:false,
    callBack:()=>{}
}

Recommend.defaultProps = defaultProps;

Recommend.propTypes = {
    data: PropTypes.object,
    cancel:PropTypes.bool,
    callBack:PropTypes.func,
};

export default withRouter(Recommend)