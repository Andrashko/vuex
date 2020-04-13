// рядок що відбражає 1 книгу
<template>
    <tr>        
        <td> {{index+1}} </td>
        <td> {{book.title}} </td>
        <td> {{book.authors?book.authors.join(","):""}} </td>
        <td> {{new Date(book.published).toLocaleDateString()}} </td>
        <td> {{book.pages}} </td>
        <td> {{book.price}} </td>
        <td>
            <input type="button" value="Вилучити" @click="deleteBook(book)">
            <input type="button" value="Редагувати" @click="showUpdateForm(book)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"bookTableRow",
    props:{
        index:Number,
        book:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteBook", "showUpdateForm"]),
        updated(){
        console.log(this.book);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>