<template>
    <div>
      <div class="tradingview-widget-container">
        <div id="tradingview_75566"></div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
      mounted() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => this.initWidget();
        document.head.appendChild(script);
      },
      methods: {
        initWidget() {
          new TradingView.widget({
            autosize: true,
            symbol: 'IDX:BBCA',
            timezone: 'Asia/Jakarta',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: true,
            withdateranges: true,
            range: '1D',
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: true,
            show_popup_button: true,
            popup_width: '1000',
            popup_height: '650',
            container_id: `tradingview_75566`
          });
        }
      }
    };
  </script>
  
  <style>
    #tradingview_75566 {
      text-align: center;
      margin-top: 82px;
      height: 90vh;
      width: 100%;
    }
  </style>
  