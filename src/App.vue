<script>
import * as THREE from 'three';
import { debounce, sleep } from '@ykob/js-util';

import GlobalTitle from '@/components/global/GlobalTitle.vue';
import UtilityNavi from '@/components/global/UtilityNavi.vue';
import WorksNavi from '@/components/global/WorksNavi.vue';
import Preloader from '@/components/global/Preloader.vue';
import Guide from '@/components/global/Guide.vue';

export default {
  name: 'App',
  metaInfo: {
    title: '',
    titleTemplate: 'Waqas Ishaque',
    meta: [
      {
        name: 'description',
        content: "I'm a Web Developer.Just love Building cool stuff."
      }
    ]
  },
  components: {
    GlobalTitle,
    UtilityNavi,
    WorksNavi,
    Preloader,
    Guide
  },
  data() {
    return {
      vTouchStart: new THREE.Vector2(),
      vTouchMoveStart: new THREE.Vector2(),
      vTouchMove: new THREE.Vector2(),
      isTouchMoving: false
    };
  },
  async created() {
    const { state, commit, dispatch } = this.$store;

    document.body.append(state.canvas);
    state.canvas.style = `
        position: absolute;
        top: 0;
        left: 0;
      `;

    // On global events.
    window.addEventListener('resize', debounce(this.resize, 100));
    window.addEventListener('mousemove', this.mousemove);
    document.addEventListener('mouseleave', this.mouseleave);
    document.addEventListener('touchstart', this.touchstart);
    document.addEventListener('touchmove', this.touchmove);
    document.addEventListener('touchend', this.touchend);

    await sleep(500);
    commit('showPreloader');
    this.update();
    await dispatch('initWebGL');
    state.webgl.start();
  },
  computed: {
    transitionName() {
      return this.$store.state.isTransitionDescend === true
        ? 'view'
        : 'view-asc';
    }
  },
  methods: {
    update() {
      const { commit } = this.$store;
      const {
        webgl,
        preloadMax,
        preloadProgress,
        isLoaded
      } = this.$store.state;
      if (isLoaded === false) {
        commit('updatePreloadProgress');
        if (preloadProgress / preloadMax > 0.999) {
          this.loaded();
        }
      } else {
        webgl.update();
      }
      requestAnimationFrame(this.update);
    },
    async loaded() {
      const { state, commit } = this.$store;

      this.resize();
      commit('loaded');
      if (this.$route.name === 'home') {
        await sleep(800);
      } else {
        await sleep(2400);
      }
      state.webgl.play();
      commit('showView');
    },
    resize() {
      const { commit } = this.$store;
      const { canvas, resolution, webgl } = this.$store.state;

      resolution.set(document.body.clientWidth, window.innerHeight);
      canvas.width = resolution.x;
      canvas.height = resolution.y;
      commit('changeMediaQuery', resolution.x < 768);
      webgl.resize();
    },
    mousemove(e) {
      const { state } = this.$store;

      if (state.isShownUI === false || state.isEnabledTouch === true) {
        return;
      }

      const { resolution, mouse, mousePrev, mouseForce } = this.$store.state;

      if (mousePrev.length() !== 0) mousePrev.copy(mouse);
      mouse.set(
        (e.clientX / resolution.x) * 2 - 1,
        -(e.clientY / resolution.y) * 2 + 1
      );
      if (mousePrev.length() === 0) mousePrev.copy(mouse);
      mouseForce.copy(mouse.clone().sub(mousePrev));
    },
    mouseleave() {
      const { mouse, mousePrev, mouseForce } = this.$store.state;

      mouse.set(0, 0);
      mousePrev.set(0, 0);
      mouseForce.set(0, 0);
    },
    touchstart(e) {
      const { commit } = this.$store;

      commit('setEnabledTouch', true);
      commit('startTouch');
      this.vTouchStart.set(e.touches[0].clientX, e.touches[0].clientY);
      this.vTouchMove.set(e.touches[0].clientX, e.touches[0].clientY);
    },
    touchmove(e) {
      const { state, commit } = this.$store;

      if (state.isTouchStarted === false) return;
      this.vTouchMove.set(e.touches[0].clientX, e.touches[0].clientY);
      if (state.isTouchMoving === false) {
        // judge whether the touch is a swipe or a single tap.
        if (
          this.vTouchStart
            .clone()
            .sub(this.vTouchMove)
            .length() > 3
        ) {
          this.vTouchMoveStart.set(e.touches[0].clientX, e.touches[0].clientY);
          commit('startTouchMove');
        }
      } else {
        // judge whether the swipe direction is X or Y.
        commit('touchMove', {
          x: this.vTouchMove.x - this.vTouchMoveStart.x,
          y: this.vTouchMove.y - this.vTouchMoveStart.y
        });
      }
    },
    touchend() {
      this.$store.commit('touchEnd');
    }
  }
};
</script>

<template lang="pug">
  div
    GlobalTitle
    UtilityNavi
    WorksNavi
    main
      transition(
        :name = 'transitionName'
        :duration= '3000'
        appear
        v-if = '$store.state.isShowView === true'
        )
        router-view
    Preloader
    Guide(
      v-if = 'false'
      )
</template>

<style lang="scss">
@import '@/assets/scss/foundation/font.scss';

@import '@/assets/scss/foundation/normalize.scss';
@import '@/assets/scss/foundation/global.scss';
@import '@/assets/scss/foundation/keyframes.scss';
@import '@/assets/scss/object/project/view-wrap.scss';
</style>
