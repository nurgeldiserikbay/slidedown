<script lang="ts" setup>
import { useSettingsStore } from '@/store/settingsStore'

const settingsStore = useSettingsStore()
</script>

<template>
  <div v-if="settingsStore.scores?.best && settingsStore.scores?.last" class="score">
    <div class="score__values">
      <div v-if="settingsStore.scores?.best" class="score__titles">Best Score</div>
      <div v-if="settingsStore.scores?.best" class="score__best">
        <span>{{ settingsStore.scores.best.name }}:</span>
        <span>{{ settingsStore.scores.best.value }}</span>
      </div>
      <div v-if="settingsStore.scores?.last" class="score__titles">Last Score</div>
      <div v-if="settingsStore.scores?.last" class="score__last">
        <span>{{ settingsStore.scores.last.name }}:</span>
        <span>{{ settingsStore.scores.last.value }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.back-to {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 15vw;

  svg {
    width: 100%;
    filter: drop-shadow(10px 15px 15px rgb(0 0 0 / 0.8));
  }
}

.score {
  min-width: 200px;
  position: relative;
  border: 15px solid #979CB0;
  padding: 0.8rem 1rem;
  background: #979CB0;
  font-family: 'LilitaOne', sans-serif;
  font-size: 25px;
  font-weight: bold;
  color: #FFFFFF9A;
  box-shadow: inset 0 0 10px 0px rgba(0, 0, 0, 0.4);
  border-image: url('/public/img/tiles/p-0.png') 30 round round;

  &__titles {
    text-align: center;
    font-family: 'LilitaOne';
    font-weight: 400;
    font-size: 16px;
    line-height: 1.8;
    color: #2F2946;
    letter-spacing: 2px;
  }

  &__values {
    font-family: 'LilitaOne';
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4;
    text-transform: uppercase;
    color: #2F2946;
    letter-spacing: 2px;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__best,
  &__last {
    display: flex;
    justify-content:space-between;
    gap: 18px;
    margin-bottom: 10px;
  }
}
</style>
