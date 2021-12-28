export const creater = {
  beforeCreate(doc) {
    doc.createdAt = Date.now()
    if(!doc.id) doc.id = this.uuid()
  },

  async create(...props) {
    if(this.isManyDocs(props[0].payload)) return await this.createMany(...props) 
    return await this.createOne(...props);
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
