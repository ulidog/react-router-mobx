import React,{Component} from 'react'
import {withRouter } from 'react-router-dom'
import Search from "images/icon/Search"
import './index.scss'
class SearchPanl extends Component{
    
    toSearch = () => {
        this.props.history.push(`/search/${this.searchRef.value || "N"}`)
    }
    render() {
        return(
            <div className="search-small">
                <div className="searchBar">
                    <input ref={(el)=>this.searchRef=el} type="text" className="searchInput" placeholder="搜索你感兴趣的内容" />
                    <div className="searchIcon" onClick={()=>{this.toSearch()}}>
                        <Search  width="25px" height="25px"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchPanl)