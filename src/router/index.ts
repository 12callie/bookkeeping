import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/components/Money.vue'
import Labels from '@/components/Labels.vue'
import Statistics from '@/components/Statistics.vue'
import NotFound from '@/components/NotFound.vue'
import EditLabel from '@/components/EditLabel.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
