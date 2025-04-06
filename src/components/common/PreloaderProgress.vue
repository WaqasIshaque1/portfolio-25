<script>
export default {
  name: 'PreloaderProgress',
  computed: {
    ratio() {
      const { preloadProgress, preloadMax } = this.$store.state;
      return preloadProgress / preloadMax;
    },
    stylesRightRect() {
      return {
        opacity: this.ratio >= 0.5 ? 1 : 0
      };
    },
    stylesLeftRect() {
      return {
        opacity: this.ratio >= 0.5 ? 0 : 1
      };
    },
    stylesRotateRect() {
      return {
        transform: `rotate(${this.ratio * 354}deg)`
      };
    }
  }
};
</script>

<template lang="pug">
  .preloader-progress
    .preloader-progress__inner
      // SVG removed
</template>

<style lang="scss">
.preloader-progress {
  position: absolute;
  animation-name: rotate;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  @include l-more-than-mobile {
    width: 252px;
    height: 252px;
    top: calc(50% - 126px);
    left: calc(50% - 126px);
  }
  @include l-mobile {
    width: 150px;
    height: 150px;
    top: calc(50% - 75px);
    left: calc(50% - 75px);
  }
  &__inner {
    .preloader-enter & {
      opacity: 0;
      transform: scale(0.6);
    }
    .preloader-enter-to & {
      transform: scale(1);
      transition-duration: 1.4s;
      transition-timing-function: $easeOutCirc;
      transition-property: opacity, transform;
    }
    .preloader-leave-to & {
      opacity: 0;
      transform: scale(1.8);
      transition-duration: 1.4s;
      transition-delay: 0.8s;
      transition-timing-function: $easeInExpo;
      transition-property: opacity, transform;
    }
  }
  .mask-rotate-group {
    transform: rotate(34deg);
    transform-origin: center center;
  }
  .mask-rotate-rect {
    transform-origin: center center;
  }
}
</style>
