import React from 'react';
//import { Link } from 'react-router-dom';

import HomePage from 'pages/HomePage'
import FootComp from 'components/FootComp';
import HeadComp from 'components/HeadComp'
import SearchPanl from 'components/SearchPanl'
import "./index.scss";

class Home extends React.Component {
    render() {
        //const dd = document.documentElement.style.fontSize
        return (
            <div className="home">
                <HeadComp />
                <SearchPanl />
                <HomePage />
                <FootComp />
            </div>
        );
    }
}

export default Home;