import React,{Component} from 'react'

import Android2 from 'images/icon/Android2'
import Ios2 from 'images/icon/Ios2'
import './index.scss'
class FootComp extends Component {
    render() {
        return (
            <div className="footComp">
                <div className="head">
                    <div className="rela">
                        <div className="title">联系我们</div>
                        <div className="phone">专家直通热线：4000-146-123</div>
                        <div>微信公众号：类风湿互助</div>
                    </div>
                    <div className="appLink">
                        <div className="linkIn">
                            <div className="title">App下载</div>
                            <div className="title2">爱心互助，成就健康</div>
                            <div>
                                <a href="https://download.hzmra.com/app_release.apk">
                                    <Android2 width={"1.1rem"} height={".35rem"}/>
                                </a>
                                <Ios2 width={"1.1rem"} height={".35rem"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="foot">
                    <p>湘备14018219号-1</p>
                    <p>© 2017~2019 胡氏健康信息科技（深圳）有限公司</p>
                </div>
            </div>
        )
    }
}

export default FootComp;