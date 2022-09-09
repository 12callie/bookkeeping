const localStorageKeyName = "tagList"

type Tag = {
  id: string
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  create: (name: string) => 'duplicate' | 'success'
  update: (id: string, name: string)=>'duplicate' | 'success' | 'not found'
  remove: (id: string)=>Boolean
}


const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
    return this.data
  },
  create(name) {
    //data可能是这样: [{id: '1', name: '1'}, {id: '2', name: '2'}]
    const names = this.data.map(item => item.name)
    if(names.indexOf(name)>=0){
      return 'duplicate'
    }else{
      this.data.push({id: name, name: name})
      this.save()
      return 'success'
    }
  },
  update(id: string, name: string){
    const idList = this.data.map(item => item.id)
    if(idList.indexOf(id)<0){
      return 'not found'
    }else{
      const names = this.data.map(item => item.name)
      if(names.indexOf(name)>=0){
        return 'duplicate'
      }else{
        const tag = this.data.filter(item => item.id === id)[0]
        tag.name = name
        this.save()
        return 'success'
      }
    }
  },
  remove(id:string){
    let index = -1
    for(let i = 0;i<this.data.length;i++){
      if(this.data[i].id === id){
        index = i
        break
      }
    }
    this.data.splice(index, 1)
    this.save()
    return true
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
  },

}
export { tagListModel }