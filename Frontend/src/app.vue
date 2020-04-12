<template>
  <div id="app">
    <messages v-bind:messagesList="messagesList"></messages>
    <searchString v-model="searchText"></searchString>
    <queryForm v-model="queryObject"></queryForm>
    <input type="button" @click="showNewBookForm()" value=" Додати кнгу" />
    <bookTable v-bind:bookList="filtredBooks" @remove="removeBook" @update="showUpdateBookForm"></bookTable>

    <bookForm v-model="book" v-bind:visible="formVisible" @input="formInput"></bookForm>
    
  </div>
</template>

<script>
import Vue from "vue";
import bookTable from "./components/bookTable";
import bookForm from "./components/bookForm";
import searchString from "./components/searchString";
import queryForm from "./components/queryForm";
import messages from "./components/messages";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      books: [],
      book: {
        title: "",
        authors: [],
        isbn: "",
        published: "1997-01-10T22:00:00.000Z",
        pages: 0,
        price: 0,        
      },
      messagesList:[],
      formVisible: false,
      selectedIndex: -1,
      searchText: "",
      queryObject:{
          minPages: null,
          maxPages: null,
          maxPrice: null
      }
    };
  },  
  components: {
    bookTable,
    bookForm,
    searchString,
    queryForm,
    messages
  },
  computed: {
    filtredBooks() {
     
      let result =  this.books;
      if (this.searchText) 
        result = result.filter(book => book.title.toLowerCase().includes(this.searchText.toLowerCase()));
        console.log(result)
      if (this.queryObject.minPages)
        result = result.filter(book=> book.pages>=this.queryObject.minPages);
        console.log(result)
      if (this.queryObject.maxPages)
        result = result.filter(book=> book.pages<=this.queryObject.maxPages);
      if (this.queryObject.maxPrice)
        result = result.filter(book=> book.price<=this.queryObject.maxPrice);  
      return result;
    }
  },
  created(){
    this.getBooks().then(
      books=> {this.books = books;}
    );
  },
  methods: {
    async getBooks(){
      try{
        let resp = await axios.get("http://localhost:5000/book");
        return resp.data;
      }catch (e){
        console.log(e);
        this.messagesList.push(e); 
        throw e;
      }
    },
    async postBook(book){
      try{       
        let resp = await axios.post("http://localhost:5000/book", book);   
        return resp.data;
      }catch (e){
        console.log(e);
        this.messagesList.push(e); 
        throw e;
      }
    },
    async deleteBook(book){
      try{       
        let resp = await axios.delete(`http://localhost:5000/book/${book._id}`);   
        return resp.data;
      }catch (e){
        console.log(e);
        this.messagesList.push(e); 
        reject(e);
      }
    },
     async patchBook(book){
      try{       
        let resp = await axios.patch(`http://localhost:5000/book/${book._id}`, book);   
        return resp.data;
      }catch (e){
        console.log(e);
        this.messagesList.push(e); 
        reject(e);
      }
    },

    showNewBookForm() {
      this.book = Object.assign(this.book, {
        title: "",
        authors: [],
        isbn: "",
        published: "1997-01-10T22:00:00.000Z",
        pages: 0,
        price: 0
      });
      this.formAction = this.addNewBook;
      this.formVisible = true;
    },
    addNewBook() {
      this.postBook(this.book)
      .then(book=> this.books.push(book));     

    },
    removeBook(index) {
      this.deleteBook(this.filtredBooks[index]).then(()=>
        {this.filtredBooks.splice(index, 1)});
    },
    showUpdateBookForm(index) {
      this.selectedIndex = index;
      Object.assign(this.book, this.filtredBooks[index]);
      this.formAction = this.updateBook;
      this.formVisible = true;
    },
    updateBook() {   
      let i = this.selectedIndex;   
      this.patchBook(this.book)
      .then(book =>{ Object.assign(this.filtredBooks[i], book)});     
      this.selectedIndex = -1;
    },
    formInput() {
      this.formAction();
      this.formVisible = false;
    },
    formAction: function() {}
  }
};
</script>

<style scoped>
#app {
  margin: 0;
  padding: 0;
}
</style>