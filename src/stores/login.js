import { observable,action } from 'mobx';

class LoginStore {
    @observable isShow = false;
    @observable showInvaite = false;
    @observable userAgreement = false;
    @observable personState = false;
    @observable userCount = {}; 
    @observable checkImg = require("images/img/bg1.png");
    @observable toReload =false;
    @observable activeSts ={"a":true,"b":false,"c":false};
    @observable huanxinId = "";
    // {assistanceMoney: 0,faqsCount: 1,friendCount: 18,idcardState: 0,imageUrl: "",
    // inviteCode: "666666",money: -2000,nickName: "头号人物",payeeState: 0,payeeType: 1,phone: "13712345678",totalMoney: 1400}
    // 展示登陆
    @action showPop() {
        this.isShow = true;
    }
    //关闭登陆
    @action hidePop(){
        this.isShow = false;
    }
    //关闭登陆
     @action huanxinIdS (id){
        this.huanxinId = id;
    }
    //邀请码tip开关
    @action showInvaiteO(sts){
        this.showInvaite = sts;
    }
    //head切换
    @action activeStsO(type){
        let temp = {}
        for(let key in this.activeSts){
            if(key === type){
                temp[key] = true;
            }else{temp[key] = false;}
        }
        this.activeSts = temp;
    }
    //用户协议开关
    @action userAgreementO(sts){
        this.userAgreement = sts;
    }
    //个人中心选择框
    @action setPersonState(sts){
        this.personState = sts;
    }
    @action setUserCount(user){
        this.userCount = user;
    }
    @action getDataFromLocalStorage = () => {
        this.userCount = localStorage.getItem("userCount")?JSON.parse(localStorage.getItem("userCount")):"";
        window.localStorage.removeItem("userCount");
    }

    @action setDataFromLocalStorage = () => {
        localStorage.setItem("userCount",JSON.stringify(this.userCount));
    }
    @action onReload = () => {
        this.checkImg = this.toReload?require("images/img/bg1.png"):require("images/img/bg2.png")
        this.toReload =!this.toReload
    }
}

export default new LoginStore();