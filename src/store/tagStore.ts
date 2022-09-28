import { tagListModel } from "@/models/tagListModel";

export default {
    tagList: tagListModel.fetch(),

    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === "duplicate") {
            alert("标签名已存在");
        } else {
            alert("创建成功");
        }
        return;
    },
    removeTag: (id: string) => {
        if (window.confirm("确定删除此标签吗？")) {
            return tagListModel.remove(id);
        }
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
    findTag(id: string) {
        return this.tagList.filter((tag) => tag.id === id)[0];
    }
};