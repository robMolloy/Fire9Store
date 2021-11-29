export const reader = {
  async readOne({ collectionName, payload }) {
    const id = payload;
    const ref = this.getRef({ collectionName, id });
    const docSnap = await this.getDoc(ref);
    return this.parseDoc(docSnap);
  },

  async readMany({ collectionName, payload = [] }) {
    const ids = payload;
    const promises = ids.map((id) => this.readOne({ collectionName, payload: id }));
    return await Promise.all(promises);
  },

  async readAll({ collectionName }) {
    const docs = await this.getDocs(this.getCollection({ collectionName }));
    return this.parseDocs(docs);
  },
};
