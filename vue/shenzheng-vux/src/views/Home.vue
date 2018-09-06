<template>
  <div class="layout">
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
      msg: "Welcome to Your Vue.js Home"
    };
  },
  computed: {
    ...mapState(["identityTypeList"])
  },
  methods: {
    ...mapActions(["getIdentityType"]),
    go: function(path, type) {
      this.$router.push(`${path}/${type}`)
    }
  },
  created() {
    if (this.$store.state.identityTypeList.length <= 0) {
      this.getIdentityType();
    }
  }
};
</script>

<style scoped>
.layout {
  background-image: url(../assets/bg.jpg);
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
