<template>
  <div id="app">
   <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
　　　　return {
　　　　　　transitionName: 'slide-right'  // 默认动态路由变化为slide-right
　　　　}
　　},
　　watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　       this.transitionName = 'slide-left'
　　　　　}
　　this.$router.isBack = false
　　}
　  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

html,
body,
#app {
  width: 100%;
  height: 100%;
}
body {
  // background-color: #f7f5f5;
  background-color:#f7f5f5;
}
* {
  box-sizing: border-box;
}
.color_wh {
  color: #fff;
}

.weui-cell__ft.vux-cell-primary div,
.weui-cell__ft.vux-cell-primary div .vux-number-input,
.weui-cell__ft.vux-cell-primary
  div
  .vux-number-selector {
  box-sizing: content-box;
}
.text-info{
  color: #5bc0de;
}
.clear:before{
		    content: "";
		    display: table;
		  }
.weui-label{
  width: 120px !important;
}
.weui-gallery {
    z-index: 9999 !important;
}
.weui-cells__title{
  padding-left: 0 !important;
  font-size: 20px !important;
  font-weight: bold !important;
  color: #0755B7 !important;
}
.weui-uploader__input-box{
      background: #f2f2f2 !important;
}
.weui-uploader__input-box:before, .weui-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #a9a9a9 !important;
}
.weui-mask_transparent {
    z-index: 9999 !important;
}
</style>
