<template>
  <div class="layout" :style="bgImage">
      <header-history :path="'#/apply'"></header-history>
       <div class="default-layout">
           <p class="title">审证指引</p>
             <div class="form-group row ">
            <div class="col-xs-12 text-left">
                <h5 class="reg_title"> 在本市有工作单位的用血者</h5>
                <p>请前往 <span class="text-info">单位缴纳社保所在地的区血液管理机构</span> 办理用血手续。</p>
            </div>
            <div class="col-xs-12 text-left">
                <h5 class="reg_title">在本市无工作单位的用血者</h5>
                <p>请前往 <span class="text-info">户籍所在地的区血液管理机构</span> 办理用血手续</p>
            </div>
            <div class="col-xs-12 text-left">
                <h5 class="reg_title"> 外省市来沪就医的用血者</h5>
                <p>请前往 <span class="text-info">医院所在地的区血液管理机构</span> 办理用血手续</p>
            </div>
          </div>
        <div class="form-group row title">
            <h5 class="col-xs-12 text-left">联系方式</h5>
        </div>
         <div class="form-group row ">
            <div class="col-xs-12 text-left">
                <h5 class="reg_title"> 为避免徒劳往返，请先致电相关血液管理机构垂询！谢谢！</h5>
                <p>附件： <a href="javascript:void(0)" @click="go('contact')" style="text-decoration: underline" class="text-info">《本市血液管理机构联系方式》</a></p>
            </div>
        </div>
        <div class="footer">
                 <x-button @click.native="go()" type="primary">完成</x-button>
        </div>
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
      userbase: { ...this.$store.state.userbase },
bgImage: {
              backgroundImage: "url(" + require("./../assets/illustrate_bg.jpg") + ")"
      }
    };
  },
  computed: {
    ...mapState(["identityTypeList"]),
    senility: function() {
      if (
        this.userbase.identityType === "01" &&
        isIdentity.IdCard(this.userbase.idNumber, 3) < 60
      ) {
        return true;
      }
      return false;
    },
    noContinent: function() {
      if (
        this.userbase.identityType === "03" ||
        this.userbase.identityType === "06" ||
        this.userbase.identityType === "07"
      ) {
        return false;
      }
      return true;
    },
    donoteBlood: function() {
      return false;
    },
    family: function() {
      return false;
    },
    soldier: function() {
      if (this.userbase.identityType === "04") {
        return false;
      }
      return true;
    },
    student: function() {
      return false;
    },
    noBlood: function() {
      return false;
    },
    inconformity: function() {
      return false;
    }
  },
  methods: {
    ...mapActions(["getIdentityType"]),
    go: function(path) {
      if (path) {
         this.$router.push(path)
      } else {
        this.$router.goBack();
      }
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
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  color: #fff;
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
  font-size: 24px;
  margin-bottom: 15px;
}
.footer {
  margin-top: 20px;
}
h5,
.h5 {
  font-size: 1.25rem;
  font-weight: normal;
}
p {
  margin-bottom: 20px;
}
</style>
