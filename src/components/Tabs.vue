<template>
  <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="liClass(item)"
      @click="selectType(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = {
  text: string;
  value: string;
};
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem;
  @Prop(String) readonly value!: string;
  @Prop(String) readonly classPrefix?: string;
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
  selectType(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  background-color: #c4c4c4;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &-item {
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