<template>
  <section class="index">
    <div class="title">
      <img src="~/static/images/icon.jpg" alt="icon">
      <h1 class="title">
        Cilvia333's Official Site
      </h1>
    </div>
    <div class="information">
      <h2>
        Now Rebuilding
      </h2>
    </div>
    <div class="links">
      <a href="https://nuxtjs.org/">❤️</a>
      <a href="https://nuxtjs.org/">❤️</a>
      <a href="https://nuxtjs.org/">❤️</a>
      <a href="https://nuxtjs.org/">❤️</a>
    </div>
  </section>
</template>

<script>

export default {

}
</script>

<style lang="scss">
@font-face {
  font-family: 'morning-dew';
  src: url('~/assets/fonts/MorningDew.woff2') format('woff2'),
}

.index {
  min-height: 100vh;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    font-family: 'morning-dew';
    display: block;
    width:100vw;
    font-weight: 300;
    font-size: 2rem;
    color: #35495e;
    letter-spacing: 1px;

    .title{
      font-family: 'morning-dew';
    }

    img{
      width:100px;
      height:auto;
      border-radius: 50px;
      transform: rotateZ(0);
      transition: .5s;

      &:hover{
        transform: rotateZ(360);
      }
    }
  }

  .information {
    font-weight: 300;
    font-size: 1rem;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
    width:100vw;
  }

  .links {
    padding-top: 15px;
    width:100vw;

    a{
      width: 50px;
      height:50px;
      border-radius: 25px;
      background: #eee;

    }
  }
}
</style>

