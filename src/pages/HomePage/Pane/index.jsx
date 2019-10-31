import React,{Component} from 'react'
import InfoItem from 'components/InfoItem'
import PropTypes from 'prop-types';
import "./index.scss"
class Pane extends Component{

    render(){
        const data = this.props.newsItem
        return (
            <div className="pane">
                <div className="left">
                {data.length>0 ?(data.map((newsItem,newsIndex)=>{
                                return (<InfoItem data={newsItem} key={newsIndex} showTime={true}/>)
                            })):(`暂无信息`)
                }
                    
                </div>
                <div className="right">
                    <div className="top">
                        <div className="div1">帮助直达</div>
                        <div className="div2">疾病疑惑，贴心解答</div>
                        <a className="div3" href="https://kefu.easemob.com/webim/im.html?configId=3081e110-6ede-448a-80d7-3d49d9bc5398">我要咨询</a>
                    </div>
                    <div className="bottom">
                        <div className="div1"> 下载APP</div>
                        <div className="div1"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const defaultProps  = {
    newsItem : [],
}

Pane.defaultProps = defaultProps;

Pane.propTypes = {
    newsItem: PropTypes.array,
};

export default Pane;