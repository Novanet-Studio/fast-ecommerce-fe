<template>
  <div>
    <h2>Ecommerce</h2>
    <hello />
    <button @click="loadResponse">Load response</button>
    <div v-if="data">
      Response from cloud functions: {{ data }}
    </div>
    <div v-else>
      No data
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $httpsCallable } = useNuxtApp();
const data = ref();

const loadResponse = async () => {
  try {
    const payment = $httpsCallable('payment');
    const response = await payment();
    console.log(response.data);
    data.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

</script>