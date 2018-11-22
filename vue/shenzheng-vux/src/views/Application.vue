<template>
  <div class="layout">
      <header-history :path="'#/home'" :text="type === 'search'? '用血审证查询': '用血审证'"></header-history>
      <section class="clear" :style="bgImage">
      <div class="default-layout">
                <toast v-model="show" type="warn">请填写完整信息</toast>
                <p class="title">用血者信息</p>
                      <group title="">
                      <x-input title="姓名" :max="10" required v-model="userbase.name" name="username" placeholder="请输入姓名"></x-input>
                      <selector ref="defaultValueRef" required v-model="userbase.identityType"  title="证件类型" direction="rtl" :options="identityTypeList" ></selector>
                      <x-input title="证件号码" :max="30" :is-type="validate" required v-model="userbase.idNumber" name="username" placeholder="请输入证件号码"></x-input>
                  </group>
                  <div style="padding:15px 0;">
                                  <label>
                                      <input type="checkbox" v-model="userbase.agree" value="checkbox" checked="true">
                                      <!-- <i>✓</i> -->
                                      我已阅知
                                  </label><a class="text-info"  href="javascript:void(0)" @click="go('/notify')">《上海市办理用血手续须知》</a>
                          <x-button @click.native="submit()" :disabled="disabled" type="primary">{{type === 'search'? '审证查询': '我要申请'}}</x-button>
                  </div>
          </div>
      </section>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import isIdentity from "../utils/validate.js";
import model from "../model/client-model";


export default {
  name: "Application",
  data() {
    return {
      msg: "Application",
      userbase: { ...this.$store.state.userbase },
      show: false,
      validate: value => {
        // valid  false  不通过
        let result = true;
        if (
          this.userbase.identityType === "01" &&
          !isIdentity.isIdentity(value)
        ) {
          result = false;
        }
        return {
          valid: result,
          msg: "Error"
        };
      },
      type: this.$route.params.type,
      bgImage: {
        backgroundImage: "url(" + require("./../assets/check_bg.jpg") + ")"
      }
    };
  },
  computed: {
    identityTypeList: function() {
      if (this.$store.state.identityTypeList.length <= 0) {
        this.getIdentityType();
      }
      return this.$store.state.identityTypeList.map(d => {
        d.key = d.id;
        d.value = d.name;
        return d;
      });
    },
    disabled: function() {
      if (
        this.userbase.identityType === "01" &&
        !isIdentity.isIdentity(this.userbase.idNumber)
      ) {
        return true;
      }
      if (
        this.userbase.name &&
        this.userbase.identityType &&
        this.userbase.idNumber &&
        this.userbase.agree
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["getIdentityType", "updateUserbase"]),
    submit: function() {
      if (
        this.userbase.name &&
        this.userbase.identityType &&
        this.userbase.idNumber &&
        this.userbase.agree
      ) {
        console.log(this.userbase);
          this.updateUserbase({ ...this.userbase });
        if(this.type === 'search'){
            model.getEvidence({
              id: this.userbase.idNumber,
              name: this.userbase.name
            }).then((data) => {
              this.$router.push({name: "progress", params: {data: JSON.stringify(data[0])}});
            }).catch((err) => {
                 this.$vux.toast.show({
                    type: "warn",
                    position: "middle",
                    text: err
                  });
            })
        }else{
          this.$router.push("/apply");
        }
      } else {
        this.show = false;
      }
    },
    go: function(path){
      this.$router.push(path);
    }
  },
  created() {}
};
</script>

<style scoped>
section {
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  padding-top: 47px;
}
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
  bottom: 20px;

}
.title {
  font-size: 26px;
  color: #fff;
}
.layout header {
  /* padding: 0.2rem 0;
  background-image: url(../assets/top.jpg);
  background-size: cover;
  color: #fff;
  text-align: center;
  width: 100%; */
}
</style>
