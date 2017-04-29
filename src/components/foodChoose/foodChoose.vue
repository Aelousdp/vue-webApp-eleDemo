<template>
    <div class="food__choose">
        <transition name="move">
            <span class="food__subtract icon-remove_circle_outline" v-show="food.count > 0" @click="subtractFood()"></span>
        </transition>
        <transition name="fade">
            <span class="food__num" v-show="food.count > 0">{{food.count}}</span>
        </transition>
        <span class="food__add icon-add_circle" @click="addFood()"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addFood () {
                this.food.count++;
            },
            subtractFood () {
                if (this.food.count > 0) {
                    this.food.count--;
                }
            }
        },
        created () {
            Vue.set(this.food, 'count', 0);
        }
    };
</script>

<style type="text/scss" lang="scss" scoped>
    .food__choose {
        position: absolute;
        bottom: 1.8rem;
        right: 1.8rem;
        font-size: 0;
        .food__subtract,
        .food__add,
        .food__num{
            display: inline-block;
            line-height: 2.4rem;
            font-size: 2.4rem;
            vertical-align: middle;
            color: #15c9ff;
        }
        .food__num {
            width: 2.4rem;
            text-align: center;
            font-size: 1rem;
        }
        .move-enter-active,
        .move-leave-active{
            transition: all 0.5s linear;
        }
        .move-enter,
        .move-leave-active {
            transform: translateX(4.8rem) rotate(180deg);
            opacity: 0;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: all 0.6s linear;
        }
        .fade-enter,
        .fade-leave-active {
            opacity: 0;
        }
    }
</style>
