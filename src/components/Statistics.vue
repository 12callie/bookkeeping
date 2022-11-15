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
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
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

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/interval";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList);
    newList.sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf() //把数据按照从大到小进行排序（sort 会改变原数组）
    );
    const result = [{ title: newList[0].createdAt, items: [newList[0]] }]; //把第一项放进去
    for (let i = 1; i < newList.length; i++) {
      if (
        dayjs(newList[i].createdAt).isSame(
          dayjs(result[result.length - 1].title),
          "day"
        ) //拿循环的当前项和 result 的最后一项比较，若是同一天，就放进同一个对象中
      ) {
        result[result.length - 1].items.push(newList[i]);
      } else {
        //不是同一天，就另起一个头
        result.push({ title: newList[i].createdAt, items: [newList[i]] });
      }
    }
    return result;
  }
  beautify(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (now.isSame(day, "day")) {
      return "今天";
    } else if (now.subtract(1, "day").isSame(day, "day")) {
      return "昨天";
    } else if (now.subtract(2, "day").isSame(day, "day")) {
      return "前天";
    } else if (now.isSame(day, "years")) {
      return dayjs(string).format("M月D日");
    } else {
      return dayjs(string).format("YYYY年M月D日");
    }
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
