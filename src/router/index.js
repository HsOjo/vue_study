import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/components/Index";
import Login from "@/components/Login";
import Category from "@/components/Category";
import Commodity from "@/components/Commodity";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Category,
    },
    {
      path: '/commodity/:id',
      name: 'Commodity',
      component: Commodity,
    },
  ],
})