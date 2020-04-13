// Форма для додавання/редагування книги
<template>
    <form v-if="visible" @submit.prevent> <!-- якщо форма видима то показати її і відмінити надсилання запиту за замовчуванням-->
        <label> Назва книги <input type="text" v-model="book.title" required> </label> <br>
        <label> Автори <setInput v-model="book.authors"> </setInput></label> <br>
        <label> Дата випуску <input type="date" v-model="book.published"> </label> <br>
        <label> Кількість сторінок <input type="number" v-model.number="book.pages" min="0"> </label> <br>
        <label> Ціна <input type="number" v-model.number="book.price" min="0" step="0.01"> </label> <br>  
        <input type="button" @click="save" value="Зберегти">     
         <input type="button" @click="hideForm" value="Відміна">   
    </form>
</template>

<script>
import setInput from "./setInput";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: "bookForm",   
    data(){
        return{            
        }
    },
    components:{
        setInput
    },
    computed:{
        ...mapState({
            book:"formBook",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
    methods:{
        ...mapActions(["patchBook","postBook"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postBook(this.book);
            else
                await this.patchBook(this.book);    
            this.hideForm();         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>