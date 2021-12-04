import { namespaceifyStore } from 'vuex9';

export const vuexSync = ({ f9Store, store, moduleName, collectionName, setDataKey = 'setData' }) => {
  collectionName = collectionName || moduleName;
  moduleName = moduleName || collectionName;

  const module = namespaceifyStore(store, moduleName);
  const { setData } = module.commit(setDataKey);

  const onChange = (docs) => setData(docs);

  f9Store.listenToCollection({ collectionName, onChange });
};
