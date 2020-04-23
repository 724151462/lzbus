<template>
  <div class="avue-logo">
    <transition name="fade">
      <img src="../../assets/imgs/logo.png" v-if="keyCollapse"
            class="avue-logo_subtitle mar-l-5 mar-t-10" width="50"
            key="0">
      />
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <span class="avue-logo_title"
              key="1" style="font-weight: bold; font-size: 18px">{{website.indexTitle}} </span>
      </template>
    </transition-group>
    <!-- <transition-group name="fade">
      <template>
        <span class="avue-logo_title"
              key="1">{{website.indexTitle}} </span>
      </template>
    </transition-group> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "logo",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters(["website", "keyCollapse"])
  },
  methods: {}
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 64px;
  line-height: 64px;
  background-color: #07273E;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 20px;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
</style>