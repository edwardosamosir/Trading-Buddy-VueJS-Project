<script>
import { mapState, mapActions } from 'pinia';
import NewsCard from './NewsCard.vue'
import { useTradingStore } from '../stores/trading';
export default {
    components: {
        NewsCard
    },
    computed: {
        ...mapState(useTradingStore, ['IDNews']),
    }
}
</script>

<template>
    <h1 style="margin-top: 100px; text-align: center;">News</h1>
    <div class="row " style="text-align: center; margin-left: 20px; margin-right: 20px;">
        <NewsCard v-for="(eachNews, idx) in IDNews" :cardValue="eachNews" />
    </div>
</template>