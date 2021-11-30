export const listener = {
  listenToCollection({ collectionName, onChange }) {
    const unsubscribe = this.listen({ collectionName, onChange });
    return unsubscribe;
  },

  listen({ collectionName, wheres = [], onChange = () => {} }) {
    const whereQuery = wheres.map((x) => this.where(...x));
    const q = this.query(this.getCollection({ collectionName }), ...whereQuery);

    const unsubscribe = this.onSnapshot(q, (snapshot) => {
      const docs = this.parseDocs(snapshot);
      onChange(docs);
    });

    return unsubscribe;
  },
};
