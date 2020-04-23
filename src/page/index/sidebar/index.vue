<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar style="height:100%">
      <div v-if="validatenull(menu)"
           class="avue-sidebar--tip">
      </div>
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               :collapse="keyCollapse" v-loading="loading"
      element-loading-text="菜单加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)" style="height: 100%">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      first
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import logo from "../logo";
  import sidebarItem from "./sidebarItem";

  export default {
    name: "sidebar",
    components: {sidebarItem, logo},
    inject: ["index"],
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
        loading: true
      };
    },
    created() {
      this.isQueryLogin()

    },
    computed: {
      ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen", "menuId"]),
      nowTagValue: function () {
        return this.$router.$avueRouter.getValue(this.$route);
      }
    },
    mounted() {
    },
    methods: {
      isQueryLogin() {
        let {username,password} = {
          username:this.$route.query.username,
          password:this.$route.query.password
        }
        console.log(username, password)
        if (username && password) {
          this.loginForm.username = username;
          this.loginForm.password = password;
          console.log(this.loginForm)
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
              console.log(this.menuId)
              this.index.openMenu(this.menuId);
              this.$store.dispatch('GetButtons');
              setTimeout(() => {
                this.loading = false
              }, 500);
              this.$store.dispatch("FlowRoutes").then(() => {
            });
          })
        }else{
          this.$store.dispatch('GetButtons');
          this.index.openMenu(this.menuId);
          setTimeout(() => {
              this.loading = false
            }, 500);
        }
      },
    }
  };
</script>
<style lang="scss" scoped>
.avue-sidebar--tip{
  height: 100%;
}
</style>

