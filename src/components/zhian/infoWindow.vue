<template>
    <div class="con">
        <div class="pu-row pu-row-sb">
            <div class="title pu-row">
                <img class="mar-l-5" width="15" :src="icon" alt="">
                <span class="mar-l-5 mar-r-5 f-12">{{text}}</span>
            </div>
            <img src="../../assets/imgs/close-b.png" @click="windowClose" style="color: #fff;font-size: 20px" class="mar-r-10" />
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
        icon: {
            default: ''
        },
        text: {
            default: '',
            type: String,
        },
        windowId: {
            default: ''
        }
    },
    mounted() {
        console.log(this.icon, this.text)
    },
    methods:{
        windowClose() {
            this.$emit('winClose', this.windowId)
        }
    }
}
</script>
<style lang="scss">
    .con{
        background-color: rgba(21, 49, 73, 0.95);
        border-radius: 2px;
    }
    .title{
        background-image: url('../../assets/imgs/title-wrapper.png');
        background-size: 100% 100%;
        background-position: center;
        color: #9ABCE2;
        height: 30px;
        min-width: 110px;
    }
</style>
