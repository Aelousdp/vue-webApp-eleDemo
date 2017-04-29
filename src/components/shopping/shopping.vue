<template>
    <div class="shopping">
        <div class="shopping__cart">
            <div class="cart--style cart--moveTop"></div>
            <div class="cart--style" :class="[money > 0 ? 'active' : '']">
                <i class="icon-shopping_cart"></i>
            </div>
            <div v-show="money > 0" class="cart__goodNum">{{foodCounts}}</div>
        </div>
        <div class="shopping__money">
            <span class="cartPrice border--vertical--1px" :class="[money > 0 ? 'active' : '']">&yen;&nbsp;{{getNeedMoney}}</span>
            <span class="deliveryPrice">另需配送费&nbsp;&yen;&nbsp;{{deliveryPrice}}</span>
        </div>
        <div class="shopping__minPrice" :class="[money >= minPrice ? 'active' : '']">
            <span>{{minPriceText}}</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                sellectFood: [],
                money: 0,
                foodCounts: 0
            };
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
        methods: {
            needMoney () {
                return this.money;
            }
        },
        computed: {
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
                return this.money;
            },
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
        background-color: #141d27;
        .shopping__cart {
            margin: 0 1.8rem 0.8rem;
            flex: 0 0 4.4rem;
            width: 4.4rem;
            height: 100%;
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
            span {
                display: inline-block;
                height: 100%;
                font-size: 1.2rem;
                line-height: 4.6rem;
                font-weight: 700;
            }
            &.active {
                color: #141d27;
                background-color: #15c9ff;
            }
        }
    }
</style>
