<template>
  <Layout>
    <Tabs
      :data-source="recordTypeList"
      classPrefix="types"
      :value.sync="type"
    />
    <ol v-if="groupList.length > 0">
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>

        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagName(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <ol v-else class="noResult">
      <span>暂时还没有数据</span>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  recordTypeList = recordTypeList;
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const { recordList } = this;
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      if (
        dayjs(newList[i].createdAt).isSame(
          dayjs(result[result.length - 1].title),
          "day"
        )
      ) {
        result[result.length - 1].items.push(newList[i]);
      } else {
        result.push({
          title: dayjs(newList[i].createdAt).format("YYYY-MM-DD"),
          items: [newList[i]],
        });
      }
    }
    result.forEach((group) => {
      group.total = group.items.reduce(
        (sum, item) => sum + parseFloat(item.amount),
        0
      );
    });
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
.noResult {
  text-align: center;
  margin-top: 64px;
}
</style>
