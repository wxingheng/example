<template>
  <div class="layout" :style="bgImage">
    <header-history
      :text="'用血审证历史记录'"
      :path="'#/application/post'"
      :noBack="environment === 'implant'"
    ></header-history>
    <div class="default-layout">
      <form-preview
        v-for="(item, i) in list"
        :key="i"
        :header-label="'申请时间'"
        :header-value="item[0]['applayTime']"
        :body-items="item"
      ></form-preview>
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
      environment: "",
      list: [
        [
          {
            label: "用血医院",
            value: "上海市第六人民医院",
            applayTime: "208-11-28"
          },
          {
            label: "临床诊断",
            value: "肝癌",
            applayTime: "208-11-28"
          },
          {
            label: "用血情况",
            value:
              "悬浮红细胞1U；新鲜冰冻血浆1U；新鲜冰冻血浆1U；新鲜冰冻血浆1U；",
            applayTime: "208-11-28"
          },
          {
            label: "审证类型",
            value: "60岁以上",
            applayTime: "208-11-28"
          },
          {
            label: "审证时间",
            value: "2018-11-30",
            applayTime: "208-11-28"
          },
          {
            label: "审证结果",
            value: "审证通过",
            applayTime: "208-11-28"
          }
        ],
        [
          {
            label: "用血医院",
            value: "上海市第六人民医院",
            applayTime: "208-11-28"
          },
          {
            label: "临床诊断",
            value: "肝癌",
            applayTime: "208-11-28"
          },
          {
            label: "用血情况",
            value:
              "悬浮红细胞1U；新鲜冰冻血浆1U；新鲜冰冻血浆1U；新鲜冰冻血浆1U；",
            applayTime: "208-11-28"
          },
          {
            label: "审证类型",
            value: "60岁以上",
            applayTime: "208-11-28"
          },
          {
            label: "审证时间",
            value: "2018-11-30",
            applayTime: "208-11-28"
          },
          {
            label: "审证结果",
            value: "审证通过",
            applayTime: "208-11-28"
          }
        ]
      ]
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
    this.environment = this.$route.params.environment;
    const data = JSON.parse(decodeURIComponent(this.$route.params.data));
    this.list = data.map(d => {
      console.log(d.hospitalName);
      const arr = [
        { label: "用血医院", value: d.hospitalName, applayTime: d.applyTime },
        { label: "临床诊断", value: d.diseaseName, applayTime: "" },
        { label: "用血情况", value: d.useBlood, applayTime: "" },
        { label: "用血者情况", value: d.conditionName, applayTime: "" },
        { label: "审证时间", value: d.auditTime, applayTime: "" },
        {
          label: "审证结果",
          value:
            d.result === "Default"
              ? "正在审核"
              : d.result === "Direct"
              ? "审核完成"
              : `审核未通过;${d.unPassType};${d.unPassObj};${d.auditRemark}`,
          applayTime: ""
        }
      ];
      return arr;
    });
    console.log(this.list);
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
