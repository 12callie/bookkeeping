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
    <ol>
      <li v-for="(group, index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagName(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>
<style lang="scss" scoped>
%item {
  line-height: 24px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: #fff;
  .notes {
    color: #999999;
    margin-right: auto;
    margin-left: 12px;
    flex-wrap: wrap;
  }
}
</style>



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
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    type HashTableValue = { title: string; items: RecordItem[] };
    const { recordList } = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  tagName(tags: Tag[]) {
    return tags.length === 0 ? "空" : tags[0].name;
  }
  type = "-";
  interval = "day";
  recordTypeList = recordTypeList;
  intervalList = intervalList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .types-tabs-item {
    background: #fff;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
</style>

