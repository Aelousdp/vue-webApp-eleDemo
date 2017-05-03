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
        <v-split></v-split>
        <section class="food__introduce content--box">
            <h2>商品介绍</h2>
            <p v-if="food.info">{{food.info}}</p>
            <p v-else="">啊......哦......本商品没有具体介绍。。。</p>
        </section>
        <v-split></v-split>
        <section class="food__ratings">
            <div class="food__ratings__choose content--box">
                <h2>商品评价</h2>
                <v-choose-rating :ratings="getRatingProps"></v-choose-rating>
            </div>
            <div class="food__ratings__content">
                <ul>
                    <li v-show="isShow(rating)" v-for="rating in getRatings" class="ratingItem border--1px">
                        <div class="ratingAbout clearfix">
                            <div class="about__time">
                                <span>{{getTime(rating.rateTime).dateStr}}</span>
                                <span>{{getTime(rating.rateTime).timeStr}}</span>
                            </div>
                            <div class="about__user">
                                <span>{{rating.username}}</span>
                                <img :src="rating.avatar" alt="头像">
                            </div>
                        </div>
                        <div class="ratingContent">
                            <span :class="[rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down']"></span>
                            <span>{{rating.text}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import foodChoose from '@/components/foodChoose/foodChoose';
    import split from '@/components/split/split';
    import chooseRating from '@/components/chooseRating/chooseRating';
    import {eventHub} from '@/common/js/eventHub';
    export default {
        data () {
            return {
                ratingsType: 'all',
                hasContent: false
            };
        },
        props: {
            food: {
                type: Object
            }
        },
        components: {
            'v-food-choose': foodChoose,
            'v-split': split,
            'v-choose-rating': chooseRating
        },
        created () {
            eventHub.$on('getRatings', (type) => {
                this.ratingsType = type;
            });
            eventHub.$on('hasContent', (bool) => {
                this.hasContent = bool;
            });
        },
        computed: {
            getRatingProps () {
                let rating = {
                    isRatingComponent: false,
                    goodCount: 0,
                    badCount: 0
                };
                this.food.ratings.map((item) => {
                    if (item.rateType === 0) {
                        rating.goodCount++;
                    } else {
                        rating.badCount++;
                    }
                });
                return rating;
            },
            getRatings () {
                let ratings = [];
                this.food.ratings.map((item) => ratings.push(item));
                return ratings;
            }
        },
        methods: {
            getTime (time) {
                let date = new Date(time),
                    dateObj = {
                        dateStr: `${date.getFullYear()}-${this.isSingleNum(date.getMonth())}-${this.isSingleNum(date.getDate())}`,
                        timeStr: `${date.getHours()}:${date.getMinutes()}`
                    };
                return dateObj;
            },
            isSingleNum (num) {
                return ('' + num).split('').length === 1 ? '0' + num : num;
            },
            __hasContent (text) {
                return !this.hasContent ? true : text !== '';
            },
            isShow (rating) {
                switch (this.ratingsType) {
                    case 'all':
                        return this.__hasContent(rating.text);
                    case 'good':
                        if (rating.rateType === 0) {
                            return this.__hasContent(rating.text);
                        }
                        break;
                    case 'bad':
                        if (rating.rateType === 1) {
                            return this.__hasContent(rating.text);
                        }
                        break;
                }
                return false;
            }
        }
    };
</script>

<style type="text/scss" lang="scss" scoped>
    @import '../../common/scss/mixin.scss';
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
        .food__introduce {
            p {
                padding: 0 0.8rem;
                font-size: 1.2rem;
                font-weight: 200;
                line-height: 2.4rem;
                color: rgb(77, 85, 93);
            }
        }
        .food__ratings {
            .food__ratings__choose {
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &.content--box {
                    padding-bottom: 0;
                }

            }
            .food__ratings__content {
                padding: 0 1.8rem;
                .ratingItem {
                    padding: 1.6rem 0;
                    list-style: none;
                    color: rgb(147, 153, 159);
                    .ratingAbout {
                        padding-bottom: 0.6rem;
                        line-height: 1.2rem;
                        .about__time {
                            float: left;
                            font-size: 0;
                            span {
                                font-size: 1rem;
                            }
                            span + span {
                                padding-left: 1rem;
                            }
                        }
                        .about__user {
                            float: right;
                            font-size: 0;
                            span,
                            img {
                                vertical-align: bottom;
                                font-size: 1rem;
                            }
                            img {
                                margin-left: 0.6rem;
                                width: 1.2rem;
                                height: 1.2rem;
                                border-radius: 50%;
                            }
                        }
                    }
                    .ratingContent {
                        font-size: 0;
                        span {
                            font-size: 1.2rem;
                            line-height: 2.4rem;
                        }
                        span + span {
                            padding-left: 0.4rem;
                            color: rgb(7, 17, 27);
                        }
                        .icon-thumb_up {
                            color: rgb(0, 160, 220);
                        }
                    }
                }
                .ratingItem + .ratingItem {
                    @include border-top-1px(rgba(7, 17, 27, 0.1));
                }
            }
        }

    }
</style>
