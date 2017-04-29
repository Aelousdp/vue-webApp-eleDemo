import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';
import ratings from '@/components/ratings/ratings';

Vue.use(Router);

/* 路由注意： 是routes，不是routers，是component，不是components  */
export default new Router({
    routes: [
        {
            path: '/goods',
            component: goods
        },
        {
            path: '/ratings',
            component: ratings
        },
        {
            path: '/seller',
            component: seller
        }
    ],
    linkActiveClass: 'active'
});
