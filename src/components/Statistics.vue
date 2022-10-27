<template>
  <Layout>
    <Tabs
      :data-source="recordTypeList"
      classPrefix="types"
      :value.sync="type"
    />
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
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/interval";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  recordTypeList = recordTypeList;
  intervalList = intervalList;
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
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>

