<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tags",
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;

  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background-color: rgb(217, 217, 217);
      margin-right: 4px;
      padding: 0 18px;
      height: 24px;
      line-height: 24px;
      border-radius: (24px/2);
      margin-top: 4px;
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
