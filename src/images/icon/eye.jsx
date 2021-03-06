import React,{Component} from 'react'

class Eye extends Component {
    render(){
        return (
            <div style={{display:"inline",textAlign:"center"}}>
                <svg t="1570688602966" className={this.props.className} viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2781" width={this.props.width} height={this.props.height}>
                    <path fill={this.props.color} d="M1000.7 530.5l-62.3-56.9c18.3-23 31.5-44.9 38.7-63.6l0.6-1.9c0.3-0.9 0.8-1.9 0.9-2.8l1.2-6.7 0.3-2.3v-0.2c0-18.2-10.6-28.4-28.7-28.4-12.6 0-12.6 1.9-23.1 12.1 0 0-3.4 5.8-5.4 9.8l-4.7 6.7c-44.3 98.9-203 226.9-406.2 226.9-207 0-376.7-139.9-409-232.3l-4.4-9.9-3-4.8c-5.9-8.6-8.1-12.9-19-12.9-18.2 0-32.9 14.8-32.9 32.8 0 4.2 0.9 7.6 2 10.6 0.5 1.6 1.2 3.1 1.4 3.1 7.1 18.6 20.2 40.4 38.5 63.4l-62.5 57.3c-8.4 7.8-9 20.8-1.4 29.4 4 4.5 9.6 6.8 15.4 6.8 5 0 9.9-1.9 14-5.4l61.8-56.4c34.3 35.7 79.7 72.3 133.2 102.9l-44 71.9c-5.9 9.8-2.8 22.5 7 28.6 3.4 2 7.1 3 10.7 3 7 0 13.8-3.6 17.7-9.9l45.2-74.4c61.8 29.8 132.4 50.8 208.2 54.1V764c0 11.5 9.3 20.8 20.8 20.8s20.8-9.3 20.8-20.8v-83.1c75.7-3.3 146.4-24.2 208.2-54.1l45.2 74.4c3.9 6.4 10.7 9.9 17.7 9.9 3.7 0 7.5-0.9 10.7-3 9.8-5.9 12.9-18.8 7-28.6l-44-72.3c53.5-30.5 98.8-67 133.2-102.7l61.7 56.4c4 3.6 9 5.4 14 5.4 5.6 0 11.2-2.3 15.4-6.8 8.1-8.2 7.5-21.4-0.9-29z m0 0"  p-id="2782"></path>
                </svg>
            </div>
        )
    }
}

export default Eye;