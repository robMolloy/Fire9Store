export const reader = {
  async readOne({ collectionName, payload }) {
    const id = payload;
    const ref = this.getRef({ collectionName, id });
    const docSnap = await this.getDoc(ref);
    return this.parseDoc(docSnap);
  },

  async readMany({ collectionName, payload = [] }) {
    const ids = payload;

    const collection = this.getCollection({collectionName});
    const where = this.where('id', 'in', ids);

    const q = this.query(collection, where);
    const docs = this.parseDocs(await this.getDocs(q));
    
    return docs;
  },

  async readAll({ collectionName }) {
    const docs = await this.getDocs(this.getCollection({ collectionName }));
    return this.parseDocs(docs);
  },
};
