<template>
  <div class="layout" :style="bgImage">
       <div class="default-layout">
            <x-button @click.native="go('application', 'post')" :gradients="['#2FC41D', '#67DB29']">用血审证申请</x-button>
            <x-button @click.native="go('application', 'search')" :gradients="['#0597FF', '#19C6FF']">用血审证查询</x-button>
       </div>
  </div>
</template>

<script>
import model from "../model/client-model";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome to Your Vue.js Home",
      bgImage: {
        backgroundImage: "url(" + require("./../assets/bg.jpg") + ")"
      }
    };
  },
  computed: {
    ...mapState(["identityTypeList"])
  },
  methods: {
    ...mapActions(["getIdentityType"]),
    go: function(path, type) {
      this.$router.push(`${path}/${type}`);
    }
  },
  created() {
    this.getIdentityType();

    // model
    //   .getToken()
    //   .then(
    //     data => {
    //       window.weixinToken = `Bearer ${
    //         data ? data.access_token : "token error1"
    //       }`;
    //       this.getIdentityType();
    //     },
    //     err => {
    //       window.weixinToken = "token error2";
    //       localStorage.setItem("token", "token error2");
    //       this.getIdentityType();
    //     }
    //   )
    //   .catch(err => {
    //     window.weixinToken = "token error3";
    //     localStorage.setItem("token", "token error3");
    //     this.getIdentityType();
    //   });
  }
};
</script>

<style scoped>
.layout {
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
}
.default-layout {
  padding: 10px;
  width: 100%;
  /* height: 100%; */
  position: absolute;
  bottom: 40px;
}
</style>
