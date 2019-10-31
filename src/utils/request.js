import axios from "axios";
import { JSEncrypt } from 'jsencrypt'
import md5 from 'js-md5'
//import MD5 from 'crypto-js/md5'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import {message} from "antd"
//import storage from "./storage";

// const sign = {
//     web: 2,
//     android: 3,
//     ios: 4
// };

const instance = axios.create({
    //baseURL: "https://testadmin.ebuyhouse.com:8060", // 测试
    //baseURL: "http://api.hzmra.com:8011", // 正式
    headers: {
        "content-type": "application/json",
        SIGN: 2
    }
});


/*
 * request type of post
 *@param data:{}
 *@param url:string
 */
const post = async  (option) => {
    option.data = JSON.stringify(objKeySort(option.data));
    const optionsPost = {
        ...option,
        method: "POST"
    }
    const result = await request(optionsPost);
    return result;
}

/*
 * request type of get
 *@param data:{}
 *@param url:string
 */
const get = async (option) => {
    let url = option.url + "?";
    const data = objKeySort(option.data);
    for (let key in data) {
        if (url.indexOf("?") < url.length - 1) {
            url = url + "&" + key + "=" + data[key];
        } else {
            url = url + key + "=" + data[key];
        }
    }
    const optionsPost = {
        url,
        method: "GET"
    }
    const result = await request(optionsPost);
    return result;
}

const getKey = async (option) => {
    option.data = JSON.stringify(objKeySort(option.data));
    const r6 = Math.ceil(Math.random()*1000000)
    const urlK = (""+r6).length===6?("/power/transmit/"+r6):("/power/transmit/"+r6+"7")
    const plant = Math.ceil(Math.random()*10000000000000000)
    let key = Base64.stringify(Utf8.parse(plant))
    let optionsPost = {
        url:urlK,
        method: "GET",
        headers:{plant:key}
    }
    const result = await request(optionsPost);
    const publicK = result.data.liu + result.data.js + result.data.po
    const keyU = plant.toString().substring(0,result.data.ru)
    const data = {...JSON.parse(option.data),key:keyU}
    let dataStr = "" 
    for(let key in data){
        dataStr =dataStr + key + "=" + data[key]+ "&"
    }
    dataStr = dataStr.substring(0,(dataStr.length-1))
    const md5Data = md5(dataStr)
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicK);
    const realData = encrypt.encrypt(option.data);
    const realOption = {
        url:option.url,
        method: "POST",
        data:{mi:realData},
        headers:{
            plant:key,
            diffuse:md5Data
        }
    }
    const resultR = await request(realOption);
    if(resultR.code===0){
        sessionStorage.setItem("plant",plant)
    }
    return resultR;

}
const request = async (options) => {
    const token = window.localStorage.getItem("token");
    return new Promise ((resolve, reject) => {
        instance.request({
                ...options,
                headers: {
                    ...options.headers,
                    ...(token ? {
                        token: token
                    } : {})
                }
            })
            .then(({
                data
            }) => {
                switch (data.code) {
                    case 0:
                        break;
                    case 2: 
                        window.localStorage.removeItem("token");
                        window.localStorage.removeItem("userCount");
                        window.location.reload();
                        message.error("登陆超时");
                        break;//reject(data.msg);
                    case 403:
                        message.error(data.msg)
                        //reject(data.msg)
                        break;
                    default:
                        reject(data.msg)
                        break;
                }
                resolve(data);
            })
            .catch(error => {
                message.error(error.message)
                //reject(error.message);
            });
    });
};

const  objKeySort = (obj) => {//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
export {
    post,
    get,
    getKey,
}
