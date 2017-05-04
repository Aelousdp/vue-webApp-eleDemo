<template>
    <div class="rating">
        <section class="rating__about">
            <div class="rating__about__score border--vertical--1px">
                <p class="scoreValue">{{seller.score}}</p>
                <p class="scoreTitle">综合评分</p>
                <p class="scoreRank">高于周边商家{{seller.rankRate}}</p>
            </div>
            <div class="rating__about__star">
                <div class="star__row">
                    <span>服务态度</span>
                    <v-star :starScore="seller.serviceScore" :starSize="36" class="starPad"></v-star>
                    <span class="score">{{seller.serviceScore}}</span>
                </div>
                <div class="star__row">
                    <span>味道评分</span>
                    <v-star :starScore="seller.foodScore" :starSize="36" class="starPad"></v-star>
                    <span class="score">{{seller.foodScore}}</span>
                </div>
                <p>
                    <span>送达时间</span>
                    <span class="starPad">{{seller.deliveryTime}}分钟</span>
                </p>
            </div>
        </section>
        <v-split></v-split>
        <section class="rating__wrap"></section>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '@/components/star/star';
    import split from '@/components/split/split';
    export default {
        props: {
            ratings: {
                type: Array
            },
            seller: {
                type: Object
            }
        },
        components: {
            'v-star': star,
            'v-split': split
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .rating {
        .rating__about {
            display: flex;
            margin: 1.8rem 0;
            .rating__about__score {
                flex: 0 0 10rem;
                width: 10rem;
                @include border-right-1px(rgba(7, 17, 27, 0.2));
                p {
                    text-align: center;
                }
                .scoreValue {
                    font-size: 2.4rem;
                    line-height: 2.8rem;
                    color: rgb(255, 153, 0);
                    padding-bottom: 0.6rem;
                }
                .scoreTitle {
                    font-size: 1.2rem;
                    line-height: 1.2rem;
                    color: rgb(7, 17, 27);
                    padding-bottom: 0.8rem;
                }
                .scoreRank {
                    font-size: 1rem;
                    line-height: 1rem;
                    color: rgb(147, 153, 159);
                    padding-bottom: 0.6rem;
                }
            }
            .rating__about__star {
                flex: 0 0 auto;
                margin: 0 auto;
                .star__row {
                    font-size: 0;
                    line-height: 1.8rem;
                    padding-bottom: 0.8rem;
                    color: rgb(7, 17, 27);
                    & > * {
                        display: inline-block;
                        vertical-align: top;
                    }
                    span {
                        font-size: 1.2rem;
                    }
                    .score {
                        color: rgb(255, 153, 0);
                    }
                }
                p {
                    font-size: 1.2rem;
                    span:last-child{
                        color: rgb(147, 153, 159);
                    }
                }
                .starPad {
                    padding: 0 1rem;
                }
            }
            @media only screen and (max-width: 350px) {
                .rating__about__score {
                    flex: 0 0 9rem
                }
                .rating__about__star {
                    .starPad {
                        padding: 0 0.5rem;
                    }
                }
            }
        }
    }
</style>
