<template>
    <div class="starLevel" :class="starType">
        <span class="star" v-for="item in items" :class="item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
    const STAR_LEN = 5;
    const STAR_ON = 'star--on';
    const STAR_HALF = 'star--half';
    const STAR_OFF = 'star--off';
    export default {
        props: {
            starScore: {
                type: Number
            },
            starSize: {
                type: Number
            }
        },
        computed: {
            starType () {
                return 'star--' + this.starSize;
            },
            items () {
                let result = [];
                let computedScore = Math.floor(this.starScore * 2) / 2;
                let onStarNum = Math.floor(computedScore);
                let offStarNum = (computedScore % 1 === 0) ? 0 : 1;

                for (let i = 0; i < onStarNum; i++) {
                    result.push(STAR_ON);
                }
                if (offStarNum) {
                    result.push(STAR_HALF);
                }
                while (result.length < STAR_LEN) {
                    result.push(STAR_OFF);
                }
                return result;
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/scss/mixin.scss';
    .starLevel {
        .star {
            display: inline-block;
            background-size: cover;
        }
    }
    .star--48 {
        .star {
            width: 2rem;
            height: 2rem;
        }
        .star + .star {
            margin-left: 2rem;
        }
        .star--on {
            @include img-dpi('star48_on')
        }
        .star--half {
            @include img-dpi('star48_half')
        }
        .star--off {
            @include img-dpi('star48_off')
        }
    }
    .star--36 {
        .star {
            width: 1.5rem;
            height: 1.5rem;
        }
        .star + .star {
            margin-left: 0.7rem;
        }
        .star--on {
            @include img-dpi('star36_on')
        }
        .star--half {
            @include img-dpi('star36_half')
        }
        .star--off {
            @include img-dpi('star36_off')
        }
    }
    .star--24 {
        .star {
            width: 1rem;
            height: 1rem;
        }
        .star + .star {
            margin-left: 0.5rem;
        }
        .star--on {
            @include img-dpi('star24_on')
        }
        .star--half {
            @include img-dpi('star24_half')
        }
        .star--off {
            @include img-dpi('star24_off')
        }
    }
</style>
