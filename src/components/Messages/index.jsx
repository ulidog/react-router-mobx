import React,{Component} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'
import "./index.scss"

class Messages extends Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        const data = this.props.data
        return(
            <div className="message">
                <div className="left">
                    <div>{data.title}</div>
                    <div>{data.content}</div>
                </div>
                <div className="right">
                    <div>{moment(data.updateTime).format("YYYY-MM-DD HH:mm")}</div>
                    {/* <p>查看详情 ></p> */}
                </div>
            </div>
        )
    }
}

const defaultProps = {
    data: {}
}
Messages.defaultProps = defaultProps

Messages.propTypes = {
    data: PropTypes.object,
};
export default Messages