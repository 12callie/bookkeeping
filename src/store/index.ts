import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import clone from "@/lib/clone";

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],

  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || "[]");
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords');
    }
  }

});


export default store;   