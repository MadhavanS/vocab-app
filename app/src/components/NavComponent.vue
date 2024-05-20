<script setup lang="ts">
</script>

<template>
  <div class="sticky mx-auto px-1 bg-blue-500 md:flex md:flex-grow gap-2">
    <div class="p-3">
      <i class="pi pi-bars" @click="this.$emit('event-ham')"/>
    </div>
    <span class="cursor-pointer text-white text-center font-semibold
              px-12 py-3 text-base font-serif">Dutch Vocabulary</span>

    <div class="flex md:flex md:flex-grow justify-end space-x-2 hs-dropdown relative ">
      <div class="grid grid-flow-col justify-end m-1 py-3">
        <i class="pi pi-cog cursor-pointer" style="font-size: 1.5rem"></i>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
