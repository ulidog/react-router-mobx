import React,{Component} from 'react';
import Routes from "routes/index"
import './App.scss';
import { observer,inject } from 'mobx-react';

@inject('LoginStore')
@observer
class  App extends Component { 

  constructor(props) {
    super(props);
    window.onresize = this.setHtmlFontSize;
    this.setHtmlFontSize();
    if(localStorage.getItem("token"))
    this.props.LoginStore.getDataFromLocalStorage();
  }

  componentDidMount(){
    //在页面刷新时将mobx里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      this.props.LoginStore.setDataFromLocalStorage();
    })
  }
  setHtmlFontSize = () =>  {
    let html = document.documentElement || document.body;
    //let height = html.clientHeight;
    let bodyWidth = html.clientWidth;
    let bodyHeight = html.clientHeight
    //let fontSize = 6.25
    if (bodyWidth > 1200) { //(1200/1920)
      //bodyWidth = 1200;
      html.style.fontSize = "100px";
    } else if (bodyWidth > 750 && bodyWidth < 1200) {
      bodyWidth = html.clientWidth //* (1200 / 1920)
      html.style.fontSize = bodyWidth / 12 + "px";
    }else{
      html.style.fontSize = bodyWidth / 7.8 + "px";
    }
    
    document.querySelector("#root").style.height = bodyHeight + "px";
    document.querySelector("#root").style.width = bodyWidth + "px";
    document.querySelector("#root").style.paddingLeft = (html.clientWidth - bodyWidth) / 2 + "px";
    //将根字体和根高放到store
    //this.props.changeRootFont(fontSize, height);


  }

  render(){
    return (
      <div className="App">
          <Routes />
        </div>
    );
  }
}

export default App;
