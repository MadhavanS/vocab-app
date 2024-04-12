<template>
  <div>
    <div class="bg-green-100 grid grid-cols-1 text-center justify-center font-mono text-2xl">
      Dutch Vocabs
    </div>
    <div class="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded space-y-10">
      <form @submit.prevent="addWord">
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="nlRef" type="text" placeholder="dutch" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>

        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="enRef" type="text" placeholder="english" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>
<!--        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">-->
<!--          <textarea type="text" placeholder="sentences" class="w-full h-20 border-none bg-transparent outline-1 placeholder:italic focus:outline-none">-->
<!--          </textarea>-->
<!--        </div>-->
        <div class="text-right py-2">
          <button class="py-3 px-8 transform rounded-sm bg-indigo-600 font-bold duration-300 hover:bg-indigo-400">Add Word</button>
        </div>
      </form>
    </div>
  </div>
  <div><table-component :dict="allWords"/></div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import TableComponent from "@/components/TableComponent.vue";

declare interface Word {
  dutch: string,
  engels: string,
  notes: string,
  sentences: string
}
declare interface ResponseWord {
  result: [Word]
}

export default defineComponent ({
  name: 'HelloWorld',
  components: {TableComponent},
  data() {
    return {
      allWords: [] as Word[],
      nlRef: '',
      enRef: '',
      errorMessage: ''
    }
  },
  methods: {
    async getWords() {
      const url = 'http://localhost:3000/app';
      const api = await fetch(url);
      const response = await api.json();
      return response.result;
    },

    async addWord() {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({dutch: this.nlRef, engels: this.enRef})
      };
      const url = 'http://localhost:3000/app';
      await fetch(url, requestOptions)
        .then(async response => {
          console.log(response);
          await response.json();
        }).catch(error => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        });
      this.allWords = await this.getWords();
      this.resetText();
    },

    resetText() {
      this.nlRef = '';
      this.enRef = '';
    }
  },
  beforeMount: async function() {
    this.allWords = await this.getWords();
  }
});
</script>
