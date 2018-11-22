<template>
  <header>
        <a id="navback" v-if="!noBack" @click="go()" class="pull-left" style="fill: #fff;position: absolute;
          left: 5px;
          top: 8px;">
           <x-icon type="ios-arrow-back" size="30"></x-icon>
        </a>
        <di class="text-center title">{{text}}</di>
    </header>
</template>

<script>
export default {
  // name: "HeaderHistory",
  props: {
    path: {
      type: String,
      default: "#/home"
    },
     text: {
      type: String,
      default: "用血审证"
    },
    noBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    go: function(){
      this.$router.goBack()
    }
  }
};
</script>
<style>
header {
  padding: 0.2rem 0;
  background-image: url(../assets/top.jpg);
  background-size: cover;
  color: #fff;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
}
.title{
  font-size: 26px;
  color: #fff;
}
</style>
