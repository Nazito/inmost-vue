<template>
  <div class="content">
    <h2 class="content__tiitle">One login to:</h2>
    <img class="content__img" src="@/assets/img/mainImg.png" alt="mainImg" />
  </div>
</template>
<style leng="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content__tiitle {
  font-weight: bold;
  font-size: 50px;
  line-height: 59px;
  text-transform: uppercase;
  color: #357efc;
}

.content__img {
  max-width: 100%;
}

@media screen and (max-width: 950px) {
  .content__tiitle {
    font-size: 35px;
    line-height: 39px;
  }
}

@media screen and (max-width: 767px) {
  .content {
    display: none;
  }
}
</style>