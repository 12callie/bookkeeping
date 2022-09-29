import createId from "@/lib/createId";
const localStorageKeyName = "tagList";


const tagStore = {
    tagList: [] as Tag[],

    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]");
        return this.tagList;
    },
    saveTags() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    },
    createTag(name: string) {
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            alert("标签名已存在");
            return 'duplicate';
        } else {
            const id = createId().toString();
            this.tagList.push({ id, name: name });
            this.saveTags();
            alert("创建成功");
            return 'success';
        }
    },
    removeTag(id: string) {
        if (window.confirm("确定删除此标签吗？")) {
            let index = -1;
            for (let i = 0; i < this.tagList.length; i++) {
                if (this.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            this.tagList.splice(index, 1);
            this.saveTags();
            return true;
        }
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) < 0) {
            return 'not found';
        } else {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicate';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success';
            }
        }
    },
    findTag(id: string) {
        return this.tagList.filter((tag) => tag.id === id)[0];
    }
};
tagStore.fetchTags();
export default tagStore;



