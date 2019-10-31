import React, { Component } from 'react';
import { Breadcrumb, } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
//具体导航的名称
const breadcrumbNameMap = {
    '/head': '首页',
    '/head/home': 'home页面',
    '/head/foo': 'foo页面',
};
class BreadcrumbCustom extends Component {
    //利用PropTypes记住所跳转每个页面的位置 
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: null
        }
    }
    getPath() {
        const {pathSnippets,} = {...this.state}
        console.log(this.props)
        this.setState({
            // 对路径进行切分，存放到this.state.pathSnippets中.pathname.split('/').filter(i => i)
            pathSnippets: this.props.location,
            //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
            extraBreadcrumbItems: pathSnippets.map((_, index) => {
                const url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
                console.log('url', url)
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}>
                            {breadcrumbNameMap[url]}
                        </Link>
                    </Breadcrumb.Item>
                );
            })
        })
    }
 
    componentWillMount() {
	//首次加载的时候调用，形成面包屑
        this.getPath();
    }
    componentWillReceiveProps(){
	//任何子页面发生改变，均可调用，完成路径切分以及形成面包屑
        this.getPath();
    }
    render() {
        return (
 
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
		            {/* //将形成的面包屑引用进来，即可完成如图所示的动画效果 */}
                    {this.state.extraBreadcrumbItems}
                </Breadcrumb> 
            </span>
        )
    }
}
export default BreadcrumbCustom;