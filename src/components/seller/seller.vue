<template>
    <div class="seller">
        <section class="seller__aboutScore">
            <div class="score__first border--1px clearfix">
                <div class="msg">
                    <h1 class="title">{{seller.name}}</h1>
                    <div class="sellerScore">
                        <v-star class="star" :starSize="36" :starScore="seller.score"></v-star>
                        <span class="starScore">{{seller.score}}</span>
                        <span class="sellCount">月售{{seller.sellCount}}单</span>
                    </div>
                </div>
                <div class="collect" @click="collect()">
                    <span class="icon-favorite" :class="{'active': isCollect}"></span>
                    <p class="collectText">{{getCollectText}}</p>
                </div>
            </div>
            <div class="score__second">
                <div class="item">
                    <p>起送价</p>
                    <p><span class="big">{{seller.minPrice}}</span>元</p>
                </div>
                <div class="item">
                    <p>商家配送</p>
                    <p><span class="big">{{seller.deliveryPrice}}</span>元</p>
                </div>
                <div class="item">
                    <p>平均配送时间</p>
                    <p><span class="big">{{seller.deliveryTime}}</span>分钟</p>
                </div>
            </div>
        </section>
        <v-split></v-split>
        <section class="seller__aboutNotice">
            <h1 class="title">公告与活动</h1>
            <p class="notice__content">{{seller.bulletin}}</p>
            <ul>
                <li v-for="support in seller.supports" class="concessionItem border--1px">
                    <v-concession :concessionType="support.type" :concessionContent="support.description"
                                  :concessionSize="3" class="concession"></v-concession>
                </li>
            </ul>
        </section>
        <v-split></v-split>
        <section class="seller__aboutPhoto">
            <h1 class="title">商家实景</h1>
            <div class="photoWrap">
                <img v-for="pic in seller.pics" :src="pic" alt="商家图片" class="photo">
            </div>
        </section>
        <v-split></v-split>
        <section class="seller__aboutMsg">
            <h1 class="title">商家信息</h1>
            <ul class="infoWrap">
                <li v-for="info in seller.infos" class="infoItem border--1px">
                    {{info}}
                </li>
            </ul>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    import split from '@/components/split/split';
    import star from '@/components/star/star';
    import concession from '@/components/concession/concession';
    export default {
        data () {
            return {
                isCollect: false
            };
        },
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            'v-split': split,
            'v-star': star,
            'v-concession': concession
        },
        computed: {
            getCollectText () {
                return this.isCollect ? '已收藏' : '未收藏';
            }
        },
        methods: {
            collect () {
                this.isCollect = !this.isCollect;
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .seller {
        position: absolute;
        width: 100%;
        top: 17.4rem;
        bottom: 4.6rem;
        overflow: auto;
        .title {
            margin: 0;
            font-size: 1.4rem;
            line-height: 1.4rem;
            color: rgb(7, 17, 27);
            padding-bottom: 0.8rem;
        }
        .seller__aboutScore {
            margin: 1.8rem;
            .score__first {
                padding-bottom: 1.8rem;
                overflow: hidden;
                @include border-bottom-1px(rgba(7, 17, 27, 0.1));
                .msg {
                    float: left;
                    .sellerScore {
                        font-size: 0;
                        line-height: 1.8rem;
                        color: rgb(77, 85, 93);
                        & > * {
                            display: inline-block;
                            vertical-align: top;
                        }
                        .starScore {
                            padding: 0 1.2rem 0 0.8rem;
                        }
                        .starScore,
                        .sellCount {
                            font-size: 1rem;
                        }
                    }
                }
                .collect {
                    float: right;
                    text-align: center;
                    .icon-favorite {
                        font-size: 2.4rem;
                        line-height: 2.4rem;
                        &.active {
                            color: rgb(240, 20, 20);
                        }
                    }
                    .collectText {
                        padding-top: 0.4rem;
                        font-size: 1rem;
                        line-height: 1rem;
                        color: rgb(77, 85, 93);
                    }

                }
            }
            .score__second {
                padding-top: 1.8rem;
                display: flex;
                .item {
                    flex: 1;
                    text-align: center;
                    p:first-child {
                        font-size: 1rem;
                        line-height: 1rem;
                        padding-bottom: 0.4rem;
                        color: rgb(147, 153, 159);
                    }
                    p:last-child {
                        font-size: 1rem;
                        font-weight: 200;
                        color: rgb(7, 17, 27);
                        line-height: 2.4rem;
                        .big {
                            font-size: 2.4rem;
                        }
                    }
                }
            }
        }
        .seller__aboutNotice {
            margin: 1.8rem 1.8rem 0 1.8rem;
            .notice__content {
                padding: 0 1.2rem 1.6rem;
                font-size: 1.2rem;
                line-height: 2.4rem;
                font-weight: 200;
                color: rgb(240, 20, 20);
            }
            .concessionItem {
                @include border-top-1px(rgba(7, 17, 27, 0.1));
                list-style: none;
                padding: 1.6rem 1.2rem;
                .concession {
                    font-size: 1.2rem;
                    line-height: 1.6rem;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                }
            }

        }
        .seller__aboutPhoto {
            margin: 1.8rem;
            .photoWrap {
                height: 9rem;
                width: 100%;
                overflow-x: scroll;
                white-space: nowrap;
                .photo {
                    display: inline-block;
                    padding: 0.4rem 0;
                    width: 12rem;
                    height: 9rem;
                    box-sizing: border-box;
                }
                .photo + .photo {
                    margin-left: 0.6rem;
                }
            }

        }
        .seller__aboutMsg {
            margin: 1.8rem 1.8rem 0;
            .infoWrap {
                padding-top: 0.4rem;
                .infoItem {
                    list-style: none;
                    padding: 1.6rem 1.2rem;
                    font-size: 1.2rem;
                    font-weight: 200;
                    line-height: 1.6rem;
                    color: rgb(7, 17, 27);
                    @include border-top-1px(rgba(7, 17, 27, 0.1));
                }
            }
        }
    }
</style>
