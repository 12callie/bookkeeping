<template>
  <div>
    <div class="nav">
      <router-link to="/money">
        <svg>
          <use xlink:href="#add" />
        </svg>
        记账
      </router-link>
      |
      <router-link to="/labels">
        <svg>
          <use xlink:href="#label" />
        </svg>
        标签
      </router-link>
      |
      <router-link to="/statistics">
        <svg>
          <use xlink:href="#statistics" />
        </svg>
        统计
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import x from "@/assets/icons/add.svg";
import y from "@/assets/icons/label.svg";
import z from "@/assets/icons/statistics.svg";
console.log(x, y, z);

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid blue;
}
svg {
  width: 100px;
  border: 1px solid red;
}
</style>
