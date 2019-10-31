import React from 'react'
import HeadComp from 'components/HeadComp'
import FootComp from 'components/FootComp';
import './index.scss'
class About extends React.Component {
    render() {
        return (
            <div className="about">
                <HeadComp />
                <div className="part1">
                    <div className="left">
                        <p>风雨里同路，类风湿互助</p>
                        <p>为类风湿患者提供交流、帮助平台</p>
                        <div className="links">
                        
                            <img src={require('images/img/ios_s_download.png')}   alt="IOS"/>
                            <a href="https://download.hzmra.com/app_release.apk">
                                <img src={require('images/img/Android_s_download.png')}   alt="安卓"/>
                            </a>
                        </div>
                    </div>
                    <div className="right">
                        <img src={require('images/img/img.png')} className="image" alt="风雨里同路，类风湿互助"/>
                    </div>
                </div>
                <div className="part2">
                    <div className="left">
                        <div>
                            <img src={require('images/img/img1.png')} className="image" alt="健康资讯"/>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            健康资讯
                        </div>
                        <div>
                            <p className="big">类风湿强直文章资讯</p>
                            <p className="small">由平台发布专业类风湿强直文章让用户获取更科学更专业知识</p>
                        </div>
                        <div>
                            <p className="big">真实治疗案例，重找信心</p>
                            <p className="small">全球类风湿强直患者真实案例，给你更多有效参考</p>
                        </div>
                    </div>
                </div>
                <div className="part3">
                    <div className="left">
                        <div className="leftLeft">
                            <div>
                                好友群组
                            </div>
                            <div>
                                <p className="big">加入群组</p>
                                <p className="small">加入群组一起聊聊患病心路，相互扶持，交流经验</p>
                            </div>
                            <div>
                                <p className="big">添加好友</p>
                                <p className="small">可根据距离添加好友，获取更真实的反馈</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <img src={require('images/img/img2.png')} className="image" alt="好友群组"/>
                    </div>
                </div>
                <div className="part2">
                    <div className="left">
                        <div>
                            <img src={require('images/img/img3.png')} className="image" alt="互帮互助"/>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            互帮互助
                        </div>
                        <div>
                            <p className="big">好友助力，获救助金</p>
                            <p className="small">平台用户可申请开通助力，分享链接获得好友助力，即可由平台发送救助金抵扣药费，上不封顶！</p>
                        </div>
                        <div>
                            <p className="big">邀请好友获现金</p>
                            <p className="small">邀请返现功能，平台成员邀请好友注册平台成功，获得可激活提现200元爱心券，上不封顶，多邀多得！</p>
                        </div>
                    </div>
                </div>
                <div className="part3">
                    <div className="left">
                        <div className="leftLeft">
                            <div>
                                预约挂号
                            </div>
                            <div>
                                <p className="big">挂号就诊更轻松</p>
                                <p className="small">根据用户定位推荐就诊医院就诊，手机挂号更快捷</p>
                            </div>
                            <div>
                                <p className="big">挂号状态更清晰</p>
                                <p className="small">挂号状态手机时时查看，就诊地点、就诊时间更清晰</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <img src={require('images/img/img4.png')} className="image" alt="预约挂号"/>
                    </div>
                </div>
                <div className="part6">
                    <div className="left">
                        <div>
                            <img src={require('images/img/fenzu2.png')} className="image" alt="互助"/>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            关于我们
                        </div>
                        <div>
                            <p className="big">类风湿互助系统介绍</p>
                        </div>
                        <div>
                            <p className="big">类风湿互助是一个类风湿强直患者的交流社区，
社区患者互相鼓励支持，聚集信心，重燃希望，
共同面对类风湿和强直。</p>
                        </div>
                    </div>
                </div>
                <FootComp/>
            </div>
        )
    }
}

export default About;