import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/components/Index";
import Login from "@/components/Login";
import Category from "@/components/Category";
import Commodity from "@/components/Commodity";
import Search from "@/components/Search";
import ShoppingCart from "@/components/account/ShoppingCart";
import MyOrders from "@/components/account/MyOrders";
import Favourites from "@/components/account/Favourites";
import Contacts from "@/components/account/Contacts";
import Charge from "@/components/account/Charge";
import Payment from "@/components/account/Payment";
import Infomation from "@/components/account/Infomation";

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
    {
      path: '/account/shopping-cart',
      name: 'ShoppingCart',
      component: ShoppingCart,
    },
    {
      path: '/account/my-orders',
      name: 'MyOrders',
      component: MyOrders,
    },
    {
      path: '/account/favourites',
      name: 'Favourites',
      component: Favourites,
    },
    {
      path: '/account/contacts',
      name: 'Contacts',
      component: Contacts,
    },
    {
      path: '/account/charge',
      name: 'Charge',
      component: Charge,
    },
    {
      path: '/account/payment',
      name: 'Payment',
      component: Payment,
    },
    {
      path: '/account/infomation',
      name: 'Infomation',
      component: Infomation,
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search,
    },
  ],
})