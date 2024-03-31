<template>
  <header>
    <h1>Lista de Produtos</h1>
  </header>
  <div id="search">
    <input type="text" v-model="searchTerm" @input="fetchCountries" placeholder="Digite para pesquisar">
  </div>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Região</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key="country.name">
          <td>{{ country.name }}</td>
          <td>{{ country.region }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="button">    
    <button @click="decrementPage" :disabled="page === 1">Retroceder</button>
    <button @click="incrementPage" :disabled="isLastPage">Avançar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import api from '@/services/api'
import ListaComponente from './components/ListaComponente.vue'






export default {
  name: 'App',
  data() {
    return {
      countries: [],
      page: 1,
      limit: 10,
      searchTerm: '',
      isLastPage: false,
    };
  },
  created() {
    this.fetchCountries();
  },
  methods: {
    async fetchCountries() {
      const response = await api.post(`countries?searchTerm=${this.searchTerm}&page=${this.page}&limit=${this.limit}`);
      this.countries = [];
      if (response.status === 201) {
        this.countries = response.data;
        this.isLastPage = this.countries.length < this.limit;
      } else {
        console.log('Ocorreu um erro na API');
      }
    },
    incrementPage() {
      if (!this.isLastPage) {
        this.page++;
        this.fetchCountries();
      }
    },
    decrementPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchCountries();
      }
    },
  },
  watch: {
      page() {
      this.fetchCountries();
    }
  },
  // setup(){
  //   const countries = ref([]);

  //   const fetchCountries = async () => 
  //     // await api.post(`/countries?searchTerm=${searchTerm}&page=${page}&limit=${limit}`).then((response) => {
  //     //   countries.value = response.data.results;
  //     // });
  //     await api.get(`/users`).then((response) => {
  //       countries.value = response.data.results;
  //     });

  //   onMounted(fetchCountries);

  //   return { countries };
  // },
};

</script>

<style>

header {
  display: block;
  width: 500px; 
  height: 50px; 
  text-align: center;
  line-height: 50px; 
  margin-bottom: 20px;
}

#search {
  display: block;
  width: 500px; 
  height: 50px; 
  text-align: center;
  line-height: 30px; 
  margin-bottom: 20px;
}

#app table th,
#app table td {
  border-top: 2px solid #858585;
  border-bottom: 2px solid #858585;
  border-left: 2px solid #858585;
  border-right: 2px solid #858585;
  width: 200px; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
}


#app {
  display: block;
  width: 500px; 
  height: 350px;
  text-align: center; 
}

#app table{
  margin: auto;
}

#button {
  display: block;
  width: 500px; 
  height: 50px; 
  text-align: center;
  line-height: 50px; 
  margin: 20px;
}

#button button {
  border-radius: 12px; 
  padding: 10px 20px; 
  background-color: #4CAF50; 
  color: white; 
  border: none; 
  cursor: pointer; 
}

#button button:hover {
  background-color: #45a049; 
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #474646;
  color: #ffffff;
  margin: 0;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
}

</style>
