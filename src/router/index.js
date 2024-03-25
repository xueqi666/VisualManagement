import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/views/Login'),
        },
        {
            path: '',
            name: 'home',
            component: home,
            children: [
                {
                    path: '/page0',
                    name: 'page0',
                    component: () => import('@/views/page0')
                },
                {
                    path: '/datavisual',
                    name: 'visual',
                    component: () => import('@/views/DataVisual')
                },
                {
                    path: '/a',
                    name: 'a',
                    component: () => import('@/views/components/a')
                },
                {
                    path: '/page1',
                    name: 'page1',
                    component: () => import('@/views/page1')
                },
                {
                    path: '/page2',
                    name: 'page2',
                    component: () => import('@/views/page2')
                },
                {
                    path: '/page3',
                    name: 'page3',
                    component: () => import('@/views/page3')
                },
                {
                    path: '/page4',
                    name: 'page4',
                    component: () => import('@/views/page4')
                }
            ]
        }
    ]
})
export default router
