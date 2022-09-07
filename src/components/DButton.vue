<template>
    <button class="button">
        <slot/>
    </button>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    @Component
    export default class DButton extends Vue {
        
    }
</script>

<style lang="scss" scoped>
.button {
    border: none;
    background: #767676;
    border-radius: 4px;
    height: 40px;
    padding: 0 16px;
    color: white;
  }
</style>