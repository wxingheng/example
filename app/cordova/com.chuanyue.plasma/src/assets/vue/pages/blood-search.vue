<template>
    <f7-page>
        <f7-navbar title="血站库存监控" back-link="Back"></f7-navbar>
        
            <div class="list">
                <ul>
                   <li>
                    <a class="item-link smart-select smart-select-init" data-open-in="sheet">
                        <select >
                        <option value="1" selected>临汾市中心血站</option>
                        <option value="2">太原市红十字血液中心</option>
                        <option value="3">运城市中心血站</option>
                        </select>
                        <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title">血站查询</div>
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
                    <th class="label-cell" style="min-width:150px;">血液类型</th>
                    <th class="label-cell">A+</th>
                    <th class="label-cell">B-</th>
                    <th class="label-cell">O+</th>
                    <th class="label-cell">AB+</th>
                    <th class="label-cell">A-</th>
                    <th class="label-cell">B-</th>
                    <th class="label-cell">O-</th>
                    <th class="label-cell">AB-</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="label-cell">红细胞类</td>
                    <td class="label-cell">2</td>
                    <td class="label-cell">12</td>
                    <td class="label-cell">13</td>
                    <td class="label-cell">22</td>
                    <td class="label-cell">34</td>
                    <td class="label-cell">45</td>
                    <td class="label-cell">23</td>
                    <td class="label-cell">9</td>
                </tr>
                <tr>
                    <td class="label-cell">血浆类</td>
                    <td class="label-cell">2</td>
                    <td class="label-cell">12</td>
                    <td class="label-cell">13</td>
                    <td class="label-cell">22</td>
                    <td class="label-cell">34</td>
                    <td class="label-cell">45</td>
                    <td class="label-cell">23</td>
                    <td class="label-cell">9</td>
                </tr>
                <tr>
                    <td class="label-cell">血小板类</td>
                    <td class="label-cell">2</td>
                    <td class="label-cell">12</td>
                    <td class="label-cell">13</td>
                    <td class="label-cell">22</td>
                    <td class="label-cell">34</td>
                    <td class="label-cell">45</td>
                    <td class="label-cell">23</td>
                    <td class="label-cell">9</td>
                </tr>
                <tr>
                    <td class="label-cell">沉淀物类</td>
                    <td class="label-cell">2</td>
                    <td class="label-cell">12</td>
                    <td class="label-cell">13</td>
                    <td class="label-cell">22</td>
                    <td class="label-cell">34</td>
                    <td class="label-cell">45</td>
                    <td class="label-cell">23</td>
                    <td class="label-cell">9</td>
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
