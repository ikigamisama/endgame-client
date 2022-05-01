<template>
  <div>
    <img class="bg" src="@/assets/images/Bg.png" alt="">
    <div class="dark">
      <router-view/>
      <footer>
        &copy; Endgame and Design are made by Paimon Sandwich. All rights reserved 2022
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 2;
  }
  .dark {
    position: relative;
    background-color: rgba(0, 0, 0, .6);
    height: 100vh;
    z-index: 3;
  }
  footer {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: rgb(46, 46, 58);
    font-size: .7rem;
  }
</style>
