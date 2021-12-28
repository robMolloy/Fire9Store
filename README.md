# Fire9Store

see 'examples/vue/vue.vue' for a cut and paste example

### Setup

- in 'src/boot/f9Store'

```
import { Fire9Store } from 'fire9store';
import firebaseCredentials from '../config/credentials/firebaseCredentials';

export const f9Store = new Fire9Store(firebaseCredentials);
```

### Create document

```
export { f9Store } from 'src/boot/f9Store'

const collectionName = 'userCollection'

const user1 = {id: 'id1', name: 'paul', age: 60}
const user2 = {id: 'id2', name: 'jenny', age: 45}
const user3 = {id: 'id3', name: 'rob', age: 20}

const createUsers = async () => {
  await f9Store.createOne({ collectionName, payload: user1 })
  await f9Store.createMany({ collectionName, payload: [user2, user3] })
}

createUsers()
```

### Read document

```
export { f9Store } from 'src/boot/f9Store'

const collectionName = 'userCollection'

const userId1 = 'id1'
const userId2 = 'id2'
const userId3 = 'id3'

const readUsers = async () => {
  const response1 = await f9Store.readOne({ collectionName, payload: userId1 })
  const response2 = await f9Store.readMany({ collectionName, payload: [userId2, userId3] })
  const response3 = await f9Store.readAll({ collectionName })

  console.log(response1)
  console.log(response2)
  console.log(response3)
}

readUsers()
```

### Update document

```
export { f9Store } from 'src/boot/f9Store'

const collectionName = 'userCollection'

const user1 = {id: 'id1', name: 'paul', age: 61}
const user2 = {id: 'id2', name: 'jenny', age: 46}
const user3 = {id: 'id3', name: 'rob', age: 21}

const updateUsers = async () => {
  await f9Store.updateOne({ collectionName, payload: user1 })
  await f9Store.updateMany({ collectionName, payload: [user2, user3] })
}

updateUsers()
```

### Delete document

```
export { f9Store } from 'src/boot/f9Store'

const collectionName = 'userCollection'

const userId1 = 'id1'
const userId2 = 'id2'
const userId3 = 'id3'

const deleteUsers = async () => {
  await f9Store.deleteOne({ collectionName, payload: userId1 })
  await f9Store.deleteMany({ collectionName, payload: [userId2, userId3] })
  await f9Store.deleteAll({ collectionName })
}

deleteUsers()
```
