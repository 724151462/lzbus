<template>
  <div class="login-container"
       ref="login"
       @keyup.enter.native="handleLogin">
    <top-color v-show="false"/>
    <!-- <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">
          {{time}}
        </div>
        <img class="img"
             src="/img/logo.png"
             alt="">
        <p class="title">{{ $t('login.info') }}</p>
      </div> -->
      <div class="login-border login-center pu-column">
        <img height="100" src="../../assets/imgs/jinghui.png" alt="">
        <span class="system-title">{{ $t('login.info') }}</span>
        <div class="login-main">
          <h4 class="login-title">
            {{ $t('login.title') }}
            <!-- <top-lang/> -->
          </h4>
          <userLogin v-if="activeName==='user'"/>
          <codeLogin v-else-if="activeName==='code'"/>
          <thirdLogin v-else-if="activeName==='third'"/>
          <div class="login-menu">
            <!-- <a href="#"
               @click.stop="activeName='user'">{{ $t('login.userLogin') }}</a>
            <a href="#"
               @click.stop="activeName='code'">{{ $t('login.phoneLogin') }}</a>
            <a href="#"
               @click.stop="activeName='third'">{{ $t('login.thirdLogin') }}</a> -->
          </div>
        </div>

      </div>
    <!-- </div> -->
  </div>
</template>
<script>
  import userLogin from "./userlogin";
  import codeLogin from "./codelogin";
  import thirdLogin from "./thirdlogin";
  import {mapGetters} from "vuex";
  import {dateFormat} from "@/util/date";
  import {validatenull} from "@/util/validate";
  import topLang from "@/page/index/top/top-lang";
  import topColor from "@/page/index/top/top-color";

  export default {
    name: "login",
    components: {
      userLogin,
      codeLogin,
      thirdLogin,
      topLang,
      topColor
    },
    data() {
      return {
        time: "",
        activeName: "user"
      };
    },
    watch: {
      $route() {
        const params = this.$route.query;
        this.socialForm.state = params.state;
        this.socialForm.code = params.code;
        if (!validatenull(this.socialForm.state)) {
          const loading = this.$loading({
            lock: true,
            text: `${
              this.socialForm.state === "WX" ? "微信" : "QQ"
            }登录中,请稍后。。。`,
            spinner: "el-icon-loading"
          });
          setTimeout(() => {
            loading.close();
          }, 2000);
        }
      }
    },
    created() {
      this.getTime();
      setInterval(() => {
        this.getTime();
      }, 1000);
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["website"])
    },
    props: [],
    methods: {
      getTime() {
        this.time = dateFormat(new Date());
      }
    }
  };
</script>

<style lang="scss" scope>
  @import "@/styles/login.scss";
  .login-center{
    margin: 0 auto;
  }
  .system-title{
    color: #2674C8;
    font-size: 30px;
  }
  .login-main{
    width:420px;
height:320px;
background:rgba(38,116,200,1);
box-shadow:4px 20px 38px 0px rgba(17,57,79,0.59);
border-radius:10px;
margin-top: 30px
  }
  .login-title{
    color: #fff;
    margin-top: 20px;
    margin-bottom: 0;
  }
  .login-form{
    width: 300px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .login-form .el-input input{
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 0px 0px rgba(179, 249, 227, 0.35), 0px 3px 7px 0px rgba(20, 65, 42, 0.35);
    border-radius:3px;
    padding-bottom: 0;
  }
</style>
