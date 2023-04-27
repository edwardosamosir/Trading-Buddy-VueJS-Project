<script>
export default {
    mounted() {
        const script1 = document.createElement("script");
        script1.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
        script1.async = true;
        script1.innerHTML = JSON.stringify({
            colorTheme: "light",
            isTransparent: false,
            largeChartUrl: "",
            displayMode: "regular",
            width: 480,
            height: 830,
            symbol: "IDX:BMRI",
            locale: "en",
        });
        this.$el.querySelector(".widget-container-1 .tradingview-widget-container__widget").appendChild(script1);

        const script2 = document.createElement("script");
        script2.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
        script2.async = true;
        script2.innerHTML = JSON.stringify({
            width: 480,
            height: 650,
            colorTheme: "light",
            isTransparent: false,
            symbol: "IDX:BBRI",
            locale: "en",
        });
        this.$el.querySelector(".widget-container-2 .tradingview-widget-container__widget").appendChild(script2);

        const script3 = document.createElement("script");
        script3.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script3.async = true;
        script3.innerHTML = JSON.stringify({
            symbols: [
                { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                { proName: "FOREXCOM:NSXUSD", title: "US 100" },
                { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
                { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
                { description: "IDX", proName: "IDX:COMPOSITE" },
            ],
            showSymbolLogo: true,
            colorTheme: "dark",
            isTransparent: false,
            displayMode: "adaptive",
            locale: "en",
        });
        this.$el.querySelector(".widget-container-3 .tradingview-widget-container__widget").appendChild(script3);
    },
};
</script>

<template>
  <div class="widgets-container">
    <div class="widget-container-3 tradingview-widget-container" style="margin-top: 30px;">
      <div class="tradingview-widget-container__widget"></div>
    </div>

    <div class="widget-wrapper">
      <div class="widget-container-2 tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
      </div>

      <div class="widget-container-1 tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
      </div>
    </div>
  </div>
</template>

<style>
.widgets-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.widget-wrapper {
  display: flex;
  justify-content: center;
  width: 50%;
  margin-top: 30px;
}

.widget-container-1,
.widget-container-2 {
  width: calc(50% - 10px);
}

.widget-container-3 {
  width: 100%;
}
</style>
