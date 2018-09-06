<template>
  <div class="layout">
      <header-history :path="'#/application/search'"></header-history>

      <div class="p-a">
        <div>
            <div class="container">
              <flexbox>
                <flexbox-item>
                        <div class="reg_res bg-info center-block">
                            审证提交
                        </div>
                        <span >{{stepFirst.applyTime && stepFirst.applyTime.substr(0, 10)}}</span>
                        <span >{{stepFirst.applyTime && stepFirst.applyTime.substr(11)}}</span>
                </flexbox-item>
                <flexbox-item>
                  <div class="reg_res_center">
                            <div class="center-block reg_res_array"></div>
                        </div>
                </flexbox-item>
                <flexbox-item>
                   <div v-if="stepFirst.result === 'Default'" class="reg_res reg_res_on center-block">
                            正在审核
                        </div>
                        <div v-if="stepFirst.result === 'Direct' | stepFirst.result === 'Pass'" class="reg_res bg-success center-block">
                            审核完成
                        </div>
                        <div v-if="stepFirst.result === 'UnPass'" class="reg_res bg-success center-block" style="line-height: 1.8rem;padding-top: 1rem;background-color: red">
                            审核 <br>未通过
                        </div>
                        <span>{{stepFirst.auditTime && stepFirst.auditTime.substr(0, 10) || '--'}}</span><br>
                        <span>{{stepFirst.auditTime && stepFirst.auditTime.substr(11) || '--'}}</span>
                </flexbox-item>
              </flexbox>
            </div>
        </div>
        <section class="container res_step_frame result_frame" style="margin-top:2rem;">
            <div v-if="stepFirst.result === 'Default'" class="row">
                <h5 class="text-center">您好，您的申请请求已提交！<br>
                    我们将于 2个工作日之内予以答复</h5>
                <p class="text-center">您可通过微信中 “审证查询” 功能查询进度</p>
            </div>
            <div v-if="stepFirst.result === 'Direct' | stepFirst.result === 'Pass'" class="row">
                <h5 class="text-center">您已经完成用血审证，请准备资料在医院办理相关用血事宜。</h5>
            </div>
            <div v-if="stepFirst.result === 'UnPass'">
                <div v-if="stepFirst.caseType == '3'" class="row">
                    <p>60周岁以上:</p>
                    <p style="text-indent:2em">您好，审核不通过。
                        <br/>{{stepFirst.unPassType}}, 请重新上传附件
                        <br/>请提供一下证明资料：{{stepFirst.unPassObj}}
                        <br/>{{stepFirst.auditRemark}}
                    </p>
                </div>
                <div v-else-if="stepFirst.caseType == '4'" class="row">
                    <p>非大陆居民</p>
                    <p style="text-indent:2em">您好，审核不通过。
                        <br/>{{stepFirst.unPassType}}, 请重新上传附件
                        <br/>请提供一下证明资料：{{stepFirst.unPassObj}}
                        <br/>{{stepFirst.auditRemark}}
                    </p>
                </div>
                <div v-else-if="stepFirst.caseType == '1'" class="row">
                    <p>用血者本人献过血</p>
                    <p style="text-indent:2em">您好，审核不通过。
                        <br/>{{stepFirst.unPassType}}, 请重新上传附件
                        <br/>请提供一下证明资料：{{stepFirst.unPassObj}}
                        <br/>{{stepFirst.auditRemark}}
                    </p>
                </div>
                <div v-else-if="stepFirst.caseType == '2'" class="row">
                    <p>家庭成员献血</p>
                    <p style="text-indent:2em">您好，审核不通过。
                        <br/>{{stepFirst.unPassType}}, 请重新上传附件
                        <br/>请提供一下证明资料：{{stepFirst.unPassObj}}
                        <br/>{{stepFirst.auditRemark}}
                    </p>
                </div>
                <div v-else class="row">
                    <p style="text-indent:2em">您好，审核不通过。
                        <br/>{{stepFirst.unPassType}}, 请重新上传附件
                        <br/>请提供一下证明资料：{{stepFirst.unPassObj}}
                        <br/>{{stepFirst.auditRemark}}
                    </p>
                </div>
            </div>
        </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Progress",
  data() {
    return {
      caseType: this.$route.params.caseType,
      stepFirst: JSON.parse(decodeURIComponent(this.$route.params.data))
    };
  },
  computed: {},
  methods: {
    go: function(path) {
      this.$router.replace(path);
    }
  },
  created() {
    console.log(this.stepFirst);
  }
};
</script>

<style scoped>
.layout header {
  padding: 0.3rem 0;
  background-image: url(../assets/top.jpg);
  background-size: cover;
  color: #fff;
  font-size: 1.5em;
  text-align: center;
  font-weight: normal;
}
.pr {
  position: absolute;
}
.p-a {
  padding: 1rem !important;
  margin-top: 40px;
}
.col-xs-4 {
  width: 33.33%;
  display: inline-block;
}
.reg_res{
    width: 6rem;
    height: 6rem;
    margin-top: 1rem;
    line-height: 6rem;
    border: 0.1rem solid #fff;
    box-shadow: 0rem 0rem 0.7rem #888888;
    border-radius: 50%;
    font-size: 1.2rem;
    margin-bottom: .8rem;
}
.reg_res_center{
    margin: auto;
    margin-top: -0.5rem;
    width: 6rem;
    height: 6rem;
}
.reg_res_array{
    margin-top: 0;
    width: 4rem;
    height: 4rem;
    background-image: url("../assets/array_right.png");
    background-repeat: no-repeat;
    background-size: contain;
}
.reg_res_on{
    color: #fff;
    background-color: #ccc;
}
.reg_res_com .success_text{
    font-size: 1.3rem;
    font-family: sans-serif, microsoft-yahei;
}
.bg-info {
    color: #fff;
    background-color: #5bc0de;
      text-align: center;

}
.container{
      text-align: center;
      font-weight: bold;
}
.center-block {
    display: block;
    margin-right: auto;
    margin-left: auto;
}
.vux-flexbox-item{
      text-align: center;
}

.result_frame{
  font-size: 16px;
  font-weight: normal !important;
}
 .result_frame h5{
  font-size: 20px;
  font-weight: normal !important;
}
</style>
