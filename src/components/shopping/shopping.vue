<template>
    <div class="shopping">
        <div class="shopping__cart">
            <div class="cart--style cart--moveTop"></div>
            <div class="cart--style" :class="[money > 0 ? 'active' : '']" @click="popFoodList()">
                <i class="icon-shopping_cart"></i>
            </div>
            <div v-show="money > 0" class="cart__goodNum">{{foodCounts}}</div>
        </div>
        <div class="shopping__money">
            <span class="cartPrice border--vertical--1px" :class="[money > 0 ? 'active' : '']">&yen;&nbsp;{{money}}</span>
            <span class="deliveryPrice">另需配送费&nbsp;&yen;&nbsp;{{deliveryPrice}}</span>
        </div>
        <div class="shopping__minPrice" :class="[money >= minPrice ? 'active' : '']">
            <div>
                <span>{{minPriceText}}</span>
            </div>
        </div>
        <transition name="pop">
            <section class="cart__foodList" v-show="showFoodList">
                <div class="mask"></div>
                <div class="listWrap">
                    <div class="listTitle">
                        <span>购物车</span>
                        <span @click="clearFoodList">清空</span>
                    </div>
                    <ul class="listContent">
                        <li class="listItem border--1px" v-for="food in sellectFood">
                            <span class="foodTitle">{{food.name}}</span>
                            <span class="foodPrice">{{food.price}}</span>
                            <v-food-choose :food="food" class="foodChoose"></v-food-choose>
                        </li>
                    </ul>
                </div>
            </section>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import {eventHub} from '@/common/js/eventHub';
    import foodChoose from '@/components/foodChoose/foodChoose';
    export default {
        data () {
            return {
                sellectFood: [],
                money: 0,
                foodCounts: 0,
                showFoodList: false
            };
        },
        components: {
            'v-food-choose': foodChoose
        },
        props: {
            goods: {
                type: Array
            },
            minPrice: {
                type: Number
            },
            deliveryPrice: {
                type: Number
            }
        },
        created () {
            eventHub.$on('animateEnd', () => {
                this.getNeedMoney();
                console.log(this.sellectFood);
            });
            eventHub.$on('subtractFood', () => {
                this.getNeedMoney();
            });
        },
        methods: {
            needMoney () {
                return this.money;
            },
            getNeedMoney () {
                this.sellectFood = [];
                this.money = 0;
                this.foodCounts = 0;
                this.goods.map((item) => item.foods.map((food) => {
                    if (food.count !== 0) {
                        this.sellectFood.push(food);
                        this.money += food.count * food.price;
                        this.foodCounts += food.count;
                    }
                }));
            },
            popFoodList () {
                this.showFoodList = !this.showFoodList;
            },
            clearFoodList () {
                this.sellectFood = [];
                this.money = 0;
                this.foodCounts = 0;
                this.goods.map((item) => item.foods.map((food) => {
                    if (food.count !== 0) {
                        food.count = 0;
                    }
                }));
            }
        },
        computed: {
            minPriceText () {
                let str;
                if (this.money <= 0) {
                    str = `￥ ${this.minPrice}起送`;
                } else if (this.money > 0 && this.money < this.minPrice) {
                    str = `还差 ￥ ${this.minPrice - this.money}起送`;
                } else {
                    str = '结算';
                }
                return str;
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .shopping {
        position: fixed;
        display: flex;
        left: 0;
        bottom: 0;
        height: 4.6rem;
        width: 100%;
        color: rgba(255, 255, 255, 0.4);
        z-index: 200;
        background-color: #141d27;
        .shopping__cart {
            margin: 0 1.8rem 0.8rem;
            flex: 0 0 4.4rem;
            width: 4.4rem;
            height: 100%;
            z-index: 200;
            .cart--style {
                position: absolute;
                width: 4.4rem;
                height: 4.4rem;
                bottom: 0.8rem;
                left: 1.8rem;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                text-align: center;
                .icon-shopping_cart {
                    font-size: 2.4rem;
                    line-height: 4.4rem;
                    color: rgba(255, 255, 255, 0.4);
                }
                &.active {
                    background-color: #15c9ff;
                    .icon-shopping_cart {
                        color: #ffffff;
                    }
                }
            }
            .cart__goodNum {
                position: absolute;
                left: 4.4rem;
                top: -1.0rem;
                padding: 0 0.6rem;
                font-size: 1.4rem;
                line-height: 1.6rem;
                border-radius: 40%;
                color: #ffffff;
                background-color: #ff0000;
            }
            .cart--moveTop {
                width: 5.6rem;
                height: 5.6rem;
                left: 1.2rem;
                bottom: 0.2rem;
                background-color: #141d27;
            }
        }
        .shopping__money {
            flex: 1 0 auto;
            margin: 1rem 0 1.2rem;
            & > span {
                display: inline-block;
                height: 2.4rem;
                line-height: 2.4rem;
            }
            .cartPrice {
                font-size: 1.6rem;
                font-weight: 700;
                padding-right: 1.2rem;
                @include border-right-1px(rgba(255, 255, 255, 0.1));
                &.active {
                    color: #ffffff;
                }
            ;
            }

            .deliveryPrice {
                font-size: 1.2rem;
                font-weight: 300;
                padding: 0 1.2rem;
            }
        }
        .shopping__minPrice {
            flex: 0 1 10rem;
            max-width: 10rem;
            padding: 0 0.8rem;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.2);
            div {
                display: table;
                width: 100%;
                height: 100%;
                span {
                    display: table-cell;
                    vertical-align: middle;
                    height: 100%;
                    font-size: 1.2rem;
                    font-weight: 700;
                }
            }

            &.active {
                color: #141d27;
                background-color: #15c9ff;
            }
        }
        .cart__foodList {
            position: fixed;
            display: flex;
            flex-flow: column;
            top: 0;
            left: 0;
            right: 0;
            bottom: 4.6rem;
            .mask {
                flex: 1;
                width: 100%;
                background-color: rgba(7, 17, 27, 0.6);
            }
            .listWrap {
                flex: 0;
                width: 100%;
                background-color: #ffffff;
                color: rgb(7, 17, 27);
                .listTitle {
                    height: 4rem;
                    line-height: 4rem;
                    padding: 0 1.8rem;
                    background-color: #f3f5f7;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    box-sizing: border-box;
                    span:first-child {
                        float: left;
                        font-size: 1.4rem;
                        font-weight: 200;
                    }
                    span:last-child {
                        float: right;
                        font-size: 1.2rem;
                        color: rgb(0, 160, 220);
                    }
                }
                .listContent {
                    margin: 0 1.8rem 2rem;
                    .listItem {
                        padding: 1.2rem 0;
                        line-height: 2.4rem;
                        height: 2.4rem;
                        display: flex;
                        @include border-bottom-1px(rgba(7, 17, 27, 0.1));
                        & > * {
                            display: inline-block;
                        }
                        .foodTitle {
                            flex: 1;
                            font-size: 1.4rem;
                        }
                        .foodPrice {
                            flex: 0 1 auto;
                            font-size: 1rem;
                            font-weight: 700;
                            padding: 0 1.2rem 0 1.8rem;
                            color: rgb(240, 20, 20);
                        }
                        .foodChoose {
                            flex: 0 1 auto;
                            vertical-align: top;
                        }
                    }
                }
            }

        }
        .pop-enter,
        .pop-leave-active {
            opacity: 0;
        }
        .pop-enter-active,
        .pop-leave-active {
            transition: all 0.3s linear;
        }
    }
</style>
