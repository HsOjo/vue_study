<template>
  <el-container class="center-container">
    <CenterTabs>
      <el-row>
        <el-table :data="contact_items" border>
          <el-table-column label="默认联系人" width="100">
            <template slot-scope="scope">
              <el-radio v-model="contact_default" :label="scope.row.id" @change="setDefaultContactItem(contact_default)"
               style="display: flex; justify-content: center"><div/></el-radio>
            </template>
          </el-table-column>
          <el-table-column label="联系人姓名" width="150">
            <template slot-scope="scope">
              <span style="font-size: 16px;">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人电话" width="150">
            <template slot-scope="scope">
              <span style="font-size: 16px;">{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系人地址" width="300">
            <template slot-scope="scope">
              <span style="font-size: 16px;">{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="
                item = { id: scope.row.id, name: scope.row.name, mobile: scope.row.mobile, address: scope.row.address};
                dialog_visibile = true; mode = 'edit';
                ">编辑</el-button>
              <el-button size="mini" type="danger" @click="removeContactItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 8px; float: right">
        <el-button type="primary" @click="dialog_visibile = true; mode = 'add'">添加联系人</el-button>
        <el-dialog title="联系人信息" :visible.sync="dialog_visibile" width="640px">
          <el-form :model="item" :rules="rules" ref="form_item">
            <el-form-item label="姓名" prop="name" required>
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile" required>
              <el-input v-model="item.mobile"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" required>
              <el-input v-model="item.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_visibile = false; $ref.form_item.resetFields();">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </span>
        </el-dialog>
      </el-row>
    </CenterTabs>
  </el-container>
</template>

<script>
import CenterTabs from '@/components/account/common/CenterTabs'
export default {
  name: 'Contacts',
  components: {CenterTabs},
  data() {
    return {
      vm: null,
      current_user: null,
      contact_default: null,
      contact_items: [],
      dialog_visibile: false,
      mode: null,
      item: {},
      rules: {
        name: [
          {required:true, message:'请输入姓名'},
        ],
        mobile: [
          {required:true, message:'请输入手机号'},
          {min:11,max:11, message:'请确认手机号输入正确'},
        ],
        address: [
          {required:true, message:'请输入地址'},
        ],
      },
    }
  },
  created() {
    this.vm = this;
    this.getCurrentUser();
    this.getContactItems();
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
    },
    getContactItems() {
      this.req.post(this.api.CONTACT_LIST, {
        userId: this.current_user.id,
      }).then(
        resp => {
          this.contact_items = resp.data.data;
          for (let item of this.contact_items) {
            if (item.contactFlag) {
              this.contact_default = item.id;
            }
          }
        }
      )
    },
    removeContactItem(item_id) {
      this.req.post(`${this.api.CONTACT_REMOVE}`, {
        id: item_id,
        userId: this.current_user.id,
      }).then(
        resp => {
          this.notify('移除联系人', resp.errorMsg);
          this.getContactItems();
        }
      );
    },
    addContactItem(name, mobile, address) {
      this.req.post(this.api.CONTACT_ADD, {
        userId: this.current_user.id,
        name, mobile, address
      }).then(
        resp => {
          this.notify('添加联系人', resp.errorMsg);
          this.getContactItems();
        }
      );
    },
    editContactItem(item_id, name, mobile, address) {
      this.req.post(this.api.CONTACT_EDIT, {
        userId: this.current_user.id,
        id: item_id, name, mobile, address
      }).then(
        resp => {
          this.notify('编辑联系人', resp.errorMsg);
          this.getContactItems();
        }
      );
    },
    setDefaultContactItem(item_id) {
      this.req.post(this.api.CONTACT_SET_DEFAULT, {
        id: item_id,
        userId: this.current_user.id,
      }).then(
        resp => {
          this.notify('设置默认联系人', resp.errorMsg);
          this.getContactItems();
        }
      );
    },
    submitForm() {
      let form = this.$refs.form_item;
      form.validate(
        valid => {
          if(valid) {
            if(this.mode == 'add'){
              this.addContactItem(this.item.name, this.item.mobile, this.item.address);
            } else if(this.mode == 'edit'){
              this.editContactItem(this.item.id, this.item.name, this.item.mobile, this.item.address);
            }
            this.dialog_visibile = false;
            form.resetFields();
          } else {
            return false;
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.center-container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
</style>