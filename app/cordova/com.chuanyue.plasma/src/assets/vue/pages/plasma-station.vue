<template>
    <f7-page>
        <f7-navbar title="浆站联网状态查询" back-link="Back"></f7-navbar>
        <!-- <f7-block-title>Introduction</f7-block-title> -->
        <!-- <f7-block inner>
            <p>山西单采浆站浆站联网状态的监测详情</p>
        </f7-block> -->
            <div class="block-strong">
            <div class="chip">
                <div class="chip-media succ">
                <i class="icon f7-icons ios-only">check</i>
                <i class="icon material-icons md-only">check</i>
                </div>
                <div class="chip-label">联网</div>
            </div>
            <div class="chip">
                <div class="chip-media warn">
                <i class="icon f7-icons ios-only">close</i>
                <i class="icon material-icons md-only">close</i>
                </div>
                <div class="chip-label">离线</div>
            </div>
            <div class="chip">
                <div class="chip-media err">
                <i class="icon f7-icons ios-only">help</i>
                <i class="icon material-icons md-only">help</i>
                </div>
                <div class="chip-label">异常</div>
            </div>
            </div>
            <div class="list">
</div>
        <div class="list">
            <ul>
                <li v-for="item in result" v-bind:key="item.id">
                    <div class="item-content">
                        <div class="item-media"> <span class="status" v-bind:class="[item.status]"></span></div>
                        <div class="item-inner">
                        <div class="item-title">{{item.title}}</div>
                        </div>
                    </div>
                </li>
            </ul>
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
        let arr = [];
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
         arr = [
            {title: '原平市单采血浆站', status: 'succ', region: '太原市'},
            {title: '大同市单采血浆站', status: 'succ', region: '太原市'},
            {title: '晋中单采血浆站', status: 'succ', region: '太原市'},
            {title: '长治市单采血浆站', status: 'warn', region: '太原市'},
        ]
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
  padding: 0;
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
.md .list {
    margin: 12px 0;
    font-size: 16px;
}
</style>
