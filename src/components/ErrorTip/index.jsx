import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./index.scss"


class ErrorTip extends Component {

    render(){
        const {isShow,msg} = {...this.props}
        return (
            <div className={isShow ? "errorTip" : "errorTipNone"}>
                <div className="msg">{msg}</div>
            </div>
        )
    }
}

const defaultProps  = {
    isShow : false,
    msg: "",
}

ErrorTip.defaultProps = defaultProps;

ErrorTip.propTypes = {
    isShow: PropTypes.bool,
    msg: PropTypes.string,
};
export default ErrorTip