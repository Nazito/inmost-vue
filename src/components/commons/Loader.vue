<template>
  <div class="md-progress-bar">
    <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>
<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .md-progress-spinner {
    background: url("./../../assets/img/loader.svg") center no-repeat;
    background-size: cover;
  }
}
</style>