<template>
  <div>
    <div class="sidebar__AL">
      <img alt="Vue logo" src="@/assets/img/Al.svg" />
      <a href="#">Addictive Learning</a>
    </div>
    <h2 class="sidebar__title">Reset password</h2>

    <form novalidate class="sidebar__form" @submit.prevent="validateUser">
      <img src="@/assets/img/lock.svg" class="sidebar__lock-ico" alt="lock" />

      <md-card-header>
        <div class>We will sent you a password reset link connected to your existing account</div>
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
        </div>
      </md-card-content>

      <Loader v-if="sending" />
      <md-button type="submit" class="sidebar__form_submit" :disabled="sending">Reset password</md-button>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>

    <router-link to="/login" class="sidebar__link-blue">
      <b>Go back</b>
    </router-link>
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
} from "vuelidate/lib/validators";
import Loader from "@/components/commons/Loader";

export default {
  name: "ForgotPassword",
  components: {
    Loader,
  },
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),

  validations: {
    form: {
      email: {
        required,
        email,
      },
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

.sidebar__lock-ico {
  margin-bottom: 5px;
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
}
</style>

