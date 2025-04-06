<script>
import { MathEx, sleep } from '@ykob/js-util';
import normalizeWheel from 'normalize-wheel';

import store from '@/store';
import WhoIAmSection from '@/components/who-i-am/WhoIAmSection.vue';
import WhoIAmHeading from '@/components/who-i-am/WhoIAmHeading.vue';
import WhoIAmThanks from '@/components/who-i-am/WhoIAmThanks.vue';
import WhoIAmLinks from '@/components/who-i-am/WhoIAmLinks.vue';

export default {
  name: 'WhoIAm',
  metaInfo: {
    title: 'Who I am / '
  },
  components: {
    WhoIAmSection,
    WhoIAmHeading,
    WhoIAmThanks,
    WhoIAmLinks
  },
  data() {
    return {
      scrollY: 0,
      anchorY: 0,
      anchorYPrev: 0,
      clientHeight: 0,
      isRendering: false
    };
  },
  watch: {
    async '$store.state.resolution.y'() {
      await sleep(10);
      this.resize();
    }
  },
  computed: {
    styles() {
      return {
        paddingTop: `${this.$store.state.resolution.y / 2}px`,
        transform: `translate3d(0, ${-this.scrollY}px, 0)`
      };
    }
  },
  beforeRouteEnter(to, from, next) {
    store.commit('transit', {
      globalId: 50
    });
    next();
  },
  created() {
    window.addEventListener('wheel', this.wheel, { passive: false });
    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchmove', this.touchmove);
    this.scrollY = 0;
    this.anchorY = 0;
    this.anchorYPrev = 0;
    this.$store.commit('setScrollProgress', 0);
  },
  async mounted() {
    const { commit } = this.$store;

    commit('changeBackground', {
      isHome: false,
      hasDelay: false
    });
    commit('showHomeObjs', false);
    commit('showWorksObjs', {
      index: 0,
      direction: 1
    });
    commit('showWhoIAmObjs', true);
    await sleep(500);
    commit('showUI');
    this.isRendering = true;
    this.resize();
    this.update();
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchmove', this.touchmove);
    this.isRendering = false;
  },
  methods: {
    update() {
      const { state, commit } = this.$store;

      this.scrollY =
        Math.floor((this.scrollY + (this.anchorY - this.scrollY) / 10) * 100) /
        100;
      commit(
        'setScrollProgress',
        this.scrollY / (this.clientHeight - state.resolution.y)
      );
      if (this.isRendering === true) {
        requestAnimationFrame(this.update);
      }
    },
    wheel(e) {
      e.preventDefault();

      const n = normalizeWheel(e);
      const { state, commit } = this.$store;

      if (state.isWheeling === true) return;

      if (this.scrollY < 1 && n.pixelY < 0) {
        // Go to the previous page.
        commit('startWheeling');
        this.$router.push(`/works/${state.works[state.works.length - 1].key}/`);
      } else {
        // Scroll the content of the current page.
        this.anchorY = MathEx.clamp(
          this.anchorY + n.pixelY,
          0,
          this.clientHeight - state.resolution.y
        );
      }
    },
    touchstart() {
      this.anchorYPrev = this.anchorY;
    },
    touchmove() {
      const { state, commit, dispatch } = this.$store;

      if (state.isTouchMoving === true) {
        if (this.scrollY < 1 && state.touchMove.y > 10) {
          // Go to the previous page.
          dispatch(
            'debounceRouterPush',
            `/works/${state.works[state.works.length - 1].key}/`
          );
          commit('touchEnd');
        } else {
          // Scroll the content of the current page.
          this.anchorY = MathEx.clamp(
            this.anchorYPrev - state.touchMove.y * 1.5,
            0,
            this.clientHeight - state.resolution.y
          );
        }
      }
    },
    resize() {
      const { state, commit } = this.$store;

      this.clientHeight = this.$refs['whoiam-wrap'].clientHeight;
      this.anchorY = MathEx.clamp(
        this.anchorY,
        0,
        this.clientHeight - state.resolution.y
      );
      commit(
        'setScrollProgress',
        this.scrollY / (this.clientHeight - state.resolution.y)
      );
    }
  }
};
</script>

<template lang="pug">
.p-view-wrap
  .p-whoiam-wrap(
    :style = 'styles'
    ref = 'whoiam-wrap'
    )
    .p-whoiam-wrap__in
      WhoIAmHeading
      WhoIAmSection(
        :num = '1'
        :scrollY = 'scrollY'
        :parallaxRatio = '0.1'
        )
        h2
          |I'm a Full Stack Developer.
          br
          |Just love building cool stuff.
        p
          |I love exploring the world of software development. I look forward to all the possibilities in technology. Right now, I'm focused on full-stack development, and I'm passionate about creating innovative solutions.
        p
          |My journey in software engineering began during my studies at Bahria University.
        p
          |As a student, I may not have a formal degree yet, but I am dedicated to learning and growing in this field. I have been fortunate to gain practical experience through various projects and internships.
        p
          |The tech industry in Pakistan is rapidly evolving, and there is ample opportunity for aspiring developers like me. I am continuously learning and adapting to new technologies, and I strive to become proficient in both front-end and back-end development.
      WhoIAmSection(
        :num = '2'
        )
        h2
          |Expressing my identity
          br
          |as a Pakistani Developer.
        p
          |When I started thinking about creating my online presence, I wanted it to be more than just a portfolio. I aimed to express my identity and showcase my journey as a student and developer.
        p
          |Pakistan, my homeland, is a country with immense potential and talent. While we face challenges, I believe our generation has the opportunity to innovate and contribute positively to the tech landscape. I want to reflect my experiences and aspirations through my work.
      WhoIAmSection(
        :num = '3'
        :scrollY = 'scrollY'
        :parallaxRatio = '0.1'
        )
        p
          |I have chosen to represent my journey with symbols of growth and innovation. I aim to create projects that are not only functional but also meaningful. My development approach combines various technologies, and I take pride in being able to express my creativity and technical skills through my work.
        p
          |Initially, I planned to work on this site independently, but I was fortunate to collaborate with talented peers who have inspired me. Their support and insights have greatly enriched my learning experience, and I am grateful for their contributions.
      WhoIAmLinks(
        :scrollY = 'scrollY'
        :parallaxRatio = '0.05'
        )
      WhoIAmThanks
</template>

<style lang="scss">
.p-whoiam-wrap {
  @include l-more-than-mobile {
    margin-right: 7.5%;
    margin-left: 7.5%;
    padding-bottom: 300px;
  }
  @include l-mobile {
    margin-right: 44px;
    margin-left: 44px;
    padding-bottom: 44px;
  }
  &__in {
    position: relative;
    margin-top: -25px;
  }
}
</style>
