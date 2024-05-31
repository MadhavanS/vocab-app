<script setup lang="ts">
import {PropType, ref, toRefs} from "vue";

  declare interface Word {
    dutch: string;
    engels: string;
    notes: string;
    sentences: string;
  }

  const props = defineProps({
    dict: Object as PropType<Word[]>
  });

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
    <table class="border-2 border-blue-500 rounded rounded-3xl">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th class="w-1/4 py-2 px-18 uppercase">dutch</th>
          <th class="w-1/4 py-2 px-18 uppercase">engels</th>
          <th class="w-1/4 py-2 px-12 uppercase">action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(aWord, index) in dict" :key="aWord">
            <td class="${wordObj && wordObj.dutch === vocab.dutch ?
              'w-1/2 py-2 px-24 text-left duration-300 focus-within:border-indigo-500' :
              'w-1/2 py-2 px-24 text-left text-gray-600'}">
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
                  <div v-for="(commaSeperated, index) in aWord.engels.split(',')">
                    <span class="px-18 whitespace-break-spaces">{{ commaSeperated.trim() }}</span>
                  </div>
                </div>
                <div v-else>
                  <span class="px-18 whitespace-nowrap">{{ aWord.engels }}</span>
                </div>
              </div>
            </td>
            <td class="text-center">
              <a href="#">
                <span v-if="wordObj && (wordObj.dutch === aWord.dutch)"  class="text-blue-500 hover:text-blue-200"
                      @click="$emit('editCaller', aWord, keyWord)" >Save</span>
                <span v-else v-on:click.prevent="editor(aWord)"  class="text-blue-500 hover:text-blue-200">Edit</span>
              </a>
              <a href="#" @click="$emit('deleteCaller', aWord.dutch)" class="px-2 ml-2 text-red-600 hover:text-red-900">Delete</a>
            </td>
        </tr>
      </tbody>
    </table>
</template>

<style scoped>

</style>
