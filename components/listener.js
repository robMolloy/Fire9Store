// const q = query(collection(db, "cities"), where("state", "==", "CA"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });

export const listener = {
  listenToCollection({ collectionName }) {
    const unsubscribe = this.listen({ collectionName });
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
