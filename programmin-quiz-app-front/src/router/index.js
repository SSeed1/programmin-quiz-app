import {createRouter,createWebHistory} from  'vue-router'


const routes = [
    {
      path: '/sigup',
      name: 'SignUp',
      component: () =>  import(/* webpackChunkName: "signUpQuiz */ '../components/auth/AuthComponent.vue'),
    },
    {
      path: '/sigin',
      name: 'SignIn',
      component: () => import(/* webpackChunkName: "signInQuiz"*/ '../components/auth/AuthComponent.vue')
    },
    {
      path: '/',
      redirect: '/sigup',
    },
    {
      path: '/lessons',
      name: 'Lessons',
      component: () => import(/* webpackChunkName: "Lessons" */ '../components/lessons/Lessons.vue')
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import(/* webpackChunkName:"Accoutn" */ '../components/account/Account.vue')
    }
]
const router = new createRouter({
    history: createWebHistory(''), 
    routes,
})
export default  router