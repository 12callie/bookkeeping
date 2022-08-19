<template>
  <Layout>
    <ol class="tags">
      <li>
        <span>衣</span>
        <Icon name="right" />
      </li>
      <li>
        <span>食</span>
        <Icon name="right" />
      </li>
      <li>
        <span>住</span>
        <Icon name="right" />
      </li>
      <li>
        <span>行</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Labels extends Vue {}
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
