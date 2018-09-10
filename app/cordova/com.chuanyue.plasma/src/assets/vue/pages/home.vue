<template>
    <f7-page>
        <f7-navbar>
            <!-- <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
            </f7-nav-left> -->
            <div class="title">山西浆站监管平台</div>
            <!-- <f7-nav-right>
                <f7-link class="searchbar-enable" data-searchbar=".searchbar-components" icon="fa fa-search"></f7-link>
            </f7-nav-right>
            <f7-searchbar class="searchbar-components" search-container=".components-list" search-in="a" expandable></f7-searchbar> -->
        </f7-navbar>
    
        <div style="height: 160px;" data-pagination='{"el": ".swiper-pagination"}' data-space-between="50" class="swiper-container swiper-init demo-swiper">
        <div class="swiper-pagination"></div>
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="./../../images/swiper.jpg" alt=""></div>
            <div class="swiper-slide"><img src="./../../images/swiper.jpg" alt=""></div>
            <div class="swiper-slide"><img src="./../../images/swiper.jpg" alt=""></div>
        </div>
        </div>
        <f7-list class="components-list searchbar-found">
            <f7-list-item link="/blood-station/" title="血站联网状态查询" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
           <f7-list-item link="/hospital-station/" title="医院联网状态查询" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/plasma-station/" title="浆站联网状态查询" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/blood-search/" title="血站库存监控" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/hospital-search/" title="医院库存监控" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/plasma-search/" title="献浆员历史采浆情况" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/plasma-search-2/" title="供血浆证发证统计查询" panel-close>
                <f7-icon slot="media" ios="f7:info" md="material:info"></f7-icon>
            </f7-list-item>
        </f7-list>
        <div class="list">
            <!-- <ul>
                <li v-for="item in result" v-bind:key="item.id">
                    <div class="item-content">
                        <div class="item-inner">
                        <div class="item-title">{{item.title}}</div>
                        <div class="item-after"> <span class="status" v-bind:class="[item.status]">{{item.status === 'warn'? '离线': item.status === 'succ'? '联网': '异常'}}</span></div>
                        </div>
                    </div>
                </li>
            </ul> -->
            </div>
        <!-- <f7-list class="searchbar-not-found">
            <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list> -->
        <!-- <f7-block-title class="searchbar-hide-on-search">Themes</f7-block-title> -->
        <f7-list class="searchbar-hide-on-search">
            <!-- <f7-list-item title="iOS 风格" external link="./index.html?theme=ios"></f7-list-item> -->
            <!-- <f7-list-item title="Material (android) 风格" external link="./index.html?theme=md"></f7-list-item> -->
            <!-- <f7-list-item title="主题颜色" link="/color-themes/"></f7-list-item> -->
            <!-- <f7-list-item title="Github" external link="https://github.com/kevinqqnj"></f7-list-item> -->
        </f7-list>
    </f7-page>
</template>
<script>
export default {
  data() {
    return {
      list: () => {
        var arr = [];
        var len = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < len; i++) {
          arr.push({
            title: `单采浆站${i + 1}`,
            status:
              Math.random() < 0.333
                ? "succ"
                : Math.random() > 0.666 ? "err" : "warn",
            id: i
          });
        }
        return arr;
      }
    };
  },
  computed: {
    result: function() {
      return this.list();
    }
  }
};
</script>
<style>
.status {
  font-size: 13px;
  border-radius: 20px;
  padding: 0 6px;
  height: 20px;
  line-height: 20px;
  min-width: 20px;
  background-color: #ccc;
}
.succ {
  background-color: #0f0;
  color: #fff;
}
.err {
  background-color: red;
  color: #fff;
}
.warn {
  background-color: yellow;
  color: #000;
}
/* i.icon {
  display: inline-block !important;
  vertical-align: middle !important;
  background-size: 100% auto !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  font-style: normal !important;
  position: relative !important;
}
.icon-f7 {
  background: #ee350f !important;
  color: #fff !important;
  border-radius: 50% !important;
  text-align: center !important;
} */
</style>
