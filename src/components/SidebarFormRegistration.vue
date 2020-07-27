<template>
  <div>
    <div class="sidebar__AL">
      <img alt="Vue logo" src="@/assets/img/Al.svg" />
      <a href="#">Addictive Learning</a>
    </div>
    <h2 class="sidebar__title">Sign up</h2>

    <form novalidate class="sidebar__form" @submit.prevent="validateUser">
      <FacebookBtn />
      <md-card-header>
        <div>Or sign up with e-mail and password:</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <md-field :class="getValidationClass('email')">
            <label for="email">Your e-mail...</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">Your password</label>
            <md-input
              name="password"
              id="password"
              v-model="form.password"
              type="password"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.form.password.minlength">
              Minimum
              {{ $v.form.password.$params.minLength.min }} characters
            </span>
          </md-field>

          <md-field :class="getValidationClass('repeatPassword')">
            <label for="repeatPassword">Confirm password</label>
            <md-input
              name="repeatPassword"
              id="repeatPassword"
              v-model.trim="$v.form.repeatPassword.$model"
              type="password"
              :disabled="sending"
            />
            <span
              class="md-error"
              v-if="!$v.form.repeatPassword.sameAsPassword"
            >Passwords must be identical</span>
          </md-field>
          <md-checkbox v-model="form.terms" :class="getValidationClass('terms')">
            Accept
            <a href="#" class="sidebar__link">Terms and Conditions</a>
          </md-checkbox>

          <md-checkbox v-model="form.privacy" :class="getValidationClass('privacy')">
            Yes, i`d love to receive emails with great content and updates
            <a
              href="#"
              class="sidebar__link"
            >Your privacy</a>
            (optional)
          </md-checkbox>
        </div>
      </md-card-content>

      <Loader v-if="sending" />

      <md-button type="submit" class="sidebar__form_submit" :disabled="sending">Create Free Account</md-button>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>

    <p>
      Have an account?
      <router-link to="/login" class="sidebar__link-blue">
        <b>Log in</b>
      </router-link>
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
Vue.use(VueMaterial);
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import Loader from "@/components/commons/Loader";
import FacebookBtn from "@/components/FaceBookLoginBtn";

export default {
  name: "Registration",
  components: {
    Loader,
    FacebookBtn,
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      password: null,
      repeatPassword: null,
      email: null,
      terms: false,
      privacy: false,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),

  validations: {
    form: {
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAsPassword: sameAs("password"),
      },
      email: {
        required,
        email,
      },
      terms: { required, checked: (v) => v },
      privacy: { required, checked: (v) => v },
    },
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.password = null;
      this.form.repeatPassword = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.password} ${this.form.email}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss">
.sidebar__AL {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 40px;

  a {
    text-decoration: none;
    margin-left: 20px;
    color: #357efc;

    &:hover {
      text-decoration: underline;
    }
  }
}

.sidebar__title {
  font-size: 28px;
  line-height: 33px;
  color: #3b4246;
  font-weight: normal;
  margin-bottom: 35px;
}

.sidebar__link {
  color: #817f88;
  text-decoration: underline !important;
  &:hover {
    text-decoration: none !important;
  }
}

.sidebar__link-blue {
  color: #357efc;
  text-align: right;
  text-decoration: none !important;
  &:hover {
    text-decoration: underline !important;
  }
}

.sidebar__form {
  width: 386px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 33px;
  margin-bottom: 40px;
}

.md-field {
  margin: 5px 0;
  border: 1px solid #dde2e5;
  border-radius: 8px;
  height: auto;
  align-self: baseline;
  padding-top: 0;
  transition: all 0.4s;

  &.md-invalid {
    border-color: red;
    position: relative;
    transition: all 0.4s;

    &::after {
      content: "";
      transition: all 0.4s;
      position: absolute;
      width: 24px;
      height: 24px;
      top: 50%;
      transform: translate(-30px, -50%);
      left: 100%;
      background: url("./../assets/img/alert-triangle.svg") center no-repeat;
      background-color: #ffffff;
      z-index: 100;
    }
  }

  &.md-has-value.md-has-password .md-toggle-password {
    opacity: 1;
  }

  &.md-has-password .md-toggle-password {
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    svg {
      fill: #817f88;
    }
  }

  &.md-focused {
    border-color: #357efc;
    transition: all 0.4s;
  }
  .md-input {
    align-self: center;
    color: #3b4246;
    padding-left: 20px;
    padding-right: 40px;
  }
  .md-error {
    left: 15px;
    top: 27px;
    font-size: 10px;
  }
  label {
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
  }
  &.md-has-value {
    label {
      top: 38px;
      left: 20px;
      opacity: 0;
    }
  }
  &.md-focused {
    label {
      top: 38px;
      left: 20px;
      opacity: 0;
    }
  }
}

.md-checkbox {
  margin: 8px 0;

  &.md-invalid {
    .md-checkbox-container {
      border-color: red;
    }
  }
  .md-checkbox-container {
    width: 20px;
    height: 20px;
    border: 1px solid #357efc;
    box-sizing: border-box;
    border-radius: 4px;

    &::after {
      width: 6px;
      height: 12px;
      top: 1px;
      left: 6px;
      border: 2px solid #ffffff;
      border-top: 0;
      border-left: 0;
      opacity: 0;
      transform: rotate(45deg);
    }
  }

  &.md-checked {
    .md-checkbox-container {
      background: #357efc;
    }
  }

  .md-checkbox-label {
    padding-left: 20px;
    letter-spacing: 0;
    text-align: left;
  }
}

.sidebar__form_submit {
  background: #357efc;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  font-weight: bold;
  color: #ffffff;
  height: 46px;
  text-transform: none;
  font-size: 16px;
  margin-bottom: 0;
  margin-top: 10px;
}
</style>
