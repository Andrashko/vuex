// таблична форма відображення книг
<template>
    <div>
        <p v-if="books.length==0" class="alert">
            Книги відсутні
        </p>
        
        <table v-if="books.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('title')">  Назва </th>
                <th v-on:click="sort('authors')"> Автор  </th>
                <th v-on:click="sort('published')">  Дата </th>
                <th v-on:click="sort('pages')"> Сторінок </th>
                <th v-on:click="sort('price')"> Ціна </th>
                <th></th>
            </tr>
            <bookTableRow v-for="(book, index) in books" 
                v-bind:key="book._id" 
                v-bind="{book, index}"       
            >             
            </bookTableRow>
        </table>
    </div> 
</template>

<script>
import bookTableRow from "./bookTableRow";
import { mapGetters, mapMutations} from 'vuex';


export default {
    name:"bookTable",      
    data(){
        return{         
          
        }
    },
    components:{
        bookTableRow
    },
    computed:{
       ...mapGetters({
           books:"filtredBooks"
       }) 
    },    
    methods:{
        ...mapMutations({
            sort:"sortBooks"
        })
    }    
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>