export const deleter = {
  async delete(...props) {
    const fn = this.isManyDocs(props[0].payload) ? this.deleteMany : this.deleteOne;
    return await fn(...props);
  },

  async deleteOne({ collectionName, payload }) {
    const id = payload;
    const ref = this.getRef({ collectionName, id });
    return await this.deleteDoc(ref);
  },

  async deleteMany({ collectionName, payload }) {
    const ids = payload;
    const batch = this.getBatch();

    ids.forEach((id) => {
      const ref = this.getRef({ collectionName, id });
      batch.delete(ref);
    });

    return await batch.commit();
  },
};
