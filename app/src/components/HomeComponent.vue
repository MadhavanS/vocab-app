<template>
  <div>
    <NavComponent/>
    <div class="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded space-y-10">
      <p class="text-center alert alert-success" v-if="isEmpty">Please enter value in dutch and engels!</p>
      <form @submit.prevent="addWord">
        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="nlRef" ref="nlRefInput" type="text" placeholder="dutch" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>

        <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 py-4">
          <input v-model="enRef" type="text" placeholder="english" class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none">
        </div>
        <div class="text-right py-2">
          <button class="py-3 px-8 transform rounded-sm bg-indigo-600 font-bold duration-300 hover:bg-indigo-400">Add Word</button>
        </div>
      </form>
    </div>
  </div>
  <div class="bg-white p-10 md:w-1/3 lg:w-1/2 mx-auto rounded space-y-10">
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
</template>

<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import TableComponent from "@/components/TableComponent.vue";
  import NavComponent from "@/components/NavComponent.vue";
  import Paginator from "primevue/paginator";

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
    meta: {pagination: Pagination};
  }
  const uri = 'https://vocab-api-render.onrender.com'
  // const uri = 'http://localhost:3011'
  let allWords = ref([] as Word[]);
  let nlRef = ref('');
  let enRef = ref('');
  // let hasDeleted = ref(false);
  let isEmpty = ref(false);
  // let isAdded = ref(false);
  const tableChildRef = ref(null);
  let pages = ref([5, 10, 20, 30, 40, 50]);
  let rows = ref(10);
  let totalRecordCount = ref(0);
  let pagination = ref({} as Pagination);
  let page = ref(0);
  const nlRefInput = ref(null);
  const alertMessage = ref('');

  onMounted(async () => {
    allWords.value = await getWords();
    totalRecordCount.value = allWords.value.length;
    alertMessage.value = '';
  });

  async function getWords() {
    const url = uri + '/app?page=1&limit=5';
    const api = await fetch(url);
    const response = await api.json();
    pagination.value = response.meta.pagination;
    // page.value =
    // console.log(response.result);
    return response.result;
  }

  async function onPage(event) {
    // console.log(event.page);
    // console.log(event.first);
    // console.log(event.rows);
    // console.log(event.pageCount);

    const url = `${uri}/app?page=${event.page+1}&limit=${event.rows}`;
    console.log(url);
    const api = await fetch(url);
    const response = await api.json();
    pagination.value = response.meta.pagination;
    allWords.value = response.result;
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
      body: JSON.stringify({'dutch': nlRef.value, 'engels': enRef.value})
    };
    const url = uri + '/app';
    await fetch(url, requestOptions)
      .then(async response => {
        await response.json().then(jsonResponse => {
          if (jsonResponse.dutch !== undefined && jsonResponse.dutch === nlRef.value) {
            alertMessage.value = `${nlRef.value} added successfully`;
          } else if(jsonResponse.result === 'duplicate key')
            alertMessage.value = `${nlRef.value} - already exists in database!`;
        });
      }).catch(error => {
        // errorMessage = error;
        console.error('There was an error!', error);
        resetText();
        alertMessage.value = '';
      });
    resetText();
    allWords.value = await getWords();
    tableChildRef.value.reset();
    nlRefInput.value.focus();
  }

  function resetText() {
    nlRef.value = '';
    enRef.value = '';
    isEmpty.value = false;
  }

  async function deleteWord(nl: string) {
    console.log(nl);
    const url = `${uri}/app/${nl}`;
    await fetch(url, { method: 'DELETE'});
    console.log('deleted');
    alertMessage.value = `${nl} deleted successfully!`;
    isEmpty.value = false;
    allWords.value = await getWords();
  }

  async function updateWord(obj: Word, nl: string) {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({dutch: obj.dutch, engels: obj.engels})
    };
    const url = `${uri}/app/${nl}`;
    await fetch(url, requestOptions)
      .then(async response => {
        console.log(response);
        let json = await response.json();
        if(json.dutch === obj.dutch) {
          alertMessage.value = `${obj.dutch} updated successfully`;
          resetText();
        }else if(json.result === 'duplicate key')
          alertMessage.value = `${obj.dutch} - already exists in database!`;
      }).catch(error => {
        console.error('There was an error!', error);
      });
    allWords.value = await getWords();
    await getWords();
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
