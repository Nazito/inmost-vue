<template>
  <md-button class="sidebar__form_FB">
    Sign up with Facebook
    <facebook-login
      class="button-FB"
      appId="281324856475125"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded"
    ></facebook-login>
  </md-button>
</template>

<script>
import Vue from "vue";
import facebookLogin from "facebook-login-vuejs";

export default {
  name: "FaceBookBtn",
  components: { facebookLogin },
  methods: {
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email" },
        (userInformation) => {
          console.warn("get data from fb", userInformation);
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
  },
};
</script>

<style lang="scss">
.button-FB {
  position: absolute;
  left: -15px;
  width: 100%;
  cursor: pointer;

  button[data-v-0af1f3c3] {
    min-width: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
    img {
      display: none;
    }
  }
}
.sidebar__form_FB {
  border: 1px solid #357efc;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  font-weight: bold;
  color: #357efc;
  height: 46px;
  text-transform: none;
  font-size: 16px;
  position: relative;

  .md-button-content {
    width: 100%;
    transform: translateX(15px);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(15px);

    &::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      background: url("./../assets/img/FB.svg") center no-repeat;
      background-size: cover;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
