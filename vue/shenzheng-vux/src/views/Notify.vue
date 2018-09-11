<template>
  <div class="layout">
    <section class="container reg_start_frame">
        <div class="form-group row title">
            <h4 class="col-xs-12 text-center">用血手续须知</h4>
        </div>
        <div class="form-group row description">
            <div class="col-xs-12 text-left">
                <p>1、六十周岁以上的公民需要医疗临床用血的，凭本人《居民身份证》由医疗机构直接供血。</p>
                <p>2、在本市的外国公民、华侨、香港特别行政区居民、澳门地区居民和台湾地区居民需要医疗临床用血的，凭本人的有效身份证件由医疗机构直接供血。</p>
                <p>3、有工作单位的本市公民需要用血的，至单位缴纳养老金所在地的区血液管理机构办理用血手续，交纳（免交）用血互助金。</p>
                <p>4、无工作单位的本市公民需要用血的，至户籍所在地的区血液管理机构办理用血手续，交纳（免交）用血互助金。</p>
                <p>5、外省市来沪就医的公民需要用血的，至医疗机构所在的区血液管理机构办理用血手续，交纳（免交）用血互助金、</p>
                <p>6、驻沪部队军人、全日制高校的在校师生等需要用血的，至上海市血液管理办公室办理用血手续。</p>
                <p>7、急救病人需要医疗临床用血的，医疗机构应当先提供所需血液，病人及其家庭成员或其所在单位按照《上海市献血条例》的规定补办用血手续。</p>
            </div>
        </div>
        <div class="footer">
                    <x-button @click.native="go()" type="primary">确定</x-button>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {};
  },
  computed: {},
  methods: {
    go: function(path, caseType) {
      this.$router.goBack();
    }
  },
  created() {}
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0px auto;
  background-image: url("../assets/illustrate_bg.jpg");
  color: #fff;
  background-position: center 0;
  background-size: cover;
}
.reg_start_frame {
  /* height: calc(100% - 45.6px) !important; */
  padding-top: 45.19px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  /* color: #fff; */
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 20px;
}
.container {
  padding-right: 0.9375rem;
  padding-left: 0.9375rem;
  margin-right: auto;
  margin-left: auto;
}
.footer {
  margin-top: 20px;
}
h4 {
  text-align: center;
  font-size: 26px;
  font-weight: normal;
  margin-bottom: 15px;
}
</style>
