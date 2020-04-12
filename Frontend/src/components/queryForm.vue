//форма для запитів
<template>
    <form @submit.prevent>
        Кількість сторінок від <input type="number" v-model.number="query.minPages"> до <input type="number" v-model.number="query.maxPages"> 
        та ціна до <input type="number" v-model.number="query.maxPrice">
        <input type="button" value="Шукати" @click="search()">
        <input type="button" value="Очистити" @click="reset()">
    </form>
</template>
<script>
export default {
    props:{
        value:Object
    },
    data(){
        return{
            query:this.value
        }
    },
    methods:{
        reset(){
            this.query.minPages = this.query.maxPages = this.query.maxPrice = null;
            this.$emit("input",this.query);
        },
        search(){            
            this.$emit("input",this.query);
        }
    }
}
</script>