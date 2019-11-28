<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .container {
    position: releative;
  }
  .header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    /*These for lines are to fix header in the top*/
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    /*border: 1px solid;*/
  }
  .main {
    background-color: white;
    color: #333;
    text-align: center;
    /*These for lines are to fix main in the middle*/
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 60px;
    /*border: 1px solid;*/
  }
  .footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height:60px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  /*.footer {*/
    /*background-color: #B3C0D1;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height:150px;*/
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*!*border: 1px solid;*!*/
  /*}*/
</style>
