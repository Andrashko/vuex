
<template>
    <div class="message" v-if="messages.length>0">
        <p> Непрочитаних повідомлень: {{messages.length}} </p>
        <p> {{text}} </p>
        <input type="button" @click="close" value="Ок">
    </div>
</template>

<script>
export default {
    props:{
        messagesList:Array,
        delay:Number
    },
    data(){
        return{
            messages: this.messagesList,
            time: (this.delay || 5)*1000           
        }
    },
    computed:{
        text(){
            return this.messages[0];
        }   
    },
    methods:{
        close(){
            this.messages.shift();
        }
    },
    updated(){        
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