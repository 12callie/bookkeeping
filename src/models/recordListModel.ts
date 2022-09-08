const localStorageKeyName = "recordList";
const recordListModel = {
  //获取数据
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
  },
  //保存数据
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  clone(data: RecordItem | RecordItem[]){
    return JSON.parse(JSON.stringify(data))
  }
};
export { recordListModel };