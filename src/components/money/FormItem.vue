<template>
  <div>
    <label class="FormItem">
      <span class="name">{{ this.fieldName }}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="onValueChanged($event.target.value)"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.FormItem {
  padding: 0 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    border: none;
    background-color: transparent;
    height: 44px;
    flex-grow: 1;
  }
}
</style>
