import recordStore from "@/store/recordStore";
import tagStore from "@/store/tagStore";
const oldStore = {
    ...tagStore,
    ...recordStore,
};
export default oldStore;