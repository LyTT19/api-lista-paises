<template>
   <div>
      <div>
         <table>
            <thead></thead>
               <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Região</th>
               </tr>
            <tbody>
               <tr v-for="country in countries" :key="country.id">
                  <th scope="row">{{ country.id }}</th>
                  <td>{{ country.name }}</td>
                  <td>{{ country.region }}</td>
                  <td>
                     <ul>
                     </ul>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script lang="ts">
export default {
  name: 'ListaComponente',
  props: {
    countries: Array,
  },
};

</script>
