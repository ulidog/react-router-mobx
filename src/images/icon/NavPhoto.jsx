import React, { Component } from 'react'

class NavPhoto extends Component {
    render() {
        return (
            <div style={{ display: "flex", alignItems:"center" }}>
                <svg t="1571969916718" className={this.props.className} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3367" width={this.props.width} height={this.props.height}><path d="M513.9 30.9c-268.4 0-486 217.6-486 486s217.6 486 486 486 486-217.6 486-486-217.6-486-486-486zM254.7 782.3" fill="#A8E9D5" p-id="3368"></path><path d="M513.9 30.9c-268.4 0-486 217.6-486 486s217.6 486 486 486 486-217.6 486-486-217.6-486-486-486z m-3.1 170.3c80.9 0 146.4 65.6 146.4 146.4 0 80.9-65.6 146.4-146.4 146.4s-146.4-65.6-146.4-146.4c0-80.8 65.5-146.4 146.4-146.4zM254.7 782.3c-1.5-150.1 71.9-243.2 163.8-279.8L512.9 660l99.5-153.9C701.1 545 771.6 637 773 782.4c-163.1 64.7-335 69.4-518.3-0.1z m0 0" fill="#FFFFFF" p-id="3369"></path></svg>
            </div>
        )
    }
}

export default NavPhoto;