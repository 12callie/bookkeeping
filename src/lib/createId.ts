function createId(tagList: Tag[]) {
    let id = parseInt(tagList[tagList.length - 1].id);
    id++;
    return id.toString();
}
export default createId;

