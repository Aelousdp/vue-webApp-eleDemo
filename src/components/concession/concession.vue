<template>
    <div class="concession__item" :class="itemSize">
        <span :class="supportsArr[concessionType]"></span><span>{{ concessionContent }}</span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            concessionType: {
                type: Number
            },
            concessionContent: {
                type: String
            },
            concessionSize: {
                type: Number
            }
        },
        created () {
            this.supportsArr = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        computed: {
            itemSize () {
                return 'concession--' + this.concessionSize;
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .concession__item {
        span {
            vertical-align: middle;
        }
        & > span:first-child {
            display: inline-block;
            background-size: cover;
        }
    }

    .concession--1 {
        & > span:first-child {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.4rem;
        }
        .decrease {
            @include img-dpi('decrease_1');
        }
        .discount {
            @include img-dpi('discount_1');
        }
        .special {
            @include img-dpi('special_1');
        }
        .invoice {
            @include img-dpi('invoice_1');
        }
        .guarantee {
            @include img-dpi('guarantee_1');
        }
    }

    .concession--2 {
        & > span:first-child {
                width: 1.6rem;
                height: 1.6rem;
                margin-right: 0.6rem;
            }
        .decrease {
            @include img-dpi('decrease_2');
        }
        .discount {
            @include img-dpi('discount_2');
        }
        .special {
            @include img-dpi('special_2');
        }
        .invoice {
            @include img-dpi('invoice_2');
        }
        .guarantee {
            @include img-dpi('guarantee_2');
        }
    }

    .concession--3 {
        & > span:first-child {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.4rem;
        }
        .decrease {
            @include img-dpi('decrease_3');
        }
        .discount {
            @include img-dpi('discount_3');
        }
        .special {
            @include img-dpi('special_3');
        }
        .invoice {
            @include img-dpi('invoice_3');
        }
        .guarantee {
            @include img-dpi('guarantee_3');
        }
    }

    .concession--4 {
        & > span:first-child {
            width: 1.6rem;
            height: 1.6rem;
            margin-right: 0.6rem;
        }
        .decrease {
            @include img-dpi('decrease_4');
        }
        .discount {
            @include img-dpi('discount_4');
        }
        .special {
            @include img-dpi('special_4');
        }
        .invoice {
            @include img-dpi('invoice_4');
        }
        .guarantee {
            @include img-dpi('guarantee_4');
        }
    }
</style>
