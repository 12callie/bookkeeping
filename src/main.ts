import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import { tagListModel } from '@/models/tagListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
window.createTag = (name) => {
  const message = tagListModel.create(name);
  if (message === "duplicate") {
    alert("标签名已存在");
  } else {
    alert("创建成功");
  }
  return;
};
window.removeTag = (id: string) => {
  if (window.confirm("确定删除此标签吗？")) {
    return tagListModel.remove(id);
  }
};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};
window.findTag = (id: string) => {
  return window.tagList.filter((tag) => tag.id === id)[0];
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

