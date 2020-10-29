<template>
  <el-container class="login-container">
    <el-row style="margin-left: auto; margin-right: auto;">
      <el-col :span="16">
        <img src="@/assets/login.png" alt="">
      </el-col>
      <el-col :span="8">
        <el-form ref="form" label-width="80px" style="margin-top: 64px;">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login(username, password)">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      login(username, password) {
        this.req.post(this.api.USER_LOGIN, {
          userName: username,
          pwd: password,
        }).then(
          resp => {
            let user = resp.data;
            if (user) {
              this.stor.local.set('current_user', user);
              this.bus.$emit('userChanged');
            }
            this.$router.push(this.stor.session.get('referer'));
            this.notify('用户登录', resp.errorMsg);
          }
        )
      }
    }
  }
</script>

<style scoped>
.login-container {
  width: 1024px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>