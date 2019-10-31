import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import "./index.scss"


class Loading extends Component {

    render(){
        const {isShow} = {...this.props}
        return (
            <div className={isShow ? "loading" : "loadingNone"}>
                <Icon type="redo" className="iconImage"/>
            </div>
        )
    }
}

const defaultProps  = {
    isShow : false,
}

Loading.defaultProps = defaultProps;

Loading.propTypes = {
    isShow: PropTypes.bool,
};
export default Loading