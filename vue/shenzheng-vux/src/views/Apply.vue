<template>
  <div class="layout">
      <header-history :path="'#/application'"></header-history>
       <div class="default-layout">
           <p class="title">请选择用血者情况</p>
            <x-button @click.native="go('senility', '3')" :disabled="senility" type="primary">60周岁以上</x-button>
            <x-button @click.native="go('senility', '4')" :disabled="noContinent" type="primary">非中国大陆居民</x-button>
            <x-button @click.native="go('senility', '1')" :disabled="donoteBlood" type="primary">用血者本人曾参加无偿献血</x-button>
            <x-button @click.native="go('senility', '2')" :disabled="family" type="primary">家庭成员5年内在上海市献过血</x-button>
            <x-button @click.native="go('senility', '8')" :disabled="soldier" type="primary">驻沪部队军人</x-button>
            <x-button @click.native="go('senility', '6')" :disabled="student" type="primary">本市全日制高校在校师生</x-button>
            <x-button @click.native="go('senility', '5')" :disabled="noBlood" type="primary">本人及家庭成员都未献过血</x-button>
            <x-button @click.native="go('neither')" :disabled="inconformity" type="primary">以上情况均不符合</x-button>
       </div>
  </div>
</template>

<script>
import model from "../model/client-model";
import { mapState, mapActions } from "vuex";
import isIdentity from "../utils/validate.js";


export default {
  name: "apply",
  data() {
    return {
      userbase: { ...this.$store.state.userbase,}
    };
  },
  computed: {
    ...mapState(["identityTypeList"]),
    senility: function(){
      if (this.userbase.identityType === "01" && isIdentity.IdCard(this.userbase.idNumber, 3) < 60 ) {
        return true
    }
      return false;
    },
    noContinent: function(){
      if(this.userbase.identityType === "03" ||  this.userbase.identityType === "06" || this.userbase.identityType === "07"){
        return false
      }
      return true;
    },
    donoteBlood: function(){
       return false;
    },
    family: function(){
      return false;
    },
    soldier: function(){
      if(this.userbase.identityType === "04"){
        return false;
      }
      return true;
    },
    student: function(){
      return false;
    },
    noBlood: function(){
      return false;
    },
    inconformity: function(){
      return false;
    }
  },
  methods: {
    ...mapActions(["getIdentityType"]),
    go: function(path, caseType) {
      if(caseType){
        this.$router.push(path + "/" + caseType);
      }else{
        this.$router.push(path);
      }
    }
  },
  created() {
    if (this.$store.state.identityTypeList.length <= 0) {
      this.getIdentityType();
    };
  }
};
</script>

<style scoped>
.layout {
  background-image: url(../assets/illustrate_bg.jpg);
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
    position: absolute;
    height: 100%;
    overflow-y: scroll;
    padding-top: 64px;
}
.title {
  color: #fff;
  line-height: 30px;
  font-size: 20px;
  margin-bottom: 15px;
}
</style>
