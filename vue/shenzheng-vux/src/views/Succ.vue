<template>
  <div class="layout">
      <header-history :path="'#/apply'"></header-history>
      <div class="reply_frame p-a" style="text-align: center;">
          <span class="center-block submit_bg"></span>
          <div v-show="caseType !== '5'">
            <p class="text-center">        您好，您的申请请求已提交！<br>
                我们将于 2个工作日之内予以答复</p>
          <span class="center-block">您可通过微信中 “审证查询” 功能查询进度</span>
          </div>
          <div v-show="caseType === '5'">
            <p class="text-center"> 您好，您的用血审证资料已提交！<br>
            请带齐资料到血液管理办公室办理手续。</p>
          <!-- <span class="center-block">您可通过微信中 “审证查询” 功能查询进度</span> -->
          <a href="javascript:void(0)"  @click="go('/contact')" style="color: #5bc0de;">《本市血液管理机构联系方式》</a>
          </div>
          <p class="back_index">
              <a href="javascript:void(0)" @click="go('/home')" class="btn btn-primary w100">返回主页</a>
          </p>
      </div>
  </div>
</template>

<script>
export default {
  name: "Succ",
  data() {
    return {
      caseType: this.$route.params.caseType
    };
  },
  computed: {},
  methods: {
    go: function(path) {
      this.$router.push(path);
    }
  },
  created() {}
};
</script>

<style scoped>
/* .layout header { */
  /* padding: 0.3rem 0;
  background-image: url(../assets/top.jpg);
  background-size: cover;
  color: #fff;
  font-size: 1.5em;
  text-align: center;
  font-weight: normal; */
/* } */
.pr {
  position: absolute;
}
.p-a {
  padding: 5rem 1rem 1rem !important;
}
.reply_frame > .submit_bg {
  width: 5rem;
  height: 5rem;
  background-image: url(../assets/round.png);
  background-size: cover;
  margin-bottom: 1.5rem;
}

.reply_frame > span {
  display: table !important;
}
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.text-center {
  text-align: center;
}
p {
  margin-bottom: 20px;
}
.back_index {
  margin-top: 250px;
}
a:visited {
  text-decoration: none;
}

a:link {
  text-decoration: none;
}
.w100 {
  width: 100% !important;
}
.btn-primary {
  color: #fff;
  background-color: #0275d8;
  border-color: #0275d8;
}
.btn {
  display: inline-block;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
}
</style>
