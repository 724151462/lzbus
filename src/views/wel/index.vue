<template>
  <div style="height:100%">
    <el-card class="box-card" style="height:100%">
        <div>
          <div style="width:100%;text-align:center;margin-top:30px;">
            <img src="img/logo.png" style="width:200px;height:200px"/></div>
          <div style="width:100%;text-align:center;">
               <h1>柳州智慧公交轨道管控系统</h1>
          </div>
        </div>
    </el-card>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "wel",
    data() {
      return {
        loginForm: {
          //租户ID
          tenantId: "000000",
          //用户名
          username: "admin",
          //密码
          password: "admin",
          //账户类型
          type: "account",
          //验证码的值
          code: "000000",
          //验证码的索引
          key: "",
          //预加载白色背景
          image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    created() {
      console.log(this.$router)
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      login() {
        this.$store.dispatch("LoginByUsername", this.loginForm)
      }
    }
  };
</script>

<style>
  .el-font-size {
    font-size: 14px;
  }
</style>

