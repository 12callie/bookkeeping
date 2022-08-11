import Types from '@/components/money/Types.vue';
<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="js">
export default {
  name: "Types",
  data(){
    return {
      type: '-'
    }
  },
  props: ['xxx'],
  mounted(){
    console.log(this.xxx)
  },
  methods:{
    selectType(type){
      this.type = type
      return undefined
    }
  }
};
</script>

<style lang="scss" scoped>
.types {
  background-color: #c4c4c4;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  > li {
    width: 50%;
    height: 64px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: #333;
    }
  }
}
</style>
