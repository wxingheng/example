<template>
  <div class="layout" :style="bgImage">
      <header-history :path="'#/application'" :noBack="environment === 'implant'"></header-history>
       <div class="default-layout">
           <p class="title">请选择用血者情况  <x-button @click.native="search()" mini plain type="primary" style="float: right"><icon type="search" style="vertical-align: sub"></icon>审证结果查询</x-button></p>
            <x-button @click.native="go('senility', '3', senility)"  type="primary">60周岁以上</x-button>
            <x-button @click.native="go('senility', '4', noContinent)" type="primary">非中国大陆居民</x-button>
            <x-button @click.native="go('senility', '1', donoteBlood)" type="primary">用血者本人曾参加无偿献血</x-button>
            <x-button @click.native="go('senility', '2', family)" type="primary">家庭成员5年内在上海市献过血</x-button>
            <x-button @click.native="go('senility', '8', soldier)" type="primary">驻沪部队军人</x-button>
            <x-button @click.native="go('senility', '6', student)" type="primary">本市全日制高校在校师生</x-button>
            <x-button @click.native="go('senility', '5', noBlood)" type="primary">本人和家庭成员不符合献血</x-button>
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
      userbase: { ...this.$store.state.userbase },
      bgImage: {
        backgroundImage: "url(" + require("./../assets/illustrate_bg.jpg") + ")"
      },
      environment: ""
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
    ...mapActions(["getIdentityType", "updateUserbase", "updateIsImplant"]),
    search: function(){
      console.log('search--->');
       model.getEvidence({
              id: this.$store.state.userbase.idNumber,
              name: this.$store.state.userbase.name
            }).then((data) => {
              this.$router.push({name: "progress", params: {data: JSON.stringify(data)}});
            }).catch((err) => {
                 this.$vux.toast.show({
                    type: "warn",
                    position: "middle",
                    text: err
                  });
            })
    },
    go: function(path, caseType, disabled) {

      if (disabled === true) {
        this.$vux.toast.show({
          type: "warn",
          position: "middle",
          text: "条件不符！"
        });
        return false;
      }
      model
        .getCheckAddData({
          identityType: this.$store.state.userbase.identityType || "01",
          identityId: this.$store.state.userbase.idNumber,
          name: this.$store.state.userbase.name
        })
        .then(data => {
          console.log("--------------->", data);
          if (data.status === "Com") {
            if (caseType) {
              this.$router.push("/" + path + "/" + caseType);
            } else {
              this.$router.push("/" + path);
            }
          } else {
            this.$vux.toast.show({
              type: "warn",
              position: "middle",
              text: `你在${data.organName}还有未审核的审证申请，请退出`
            });
          }
        });
    }
  },
  created() {
    console.log("userbase", this.userbase);
    console.log("---", this.$store.state.userbase);
    if (this.$store.state.identityTypeList.length <= 0) {
      this.getIdentityType();
    }
    this.environment = this.$route.params.environment;
    // 嵌入一网通
    if (this.environment === "implant") {
      this.updateIsImplant(true);
      // model.getToken().then(
      //   data => {
      //     window.weixinToken = `Bearer ${
      //       data ? data.access_token : "token error1"
      //     }`;
      //     this.getIdentityType();
      //     return model.getOneNetUser(
      //       location.href.substr(location.href.search("token=") + 6)
      //     );
      //   },
      //   err => {
      //     window.weixinToken = "token error2";
      //     this.getIdentityType();
      //   }
      // );
      this.getIdentityType();
      model
        .getOneNetUser(location.href.substr(location.href.search("token=") + 6))
        .then(
          data => {
            console.log("33333333333333", data);

            if (data.code === "200" && data.isSuccess) {
              this.updateUserbase({
                name: data.data.username,
                idNumber: data.data.idCardNo,
                phone: data.data.mobile
              });
            }
          },
          err => {
            console.log("4444444444", err);

            this.$vux.toast.show({
              type: "warn",
              position: "middle",
              text: "获取用户基本信息失败！"
            });
          }
        )
        .catch(err => {
          console.log("5555555555", err);

          window.weixinToken = "token error3";
          this.$vux.toast.show({
            type: "warn",
            position: "middle",
            text: "获取用户基本信息失败！"
          });
        });
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
