<template>
  <!-- <div id="app"> -->
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  <!-- </div> -->
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
div {
  width: 1rem; 
  height: 0.4rem;
  font-size: 12px; 
}

[data-dpr="2"] div {
  font-size: 24px;
}

[data-dpr="3"] div {
  font-size: 36px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
