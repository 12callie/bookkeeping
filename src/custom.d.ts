type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
};
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: string;
  createdAt?: string;
};
type Tag = {
  id: string;
  name: string;
};

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (name: string) => 'duplicate' | 'success';
  update: (id: string, name: string) => 'duplicate' | 'success' | 'not found';
  remove: (id: string) => Boolean;
};

interface Window {


}

