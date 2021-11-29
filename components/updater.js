export const updater = {
  beforeUpdate(doc) {
    Object.assign(doc, { updatedAt: Date.now() });
  },

  async update(...props) {
    const fn = this.isManyDocs(props.docs) ? this.updateMany : this.updateOne;
    return await fn(...props);
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
