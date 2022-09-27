type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: string;
  createdAt?: Date;
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
  tagList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => Boolean | undefined;
  updateTag: (id: string, name: string) => 'duplicate' | 'success' | 'not found';
  findTag: (id: string) => Tag | undefined;
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void;
}

