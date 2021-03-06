
/* 昵称正则 */
const nickRegexp = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){2,20}$/;
/* 真实姓名正则 */
const nameRegexp = /^[\u4E00-\uFA29]|[\uE7C7-\uE7F3]$/;
//手机号码验证
const phoneReg = /^1\d{10}$/
/* 严格身份证验证规则 */
const checkCertificateNo = (certificateNo) => {
    if(certificateNo === null || certificateNo === "") return true
    if(certificateNo.length !== 18){
        return false
    }else{
        const address = certificateNo.substring(0,6);//6位，地区代码
        const birthday = certificateNo.substring(6,14);//8位，出生日期
        // const sequenceCode =  +certificateNo.substring(14,17);//3位，顺序码：奇为男，偶为女
        // const checkCode =  certificateNo.substring(17);//1位，校验码：检验位
        //   console.log("身份证号码:"+certificateNo+"、地区代码:"+address+"、出生日期:"+birthday+"、顺序码:"+sequenceCode+"、校验码:"+checkCode);

          const province={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",
          31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
          42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",
          53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}

          const year =  birthday.substring(0,4);   
          const month = birthday.substring(4,6);   
          const day = birthday.substring(6);
          const tempDate = new Date(+year,parseFloat(month)-1,parseFloat(day)); 
          if(province[parseInt((address.substr(0,2)))] === null || (tempDate.getFullYear()!==parseFloat(year) || tempDate.getMonth()!==parseFloat(month)-1 || tempDate.getDate()!==parseFloat(day))){//这里用getFullYear()获取年份，避免千年虫问题
                return false
          }else{
            const weightedFactors = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];//加权因子   
            const valideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值，当中10代表X
                let certificateNoArray = certificateNo.split("");// 得到身份证数组
                let sum = 0;// 声明加权求和变量
                if (certificateNoArray[17].toLowerCase() === 'x') {
                      certificateNoArray[17] = 10;// 将最后位为x的验证码替换为10  
                }
               for ( var i = 0; i < 17; i++) {
                     sum += weightedFactors[i] * certificateNoArray[i];// 加权求和   
              }
              let valCodePosition = sum % 11;// 得到验证码所在位置
             if (certificateNoArray[17] === valideCode[valCodePosition]) {
                   return true
              } else {
                   return false
              }
         }
   }
}

const testRealName = (name) => {
    return name === null || name === "" ? true:nameRegexp.test(name)
}
const testPhone = (phone) => {
    return phone === null || phone === "" ? true:phoneReg.test(phone)
}
const testNickName = (name) => {
    return name === null || name === "" ? true:nickRegexp.test(name)
}

const IsPC =()=> {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    //alert(userAgentInfo)
    var Agents = ["android", "iphone",
                "symbianos", "windows phone",
                "ipad", "ipod","rv:1.2.3.4","ucweb","ucbrowser"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
export {
    checkCertificateNo,
    testRealName,
    testPhone,
    testNickName,
    IsPC
}