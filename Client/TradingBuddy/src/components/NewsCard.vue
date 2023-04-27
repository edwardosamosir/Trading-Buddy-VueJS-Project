<script>
export default {
    props: {
        cardValue: Object
    }
}
</script>

<template>
<div class="col-md-4" style="text-align: justify; margin-top: 15px;">
    <div class="card text-bg-dark h-100">
        <div class="card-img">
            <h5 class="card-title text-white">{{ cardValue.title }}</h5>
            <h6 class="card-subtitle mb-2 text-white">{{ cardValue.createdAt }}</h6>
            <h6 class="card-subtitle mb-2 text-white">{{ cardValue.source }}</h6>
            <p class="card-text text-white">
                <a :href="cardValue.url" class="card-link"><p  style="font-size:14px; color: red;">Click Link Here</p></a>
  
            </p>
        </div>
    </div>
</div>


</template>

<style scoped>
#card:hover {
    transform: scale(1.20);
}
</style>