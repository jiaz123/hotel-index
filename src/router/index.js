import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index/Index'),
    meta:{title: 'xx民宿'}
  },{
    path: '/home',
    component:()=>import('../views/Home')
  },{
    path: '/about',
    component: ()=>import('../views/About')
  },{
    path: '/province',
    name:'province',
    component:()=>import('../views/province/Province'),
    meta:{title: '选择城市'}
  },{
    path: '/calendar',
    name:'calendar',
    component: ()=>import('../views/calendar/Calendar'),
    meta:{title: '选择日期'}
  },{
    path: '/detail',
    name:'detail',
    component: ()=>import('../views/detail/Detail'),
    meta:{title: '民宿详情'}
  },{
    path: '/list',
    name:'list',
    component: ()=>import('../views/list/List'),
    meta:{title: '民宿列表'}
  },{
    path: '/register',
    name:'register',
    component: ()=>import('../views/login/Register'),
    meta:{title: '注册'}
  },{
    path: '/login',
    name:'login',
    component: ()=>import('../views/login/Login'),
    meta:{title: '登录'},
  },{
    path: '/my',
    name:'my',
    component: ()=>import('../views/my/My'),
    meta:{title: '个人中心',auth:true}
  },{
    path: '/collection',
    name:'collection',
    component: ()=>import('../views/collection/Collection'),
    meta:{title: '收藏',auth:true}
  },{
    path: '/orders',
    name:'orders',
    component: ()=>import('../views/orders/Orders'),
    meta:{title: '订单',auth:true}
  },{
    path: '/ordersdate',
    name:'ordersdate',
    component: ()=>import('../views/orders/Ordersdate'),
    meta:{title: '选择日期',auth:true}
  },{
    path: '/pay',
    name:'pay',
    component: ()=>import('../views/pay/Pay'),
    meta:{title: '订单支付',auth:true}
  },{
    path: '/orderslist',
    name:'orderslist',
    component: ()=>import('../views/orders/Orderslist'),
    meta:{title: '订单列表',auth:true}
  }
  /*,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  }*/
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  let {title , auth} = to.meta;
  document.title = title || '一家民宿';
  if(auth){
    let token = store.state.token;
    if(token){
      next()
    }else {
      next({name : 'login',query:{redirect:to.name}})
    }
  }else {
    next()
  }
})

export default router
