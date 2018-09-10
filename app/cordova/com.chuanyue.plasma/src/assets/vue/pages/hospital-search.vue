<template>
    <f7-page>
        <f7-navbar title="医院库存监控" back-link="Back"></f7-navbar>
        
            <div class="list">
                <ul>
                   <li>
                    <a class="item-link smart-select smart-select-init" data-open-in="sheet">
                        <select >
                        <option value="1" selected>太原市</option>
                        <option value="2">大同市</option>
                        <option value="3">晋城市</option>
                        </select>
                        <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title">地区查询</div>
                        </div>
                        </div>
                    </a>
                    </li>
                </ul>
        </div>
        <div class="list">
                <ul>
                   <li>
                    <a class="item-link smart-select smart-select-init" data-open-in="sheet">
                        <select >
                        <option value="1" selected>山西医科大学第一医院</option>
                        <option value="2" selected>山西大医院</option>
                        <option value="3" selected>太原第四人民医院</option>
                        <option value="4" selected>山西医科大学第二医院</option>
                        <option value="5" selected>太原市中心医院</option>
                        <option value="6" selected>山西省儿童医院</option>
                        </select>
                        <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title">医院查询</div>
                        </div>
                        </div>
                    </a>
                    </li>
                </ul>
        </div>
        
        <div class="data-table">
            <table>
                <thead>
                <tr>
                    <th class="label-cell" style="min-width:200px;">医院</th>
                    <th class="label-cell">红细胞类</th>
                    <th class="label-cell">血浆类</th>
                    <th class="label-cell">血小板类</th>
                    <th class="label-cell">沉淀物类</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="label-cell">山西医科大学第一医院</td>
                    <td class="label-cell">100</td>
                    <td class="label-cell">241</td>
                    <td class="label-cell">124</td>
                    <td class="label-cell">221</td>
                </tr>
               <tr>
                    <td class="label-cell">山西大医院</td>
                    <td class="label-cell">100</td>
                    <td class="label-cell">241</td>
                    <td class="label-cell">124</td>
                    <td class="label-cell">221</td>
                </tr>
                 <tr>
                    <td class="label-cell">太原第四人民医院</td>
                    <td class="label-cell">100</td>
                    <td class="label-cell">241</td>
                    <td class="label-cell">124</td>
                    <td class="label-cell">221</td>
                </tr>
                 <tr>
                    <td class="label-cell">山西医科大学第二医院</td>
                    <td class="label-cell">100</td>
                    <td class="label-cell">241</td>
                    <td class="label-cell">124</td>
                    <td class="label-cell">221</td>
                </tr>
                 <tr>
                    <td class="label-cell">太原市中心医院</td>
                    <td class="label-cell">100</td>
                    <td class="label-cell">241</td>
                    <td class="label-cell">124</td>
                    <td class="label-cell">221</td>
                </tr>
                <tr>
                    <td class="label-cell">山西省儿童医院</td>
                    <td class="label-cell">100</td>
                    <td class="label-cell">241</td>
                    <td class="label-cell">124</td>
                    <td class="label-cell">221</td>
                </tr>
                </tbody>
            </table>
        </div>
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
          { title: "原平市单采血浆站", status: "succ", region: "太原市" },
          { title: "大同市单采血浆站", status: "succ", region: "太原市" },
          { title: "晋中单采血浆站", status: "succ", region: "太原市" },
          { title: "长治市单采血浆站", status: "warn", region: "太原市" }
        ];
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
.ios .sheet-modal .toolbar {
  background: #2196f3;
}
</style>
