<template>
    <div class="foodDetailWrap">
        <section class="food__content">
            <img :src="food.image" alt="食物图片" class="food__image">
            <div class="food__content__detail content--box">
                <h1>{{food.name}}</h1>
                <p class="">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                </p>
                <p>
                    <span><span class="rmb">&yen;</span>{{food.price}}</span>
                    <del v-show="food.oldPrice"><span class="rmb">&yen;</span>{{food.oldPrice}}</del>
                </p>
            </div>
            <div v-if="food.count <= 0" class="shopping shopping--style">
                <span>加入购物车</span>
            </div>
            <v-food-choose v-else class="shopping"></v-food-choose>
        </section>
        <div class="interval"></div>
        <section class="food__introduce content--box">
            <h2>商品介绍</h2>
            <p v-if="food.info">{{food.info}}</p>
            <p v-else="">啊......哦......本商品没有具体介绍。。。</p>
        </section>
        <div class="interval"></div>
        <section class="food__ratings"></section>
    </div>
</template>

<script type="text/ecmascript-6">
    import foodChoose from '@/components/foodChoose/foodChoose';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        components: {
            'v-food-choose': foodChoose
        }
    };
</script>

<style type="text/scss" lang="scss" scoped>
    .foodDetailWrap {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 4.6rem;
        z-index: 100;
        background-color: #ffffff;
        overflow: auto;
        .content--box {
            padding: 1.8rem;
            h2 {
                margin: 0;
                padding-bottom: 0.6rem;
                line-height: 1.4rem;
                font-size: 1.4rem;
                font-weight: normal;
                color: rgb(7, 17, 27);
            }
        }
        .food__content {
            position: relative;
            font-size: 1rem;
            overflow: hidden;
            color: rgb(147, 153, 159);
            .food__image {
                width: 100%;
            }
            .food__content__detail {
                h1 {
                    margin: 0;
                    line-height: 1.4rem;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: rgb(7, 17, 27);
                }
                p:nth-child(2) {
                    font-size: 0;
                    margin: 0.8rem 0 1.8rem;
                    line-height: 1rem;
                    span {
                        font-size: 1rem;
                    }
                    span + span {
                        padding-left: 1.2rem;
                    }
                }
                p:last-child {
                    font-size: 0;
                    line-height: 2.4rem;
                    height: 2.4rem;
                    .rmb {
                        font-size: 1rem;
                        font-weight: normal;
                    }
                    & > span {
                        font-size: 1.4rem;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                    }
                    del {
                        padding-left: 1.2rem;
                        font-size: 1rem;
                        font-weight: 700;
                    }
                }
            }
            .shopping {
                position: absolute;
                right: 1.8rem;
                bottom: 1.8rem;
            }
            .shopping--style {
                padding: 0.6rem 1.2rem;
                width: 7.4rem;
                height: 2.4rem;
                box-sizing: border-box;
                border-radius: 1.2rem;
                font-size: 1rem;
                line-height: 1.2rem;
                text-align: center;
                color: #ffffff;
                background-color: rgb(0, 160, 220);
            }
        }
        .interval {
            height: 1.6rem;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            background-color: #f3f5f7;
        }
        .food__introduce {
            p {
                padding: 0 0.8rem;
                font-size: 1.2rem;
                font-weight: 200;
                line-height: 2.4rem;
                color: rgb(77, 85, 93);
            }
        }
    }
</style>
