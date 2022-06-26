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
    },
    {
      path: '/test-data-types',
      name: 'TestDataTypes',
      component: () => import(/* webpackChunkName:"Tests" */ '../components/Test/Tests.vue')
    },
    {
      path: '/test-interaction',
      name: 'TestInteraction',
      component: () => import(/* webpackChunkName:"TestInteraction" */ '../components/Test/TestInteraction.vue')
    }, 
    {
      path: '/test-data-types',
      name: 'TestCodingStyle',
      component: () => import(/* webpackChunkName:"TestCodingStyle" */ '../components/Test/Tests.vue')
    },
    {
      path: '/test-data-types',
      name: 'TestArrayMethods',
      component: () => import(/* webpackChunkName:"TestArrayMethods" */ '../components/Test/Tests.vue')
    },
]
const router = new createRouter({
    history: createWebHistory(''), 
    routes,
})
export default  router