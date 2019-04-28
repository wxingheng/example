<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    1231232
    <picker :slots="slots" @change="onValuesChange" rotate-effect :visible-item-count="3">
      123122312
      <button>conf33333irm</button>
      <button>can2222cel</button>
    </picker>
    
  </div>
</template>

<script>
import Picker from 'mint-picker-001';

export default {
  name: 'app',
  components:{
    picker: Picker,
  },
    data() {
    return {
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }
      ]
    };
  },
 
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
