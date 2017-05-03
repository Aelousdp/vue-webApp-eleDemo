<template>
    <div class="chooseRating">
        <div class="chooseBox__wrap border--1px">
            <div class="chooseBox box--common" :class="{'active': statusCode === '100'}" @click="getRatings('all')">
                <span>全部</span>
                <span>{{getRatingsLength}}</span>
            </div>
            <div class="chooseBox box--common" :class="{'active': statusCode === '010'}" @click="getRatings('good')">
                <span>{{goodRating}}</span>
                <span>{{ratings.goodCount}}</span>
            </div>
            <div class="chooseBox box--bad" :class="{'active': statusCode === '001'}" @click="getRatings('bad')">
                <span>{{badRating}}</span>
                <span>{{ratings.badCount}}</span>
            </div>
        </div>
        <div class="chooseContent" @click="check()">
            <span class="icon-check_circle" :class="{'active': isCheck}"></span>
            <span>只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {eventHub} from '@/common/js/eventHub';
    export default {
        data () {
            return {
                goodRating: '',
                badRating: '',
                statusCode: '100',
                isCheck: false
            };
        },
        props: {
            ratings: {
                type: Object
            }
        },
        created () {
            if (!this.ratings.isRatingComponent) {
                this.goodRating = '推荐';
                this.badRating = '吐槽';
            } else {
                this.goodRating = '满意';
                this.badRating = '不满意';
            }
        },
        computed: {
            getRatingsLength () {
                return this.ratings.goodCount + this.ratings.badCount;
            }
        },
        methods: {
            getRatings (type) {
                switch (type) {
                    case 'all':
                        this.statusCode = '100';
                        break;
                    case 'good':
                        this.statusCode = '010';
                        break;
                    case 'bad':
                        this.statusCode = '001';
                        break;
                }
                eventHub.$emit('getRatings', type);
            },
            check () {
                this.isCheck = !this.isCheck;
                eventHub.$emit('hasContent', this.isCheck);
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .chooseRating {
        .chooseBox__wrap {
            font-size: 0;
            padding-bottom: 1.8rem;
            @include border-bottom-1px(rgba(7, 17, 27, 0.1));
            .chooseBox {
                display: inline-block;
                padding: 0.8rem 1.2rem;
                font-size: 1.2rem;
                line-height: 1.6rem;
                color: rgb(77, 85, 93);
                &.box--common {
                    background-color: rgba(0, 160, 220, 0.2);
                }
                &.box--bad {
                    background-color: rgba(77, 85, 93, 0.2);
                }
                span:last-child {
                    font-size: 0.8rem;
                }
                &.active {
                    background-color: rgb(0, 160, 220);
                    span {
                        color: #ffffff;
                    }
                }
            }
            .chooseBox + .chooseBox {
                margin-left: 0.8rem;
            }
        }
        .chooseContent {
            padding: 1.2rem 0;
            font-size: 0;
            color: rgb(147, 153, 159);
            span {
                font-size: 1.2rem;
                line-height: 2.4rem;
                vertical-align: middle;
            }
            span:first-child {
                font-size: 2.4rem;
            }
            span + span {
                margin-left: 0.4rem;
            }
            .active {
                color: rgb(0, 160, 220);
            }
        }
    }
</style>
