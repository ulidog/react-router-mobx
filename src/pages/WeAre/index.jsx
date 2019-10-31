import React,{Component} from "react" 
import {inject,observer } from 'mobx-react';
import HeadComp from 'components/HeadComp'
import FootComp from 'components/FootComp';
import {banner} from "utils/api"
import {post} from "utils/request"
//import { Carousel } from 'antd';
import "./index.scss"

@inject('HomeStore')
@observer
class WeAre extends Component{

    constructor(props){
        super(props);
        this.state = {
            banner:[],
        }
    }
    componentDidMount(){
        this.getBanner()
    }
    getBanner = async () => {
        await post({data:{pageNum:1,pageSize:3},url:banner}).then((result)=>{
            if (result.code === 0) {
                this.setState({banner:result.data.records})
            }
        })
        
    }
    toBannerDetail = (page,url)=>{
        if(page  === undefined || page === ""){
            window.open(url)
        }else{
            this.props.HomeStore.bannerDetailO(page)
            this.props.history.push("/banner/detail")
        }
    }
    render(){
        //const {banner} = {...this.state}
        return(
            <div className="weare">
                <HeadComp />
                {/* <div className="lunbo">
                    <Carousel autoplay>
                        {
                            banner.length>0?(banner.map((item,index)=>{
                                return(
                                    <div onClick={()=>this.toBannerDetail(item.editPage,item.bannerUrl)} 
                                    className="banner" key={index}>
                                        <img alt="" src={item["bannerImg"]} />
                                        <div className="bannerTip2" >{item["bannerName"]}</div>
                                    </div>
                                )
                            })):null
                        }
                    </Carousel>
                </div> */}
                <div className="contain">
                    <div className="title">
                        <div className="team">团队简介</div>
                        <div>TEAM  INTRODUCTION</div>
                    </div>
                    <div className="teamDes">
                        胡氏健康信息科技（深圳）有限公司位于创新之都深圳特区，由知名类风湿、强直治疗专家胡泽民先生创立。
                        胡泽民先生早年身患类风湿疾病瘫痪在床，经过多年研究中医古籍，以身试药，终于治好了自己的类风湿病。
                        他深知类风湿病人的痛苦，因此成立之初胡氏健康就致力于利用中医治疗类风湿和强直疾病，解除患者痛苦，
                        并利用现代高科技改良中医，结合互联网信息技术，将胡氏疗法和中医推向全球。在胡泽民先生带领下，
                        目前旗下医疗机构已经扩展到美国、新加坡等海外国家，成功治愈类风湿和强直患者数十万人。
                    </div>
                    <img src={require('images/img/pic1.png')} className="image1" alt=""/>
                    <div className="title" style={{borderTop:"2px solid rgba(222,222,222,1)"}}>
                        <div className="team">团队价值观</div>
                        <div>TEAM  VALUES</div>
                    </div>
                    <div className="typeLi">
                        <div className="left">正直</div>
                        <div className="right">诚实，敢说真话；善良，与人为善；有职业操守，以用户利益为第一。</div>
                    </div>
                    <div className="typeLi">
                        <div className="left">责任</div>
                        <div className="right">主动发现并解决问题，不推卸责任，勇挑重担。</div>
                    </div>
                    <div className="typeLi">
                        <div className="left">激情</div>
                        <div className="right">保持对行业及岗位工作的浓厚兴趣，跟随内心的选择。</div>
                    </div>
                    <div className="typeLi">
                        <div className="left">学习</div>
                        <div className="right">保持好奇心和空杯心态，积极思考，适应変化。</div>
                    </div>
                    <img src={require('images/img/pic2.png')} className="image1" style={{marginBottom:0}} alt=""/>
                </div>
                <FootComp/>
            </div>
        )
    }
}

export default WeAre