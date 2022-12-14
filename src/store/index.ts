import Vue from 'vue';
import Vuex from 'vuex';
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from '@/router';

Vue.use(Vuex);



const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]");
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },


    fetchTags(state) {
      const tags = [{ "id": "1", "name": "水果" }, { "id": "2", "name": "买菜" }, { "id": "3", "name": "衣服" }, { "id": "4", "name": "旅游" }, { "id": "5", "name": "请客" }, { "id": "6", "name": "吃饭" }, { "id": "7", "name": "1" }];
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        state.tagList = tags;
        store.commit('saveTags');
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        alert("标签名已存在");
      } else {
        const id = createId(state.tagList);
        state.tagList.push({ id, name: name });
        store.commit('saveTags');
        alert("创建成功");
      }
    },
    removeTag(state, id: string) {
      if (window.confirm("确定删除此标签吗？")) {
        let index = -1;
        for (let i = 0; i < state.tagList.length; i++) {
          if (state.tagList[i].id === id) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          state.tagList.splice(index, 1);
          store.commit('saveTags');
          router.back();
        } else {
          window.alert("删除失败");
        }
      }
    },
    updateTag(state, payload: { id: string, name: string; }) {
      const { id, name } = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) < 0) {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
        else {
          alert('标签名已存在');
        }
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((tag) => tag.id === id)[0];
    },

  }

});


export default store;   