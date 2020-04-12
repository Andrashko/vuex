
<template>
    <div class="message" v-if="messages.length>0">
        <p> Непрочитаних повідомлень: {{messages.length}} </p>
        <p> {{text}} </p>
        <input type="button" @click="close" value="Ок">
    </div>
</template>

<script>
export default {
    name:"messageSystem",
    props:{
        //список повідомлень
        messagesList:Array,
        //час через який повідомлення зникне
        delay:Number
    },
    data(){
        return{
            messages: this.messagesList,
            time: (this.delay || 5)*1000           
        }
    },
    computed:{
        //текст першого повідомлення для показу
        text(){
            return this.messages[0];
        }   
    },
    methods:{
        //закрити перше повідомлення
        close(){
            this.messages.shift();
        }
    },
    updated(){        
        //запланувати закриття повідомлення через вказаний час. Викликається щоразу після оновлення по відомлення    
        setTimeout(this.close, this.time);
    }
}
</script>
<style scoped>
    .message{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: greenyellow;
        font: bold "Arial" 14px;
        padding: 10px;
        border: 1px solid green;
    }
</style>