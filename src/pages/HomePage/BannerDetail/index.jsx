import React,{Component} from "react"
import {inject,observer } from 'mobx-react';
import HeadComp from 'components/HeadComp'
import moment from 'moment'
import "./index.scss"
@inject('HomeStore')
@observer
class BannerDetail extends Component{
    render() {
        let detail = this.props.HomeStore.bannerDetail
        const editPage = "<html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\"><style>img{max-width: 100%; width:100%; height:auto;}*{margin:0px;}</style><style>video{max-width: 100%; width:100%; height:auto;}*{margin:0px;}</style></head><body>" + detail.editPage + "</body></html>"
        return (
            <div className="bannerDetail">
                <HeadComp />
                <div className="top">
                    <div>{detail.bannerName}</div>
                    <div className="time">{moment(detail.addTime).format("YYYY-MM-DD HH:mm")}</div>
                </div>
                <div className="infoDes" dangerouslySetInnerHTML={{
                        __html: editPage
                        }} />
            </div>
        )
    }
}

export default BannerDetail;