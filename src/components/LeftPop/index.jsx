import React,{Component} from 'react'

import Kf2 from 'images/icon/Kf'
import KfP from "images/icon/Kf_poto"
import Code from "images/icon/Code"
import './index.scss'

class LeftPop extends Component{
    constructor(props){
        super(props)
        this.state = {
            kf: false,
            ewm: false,
        }
    }
    leftKf = (sts) => {
        this.setState({kf:sts})
        const time = setTimeout(()=>{
            this.setState({kf:!sts})
            clearTimeout(time)
        },10000)
    }
    leftEwm = (sts) => {
        this.setState({ewm:sts})
        const time = setTimeout(()=>{
            this.setState({ewm:!sts})
            clearTimeout(time)
        },10000)
    }
    render(){
        const {kf,ewm} = {...this.state}
        return(
            <div className="leftPop">
                <div className="kf">
                    <a className="left" style={{visibility: kf? "visible":"hidden"}}
                    href="https://kefu.easemob.com/webim/im.html?configId=3081e110-6ede-448a-80d7-3d49d9bc5398">
                        <KfP  width=".73rem" height=".73rem" />
                        <p>咨询客服</p>
                    </a>
                    {/* onMouseOut={()=>this.leftKf(false)} */}
                    <a className="right" onMouseOver={()=>this.leftKf(true)}
                    href="https://kefu.easemob.com/webim/im.html?configId=3081e110-6ede-448a-80d7-3d49d9bc5398" >
                        <Kf2 width=".3rem" height=".3rem" />
                    </a>
                </div>
                <div className="kf">
                    <div className="left" style={{visibility: ewm? "visible":"hidden"}}>
                        <KfP  width=".73rem" height=".73rem" />
                        <p>扫我下载App</p>
                    </div>
                    {/* onMouseOut={()=>this.leftEwm(false)} */}
                    <div className="right" onMouseOver={()=>this.leftEwm(true)} >
                        <Code width=".3rem" height=".3rem" />
                    </div>
                </div>
            </div>
        )
    }
}

export default LeftPop