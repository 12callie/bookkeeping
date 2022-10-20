<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
        @click="select(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import TagHelper from "@/mixins/TagHelper";
import { Component, Mixins } from "vue-property-decorator";
@Component
export default class Tags extends Mixins(TagHelper) {
  selectedTag: Tag[] = [];
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  select(tag: Tag) {
    if (this.selectedTag.length > 0) {
      this.selectedTag = [];
    }
    this.selectedTag.push(tag);
    this.$emit("update:value", this.selectedTag);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: #fff;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  $bg: rgb(217, 217, 217);
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background-color: $bg;
      margin-right: 4px;
      padding: 0 18px;
      height: 24px;
      line-height: 24px;
      border-radius: (24px/2);
      margin-top: 4px;
      &.selected {
        background-color: darken($bg, 50%);
        color: #fff;
      }
    }
  }
  > .new {
    padding-top: 16px;

    button {
      background-color: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid #333;
      padding: 0 4px;
    }
  }
}
</style>
