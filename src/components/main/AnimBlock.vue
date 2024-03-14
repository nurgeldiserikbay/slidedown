<script lang="ts" setup>
const $props = defineProps<{
  isAnimated: boolean;
}>()
</script>

<template>
  <img src="/img/stone/block-1.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-2.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-3.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-4.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-5.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-6.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-7.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" />
  <img src="/img/stone/block-1.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-2.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-3.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-4.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-5.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-6.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
  <img src="/img/stone/block-7.webp" alt="block" :class="{ isAnimated: $props.isAnimated }" /> 
</template>

<style lang="scss" scoped>
  img {
    position: absolute;
    top: -250px;
    max-width: 100px;
    animation: fall 2s linear 1;

    &.isAnimated {
      animation: none;
    }

    &:nth-child(1) {
      left: 5%;
      animation-delay: 0ms;
      animation-duration: 3s;
      z-index: 10;
    }

    &:nth-child(2) {
      left: 10%;
      animation-delay: 200ms;
      z-index: 15;
      max-width: 50px;
      animation-duration: 4s;
    }

    &:nth-child(3) {
      left: 15%;
      animation-delay: 50ms;
      z-index: 5;
      animation-duration: 1.8s;
    }

    &:nth-child(4) {
      left: 30%;
      animation-delay: 150ms;
      z-index: 20;
      max-width: 30px;
      animation-duration: 3.8s;
    }

    &:nth-child(5) {
      left: 50%;
      animation-delay: 100ms;
      z-index: 12;
      max-width: 80px;
      animation-duration: 3.7s;
    }

    &:nth-child(6) {
      left: 75%;
      animation-delay: 300ms;
      z-index: 10;
      animation-duration: 1.7s;
    }

    &:nth-child(7) {
      left: 80%;
      animation-delay: 150ms;
      z-index: 10;
      max-width: 120px;
      animation-duration: 2.6s;
    }

    &:nth-child(8) {
      left: 30%;
      animation-delay: 50ms;
      z-index: 10;
      animation-duration: 1.8s;
    }

    &:nth-child(9) {
      left: 18%;
      animation-delay: 550ms;
      z-index: 10;
      max-width: 90px;
      animation-duration: 2.7s;
    }

    &:nth-child(10) {
      left: 35%;
      animation-delay: 250ms;
      z-index: 10;
      animation-duration: 1.8s;
    }

    &:nth-child(11) {
      left: 48%;
      animation-delay: 350ms;
      z-index: 10;
      animation-duration: 1.4s;
    }

    &:nth-child(12) {
      left: 63%;
      animation-delay: 450ms;
      z-index: 10;
      max-width: 110px;
      animation-duration: 2.8s;
    }

    &:nth-child(13) {
      left: 72%;
      animation-delay: 400px;
      z-index: 10;
      animation-duration: 1.8s;
    }

    &:nth-child(14) {
      left: 84%;
      animation-delay: 30ms;
      z-index: 10;
      max-width: 60px;
      animation-duration: 1.6s;
    }
  }

  @keyframes fall {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(2500px);
    }
  }
</style>
