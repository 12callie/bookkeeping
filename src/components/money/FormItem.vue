<template>
  <div>
    <label class="FormItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text" :placeholder="this.placeholder" v-model="value" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  value = "";
  @Prop({required: true}) fieldName!: string;
  @Prop () placeholder?: string;
  @Watch("value")
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.FormItem {
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
