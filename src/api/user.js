import request from '../utlis/request'

export const loginapi = data => {   //login  api
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}
export const sendsms = mobile => {   //验证码api
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`,
        
    })
}

export const userinfo = () => {   //个人信息api
    return request({
        method: 'GET',
        url: `/v1_0/user`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
        
    })
}

export const navapi = () => {   //nav api
    return request({
        method: 'GET',
        url: `/v1_0/user/channels`,
        
        
    })
}



export const tuijianapi = () => {   //推荐 api
    return request({
        method: 'GET',
        url: `/v1_0/channels`,
        
    })
}

export const pindaopushapi = channels => {   //添加频道 api
    return request({
        method: 'PATCH',
        url: `/v1_0/user/channels`,
        data:{
            channels:[channels]
        }
    })
}

export const pindaoremovapi = target => {   //删除频道 api
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/:${target}`,
       
    })
}


export const  pushconcernapi = target => {   //添加关注api
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data:{
          target:target
       }
    })
}

export const remconcernapi = target => {   //删除关注 api
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`,
       
    })
}




export const FavoriteArticlesapi = target => {   //收藏文章 api
    return request({
        method: 'POST',
        url: `/v1_0/article/collections`,
        data:{
            target
         }
    })
}


export const Unsellapi = target => {   //取消收藏文章 api
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`,
    })
}


export const supportapi = target => {   //点赞文章 api
    return request({
        method: 'POST',
        url: `/v1_0/article/likings`,
        data:{
            target
        }
    })
}


export const remsupportapi = target => {   //取消点赞文章 api
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${target}`,
    })
}



export const mydataapi = () => {   //获取用户资料 api
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',
    })
}

//http://toutiao.itheima.net/v1_0/user/profile


export const EditMaterialsapi = data => {   //修改用户资料 api
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}


export const imgapi = data => {   //修改用户头像 api
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data
    })
}
