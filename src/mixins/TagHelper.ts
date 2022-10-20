import Vue from "vue";
import Component from 'vue-class-component';
@Component
export default class TagHelper extends Vue {
    createTag() {
        const tagName = window.prompt("请输入标签名");
        if (tagName === "") {
            return alert("标签名不能为空");
        } else if (tagName === null) {
            return;
        }
        this.$store.commit("createTag", tagName);
    }
}
