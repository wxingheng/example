<template>
  <div class="main">
    <!-- <div class="header"></div> -->
    <transition :name="transitionName">
        <router-view class="child-view"></router-view>
    </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
    next();
  }
};
</script>

<style scoped>
/* .child-view {
  position: absolute;
  width:100%;
  height: 100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
  .header {
    position:absolute;
    height:44px;
    background:#0058f1;
    width:100%
  }
  .main{
      width: 100%;
      height: 100%;
  } */

.child-view {
  position: absolute;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  will-change: transform;
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  z-index: 1;
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translateX(-50px);
  transform: translateX(-50px);
  z-index: -1;
}
.header {
  position: absolute;
  height: 44px;
  width: 100%;
}
</style>
