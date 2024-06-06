<template>
  <div>
    <NavComponent @search="searchWord"/>
    <!-- <div class="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded space-y-10">
      <p class="text-center alert alert-success" v-if="isEmpty">Please enter value in dutch and engels!</p>
      <form @submit.prevent="addWord">
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="nlRef" ref="nlRefInput" type="text" placeholder="dutch" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>

        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="enRef" type="text" placeholder="english" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="sentRef" type="text" placeholder="sentence" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>
        <div class="text-right py-2">
          <button class="py-3 px-8 transform rounded-sm bg-indigo-600 font-bold duration-300 hover:bg-indigo-400">Add Word</button>
        </div>
      </form>
    </div> -->
    <div class="mt-6 border-2 border-blue-400 md:w-2/3 lg:w-1/2 mx-auto rounded rounded-3xl">
      <p class="text-center alert alert-success p-2 font-thin font-serif text-red-600" v-if="isEmpty">Please enter value in dutch and engels!</p>
      <div class="p-2">
        <div class="flex gap-2 mx-4">
          <input v-model="nlRef" ref="nlRefInput" type="text" placeholder="dutch"
                 class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" />
          <input v-model="enRef" type="text" placeholder="english" @keydown.enter="addWord"
                 class="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"/>
        </div>
<!--        <input type="text" placeholder="tags"-->
<!--               class="mt-1 block w-1/4 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"/>-->
        <div class="p-4 py-2">
          <textarea v-model="sentRef" name="textarea" id="text" cols="10" rows="5" placeholder="sentences"
                    class="h-40 px-3 py-4 w-full resize-none rounded-md border border-slate-300 font-semibold text-gray-300">Message</textarea>
        </div>
        <div class="text-right p-4 py-2">
          <Button type="button" icon="pi pi-plus" @click="addWord" ref="reference"
                  class="py-3 px-4 transform rounded-md bg-blue-100 font-semibold duration-300 hover:bg-indigo-400" label="add"></Button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white p-12 md:w-1/3 lg:w-1/2 mx-auto" v-if="allWords.length > 0">
    <p class="text-center alert alert-success" v-if="alertMessage.length !== 0">{{ alertMessage }}</p>
    <Paginator :rows="pagination.limit" :first="pagination.prev + 1"
               :totalRecords="pagination.total" @page="onPage($event)"
               :rowsPerPageOptions="pages">
<!--      <template #start="slotProps">-->
<!--        Page: {{ slotProps.state.page }}-->
<!--        First: {{ slotProps.state.first }}-->
<!--        Rows: {{ slotProps.state.rows }}-->
<!--      </template>-->
    </Paginator>
    <table-component ref="tableChildRef" :dict="allWords"
                     @deleteCaller="deleteWord" @editCaller="updateWord"/>
  </div>
  <div v-else>
    <p class="text-center alert alert-success p-2 font-thin font-serif text-red-600">
      Sorry, no results found !!!
    </p>
  </div>
</template>

<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import TableComponent from "@/components/TableComponent.vue";
  import NavComponent from "@/components/NavComponent.vue";
  import Paginator from "primevue/paginator";
  import Button from 'primevue/button';

  declare interface Word {
    dutch: string;
    engels: string;
    notes: string;
    sentences: string;
    createdAt: string;
    updatedAt: string;
  }

  declare interface Pagination {
    next: number;
    prev: number;
    limit: number;
    total: number;
  }

  declare interface VocabResponse {
    result: [Word];
    meta: Pagination;
  }
  const uri = 'https://vocab-api-render.onrender.com'
  // const uri = 'http://localhost:3011'
  let allWords = ref([] as Word[]);
  let nlRef = ref('');
  let enRef = ref('');
  let sentRef = ref('');
  let isEmpty = ref(false);
  const tableChildRef = ref(null);
  let pages = ref([5, 10, 20, 30, 40, 50, 100, 1000]);
  let totalRecordCount = ref(0);
  let pagination = ref({} as Pagination);
  let rows = ref(5);
  const nlRefInput = ref(null);
  const alertMessage = ref('');
  // let hasDeleted = ref(false);
  // let page = ref(0);
  // let isAdded = ref(false);

  onMounted(async () => {
    let resp = await getWords();
    allWords.value = resp.result;
    pagination.value = resp.meta;
    totalRecordCount.value = allWords.value.length;
    alertMessage.value = '';
  });

  async function getWords() {
    if(pagination.value) {
      pagination.value.next = 2;
      pagination.value.limit = 5;
    }
    const url = `${uri}/app?page=${pagination.value.next - 1}&limit=${pagination.value.limit}`;
    const api = await fetch(url);
    const response = await api.json();
    if(pagination.value === undefined)
      pagination.value = response.meta;

    return response;
  }

  async function onPage(event) {
    // console.log(event.page);
    // console.log(event.first);
    // console.log(event.rows);
    // console.log(event.pageCount);

    const url = `${uri}/app?page=${event.page+1}&limit=${event.rows}`;
    const api = await fetch(url);
    const response = await api.json();
    pagination.value = response.meta;
    allWords.value = response.result;
    rows.value = event.rows;
  }

  async function addWord() {
    if(enRef.value === '' || nlRef.value === '' ) {
      isEmpty.value = true;
      alertMessage.value = '';
      return;
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'dutch': nlRef.value, 'engels': enRef.value, 'sentences': sentRef.value})
    };
    const url = uri + `/app?page=${pagination.value.next-1}&limit=${pagination.value.limit}`;
    await fetch(url, requestOptions)
      .then(async response => {
        await response.json().then(jsonResponse => {
          // pagination.value = jsonResponse.meta;
          if (jsonResponse.dutch !== undefined && jsonResponse.dutch === nlRef.value) {
            alertMessage.value = `${nlRef.value} added successfully`;
          } else if(jsonResponse.result === 'duplicate key')
            alertMessage.value = `${nlRef.value} - already exists in database!`;
        });
      }).catch(error => {
        console.error('There was an error!', error);
        resetText();
        alertMessage.value = '';
      });
    resetText();
    let resp = await getWords();
    allWords.value = resp.result;
    pagination.value = resp.meta;
    tableChildRef.value.reset();
    nlRefInput.value.focus();
  }

  function resetText() {
    nlRef.value = '';
    enRef.value = '';
    sentRef.value = '';
    isEmpty.value = false;
  }

  async function deleteWord(nl: string) {
    const url = `${uri}/app/${nl}`;
    await fetch(url, { method: 'DELETE'});
    alertMessage.value = `${nl} deleted successfully!`;
    isEmpty.value = false;
    let resp = await getWords();
    allWords.value = resp.result;
  }

  async function updateWord(obj: Word, nl: string) {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({dutch: obj.dutch, engels: obj.engels})
    };
    const url = `${uri}/app?nl=${nl}&page=${pagination.value.next-1}&limit=${pagination.value.limit}`;
    await fetch(url, requestOptions)
      .then(async response => {
        let json = await response.json();
        if(json.dutch === obj.dutch) {
          alertMessage.value = `${obj.dutch} updated successfully`;
          resetText();
        }else if(json.result === 'duplicate key')
          alertMessage.value = `${obj.dutch} - already exists in database!`;
      }).catch(error => {
        console.error('There was an error!', error);
      });
    let resp = await getWords();
    allWords.value = resp.result;
    pagination.value = resp.meta;
    tableChildRef.value.reset();
  }

  async function searchWord(txt: string) {
    if(txt == undefined || txt.trim().length == 0) return;
    const url = `${uri}/app/search?txt=${txt}`;
    const api = await fetch(url);
    const response = await api.json();
    allWords.value = response.result;
    pagination.value = response.meta;
    tableChildRef.value.reset();
  }

  /*data() {
    return {
      allWords: [] as Word[],
      nlRef: '',
      enRef: '',
      errorMessage: '',
      hasDeleted: false,
      isEmpty: false,
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
      if(this.enRef === '' || this.nlRef === '' ) {
        this.isEmpty = true;
        return;
      }
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
      this.hasDeleted = false;
      this.isEmpty = false;
    },

    async deleteWord(nl: string) {
      console.log(nl);
      const url = `http://localhost:3000/app/${nl}`;
      await fetch(url, { method: 'DELETE'});
      console.log('deleted');
      this.hasDeleted = true;
      this.isEmpty = false;
      this.allWords = await this.getWords();
    },

    async updateWord(obj: Word) {
      console.log(obj.dutch);
      console.log(obj.engels);
    }
  },
  beforeMount: async function() {
    this.allWords = await this.getWords();
  }*/
</script>

<style scoped>
</style>
