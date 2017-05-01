<template>
    <div class="food__choose" ref="wrap">
        <transition name="move">
            <span class="food__subtract icon-remove_circle_outline" v-show="food.count > 0" @click="subtractFood()"></span>
        </transition>
        <transition name="fade">
            <span class="food__num" v-show="food.count > 0">{{food.count}}</span>
        </transition>
        <span class="food__add icon-add_circle" @click="addFood()" ref="add"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import {eventHub} from '@/common/js/eventHub';
    import {Animate} from '@/common/js/animate';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addFood () {
                this.food.count++;
                this.addFoodAnimate();
            },
            subtractFood () {
                console.log('--');
                if (this.food.count > 0) {
                    this.food.count--;
                    eventHub.$emit('subtractFood');
                }
            },
            addFoodAnimate () {
                // 创建动画的dom
                let ballNode = document.createElement('span');
                ballNode.className = 'animateBall';
                console.log(this.$refs.add.getBoundingClientRect().left);
                ballNode.style.left = this.$refs.add.getBoundingClientRect().left + 'px';
                ballNode.style.top = this.$refs.add.getBoundingClientRect().top + 'px';
                this.$refs.wrap.appendChild(ballNode);

                // 计算动画属性
                let cartNode = document.getElementsByClassName('icon-shopping_cart')[0],
                    self = this;
                let disX = ballNode.getBoundingClientRect().left - cartNode.getBoundingClientRect().left,
                    disY = cartNode.getBoundingClientRect().top - ballNode.getBoundingClientRect().top,
                    upY = 50,
                    downY = disY + upY,
                    allT = 600,
                    upT = allT - allT / (Math.sqrt(upY / downY) + 1),
                    upX = disX / allT * upT,
                    downT = allT - upT,
                    downX = disX - upX;

                // 动画部分
                let ballUp = new Animate(upT, (p) => {
                    let bY = upY * p * (2 - p),
                        bX = upX * p;
                    ballNode.style.transform = `translate(-${bX}px, -${bY}px)`;
                });
                let ballDown = new Animate(downT, (p) => {
                    let bY = downY * p * p,
                        bX = downX * p;
                    ballNode.style.transform = `translate(-${upX + bX}px, ${bY - upY}px)`;
                });

                async function run () {
                    await ballUp.animate();
                    await ballDown.animate();
                    eventHub.$emit('animateEnd');
                    self.$refs.wrap.removeChild(ballNode);
                }
                run();
            }
        },
        created () {
            if (this.food.count === undefined) {
                Vue.set(this.food, 'count', 0);
            }
        }
    };
</script>

<style type="text/scss" lang="scss">
    .food__choose {
        font-size: 0;
        .food__subtract,
        .food__add,
        .food__num,
        .animateBall{
            display: inline-block;
            line-height: 2.4rem;
            font-size: 2.4rem;
            vertical-align: middle;
            color: #15c9ff;
        }
        .food__add {
            z-index: 10;
        }
        .food__num {
            width: 2.4rem;
            text-align: center;
            font-size: 1rem;
        }
        .animateBall {
            position: fixed;
            height: 1.7rem;
            width: 1.7rem;
            border-radius: 50%;
            background-color: red;
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
