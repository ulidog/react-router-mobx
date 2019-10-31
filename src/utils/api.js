const enroll = "/web/user/ins/enroll"//用户注册
const login = "/web/user/fin/login"//用户登陆
const password = "/web/user/upd/restore/password"//找回密码、修改密码
const exit = "/web/user/del/exit"//退出登陆
const sendCode = "/web/user/send/code" //发送验证码：注册，登录，找回密码
const inviteCode = "/web/user/fin/invite/code"//验证邀请码是否有效
const userCount = "/web/user/center/fin/count"//个人中心首页
const userDetail = "/web/user/center/fin/details"//个人中心详情
const myCollection = "/web/advisory/find/my/collection/list"//我的收藏
const myCollectDel = "/web/advisory/delete/collection" //我的收藏删除
const newsType = "/web/advisory/type/lis" //咨询类型列表
const newsList = "/web/advisory/list"//咨询列表
const newsDetail = "/web/advisory/find/details" //咨询详情
const search = "/web/advisory/search/list"//咨询搜索模糊匹配列表
const commentList = "/web/advisory/comment/list" //咨询评论列表
const commentDetail = "/web/advisory/comment/details" //咨询评论详情
const commentDz = "/web/advisory/add/like/count" //评论点赞
const commentDzCancel = "/web/advisory/del/like" //评论点赞取消
const cancelComment = "/web/advisory/del/delete" //咨询评论删除
const comment = "/web/advisory/ins/comment" //咨询评论
const advisoryCollection = "/web/advisory/ins/collection" //咨询收藏
const advisoryCollectionDel =  "/web/advisory/del/collection" //咨询取消收藏
const advisoryDz =  "/web/advisory/add/like" //咨询点赞
const advisoryDzCancel =  "/web/advisory/del/give" //咨询点赞取消
const browseCount = "/web/advisory/add/browse/count"//咨询浏览记录
const messageAll = "/web/message/push/query/all" //消息列表所有记录
const messageDel = "/web/message/push/delete/ids" //消息删除
const messageUnread = "/web/message/push/query/unreads" //消息未读数
const messageToRead = "/web/message/push/update/unread/ids"//消息未读变已读
const uploadImg = "/uploading/img" //文件上传
const updNamePoto = "/web/user/center/upd/details" //更新头像昵称
const updIdcard = "/web/user/center/ins/idcard" //更新身份证
const banner = "/web/banner/find" //banner获取
const recomment = "/web/advisory/query/page/recomments" //资讯推荐列表
export {
    enroll,login,password,exit,sendCode,inviteCode,userCount,userDetail,myCollection,myCollectDel,
    newsType,newsList,newsDetail,search,commentList,commentDetail,commentDz,commentDzCancel,cancelComment,
    comment,advisoryCollection,advisoryCollectionDel,advisoryDz,advisoryDzCancel,browseCount,
    messageAll,messageDel,messageUnread,messageToRead,uploadImg,updNamePoto,updIdcard,banner,recomment
}