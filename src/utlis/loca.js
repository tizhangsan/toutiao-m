//本地存储
export const setitem =(k,val)=>{
    val=JSON.stringify(val)
    window.localStorage.setItem(k,val)
}
export const getitem=(k)=>{
//    window.localStorage.getItem(k)
    return JSON.parse( window.localStorage.getItem(k))
}

export const remove=(k)=>{
    window.localStorage.removeItem(k)
}
