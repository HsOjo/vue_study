import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/components/Index";
import About from "@/components/About";
import Items from "@/components/Items";

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/items',
      name: 'Items',
      component: Items,
    },
  ],
})