<template>
    <div class="food clearfix">
        <img class="food__icon" :src="food.icon" alt="食物图片">
        <div class="food__detail">
            <h4>{{food.name}}</h4>
            <p v-if="food.description">{{food.description}}</p>
            <p>
                <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
            </p>
            <p>
                <b class="food__price"><span class="rmbIcon">&yen;</span>{{food.price}}</b><del v-if="food.oldPrice" class="food__oldPrice"><span class="rmbIcon">&yen;</span>{{food.oldPrice}}</del>
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            food: {
                type: Object
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    .food {
        .food__icon {
            float: left;
            width: 6rem;
            height: 6rem;
        }
        .food__detail {
            padding-left: 1rem;
            padding-top: 0.2rem;
            overflow: hidden;
            h4 {
                margin: 0;
                font-size: 1.4rem;
                line-height: 1.4rem;
                color: rgb(7, 17, 27);
            }
            p {
                padding-top: 0.8rem;
                font-size: 1rem;
                line-height: 1rem;
                color: rgb(147, 153, 159);
                span + span{
                    padding-left: 1.2rem;
                }
                .food__price {
                    font-size: 1.4rem;
                    padding-right: 0.8rem;
                    color: rgb(240, 20, 20);
                    line-height: 2.4rem;
                    font-weight: 700;
                }
                .rmbIcon {
                    font-size: 1rem;
                    font-weight: normal;
                }
                .food__oldPrice {
                    font-size: 1rem;
                    font-weight: 700;
                }
            }
        }
    }
</style>
