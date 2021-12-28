export const updater = {
  beforeUpdate(doc) {
    doc.updatedAt = Date.now()
  },

  isValidOne(doc) {
    if(!doc.id) throw { 
      action: 'updateOne',
      message:'Required payload: objects which has an id', 
      docs
    }
  },

  isValidMany(docs) {
    if(docs.some(({id}) => !id))
      throw {
        action: 'updateMany',
        message:'Required payload: array of objects which all have an id',
        docs 
      }
  },

  async update(...props) {
    if(this.isManyDocs(props[0].payload)) return await this.updateMany(...props) 
    return await this.updateOne(...props);
  },

  async updateOne({ collectionName, payload }) {
    const doc = payload;
    this.beforeUpdate(doc);

    this.isValidOne(doc)

    const ref = this.getRef({ collectionName, id: doc.id });
    return await this.updateDoc(ref, doc);
  },

  async updateMany({ collectionName, payload }) {
    const docs = payload;
    const batch = this.getBatch();
    
    this.isValidMany(docs)

    docs.forEach((doc) => {
      this.beforeUpdate(doc);

      const ref = this.getRef({ collectionName, id: doc.id });
      batch.update(ref, doc);
    });

    return await batch.commit();
  },
};
