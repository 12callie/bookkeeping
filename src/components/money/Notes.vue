<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里添加备注" />
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: "Notes",
};
</script>

<style lang="scss" scoped>
.notes {
  background-color: rgb(245, 245, 245);
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    border: none;
    background-color: transparent;
    height: 64px;
    flex-grow: 1;
  }
}
</style>
