<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
    <div class="form-wrapper">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags @update:value="onUpdateTag" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/money/Tags.vue";
import FormItem from "@/components/money/FormItem.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  components: { FormItem, Tabs, NumberPad, Tags },
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: "0",
  };
  recordTypeList = recordTypeList;
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateTag(value: Tag[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value).toFixed(2);
  }
  saveRecord(value: string) {
    if (this.record.tags.length === 0) {
      return window.alert("请选择标签");
    } else if (parseFloat(value) === 0) {
      return window.alert("请输入金额");
    }
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.form-wrapper {
  padding: 10px 0;
  font-size: 14px;
}
</style>
