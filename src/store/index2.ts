import recordStore from "@/store/recordStore";
import tagStore from "@/store/tagStore";
const store = {
    ...tagStore,
    ...recordStore,
};
console.log(store);
export default store;