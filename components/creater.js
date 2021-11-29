export const creater = {
  beforeCreate(doc) {
    console.log(/*LL*/ 11, 'this.uuid', this.uuid);
    Object.assign(doc, { id: this.uuid(), createdAt: Date.now() });
  },

  async create(...props) {
    const fn = this.isManyDocs(props.docs) ? this.createMany : this.createOne;
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
