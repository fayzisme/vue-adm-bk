<template>
  <div class="scrollable only-y login-page align-vertical">
    <div class="form-wrapper align-vertical-middle">
      <div style="background-color: #062867; padding: 0px 20px 0 20px; position: absolute; width: 100%; top: 0;">
        <el-row style="color: white;">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <div>
              <h1 style="font-size: 43px;">LONTAR</h1>
              <div style="position: relative; top: -37px;">
                Procurement Center
              </div>
              <div style="position: relative; top: -20px;">
                <img src="../../assets/images/logo.png" width="25%" />
              </div>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <h1 style="font-size: 56px; position:relative; bottom : -10px;">LONTAR <span style="color: #65728e;">Procurement Center</span></h1>
          </el-col>
        </el-row>
      </div>
      <div class="form-box">
        <el-row :gutter="30" class="no-p no-m">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="p-30">
            <p class="pb-30">
              <el-alert
                v-if="errorLogin"
                title="Failed"
                type="error"
                description="more text description"
                show-icon
              ></el-alert>
            </p>
            <form action @submit.prevent="login" :rules="rules" ref="loginForm">
              <!-- <float-label style="width: 100%;"> -->
                <input style="border: 8px solid #062867; border-radius: 50px; width: 100%; padding: 15px 20px; position: relative; right: 29px;"
                  type="text"
                  required
                  v-model="form.username"
                  id="form-email"
                  placeholder="Username"
                />
              <!-- </float-label> -->
              <!-- <float-label style="width: 100%; margin-top: 30px;"> -->
                <input style="border: 8px solid #062867; border-radius: 50px; width: 100%; padding: 15px 20px; position: relative; right: 29px; margin-top: 10px"
                  type="password"
                  required
                  v-model="form.password"
                  id="form-password"
                  placeholder="Password"
                />
              <!-- </float-label> -->

              <div class="flex text-center center pt-30 pb-10">
                <!-- <el-button >
                  Login
                </el-button> -->
                <g-recaptcha
                  :data-sitekey="sitekey"
                  :data-validate="validate"
                  :data-callback="callback"
                  style="background-color: #062867; border: none; width: 240px; padding: 10px 0 10px; border-radius: 50px;"
                  :data-btn-class="'el-button is-round login-btn tada animated' + (loadingLogin ? ' is-loading' : '')"
                >
                  <i class="el-icon-loading" v-if="loadingLogin"></i>
                  {{ $t("login.login") }}
                </g-recaptcha>
                <!-- <el-button :loading="loadingLogin" round native-type="submit" class="login-btn tada animated" id="submit-form" style="background-color: #062867; border: none; width: 240px; padding: 15px 0 15px; border-radius: 50px;">
									{{ $t("login.login") }}
                </el-button> -->
              </div>
            </form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import gRecaptcha from "@finpo/vue2-recaptcha-invisible";
import api from "@/networkClient";
import config from "@/config";
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 512 });
const pub = key.importKey(config.privateKey, "pkcs1-public-pem");

export default {
  name: "Login",
  components: {
    gRecaptcha
  },
  data() {
    return {
      sitekey: config.recaptcha.sitekey,
      form: {
        username: "",
        password: ""
      },
      errorLogin: false,
      loadingLogin: false,
      windowWidth: window.innerWidth,
      rules: {
        username: [
          {
            required: true,
            message: "Please input username",
            trigger: "blur"
          },
          { min: 5, message: "Character length too short", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async login(token) {
      this.loadingLogin = true;
      await api({
        method: "post",
        url: config.baseApi + "auth/login",
        data: {
          username: this.form.username,
          password: pub.encrypt(this.form.password, "base64")
        },
        timeout: 10 * 1000
      })
        .then(response => {
          if (response.data.ec == 200) {
            this.$store.commit("setLogin", response.data.data);
            // console.log("masuk", response);
            this.$router.push("/dashboard");
            // console.log("masuk", response);
          } else {
            this.$message.error({
              showClose: false,
              message: this.$t(`login.${response.data.message}`)
            });
          }
        })
        .catch(error => {
          this.$message.error({
            showClose: false,
            message: this.$t(`error_text`),
            type: "error"
          });
        });
      this.loadingLogin = false;
      // this.$router.push('dashboard')
    },
    register() {
      this.$router.push("register");
    },
    validate() {
      // validate your form , if you don't have validate prop , default validate pass .
      this.loadingLogin = true;
      if (_.isEmpty(this.form.email) && _.isEmpty(this.form.password)) {
        this.$message.error({
          showClose: false,
          message: this.$t(`login.invalid_parameter`)
        });
        this.loadingLogin = false;
        return false;
      } else {
        return true;
      }
    },
    async callback(token) {
      // google recaptcha token , then you can pass to backend with your form data .
      // console.log(token)
      if (token) {
        this.login(token);
        // alert(token);
      } else {
        // if you use data-size show reCAPTCHA , maybe you will get empty token.
        alert("Please check you are not robot");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/_variables";

.login-page {
  background: url('../../assets/images/background.jpg');
  margin-left: -30px;
  background-size: cover;
  margin-right: -30px;

  .form-wrapper {
    width: 100%;
  }

  .form-box {
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    margin: 20px auto;

    a {
      font-size: 14px;
      color: $text-color-accent;
      text-decoration: none;
      font-weight: 500;
    }

    .image-logo {
      width: 200px;
      display: block;
    }

    .login-btn {
      padding: 10px 0 10px;
      width: 220px;
      background-color: transparent;
      border: none;
      color: white;

      &:hover {
        opacity: 0.9;
      }
    }

    .signin-box {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .layout-container .container .view.login-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}

@media (max-width: 992px) {
  .form-box {
    max-width: 400px !important;
  }
}
</style>


<style lang="scss" scoped>
.el-col {
  padding-left: 30px !important;
  padding-right: 30px !important;
}
.tab-invert {
  height: 100%;
}
.white-text {
  color: white;
}
</style>
