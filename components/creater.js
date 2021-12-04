export const creater = {
  beforeCreate(doc) {
    Object.assign(doc, { id: this.uuid(), createdAt: Date.now() });
  },

  async create(...props) {
    const fn = this.isManyDocs(props[0].payload) ? this.createMany : this.createOne;
    return await fn(...props);
  },

  async createOne({ collectionName, payload }) {
    const doc = payload;
    this.beforeCreate(doc);

    const ref = this.getRef({ collectionName, id: doc.id });
    return await this.setDoc(ref, doc);
  },

  async createMany({ collectionName, payload }) {
    const docs = payload;
    const batch = this.getBatch();
    docs.forEach((doc) => {
      this.beforeCreate(doc);

      const ref = this.getRef({ collectionName, id: doc.id });
      batch.set(ref, doc);
    });

    return await batch.commit();
  },
};
