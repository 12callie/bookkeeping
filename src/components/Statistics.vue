<template>
  <Layout>
    <Tabs :data-source="typeList" classPrefix="types" :value.sync="type" />
    <Tabs
      :data-source="intervalList"
      classPrefix="interval"
      :value.sync="interval"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .types-tabs-item {
  background: #fff;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>

