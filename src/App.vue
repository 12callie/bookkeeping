<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: rgb(245, 245, 245);
}
</style>

