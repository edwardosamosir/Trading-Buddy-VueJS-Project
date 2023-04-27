<script>
import { mapState, mapActions } from 'pinia';
import Loading from '../components/Loading.vue';
import NewsCardContainer from '../components/NewsCardContainer.vue';
import { useTradingStore } from '../stores/trading';
export default {
    components : {
        NewsCardContainer, Loading
    },
    computed : {
        ...mapState(useTradingStore,['IDNews','isLoadingNews']),
        
    },
    methods:{
        ...mapActions(useTradingStore, ['fetchIDNews'])
    },
    created(){
        console.log('created NewsView')
        // console.log(this.IDNews)
        this.fetchIDNews()
    }
}
</script>
<template>
    <div :class="{myStyle : isLoadingNews}">
        <NewsCardContainer v-if="!isLoadingNews"/>
        <Loading v-else />
    </div>
</template>
<style scoped>
.myStyle {
    text-align: center;
}
</style>