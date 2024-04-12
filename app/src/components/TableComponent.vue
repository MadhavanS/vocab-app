<template>
  <div class="flex flex-col">
    <table class="w-full border-collapse border border-blue-500 max-w-xl mt-16 mx-auto">
      <thead>
        <tr  class="bg-gray-400">
          <th class="py-2 px-4 text-center uppercase">dutch</th>
          <th class="py-2 px-4 text-center uppercase">engels</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="vocab in dict" :key="vocab">
            <td class="w-1/4 px-6 text-center text-gray-600">{{ vocab.dutch }}</td>
            <td class="w-1/4 px-24 text-center whitespace-nowrap text-gray-600">{{ vocab.engels }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
  import type { PropType } from 'vue';

  declare interface Word {
    dutch: string,
    engels: string,
    notes: string,
    sentences: string
  }

  export default {
    name: 'TableComponent',
    props: {
      dict: {
        required: true,
        type: Object as PropType<Word[]>
      }
    }
  }
</script>
