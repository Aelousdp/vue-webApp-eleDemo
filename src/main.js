// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResourse from 'vue-resource';
import router from './router/index';

import '@/common/scss/base.scss';

Vue.config.productionTip = false;
Vue.use(VueResourse);

router.push('/goods');

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
