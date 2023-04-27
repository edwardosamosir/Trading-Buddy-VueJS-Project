<script>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { mapWritableState } from 'pinia';
import { useTradingStore } from './stores/trading';

export default {
  components : {
    Navbar, Footer,
  },
  computed: {
    ...mapWritableState(useTradingStore, ['isLogin'])
  },
  created() {
    if(localStorage.access_token){
      this.isLogin = true;
    }
  }

}
</script>

<template>
  <Navbar/>
  <RouterView />
  <Footer />
</template>

<style>
body {
  background-image: url('./assets/background-tradingbuddy-resize.jpg');
  height: 135vh;
  margin-top: 50px;
}
</style>
