<template>
  <el-container class="center-container">
    <CenterTabs>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <el-form :model="form_info" status-icon :rules="rules_info" ref="form_info" label-width="100px">
          <el-form-item label="昵称" prop="nickname" required>
            <el-input v-model="form_info.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" required>
            <el-input v-model="form_info.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeInfomation(form_info.nickname, form_info.email)">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card" style="margin-top: 16px">
        <div slot="header" class="clearfix">
          <span>修改密码</span>
        </div>
        <el-form :model="form_change" status-icon :rules="rules_pwd" ref="form_change" label-width="100px">
          <el-form-item label="旧密码" prop="oldpass" required>
            <el-input type="password" v-model="form_change.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass" required>
            <el-input type="password" v-model="form_change.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass" required>
            <el-input type="password" v-model="form_change.checkpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePassword(form_change.oldpass, form_change.newpass, form_change.checkpass)">修改</el-button>
            <el-button @click="$refs.form_change.resetFields();">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </CenterTabs>
  </el-container>
</template>

<script>
import CenterTabs from '@/components/account/common/CenterTabs'
export default {
  name: 'Infomation',
  components: {CenterTabs},
  data() {
    return {
      vm: null,
      current_user: null,
      form_change: {},
      form_info: {},
      rules_pwd: {
        oldpass: [{required: true, message: '请输入旧密码'}],
        newpass: [{required: true, message: '请输入新密码'}],
        checkpass: [
          {required: true, message: '请重复输入新密码'}, 
          {validator: (rule, value, callback) => {
           if(value !== this.form_change.newpass) {
             callback(new Error('两次输入密码不一致'));
           } else {
             callback();
           }
          }}
        ],
      },
      rules_info: {
        nickname: [{required: true, message: '请输入昵称'}],
        email: [{required: true, message: '请输入邮箱'}],
      },
    }
  },
  created() {
    this.vm = this;
    this.getCurrentUser();
    this.getUserInfo();
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
      this.getUserInfo();
    },
    getUserInfo() {
      this.req.post(this.api.USER_INFO, {
        id: this.current_user.id,
      }).then(
        resp => {
          this.form_info = resp.data;
        }
      )
    },
    changePassword(oldpass, newpass) {
      let form = this.$refs.form_change;
      form.validate(
        valid => {
          if(valid) {
            this.req.post(this.api.USER_CHANGE_PASSWORD, {
              userId: this.current_user.id,
              oldpassword: oldpass,
              rpassword: newpass,
            }).then(
              resp => {
                this.notify('修改密码', resp.errorMsg);
                this.$refs.form_change.resetFields();
              }
            )
          } else {
            return false;
          }
        }
      )
    },
    changeInfomation(nickname, email) {
      let form = this.$refs.form_info;
      form.validate(
        valid => {
          if(valid) {
            this.req.post(this.api.USER_INFO_CHANGE, {
              id: this.current_user.id,
              nickname, email,
            }).then(
              resp => {
                this.notify('修改信息', resp.errorMsg);
                this.getUserInfo();
              }
            )
          } else {
            return false;
          }
        }
      )
    }
  },
}
</script>

<style scoped>
.center-container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
</style>