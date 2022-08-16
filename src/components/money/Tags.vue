<template>
  <div class="tags">
    <div class="new">
      <button @click="createTags">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  @Prop() readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }
  createTags() {
    const tagName = window.prompt("请输入标签名");

    if (tagName === "") {
      alert("标签名不能为空");
    }
    if (this.dataSource) {
      if (this.dataSource.indexOf(tagName!) >= 0) {
        alert(`${tagName}已存在`);
      } else {
        this.$emit("update:dataSource", [...this.dataSource, tagName]);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
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
