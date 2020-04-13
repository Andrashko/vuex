<template>
  <div id="app">    
    <messageSystem></messageSystem>
    <searchString></searchString>
    <hr>
    <queryForm></queryForm>
    <hr>
    <input type="button" @click="showAddForm" value=" Додати кнгу" />
    <bookTable></bookTable>
    <bookForm></bookForm>
  </div>
</template>

<script>
import Vue from "vue";
import bookTable from "./components/bookTable";
import bookForm from "./components/bookForm";
import searchString from "./components/searchString";
import queryForm from "./components/queryForm";
import messageSystem from "./components/messageSystem";
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  //назва компоненту, співпадає із назвою файла  
  name: "app",
  //компоненти які використовуються в додатку
  components: {
    bookTable,
    bookForm,
    searchString,
    queryForm,
    messageSystem
  },
  //дані компонента на початку
  data() {
    return {        
    };
  },
  //коли додаток створено то треба завантажити список книг із сервера 
  mounted() {    
    this.getBooks(); 
  },  //методи 
  methods: {
    ...mapActions(["showMessageForTime", "getBooks", "showAddForm"]),   
  },
  
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>