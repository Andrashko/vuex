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
import { mapActions } from 'vuex';
export default { 
    data(){
        return{
            query: {
                minPages: null,
                maxPages: null,
                maxPrice: null
            }
        }
    },
    methods:{
        ...mapActions(["getBooksByQuery"]),
        reset(){
            this.query.minPages = this.query.maxPages = this.query.maxPrice = null;
            this.getBooksByQuery(this.query);
        },
        search(){            
            this.getBooksByQuery(this.query);
        }
    }
}
</script>