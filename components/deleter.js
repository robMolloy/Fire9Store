export const deleter = {
  async delete(...props) {
    if(this.isManyDocs(props[0].payload)) return await this.deleteMany(...props) 
    return await this.deleteOne(...props);
  },

  async deleteOne({ collectionName, payload }) {
    const id = payload;
    const ref = this.getRef({ collectionName, id });
    return await this.deleteDoc(ref);
  },

  async deleteMany({ collectionName, payload }) {
    const ids = payload;
    console.log(/*LL*/ 11, 'this', this);
    const batch = this.getBatch();

    ids.forEach((id) => {
      const ref = this.getRef({ collectionName, id });
      batch.delete(ref);
    });

    return await batch.commit();
  }
};
