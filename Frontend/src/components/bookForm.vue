<template>
    <form v-if="visible" @submit.prevent>
        <label> Назва книги <input type="text" v-model="book.title" required> </label> <br>
        <label> Автори <setInput v-model="book.authors"> </setInput></label> <br>
        <label> Дата випуску <input type="date" v-model="book.published"> </label> <br>
        <label> Кількість сторінок <input type="number" v-model.number="book.pages" min="0"> </label> <br>
        <label> Ціна <input type="number" v-model.number="book.price" min="0" step="0.01"> </label> <br>  
        <input type="button" @click="save()" value="Зберегти">     
    </form>
</template>

<script>
import setInput from "./setInput";

export default {
    name: "bookForm",
    props:{
        value:Object,
        visible: Boolean
    },
    data(){
        return{
            book:this.value,            
        }
    },
    components:{
        setInput
    },
    methods:{
        save(){
            console.log(this.book)
            this.$emit('input', this.book);       
          
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