const localStorageKeyName = "tagList";

type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
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
    //data可能是这样: [{id: '1', name: '1'}, {id: '2', name: '2'}]
    const names = this.data.map(item => item.name)
    if(names.indexOf(name)>=0){
      return 'duplicate';
    }else{
      this.data.push({id: name, name: name});
      this.save();
      return 'success';
    }
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },

};
export { tagListModel };