import Types from '@/components/money/Types.vue';
<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  type = "-";
  selectType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("type is unknown");
    }
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
.types {
  background-color: #c4c4c4;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  > li {
    width: 50%;
    height: 64px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: #333;
    }
  }
}
</style>
