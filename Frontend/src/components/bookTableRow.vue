// рядок що відбражає 1 книгу
<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{book.title}} </td>
        <td> {{book.authors?book.authors.join(","):""}} </td>
        <td> {{new Date(book.published).toLocaleDateString()}} </td>
        <td> {{book.pages}} </td>
        <td> {{book.price}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
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
        remove(index){
            this.$emit("remove", index);
        },
  
        update(index){
            this.$emit("update",index);
        }
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>