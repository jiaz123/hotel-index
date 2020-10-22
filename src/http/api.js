import instance from "../http/http" ;
function apiIndex() {
    return new Promise((resolve, reject) => {
        instance.get('/index/index').then(res =>
            resolve(res)
        ).catch(error => {
            reject(error)
        })
    })
}

function apiDetail(sid) {
    return new Promise((resolve, reject) => {
        instance.get('/index/detail/'+sid).then(res =>
            resolve(res)
        ).catch(error => {
            reject(error)
        })
    })
}

function apiList(params) {
    return new Promise((resolve, reject) => {
        instance.get('/index/lists',{
            params
        }).then(res =>
            resolve(res)
        ).catch(error => {
            reject(error)
        })
    })
}

function apiregister(data) {
    return new Promise((resolve, reject) => {
        instance.post('/index/user',data).then(res =>
            resolve(res)
        ).catch(error => {
            reject(error)
        })
    })
}

function apilogin(body) {
    return new Promise((resolve, reject) => {
        instance.post('/index/login', body).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiPerson() {
    return new Promise((resolve, reject) => {
        instance.get('/index/user/3').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiCollection() {
    return new Promise((resolve, reject) => {
        instance.get('/index/collection').then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}


function apiOrders(data) {
    return new Promise((resolve, reject) => {
        instance.post('/index/orders',data).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiOrderslist(params){
    return new Promise((resolve, reject) => {
        instance.get('/index/orders',params).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiUpdateOrders(oid) {
    return new Promise((resolve, reject) => {
        instance.put('/index/orders/'+oid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

function apiDeleteOrders(oid){
    return new Promise((resolve, reject) => {
        instance.delete('/index/orders/'+oid).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export {apiIndex , apiDetail , apiList ,apiregister ,apilogin , apiPerson , apiCollection , apiOrders , apiOrderslist ,apiUpdateOrders,apiDeleteOrders}
