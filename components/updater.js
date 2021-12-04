export const updater = {
  beforeUpdate(doc) {
    Object.assign(doc, { updatedAt: Date.now() });
  },

  async update(...props) {
    if(this.isManyDocs(props[0].payload)) return await this.updateMany(...props) 
    return await this.updateOne(...props);
  },

  async updateOne({ collectionName, payload }) {
    const doc = payload;
    this.beforeUpdate(doc);

    const ref = this.getRef({ collectionName, id: doc.id });
    return await this.updateDoc(ref, doc);
  },

  async updateMany({ collectionName, payload }) {
    const docs = payload;
    const batch = this.getBatch();

    docs.forEach((doc) => {
      this.beforeUpdate(doc);

      const ref = this.getRef({ collectionName, id: doc.id });
      batch.update(ref, doc);
    });

    return await batch.commit();
  },
};
