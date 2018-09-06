<template>
  <div class="main">
    <div class="header">
      <div class="title">主页</div>
    </div>
     <ul>
        <li><div @click="go('pageA')" to="pageA">pageA</div></li>
        <li><div  @click="go('pageB')">pageB</div></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    go: function(path,) {
      this.$router.push(`${path}`);
    }
  }
}
</script>


<style>
  .main{
    background: red;
  }

</style>
