import React, { Component } from 'react';
import { inject,observer } from 'mobx-react';
import PersonSelect from './personSelect'
import LeftPop from 'components/LeftPop'
import InvaiteTip from './InvaiteTip'
import UserAgreement from './UserAgreement'
import Login from 'pages/Login'
@inject('LoginStore')
@observer
class HeadInfo extends Component {
    render(){
        return(
            <div className="pageF">
                <Login isShow={this.props.LoginStore.isShow} />
                <InvaiteTip isShow={this.props.LoginStore.showInvaite}/>
                <UserAgreement isShow={this.props.LoginStore.userAgreement} />
                <PersonSelect isShow={this.props.LoginStore.personState}/>
                <LeftPop />
                
                <div className="children">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default HeadInfo