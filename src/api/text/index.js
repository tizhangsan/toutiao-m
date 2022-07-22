import request from '@/utlis/request'


export const recommendapi = params => {//推荐文章
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}




export const associationapi = q => {   //获取联想数据
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params:{
            q
        }
    })
}



export const searchapi = params => {   //获取搜索数据
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
            
        
    })
}


export const essayidapi = article_id => {   //获取文章详情数据
    return request({
        method: 'GET',
        url: `/v1_0/articles/${article_id}`,
       
            
        
    })
}


