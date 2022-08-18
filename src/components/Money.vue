<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTag" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/money/Tags.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";

import { Component, Watch } from "vue-property-decorator";
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: string;
};
@Component({
  components: { Notes, Types, NumberPad, Tags },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: "0",
  };
  recordList: Record[] = [];
  onUpdateTag(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value).toFixed(2);
  }
  saveRecord(value: string) {
    if (parseFloat(value) === 0) {
      alert("请输入金额");
      return;
    }
    const record2 = JSON.parse(JSON.stringify(this.record));
    this.recordList.push(record2);
    console.log(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
