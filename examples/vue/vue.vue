<template>
  <RmCard title="form">
    <h4>Listener</h4>
    <RmButtonBase
      label="StartListener"
      @click="startListener"
    />

    <h4>Create</h4>
    <RmInputBase
      v-model="createFormData.id1"
      label="id1"
    />
    <RmButtonBase
      label="createOne"
      @click="createOne"
    />

    <RmInputBase
      v-model="createFormData.id2"
      label="id2"
    />
    <RmInputBase
      v-model="createFormData.id3"
      label="id3"
    />
    <RmButtonBase
      label="createMany"
      @click="createMany"
    />

    <h4>Read</h4>
    <RmInputBase
      v-model="readFormData.id1"
      label="id1"
    />
    <RmButtonBase
      label="readOne"
      @click="readOne"
    />

    <RmInputBase
      v-model="readFormData.id2"
      label="id2"
    />
    <RmInputBase
      v-model="readFormData.id3"
      label="id3"
    />
    <RmButtonBase
      label="readMany"
      @click="readMany"
    />

    <RmButtonBase
      label="readAll"
      @click="readAll"
    />

    <h4>Update</h4>
    <div class="q-gutter-md row items-start">
      <RmInputBase
        v-model="updateFormData.id1"
        label="id1"
      />
      <RmInputBase
        v-model="updateFormData.key1"
        label="key1"
      />
      <RmInputBase
        v-model="updateFormData.value1"
        label="value1"
      />
    </div>
    <RmButtonBase
      label="updateOne"
      @click="updateOne"
    />

    <div class="q-gutter-md row items-start">
      <RmInputBase
        v-model="updateFormData.id2"
        label="id2"
      />
      <RmInputBase
        v-model="updateFormData.key2"
        label="key2"
      />
      <RmInputBase
        v-model="updateFormData.value2"
        label="value2"
      />
    </div>

    <div class="q-gutter-md row items-start">
      <RmInputBase
        v-model="updateFormData.id3"
        label="id3"
      />
      <RmInputBase
        v-model="updateFormData.key3"
        label="key3"
      />
      <RmInputBase
        v-model="updateFormData.value3"
        label="value3"
      />
    </div>
    <RmButtonBase
      label="updateMany"
      @click="updateMany"
    />

    <h4>Delete</h4>
    <RmInputBase
      v-model="deleteFormData.id1"
      label="id1"
    />
    <RmButtonBase
      label="deleteOne"
      @click="deleteOne"
    />

    <RmInputBase
      v-model="deleteFormData.id2"
      label="id2"
    />
    <RmInputBase
      v-model="deleteFormData.id3"
      label="id3"
    />
    <RmButtonBase
      label="deleteMany"
      @click="deleteMany"
    />
  </RmCard>
</template>

<script setup>
import RmInputBase from 'src/components/generic/single/input/RmInputBase.vue';
import RmButtonBase from 'src/components/generic/single/buttons/RmButtonBase.vue';
import RmCard from 'src/components/generic/single/cards/RmCard.vue';
import { f9Store } from 'src/boot/fire9Boot';
import { reactive } from 'vue';

const collectionName = 'userCollection';
const someValue = { some: 'value2' };

const createFormData = reactive({});
const readFormData = reactive({});
const updateFormData = reactive({});
const deleteFormData = reactive({});

const startListener = async () => {
  const onChange = (x) => console.log('listener', x);
  await f9Store.listenToCollection({ collectionName, onChange });
};

const createOne = async () => {
  const { id1 } = createFormData;
  const payload1 = { id: id1, ...someValue };

  await f9Store.createOne({ collectionName, payload: payload1 });
};
const createMany = async () => {
  const { id2, id3 } = createFormData;
  const payload2 = [{ id: id2, ...someValue }, { id: id3, ...someValue }];

  await f9Store.createMany({ collectionName, payload: payload2 });
};

const readOne = async () => {
  const { id1 } = readFormData;
  const payload1 = id1;

  const response = await f9Store.readOne({ collectionName, payload: payload1 });
  console.log(/*LL*/ 177, 'response', response);
};
const readMany = async () => {
  const { id2, id3 } = readFormData;
  const payload2 = [id2, id3];

  const response = await f9Store.readMany({ collectionName, payload: payload2 });
  console.log(/*LL*/ 184, 'response', response);
};
const readAll = async () => {
  const response = await f9Store.readAll({ collectionName });
  console.log(/*LL*/ 188, 'response', response);
};

const updateOne = async () => {
  const { id1: id, key1: key, value1: value } = updateFormData;

  await f9Store.updateOne({ collectionName, payload: { id, [key]: value } });
};
const updateMany = async () => {
  const { id2, key2, value2, id3, key3, value3 } = updateFormData;
  const payload = [{ id: id2, [key2]: value2 }, { id: id3, [key3]: value3 }];
  console.log(/*LL*/ 199, 'payload', payload);

  await f9Store.updateMany({ collectionName, payload });
};

const deleteOne = async () => {
  const { id1 } = deleteFormData;
  const payload1 = id1;

  await f9Store.deleteOne({ collectionName, payload: payload1 });
};
const deleteMany = async () => {
  const { id2, id3 } = deleteFormData;
  const payload2 = [id2, id3];

  await f9Store.deleteMany({ collectionName, payload: payload2 });
};

</script>
