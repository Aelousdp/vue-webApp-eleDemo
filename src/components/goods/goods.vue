<template>
    <div class="goods">
        <div class="goods__menu">
            <ul>
                <li v-for="(good, index) in goods" class="menu__item" :class="{'active': index === getIndex}" @click="scroll(index)">
                    <v-concession v-if="good.type >= 0" :concessionSize="3"
                                  :concessionType="good.type"
                                  :concessionContent="good.name"></v-concession>
                    <span v-else>{{ good.name }}</span>
                </li>
            </ul>
        </div>
        <div class="goods__list">
            <div v-for="good in goods" class="list__item" ref="goodItem">
                <h3 class="list__item__title">{{good.name}}</h3>
                <ul>
                    <li v-for="food in good.foods" class="food__item border--1px" @click="sellectFood(food)">
                        <v-food :food="food"></v-food>
                        <v-food-choose :food="food" class="foodChoose"></v-food-choose>
                    </li>
                </ul>
            </div>
        </div>
        <v-food-detail v-if="foodDetail!==null" :food="foodDetail"></v-food-detail>
    </div>
</template>

<script type="text/ecmascript-6">
    import concession from '@/components/concession/concession';
    import food from '@/components/food/food';
    import foodChoose from '@/components/foodChoose/foodChoose';
    import foodDetail from '@/components/foodDetail/foodDetail';
    export default {
        props: {
            goods: {
                type: Array
            }
        },
        data () {
            return {
                goodsLen: [],
                initTop: null,
                currentTop: null,
                foodDetail: null
            };
        },
        components: {
            'v-concession': concession,
            'v-food': food,
            'v-food-choose': foodChoose,
            'v-food-detail': foodDetail
        },
        mounted () {
            this.$nextTick(function wait () {
                let timer = setTimeout(() => {
                    if (this.goods.length === 0) {
                        clearTimeout(timer);
                        wait();
                    } else {
                        clearTimeout(timer);
                        let goodsList = this.$refs.goodItem;
                        this.getGoodsLen(goodsList);
                        this.bind(goodsList[0]);
                    }
                });
            });
        },
        methods: {
            getGoodsLen (goodsList) {
                let itemHeight = 0;
                goodsList[Symbol.iterator] = Array.prototype[Symbol.iterator];
                for (let item of goodsList) {
                    itemHeight += item.offsetHeight;
                    this.goodsLen.push(itemHeight);
                }
            },
            bind (goodsOne) {
                if (this.initTop === null) {
                    this.initTop = goodsOne.getBoundingClientRect().top;
                }
                goodsOne.parentNode.addEventListener('scroll', (e) => {
                    this.currentTop = Math.floor(this.initTop - goodsOne.getBoundingClientRect().top);
                }, false);
            },
            scroll (index) {
                let goodsWrap = this.$refs.goodItem[0].parentNode;
                goodsWrap.scrollTop = index ? this.goodsLen[index - 1] : 0;
            },
            sellectFood (food) {
                this.foodDetail = food;
            }
        },
        computed: {
            getIndex () {
                for (let [index, item] of this.goodsLen.entries()) {
                    if (item > this.currentTop) {
                        return index;
                    }
                }
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .goods {
        position: absolute;
        display: flex;
        width: 100%;
        top: 17.4rem;
        bottom: 4.6rem;
        overflow: hidden;
        .goods__menu {
            flex: 0 0 8rem;
            width: 8rem;
            background-color: #f3f5f7;
            overflow: auto;
            .menu__item {
                display: table;
                width: 100%;
                height: 5.3rem;
                padding: 0 1.2rem;
                box-sizing: border-box;
                font-size: 1.2rem;
                line-height: 1.4rem;
                color: rgb(20, 20, 20);
                & > * {
                    display: table-cell;
                    vertical-align: middle;
                }
            }
            .active {
                background-color: #ffffff;
            }
        }
        .goods__list {
            flex: 1;
            overflow: auto;
            .list__item {
                width: 100%;
                .list__item__title {
                    height: 2.6rem;
                    padding-left: 1.2rem;
                    border-left: 0.2rem solid #d9dde1;
                    font-size: 1.2rem;
                    line-height: 2.6rem;
                    letter-spacing: 1px;
                    color: rgb(147, 153, 159);
                    background-color: #f3f5f7;
                }
                .food__item {
                    position: relative;
                    padding: 1.8rem;
                    .foodChoose {
                        position: absolute;
                        bottom: 1.8rem;
                        right: 1.8rem;
                    }
                }
                .food__item + .food__item {
                    @include border-top-1px(rgba(7, 17, 27, 0.1));
                }
            }

        }
    }
</style>
