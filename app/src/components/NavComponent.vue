<script setup lang="ts">
</script>

<template>
  <div class="sticky flex px-1 py-1 bg-blue-500 md:flex md:flex-grow gap-2">
    <div class="p-4">
      <i class="pi pi-bars" @click="this.$emit('event-ham')"/>
    </div>
    <span class="cursor-pointer text-white text-center font-semibold
              px-12 py-3 text-base font-serif">Dutch Vocabulary</span>
    <div class="grow w-64"></div>
    <div class="grow-0 py-2 space-x-1">
      <input v-model="searchText" type="text" placeholder="search word" class="bg-gray-200 px-2 py-2 rounded-2xl border-amber-100
        placeholder:italic placeholder:text-start focus:outline-none gap-1">
      <button @click="$emit('search', searchText)" class="text-right py-2 px-2 rounded-2xl bg-yellow-200">SEARCH</button>
    </div>
    <div class="grow-0 w-32 space-x-2 hs-dropdown ">
      <div class="grid grid-flow-col justify-end m-1 py-3">
        <i class="pi pi-cog cursor-pointer" style="font-size: 1.5rem"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
