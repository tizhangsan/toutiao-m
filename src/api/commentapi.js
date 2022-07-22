//评论api
import request from '@/utlis/request'


export const commentapi = params=>{   //文章正文评论 api
    return request({
        method:'GET',
        url:'/v1_0/comments',
        params

        
    })
}


export const CommentLikeapi = target=>{   //文章正文评论点赞 api
    return request({
        method:'POST',
        url:'/v1_0/comment/likings',
        data:{
            target
        }

        // /v1_0/comment/likings
    })
}


export const CommentCancelLikeapi = target=>{   //文章正文评论取消点赞 api
    return request({
        method:'DELETE',
        url:`/v1_0/comment/likings/${target}`,
        

        
    })
}

//PostComments

export const PostCommentsapi = data=>{   //发布评论 api
    return request({
        method:'POST',
        url:`/v1_0/comments`,
        data
        
    })
}

