<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <DButton class="createTag" @click.native="createTag">新建标签</DButton>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import DButton from "@/components/DButton.vue";
import TagHelper from "@/mixins/TagHelper";
@Component({
  components: { DButton },
})
export default class Labels extends Mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: rgb(255, 255, 255);
  > .tag {
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
.createTag {
  &-wrapper {
    text-align: center;
    margin-top: 44px;
  }
}
</style>
