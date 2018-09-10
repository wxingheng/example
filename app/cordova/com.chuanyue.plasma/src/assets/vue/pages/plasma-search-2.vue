<template>
    <f7-page>
        <f7-navbar title="供浆证发证统计" back-link="Back"></f7-navbar>
        
           
        <div class="list">
                <ul>
                   <li>
                    <a class="item-link smart-select smart-select-init" data-open-in="sheet">
                        <select >
                        <option value="1" selected>原平市单采血浆站</option>
                        <option value="2" selected>大同市单采血浆站</option>
                        <option value="3" selected>晋中单采血浆站</option>
                        <option value="4" selected>长治市单采血浆站</option>
                        </select>
                        <div class="item-content">
                        <div class="item-inner">
                            <div class="item-title">浆站查询</div>
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
                    <th class="label-cell" style="min-width:200px;">浆站</th>
                    <th class="label-cell"  style="min-width:150px;">发证日期</th>
                    <th class="label-cell">人数</th>
                    <th class="label-cell" style="min-width:100px;">操作</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="label-cell">原平市单采血浆站</td>
                    <td class="label-cell">2018-06-01</td>
                    <td class="label-cell">220</td>
                    <td class="label-cell">查看</td>

                    </tr>
                     <tr>
                    <td class="label-cell">大同市单采血浆站</td>
                    <td class="label-cell">2018-06-01</td>
                    <td class="label-cell">220</td>
                    <td class="label-cell">查看</td>

                    </tr>
                     <tr>
                    <td class="label-cell">晋中单采血浆站</td>
                    <td class="label-cell">2018-06-01</td>
                    <td class="label-cell">220</td>
                    <td class="label-cell">查看</td>

                    </tr>
                     <tr>
                    <td class="label-cell">长治市单采血浆站</td>
                    <td class="label-cell">2018-06-01</td>
                    <td class="label-cell">220</td>
                    <td class="label-cell">查看</td>
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
