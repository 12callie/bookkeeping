const localStorageKeyName = "tagList";

type TagListModel = {
  data: string[];
  fetch: () => string[];
  save: () => void;
  create: (name: string) => 'duplicate' | 'success';
};


const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
    return this.data;
  },
  create(name) {
    if(this.data.indexOf(name)>=0){
      return 'duplicate';
    }else{
      this.data.push(name);
      this.save();
      return 'success';
    }
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },

};
export { tagListModel };