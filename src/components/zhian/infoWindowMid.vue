<template>
    <div>
        <div class="pu-row pu-row-sb pad-lr-10 pad-tb-10 mid-title">
            <span class="mar-l-10" style="color: #9ABCE2">{{text}}</span>
            <img src="../../assets/imgs/close-b.png" @click="windowClose" class="mar-r-10" style="color: #fff;font-size: 20px" />
        </div>
        <div class="mid-content">
            <slot></slot>
        </div>
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
        border-radius: 10px;
    }
    .title{
        background-image: url('../../assets/imgs/title-wrapper.png');
        background-size: 100%;
        background-position: center;
        color: #9ABCE2;
        height: 35px;
        width: 110px;
    }
    .mid-content{
        padding: 10px 20px;
        background-color: rgba(21, 49, 73, 0.95);
        border-radius: 10px;
    }
    .mid-title{
        background-color: rgba(22, 36, 64, 0.95);
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
</style>