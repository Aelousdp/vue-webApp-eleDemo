<template>
    <header class="header">
        <div class="header__content clearfix">
            <img :src="sellerMsg.avatar" alt="商家头像" class="header__avatar">
            <div class="header__seller">
                <p>
                    <span class="header__seller__brand"></span>
                    <span>{{sellerMsg.name}}</span>
                </p>
                <p>{{sellerMsg.description}}/{{sellerMsg.deliveryTime}}分钟送达</p>

                <p v-if="sellerMsg.supports">
                    <v-concession :concessionSize="1" :concessionType="sellerMsg.supports[0].type"
                                  :concessionContent="sellerMsg.supports[0].description"></v-concession>
                </p>
            </div>
            <div v-if="sellerMsg.supports" class="seller__supports" @click="showMask">
                <span>{{sellerMsg.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="header__notice clearfix" @click="showMask">
            <span class="notice__img"></span>
            <span class="notice_content">{{sellerMsg.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="header__bg">
            <img :src="sellerMsg.avatar" alt="头部背景图片">
        </div>
        <div class="mask" v-show="isMask">
            <div class="mask__content__wrap">
                <section class="mask__header">
                    <h1>{{sellerMsg.name}}</h1>
                    <div class="star__wrap">
                        <v-star :starScore="sellerMsg.score" :starSize="48"></v-star>
                    </div>
                </section>
                <section class="info__wrap">
                    <div class="info__title">
                        <h2>优惠信息</h2>
                    </div>
                    <div class="concession__content" v-if="sellerMsg.supports">
                        <v-concession class="concession__content__item" v-for="item in sellerMsg.supports" :concessionSize="2"
                                      :concessionType="item.type"
                                      :concessionContent="item.description" :key="item.id"></v-concession>
                    </div>
                </section>
                <section class="info__wrap">
                    <div class="info__title">
                        <h2>商家公告</h2>
                    </div>
                    <div class="notice__content">
                        <p>{{sellerMsg.bulletin}}</p>
                    </div>
                </section>

            </div>
            <div class="mask__close">
                <i class="icon-close" @click="hiddenMask"></i>
            </div>
        </div>
    </header>


</template>

<script type="text/ecmascript-6">
    import star from '@/components/star/star';
    import concession from '@/components/concession/concession';
    export default {
        data () {
            return {
                supportsArr: [],
                isMask: false
            };
        },
        components: {
            'v-star': star,
            'v-concession': concession
        },
        props: {
            sellerMsg: {
                type: Object
            }
        },
        methods: {
            showMask () {
                this.isMask = true;
            },
            hiddenMask () {
                this.isMask = false;
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .header {
        position: relative;
        overflow: hidden;
        color: #fff;
        .header__content {
            position: relative;
            background-color: rgba(7, 17, 27, 0.5);
            padding: 2.4rem 0 1.8rem 2.4rem;
            overflow: hidden;
            .header__avatar {
                float: left;
                height: 6.4rem;
                width: 6.4rem;
            }
            .header__seller {
                display: table-cell;
                padding-left: 1.6rem;
                & > p:nth-child(1) {
                    padding-top: 0.2rem;
                    font-size: 1.6rem;
                    font-weight: bold;
                    line-height: 1.8rem;
                    span {
                        vertical-align: middle;
                    }
                }
                & > p:nth-child(2) {
                    padding-top: 0.8rem;
                    font-size: 1.2rem;
                    line-height: 1.2rem;
                    font-weight: 200;
                }
                & > p:nth-child(3) {
                    padding-top: 1rem;
                    font-size: 1rem;
                    line-height: 1.2rem;
                    font-weight: 200;
                }
                .header__seller__brand {
                    display: inline-block;
                    width: 30px;
                    height: 18px;
                    background-size: cover;
                    @include img-dpi('brand');
                }
            }
            .seller__supports {
                position: absolute;
                height: 2.4rem;
                right: 1.2rem;
                bottom: 1.4rem;
                padding: 0 0.8rem;
                border-radius: 0.7rem;
                background-color: rgba(0 ,0, 0, 0.2);
                font-size: 1rem;
                font-weight: 200;
                line-height: 2.4rem;
                .icon-keyboard_arrow_right {
                    line-height: 2.4rem;
                    font-size: 1rem;
                    padding-left: 0.4rem;
                    vertical-align: middle;
                }
            }
        }

        .header__notice {
            position: relative;
            height: 2.8rem;
            padding: 0 2.6rem 0 1.2rem;
            line-height: 2.8rem;
            background: rgba(7, 17, 27, 0.2);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .notice__img {
                display: inline-block;
                width: 2.2rem;
                height: 1.2rem;
                background-size: cover;
                margin-top: 0.6rem;
                @include img-dpi('bulletin');
            }
            .notice_content {
                font-size: 1rem;
                vertical-align: top;
            }
            .icon-keyboard_arrow_right {
                position: absolute;
                right: 1.2rem;
                line-height: 2.8rem;
                font-size: 1rem;
                padding-left: 0.4rem;
            }
        }

        .header__bg {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            img {
                width: 100%;
                filter: blur(10px);
            }
        }

        .mask {
            position: fixed;
            display: flex;
            flex-flow: column;
            left: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            /*min-height: 100vh;*/
            background: rgba(7, 17, 27, 0.8);
            z-index: 9999;
            color: #fff;
            overflow: auto;
            .mask__content__wrap {
                flex: 1;
                .mask__header {
                    padding-top: 6.4rem;
                    h1 {
                        text-align: center;
                        font-size: 1.6rem;
                        font-weight: 700;
                        line-height: 1.6rem;
                        margin: 0;
                    }
                    .star__wrap {
                        padding-top: 1.6rem;
                        text-align: center;
                    }
                }
                .info__wrap {
                    margin: 2.8rem 3.6rem 2.4rem;
                    .info__title {
                        display: flex;
                        margin-bottom: 2.4rem;
                        h2 {
                            padding: 0 1.2rem;
                            font-size: 1.4rem;
                            font-weight: 700;
                            line-height: 1.4rem;
                            letter-spacing: 0.1rem;
                        }
                        &:before {
                             content: " ";
                             height: 0.1rem;
                             margin: 0.6rem 0;
                             flex: 1;
                             background-color: rgba(255, 255, 255, 0.2);
                         }
                        &:after{
                             content: " ";
                             height: 0.1rem;
                             margin: 0.6rem 0;
                             flex: 1;
                             background-color: rgba(255, 255, 255, 0.2);
                         }
                    }
                    .concession__content {
                        margin: 0 1.2rem;
                        .concession__content__item {
                            font-size: 1.2rem;
                            font-weight: 200;
                            line-height: 1.2rem;
                        }
                        .concession__content__item + .concession__content__item {
                            margin-top: 1.2rem;
                        }
                    }
                    .notice__content {
                        margin: 0 1.2rem;
                        p {
                            font-size: 1.2rem;
                            line-height: 2.4rem;
                            font-weight: 200;
                        }
                    }
                }
            }
            .mask__close {
                height: 3.2rem;
                margin-bottom: 3.2rem;
                text-align: center;
                .icon-close {
                    font-size: 3.2rem;
                    line-height: 3.2rem;
                    color: rgba(255, 255, 255, 0.5)
                }
            }
        }
    }

    .header--mask {
        filter: blur(10px);
    }
</style>
