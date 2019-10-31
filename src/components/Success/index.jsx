import React,{Component} from 'react'
import PropTypes from 'prop-types';
import './index.scss'
class Success extends Component {

    render() {
        const {msg,showSuccess} = {...this.props}
        return(
            <div className="success" style={{display:showSuccess?"flex":"none"}}>
                {/* <div className="title">{title}</div> */}
                <div className="msg">{msg}</div>
            </div>
        )
    }
}

const defaultProps  = {
    showSuccess : false,
    msg: ""
}

Success.defaultProps = defaultProps;

Success.propTypes = {
    showSuccess: PropTypes.bool,
    msg: PropTypes.string,
};

export default Success