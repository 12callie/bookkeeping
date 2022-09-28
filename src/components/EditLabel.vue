<template>
  <Layout>
    <div class="navBar">
      <Icon class="icon-left" name="left" @click.native="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="span-right"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        @update:value="update"
        field-name="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <DButton @click.native="remove">删除标签</DButton>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/money/FormItem.vue";
import DButton from "@/components/DButton.vue";
import store from "@/store/index2";

@Component({
  components: { FormItem, DButton },
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;
  created() {
    this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      if (store.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background-color: #fff;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  ::v-deep .icon {
    width: 24px;
    height: 24px;
  }
  .span-right {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background-color: #fff;
  margin-top: 8px;
  font-size: 16px;
}

.button-wrapper {
  text-align: center;
  margin-top: 44px;
}
</style>
