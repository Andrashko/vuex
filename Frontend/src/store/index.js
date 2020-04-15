import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        messages: [],
        books: [],
        searchString: "",
        formVisible: false,
        formBook: {},
        formNewMode: true
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredBooks(state) {
            let result = state.books;
            if (state.searchString)
                result = result.filter(book =>
                    book.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setBooks(state, books) {
            state.books = books;
        },
        addBook(state, book) {
            state.books.push(book);
        },
        removeBook(state, book) {
            const index = state.books.indexOf(book);
            state.books.splice(index, 1);
        },
        updateBook(state, book) {
            const index = state.books.findIndex(b => b._id == book._id);
            Vue.set(state.books, index, book);
        },
        sortBooks(state, field) {
            state.books.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormBook(state) {
            Object.assign(state.formBook, {
                title: "",
                authors: [],
                isbn: "",
                published: "1997-01-10T22:00:00.000Z",
                pages: 0,
                price: 0
            });
        },
        setFormBook(state, book) {
            state.formBook = book;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getBooks(context) {
            try {
                let resp = await axios.get("http://localhost:5000/book");
                context.commit("setBooks", resp.data);
                await context.dispatch("showMessageForTime", { message: "Книги завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getBookById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/book/${id}`);
                await context.dispatch("showMessageForTime", { message: "Книги завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getBooksByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/book", { params: query });
                context.commit("setBooks", resp.data);
                await context.dispatch("showMessageForTime", { message: "Книги завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postBook(context, book) {
            try {
                let resp = await axios.post("http://localhost:5000/book", book);
                context.commit("addBook", resp.data);
                await context.dispatch("showMessageForTime", { message: "Книгу додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteBook(context, book) {
            try {
                let resp = await axios.delete(`http://localhost:5000/book/${book._id}`);
                context.commit("removeBook", resp.data);
                await context.dispatch("showMessageForTime", { message: "Книгу вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchBook(context, book) {
            try {
                let resp = await axios.patch(`http://localhost:5000/book/${book._id}`, book);
                context.commit("updateBook", resp.data);
                await context.dispatch("showMessageForTime", { message: "Книгу оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, book) {
            book = await context.dispatch("getBookById", book._id);
            context.commit("setFormBook", book);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormBook");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
