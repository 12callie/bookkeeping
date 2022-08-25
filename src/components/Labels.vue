<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag">
        <span>{{ tag }}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagListModel } from "@/models/tagListModel";
tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;
  createTag() {
    const tagName = window.prompt("请输入标签名");
    if (tagName === "") {
      alert("标签名不能为空");
    }
    if (tagName) {
      const message = tagListModel.create(tagName);
      if (message === "duplicate") {
        alert("标签名已存在");
      } else {
        alert("创建成功");
      }
    }
    return;
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: rgb(255, 255, 255);
  > li {
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    border-bottom: 1px solid rgb(220, 220, 223);
    margin-left: 16px;

    ::v-deep .icon {
      height: 24px;
      width: 24px;
      margin-right: 16px;
    }
  }
}
.createTag-wrapper {
  text-align: center;
  margin-top: 44px;
  .createTag {
    border: none;
    background: #767676;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    color: white;
  }
}
</style>
