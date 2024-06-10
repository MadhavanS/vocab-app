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
let expand = ref(false as boolean);
let isClicked = ref(false as boolean);

function editor(nl: Word) {
  keyWord.value = nl.dutch;
  wordObj.value = nl;
  expand.value = true;
}

const reset = () => {
  wordObj.value = {};
  expand.value = false;
}

defineExpose({ reset });
</script>

<template>
  <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">List of Vocabulary</h2>
    </header>
    <div class="p-3">
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead class="text-xs font-semibold uppercase bg-gray-100">
          <tr>
            <th scope="col" class="p-2 whitespace-nowrap">
              <div class="font-semibold text-left">dutch</div></th>
            <th scope="col" class="p-2 whitespace-nowrap"><div class="font-semibold text-left">engels</div></th>
            <th scope="col" class="p-2 whitespace-nowrap"><div class="font-semibold text-center">actions</div></th>
          </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
          <template v-for="(aWord, index) in dict" :key="aWord">
            <tr @click="(isClicked = !isClicked) && (aWord.dutch != null)">
              <td class="${wordObj && wordObj.dutch === vocab.dutch ?
              'text-left duration-300 focus-within:border-indigo-500 p-2 whitespace-nowrap' :
              'text-left text-gray-600 p-2 whitespace-nowrap'}">
                <div class="flex items-center">
                  <input v-if="wordObj && (wordObj.dutch === aWord.dutch)"
                         class="text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                         v-model="aWord.dutch"/>
                  <div v-else class="group inline-block relative">
                    <span class="text-gray-900 hover:text-gray-400 cursor-pointer transition-all ease-in-out
                         before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400
                         before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]
                         after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400
                         after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                      {{ aWord.dutch }}
                    </span>
                    <div class="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute w-48 mt-1 bg-gray-100
                     text-gray-800 border border-gray-300 rounded-lg shadow-lg py-1 z-20"
                         v-if="aWord.sentences && aWord.sentences.length > 0">
                      <p class="px-4 py-2">{{ aWord.sentences }}</p>
                    </div>
                  </div>
                </div>
              </td>
              <td class="${wordObj && wordObj.dutch === vocab.dutch ?
                  'text-left duration-300 focus-within:border-indigo-500 p-2 whitespace-nowrap' :
                  'text-left text-gray-600 p-2 whitespace-nowrap'}">
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
              <td class="text-center p-2 whitespace-nowrap">
                <a href="#">
                <span v-if="wordObj && (wordObj.dutch === aWord.dutch)">
                  <span class="text-blue-500 hover:text-blue-200 p-2"
                        @click="$emit('editCaller', aWord, keyWord)" >Save</span>
                  <span v-on:click.prevent="reset" class="text-blue-500 hover:text-blue-200">Cancel</span>
                </span>
                  <span v-else v-on:click.prevent="editor(aWord)" class="text-blue-500 hover:text-blue-200 p-2">Edit</span>
                </a>
                <a href="#" @click="$emit('deleteCaller', aWord.dutch)" class="ml-2 text-red-600 hover:text-red-900 p-2">Delete</a>
              </td>
            </tr>
            <tr v-if="expand && (aWord.dutch === keyWord)">
              <td :colspan="4" class="text-center p-2">
                <input class="text-indigo-900 border-b-2 border-indigo-500 outline-none focus:bg-gray-200 w-3/4" v-model="aWord.sentences"/>
              </td>
            </tr>
            <tr v-if="!expand && isClicked" class="bg-amber-50 px-6 py-4 p-1">
              <td v-if="aWord.sentences != null && aWord.sentences.length > 0" class="text-center p-2 whitespace-nowrap" :colspan="4">
                <div>{{aWord.sentences}}</div>
              </td>
            </tr>
            <!-- <tr v-else>
              <td class="text-center p-2 whitespace-nowrap" :colspan="4">
                <input class="text-indigo-900 border-b-2 border-indigo-5000 outline-none focus:bg-gray-200 w-3/4"
                       v-model="aWord.sentences"/>
                <button class="text-left ml-2 hover:text-green-900 p-2 text-green-200 bg-amber-300"
                   @click="$emit('addSentenceCaller', aWord.dutch)">Add</button>
              </td>
            </tr>
            <tr v-else-if="clickValue[index]" class="bg-amber-50 px-6 py-4 p-1">
              <td v-if="aWord.sentences != null" class="text-center p-2 whitespace-nowrap" :colspan="4">
                  <div>{{aWord.sentences}}</div>
              </td>
              <td v-else class="text-center p-2" :colspan="4">
                <input class="text-indigo-900 border-b-2 border-indigo-5000 outline-none focus:bg-gray-200 w-3/4"
                       v-model="aWord.sentences"/>
                <a href="#" class="text-left ml-2 hover:text-green-900 p-2 text-green-200 bg-amber-300"
                   @click="$emit('addSentenceCaller', aWord.dutch)">Add</a>
              </td>
            </tr> -->
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
