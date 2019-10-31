import React from 'react'
import { BrowserRouter as Router, Route ,Switch,Redirect} from 'react-router-dom'
//import { createBrowserHistory } from "history";

import Home from 'pages/Home';
import About from 'pages/About';
import WeAre from 'pages/WeAre';
import Search from 'components/Search'
import HeadInfo from 'components/HeadInfo'
import PersonalCenter from 'pages/PersonalCenter'
import Collection from 'pages/PersonalCenter/Components/Collection'
import Msg from 'pages/PersonalCenter/Components/Msg'
import Setting from 'pages/PersonalCenter/Components/Setting'
import Personer from 'pages/PersonalCenter/Components/Personer'
import NewsDetail from 'pages/NewsDetail'
import BannerDetail from 'pages/HomePage/BannerDetail'
import Register from 'pages/H5/Register'
import PersonCenterH5 from 'pages/H5/PersonCenterWap'
import LoginWap from 'pages/H5/PersonCenterWap/LoginWap'
import PersonWap from 'pages/H5/PersonCenterWap/PersonWap'
import SettingWap from 'pages/H5/PersonCenterWap/SettingWap'
import NickName from 'pages/H5/PersonCenterWap/PersonWap/NickName'
import Psw from 'pages/H5/PersonCenterWap/PersonWap/Psw'
import Code from 'pages/H5/PersonCenterWap/PersonWap/Code'
import Auth from 'pages/H5/PersonCenterWap/PersonWap/Auth' 
import "./index.scss";
//const history = createBrowserHistory();
const Routes = () => (
    <Router>
        <div className="routes">
            <Switch>
                <Route path="/register/:invaite" component={Register}/>
                <HeadInfo>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/app.html" component={About}/>
                        <Route exact path="/weare" component={WeAre}/>
                        <Route path="/personal" render={({history,location,match})=>(
                            <PersonalCenter history={history} location={location} match={match}>
                                <Switch>
                                    {match.path === location.pathname ? (<Redirect to={`${match.url}/p`}/>) : ("")}
                                    <Route path="/personal/p" component={Personer}/>
                                    <Route path="/personal/collection" component={Collection}/>
                                    <Route path="/personal/msg" component={Msg}/>
                                    <Route path="/personal/setting" component={Setting}/>
                                </Switch>
                            </PersonalCenter>
                        )}/>
                        <Route path="/search/:val" component={Search}/>
                        <Route path="/news/detail/:id" component={NewsDetail}/>
                        <Route path="/banner/detail" component={BannerDetail}/>
                        <Route path="/wap/person"  render={({history,location,match})=>(
                            <PersonCenterH5 history={history} location={location} match={match}>
                                <Switch>
                                    <Route path="/wap/person/login"  component={LoginWap}/>
                                    <Route path="/wap/person/my"  component={PersonWap}/>
                                    <Route path="/wap/person/collect"  component={Collection}/>
                                    <Route path="/wap/person/msg"  component={Msg}/>
                                    <Route path="/wap/person/setting"  component={SettingWap}/>
                                    <Route path="/wap/person/psw"  component={Psw}/>
                                    <Route path="/wap/person/name/:nick"  component={NickName}/>
                                    <Route path="/wap/person/auth/:sts"  component={Auth}/>
                                    <Route path="/wap/person/code"  component={Code}/>
                                </Switch>
                            </PersonCenterH5>
                        )}/>
                        
                    </Switch>
                </HeadInfo>
            </Switch>
        </div>
    </Router>
)

export default Routes;