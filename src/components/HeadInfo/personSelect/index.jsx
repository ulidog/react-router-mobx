import React, {Component} from 'react'
import {withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import './index.scss'
import { inject ,observer} from 'mobx-react';

@inject("LoginStore")
@observer
class PersonSelect extends Component{
    componentDidMount(){
        document.addEventListener("click",(e)=>this.selectListener(e),false)
    }
    selectListener = (e) => {
        let classList = e.target.classList[0]
        if(classList === undefined) {
            classList = e.target.parentElement.classList[0]
        }
        const inarea =  classList === "personSelect" || classList === "loginPoto" ||  classList === "userImg" ||  classList === "loginclass"
        if(inarea && localStorage.getItem('token') !==null){
            this.props.LoginStore.setPersonState(true);
        }else{
            this.props.LoginStore.setPersonState(false);
        }
        document.removeEventListener("click",()=>this.selectListener())
    }
    toPersoner = (url) => {
        this.props.history.push(url)
        this.props.LoginStore.setPersonState(false)
    }
    outLogin = ()=> {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userCount")
        this.props.LoginStore.setUserCount({})
        this.props.history.push("/")
    }
    render(){
        return (
            <div className={this.props.LoginStore.personState?"personSelect":"personSelectNone"} >
                <div className="contain">
                    <div className="toleft">
                        <div className="select" onClick={()=>{this.toPersoner("/personal/p")}}>{this.props.LoginStore.userCount.nickName}</div>
                        <div className="select" onClick={()=>{this.toPersoner("/personal/collection")}}>我的收藏</div>
                        <div className="select" onClick={()=>{this.toPersoner("/personal/msg")}}>消息中心</div>
                        <div className="select" onClick={()=>{this.toPersoner("/personal/setting")}}>设置</div>
                        <div className="select"  onClick={()=>{this.outLogin()}}>退出</div>
                    </div>
                </div>
            </div>
        )
    }
}

const defaultProps  = {
    isShow : false,
}

PersonSelect.defaultProps = defaultProps;

PersonSelect.propTypes = {
    isShow: PropTypes.bool,
}

export default withRouter(PersonSelect)