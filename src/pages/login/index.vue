<!--
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-02-17 14:31:14
-->
<template>
  <div class="login-content">
    <div class="logo">
      <van-image
        width="80"
        height="80"
        fit="cover"
        round="round"
        src="https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/detong_logo_mp.png"
      >
      </van-image>
    </div>
    <div class="input-content">
      <van-field
        :border="loginType === 1 ? false : true"
        placeholder="请输入手机号"
        @change="(e) => onChange(e, 'phone')"
      />
      <van-field
        v-if="loginType === 2"
        @change="(e) => onChange(e, 'pwd')"
        type="password"
        :border="true"
        placeholder="请输入密码"
      />
      <van-cell-group v-if="loginType === 1">
        <van-field
          @change="(e) => onChange(e, 'captcha')"
          center
          clearable
          placeholder="请输入短信验证码"
          :border="false"
          use-button-slot
        >
          <span class="send-sms" slot="button"> 发送验证码 </span>
        </van-field>
      </van-cell-group>
      <div class="login-btn">
        <van-button
          class="lb-btn"
          type="info"
          @click="loginHandle"
          custom-style="width: 100%;height: 44px;background: #2140D9;border-radius: 22px;"
          >登录</van-button
        >
      </div>
    </div>
    <div class="fast-login">
      <van-divider contentPosition="center">其他登录方式</van-divider>
      <div class="icon-block" style="margin-right: 41px">
        <img
          class=""
          @click="wxLogin"
          src="https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/btn_wx.svg"
        />
        <span>微信登录</span>
      </div>
      <div
        v-if="loginType === 1"
        class="icon-block"
        @click="switchLoginType(2)"
      >
        <img
          class=""
          @click="wxLogin"
          src="https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/btn_zhdl.svg"
        />
        <span>账户登录</span>
      </div>
      <div
        v-if="loginType === 2"
        class="icon-block"
        @click="switchLoginType(1)"
      >
        <img
          class=""
          @click="wxLogin"
          src="https://huhuiyun.oss-cn-shanghai.aliyuncs.com/static/btn_zhdl%20%281%29.svg"
        />
        <span>短信登录</span>
      </div>
    </div>
    <van-notify id="van-notify" />
  </div>
</template>

<script>
import Notify from "@/../static/vant/notify/notify";
// import { loginByPass } from '@/request/user.js'
import md5 from "@/utils/md5.js";
import { setUserLoginStatus } from "@/utils/index";

export default {
  components: {},
  data() {
    return {
      loginType: 2, // 1:短信验证码登录  2:手机号+密码
      phone: "",
      pwd: "",
      captcha: "",
    };
  },
  onShow() {},
  methods: {
    switchLoginType(loginType) {
      this.loginType = loginType;
    },
    onChange(event, props) {
      this[props] = event.mp.detail;
    },
    loginHandle() {
      const { loginType, phone, pwd, captcha } = this;
      console.log(
        "loginType, phone, pwd, captcha",
        loginType,
        phone,
        pwd,
        captcha
      );
      let loginData = {},
        errMsg = "";
      if (loginType === 1) {
        if (!phone || !captcha) {
          Notify({
            type: "warning",
            message: "请输入手机号和验证码！",
          });
          return;
        }
        loginData = { phone, captcha: md5(captcha) };
        errMsg = "手机号或验证码错误！";
      }

      if (loginType === 2) {
        if (!phone || !pwd) {
          Notify({ type: "warning", message: "请输入手机号和密码！" });
          return;
        }
        loginData = { phone, pwd: md5(pwd) };
        errMsg = "手机号或密码错误！";
      }

      loginByPass(loginData)
        .then((res) => {
          console.log("thenthen", res);
          const storageRes = setUserLoginStatus(res, mpvue);
          // const storageRes = mpvue.getStorageSync('token')
          if (storageRes) {
            Notify({ type: "success", message: "登录成功！" });
            mpvue.redirectTo({
              url: "/pages/index/main",
            });
          }
        })
        .catch((err) => {
          Notify({ type: "warning", message: errMsg });
        });
    },
  },
};
</script>

<style >
.login-content .logo {
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.login-content .input-content {
  margin-top: 33px;
  padding: 0px 16px;
  text-align: center;
  margin-bottom: 100px;
}

.login-content .input-content .send-sms {
  display: inline-block;
  text-align: center;
  color: #2140d9;
  font-size: 15px;
  width: 100px;
}

.login-content .input-content .login-btn {
  margin-top: 31px;
  text-align: center;
}
.login-content .input-content .login-btn .lb-btn {
  width: 643px;
  height: 44px;
  background: #2140d9;
  border-radius: 22px;
}

.login-content .fast-login {
  padding: 0px 16px;
  text-align: center;
}
.icon-block {
  display: inline-block;
  width: 44px;
}
.icon-block img {
  width: 41px;
  height: 41px;
  display: block;
}
.icon-block span {
  height: 16px;
  font-size: 11px;
  font-weight: 400;
  color: #999999;
  line-height: 16px;
}
.my-input {
  margin-bottom: 12px;
}
</style>
