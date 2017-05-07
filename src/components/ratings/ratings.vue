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
        <section class="rating__wrap">
            <v-choose-rating class="chooseRating" :ratings="getRatingProps"></v-choose-rating>
            <div class="rating__content">
                <ul class="clearfix">
                    <li v-show="isShow(rating)" class="rating__item" v-for="rating in ratings">
                        <img :src="rating.avatar" alt="用户头像" class="user__avatar">
                        <div class="user__about">
                            <div class="userMsg clearfix">
                                <span class="userName inline--style">{{rating.username}}</span>
                                <span class="userRatingTime inline--style">{{getTime(rating.rateTime)}}</span>
                            </div>
                            <div class="userScore">
                                <v-star :starScore="rating.score" :starSize="36"></v-star>
                                <span v-show="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="userRating">{{rating.text}}</p>
                            <div class="userRecommend">
                                <span :class="[rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down']" class="inline--style"></span>
                                <ul class="inline--style">
                                    <li v-for="item in rating.recommend" class="inline--style recommend__item">
                                        {{item}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '@/components/star/star';
    import split from '@/components/split/split';
    import chooseRating from '@/components/chooseRating/chooseRating';
    import {eventHub} from '@/common/js/eventHub';
    import {getTime} from '@/common/js/getTime';
    export default {
        data () {
            return {
                ratingsType: 'all',
                hasContent: false
            };
        },
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
                    isRatingComponent: true,
                    goodCount: 0,
                    badCount: 0
                };
                this.ratings.map((item) => {
                    if (item.rateType === 0) {
                        rating.goodCount++;
                    } else {
                        rating.badCount++;
                    }
                });
                return rating;
            }
        },
        methods: {
            getTime (time) {
                let timeObj = getTime(time);
                return timeObj.dateStr + ' ' + timeObj.timeStr;
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

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .rating {
        position: absolute;
        width: 100%;
        top: 17.4rem;
        bottom: 4.6rem;
        overflow: auto;
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
        .rating__wrap {
            .chooseRating {
                padding: 1.8rem 1.8rem 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            }
            .rating__content {
                .rating__item {
                    list-style: none;
                    margin: 1.8rem;
                    .user__avatar {
                        float: left;
                        width: 2.8rem;
                        height: 2.8rem;
                        border-radius: 50%;
                    }
                    .user__about {
                        padding-left: 1.2rem;
                        overflow: hidden;
                        font-size: 1rem;
                        line-height: 1.2rem;
                        color: rgb(147, 153, 159);
                        .inline--style {
                            display: inline-block;
                            vertical-align: top;
                        }
                        .userMsg {
                            .userName {
                                float: left;
                                color: rgb(7, 17, 27);
                            }
                            .userRatingTime {
                                float: right;
                                font-weight: 200;
                            }
                        }
                        .userScore {
                            padding-top: 0.4rem;
                            font-size: 0;
                            & > * {
                                display: inline-block;
                                vertical-align: middle;
                            }
                            .deliveryTime {
                                padding-left: 0.6rem;
                                font-size: 1rem;
                                font-weight: 200;
                            }
                        }
                        .userRating {
                            padding-top: 0.6rem;
                            font-size: 1.2rem;
                            line-height: 1.8rem;
                            color: rgb(7, 17, 27);
                        }
                        .userRecommend {
                            display: flex;
                            padding-top: 0.8rem;
                            line-height: 1.6rem;
                            .icon-thumb_up,
                            .icon-thumb_down {
                                flex: 0;
                                padding-top: 0.3rem;
                                font-size: 1.2px;
                            }
                            .icon-thumb_up {
                                color: rgb(0, 160, 220);
                            }
                            ul {
                                flex: 1 0;
                                .recommend__item {
                                    font-size: 0.9rem;
                                    margin-left: 0.8rem;
                                    margin-bottom: 0.4rem;
                                    padding: 0 0.6rem;
                                    border: 1px solid rgba(7, 17, 27, 0.1);
                                    border-radius: 2px;
                                }
                            }

                        }
                    }
                }
            }
        }
    }
</style>
