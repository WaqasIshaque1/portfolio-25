<script>
export default {
  name: 'WhoIAmThanks'
};
</script>

<template lang="pug">
  .p-whoiam-credit
    .p-whoiam-credit__line
    h2.p-whoiam-credit__heading
      |Credits
    p.p-whoiam-credit__text
      |3D MODELS : CGTrader
      br
      |Design : Shunsuke Iseki
      br
      |Development : Waqas Ishaque
</template>

<style lang="scss">
.p-whoiam-credit {
  position: relative;
  @include l-more-than-mobile {
    padding-left: math.div(500, 1360) * 100%;
  }
  @include l-mobile {
  }
  &__line {
    @include l-more-than-mobile {
      width: calc(360 / 1360 * 100% - 20px);
      height: 1px;
      position: absolute;
      top: 1em;
      left: 0;
      background-color: rgba(#dfc7a4, 0.3);
    }
    @include l-mobile {
    }
  }
  &__heading {
    margin: 0;
    @include fontSizeAll(12, 12, 9);
    font-weight: 400;
    @include l-more-than-mobile {
      width: math.div(140, 1000) * 100%;
      position: absolute;
      top: 0;
      left: math.div(360, 1360) * 100%;
    }
    @include l-mobile {
    }
  }

  // Transition
  transition-property: opacity, transform;
  .view-enter &,
  .view-asc-enter & {
    opacity: 0;
  }
  .view-enter &,
  .view-asc-leave-to & {
    transform: translate3d(0, 100px, 0);
  }
  .view-asc-enter &,
  .view-leave-to & {
    transform: translate3d(0, -100px, 0);
  }
  .view-enter-to &,
  .view-asc-enter-to & {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: 1.3s;
    transition-timing-function: $easeOutQuad;
  }
  .view-leave-to &,
  .view-asc-leave-to & {
    opacity: 0;
    transition-duration: 0.6s;
    transition-delay: 0.1s;
    transition-timing-function: $easeInQuad;
  }
}
</style>
