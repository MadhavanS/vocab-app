<script setup lang="ts">
import {PropType, ref, toRefs} from "vue";
import Paginator from 'primevue/paginator';

  declare interface Word {
    dutch: string;
    engels: string;
    notes: string;
    sentences: string;
  }

  const props = defineProps({
    dict: Object as PropType<Word[]>
  });

  // onMounted( () => {
  //   reset()
  // });

  let { dict } = toRefs(props);
  let wordObj = ref({} as Word);
  let keyWord = ref('' as string);

  function editor(nl: Word) {
    keyWord.value = nl.dutch;
    wordObj.value = nl;
  }

  const reset = () => {
    wordObj.value = {};
  }

  defineExpose({
    reset
  });
</script>

<template>
    <table class="border-collapse border border-blue-500 ">
      <thead>
        <tr class="bg-gray-400">
          <th class="w-1/2 p3 py-2 px-12 text-center uppercase bg-amber-300">dutch</th>
          <th class="w-1/2 p3 py-2 px-12 text-center uppercase bg-green-300">engels</th>
          <th class="w-3/4 p3 py-2 px-6 text-center uppercase bg-red-300">action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(aWord, index) in dict" :key="aWord">
            <td class="${wordObj && wordObj.dutch === vocab.dutch ?
              'w-1/2 py-2 px-12 text-left duration-300 focus-within:border-indigo-500' :
              'w-1/2 py-2 px-12 text-left text-gray-600'}">
              <input v-if="wordObj && (wordObj.dutch === aWord.dutch)"
                     class="text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                    v-model="aWord.dutch"/>
              <div v-else>
                <span class="px-18 whitespace-nowrap">{{ aWord.dutch }}</span>
              </div>
            </td>
            <td class="${wordObj && wordObj.dutch === vocab.dutch ?
              'w-1/2 py-2 px-12 text-left duration-300 focus-within:border-indigo-500' :
              'w-1/2 py-2 px-12 text-left text-gray-600'}">
              <input v-if="wordObj && (wordObj.dutch === aWord.dutch)"
                     class="text-indigo-700 border-b-2 border-indigo-500 outline-none whitespace-nowrap focus:bg-gray-300"
                     v-model="aWord.engels">
              <div v-else>
                <div v-if="aWord.engels.includes(',')">
                  <span class="px-18 whitespace-break-spaces">{{ aWord.engels }}</span>
                </div>
                <div v-else>
                  <span class="px-18 whitespace-nowrap">{{ aWord.engels }}</span>
                </div>
              </div>
            </td>
            <td class="w-1 px-3 text-right text-gray-600 font-medium text-sm">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">
                <span v-if="wordObj && (wordObj.dutch === aWord.dutch)" @click="$emit('editCaller', aWord, keyWord)" >Save</span>
                <span v-else v-on:click.prevent="editor(aWord)" >Edit</span>
              </a>
              <a href="#" @click="$emit('deleteCaller', aWord.dutch)" class="ml-2 text-red-600 hover:text-red-900">Delete</a>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<style scoped>

</style>
