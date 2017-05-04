<template>
    <div id="app">
        <v-header :sellerMsg="seller"></v-header>
        <nav class="mainNav">
            <ul class="border--1px">
                <li>
                    <router-link to="/goods" class="mainNav__item">商品</router-link>
                </li>
                <li>
                    <router-link to="/ratings" class="mainNav__item">评价</router-link>
                </li>
                <li>
                    <router-link to="/seller" class="mainNav__item">商家</router-link>
                </li>
            </ul>
        </nav>
        <router-view :goods="goods" :ratings="ratings" :seller="seller"></router-view>
        <v-shopping :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :goods="goods"></v-shopping>
    </div>
</template>

<script type="text/ecmascript-6">
    import appHeader from '@/components/header/appHeader';
    import shopping from '@/components/shopping/shopping';

    const ERR_OK = 0;

    export default {
        data () {
            return {
                seller: {},
                goods: [],
                ratings: []
            };
        },
        components: {
            'v-header': appHeader,
            'v-shopping': shopping
        },
        created () {
            this.$http.get('/api/seller').then((response) => {
                let res = response.body;
                if (res.errno === ERR_OK) {
                    this.seller = res.data;
                }
            });
            this.$http.get('/api/goods').then((response) => {
                let res = response.body;
                if (res.errno === ERR_OK) {
                    this.goods = res.data;
                }
            });
            this.$http.get('/api/ratings').then((response) => {
                let res = response.body;
                if (res.errno === ERR_OK) {
                    this.ratings = res.data;
                }
            });
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import './common/scss/mixin.scss';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .mainNav {
        ul {
            height: 4rem;
            width: 100%;
            font: 1.4rem/4rem 'Microsoft YaHei', sans-serif;
            display: flex;
            justify-content: space-between;
            text-align: center;
            box-sizing: border-box;
            @include border-bottom-1px(rgba(7, 17, 27, 0.2));
        }

        li {
            list-style: none;
            flex: 1 1 auto;
            color: rgb(77, 85, 93);
            cursor: pointer;
        }

        .active{
            color: rgb(240, 20, 20);
        }
    }
</style>
