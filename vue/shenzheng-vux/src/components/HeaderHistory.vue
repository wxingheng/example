<template>
  <header>
        <a @click="go()" class="pull-left" style="fill: #fff;position: absolute;
          left: 5px;
          top: 8px;">
           <x-icon type="ios-arrow-back" size="30"></x-icon>
        </a>
        <di class="text-center title">用血审证</di>
    </header>
</template>

<script>
export default {
  // name: "HeaderHistory",
  props: {
    path: {
      type: String,
      default: "#/home"
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
