<script>
export default {
  name: 'GlobalTitle',
  computed: {
    classnames() {
      return {
        'is-shown': this.$store.state.isShownUI === true
      };
    }
  }
};
</script>

<template lang="pug">
  .p-global-title(
    :class = 'classnames'
    )
    router-link.p-global-title__wrap(
      to = '/'
      )
      .p-global-title__typo.p-global-title__typo--1
        .p-global-title__typo-in.p-global-title__typo-in--1
          |W
      .p-global-title__typo.p-global-title__typo--2
        .p-global-title__typo-in.p-global-title__typo-in--2
          |I
</template>

<style lang="scss">
.p-global-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  z-index: 100;
  line-height: 1;
  @include l-more-than-mobile {
    width: 7.5%;
    top: 55px;
  }
  @include l-mobile {
    top: 22px;
    width: 44px;
  }
  &__wrap {
    cursor: pointer;
    display: block;
    text-decoration: none;
  }
  &__typo {
    display: block;
    overflow: hidden;
    @include fontSizeAll(24, 24, 20);
    &--1 {
      transform: rotate(0deg);
    }
    &--2 {
      margin-top: 0.05em;
      margin-left: 0.25em;
    }
  }

  // Transition
  &__typo-in {
    // Interaction
    transition-duration: 0.6s;
    transition-property: transform;
    transition-property: $easeOutCirc;
    &--1 {
      transform: translate3d(1.01em, 0, 0);
    }
    &--2 {
      transform: translate3d(-1.01em, 0, 0);
      transition-delay: 0.1s;
    }
    .is-shown & {
      transform: translate3d(0, 0, 0);
    }
  }
}
</style>
