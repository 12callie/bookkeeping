<template>
  <Layout>
    <div class="navBar">
      <Icon class="icon-left" name="left"></Icon>
      <span class="title">编辑标签</span>
      <span class="span-right"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="value" field-name="标签名" placeholder="请输入标签名" />
    </div>
    <div class="deleteTag-wrapper">
      <DButton class="deleteTag">删除标签</DButton>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagListModel } from "@/models/tagListModel";
import FormItem from "@/components/money/FormItem.vue";
import DButton from "@/components/DButton.vue";

@Component({
  components: { FormItem, DButton },
})
export default class EditLabel extends Vue {
  value: string = "";
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((tag) => tag.id === id)[0];
    if (tag) {
      this.value = tag.name;
    } else {
      this.$router.replace("/404");
    }
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

.deleteTag-wrapper {
  text-align: center;
  margin-top: 44px;
}
</style>
