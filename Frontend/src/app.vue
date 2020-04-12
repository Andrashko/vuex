<template>
  <div id="app">    
    <messageSystem v-bind:messagesList="messagesList"></messageSystem>
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
import messageSystem from "./components/messageSystem";
import axios from "axios";

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
      //чписок всіх книг
      books: [],
      //обєкт 1 порожньої книги
      book: {
        title: "",
        authors: [],
        isbn: "",
        published: "1997-01-10T22:00:00.000Z",
        pages: 0,
        price: 0
      },
      //список повідомлень
      messagesList: [],
      //видимість форми
      formVisible: false,
      //індекс вибраної книги
      selectedIndex: -1,
      //текст пошуку
      searchText: "",
      //об'єкт з параметрами пошуку 
      queryObject: {
        minPages: null,
        maxPages: null,
        maxPrice: null
      }
    };
  },
  // значення які необхідно обчислити.  
  computed: {
    //відфільтрований список книг
    filtredBooks() {
      let result = this.books;
      if (this.searchText)
        result = result.filter(book =>
          book.title.toLowerCase().includes(this.searchText.toLowerCase())
        );
      console.log(result);
      if (this.queryObject.minPages)
        result = result.filter(book => book.pages >= this.queryObject.minPages);
      console.log(result);
      if (this.queryObject.maxPages)
        result = result.filter(book => book.pages <= this.queryObject.maxPages);
      if (this.queryObject.maxPrice)
        result = result.filter(book => book.price <= this.queryObject.maxPrice);
      return result;
    }
  },
  //коли додаток створено то треба завантажити список книг із сервера 
  mounted() {
    this.getBooks().then(books => {
      this.books = books;
    });
  },
  //методи 
  methods: {
    // асинхронний хук по завантаження всіх книг
    async getBooks() {
      try {
        //чекаємо відповідь на запит GET  http://localhost:5000/book
        let resp = await axios.get("http://localhost:5000/book");
        //якщо все добре то повертаємо данні із відповіді на запит 
        return resp.data;
      } catch (e) {
        //якщо сталась помилка (в тому числі і сервер повернув 500)
        console.log(e);
        //додати повідомлення 
        this.messagesList.push(e);
      }
    },
    // асинхронний хук по додаванню 1 книги
    async postBook(book) {
      try {
        let resp = await axios.post("http://localhost:5000/book", book);
        return resp.data;
      } catch (e) {
        console.log(e);
        this.messagesList.push(e);
      }
    },
    // асинхронний хук по вилученню 1 книги
    async deleteBook(book) {
      try {
        let resp = await axios.delete(`http://localhost:5000/book/${book._id}`);
        return resp.data;
      } catch (e) {
        console.log(e);
        this.messagesList.push(e);
      }
    },
    // асинхронний хук по оновленню інформації про книгу
    async patchBook(book) {
      try {
        let resp = await axios.patch(
          `http://localhost:5000/book/${book._id}`,
          book
        );
        return resp.data;
      } catch (e) {
        console.log(e);
        this.messagesList.push(e);
      }
    },
    // показуємо форму для нової книги  
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
    //показуємо форму для оновлення книги
    showUpdateBookForm(index) {
      this.selectedIndex = index;
      Object.assign(this.book, this.filtredBooks[index]);
      this.formAction = this.updateBook;
      this.formVisible = true;
    },
    //додавання нової книги
    addNewBook() {
      //спочатку робимо хук 
      this.postBook(this.book).
      //потім додаємо книгу в список якщо хук пройшов вдало
      then(book => this.books.push(book));
    },
    //вилучення книги
    removeBook(index) {
      this.deleteBook(this.filtredBooks[index]).
      then(() => {
        this.filtredBooks.splice(index, 1);
      });
    },
    //оновити книгу
    updateBook() {
      let i = this.selectedIndex;
      this.patchBook(this.book).then(book => {
        Object.assign(this.filtredBooks[i], book);
      });
      this.selectedIndex = -1;
    },
    //показати форму редагування або оновлення книги
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