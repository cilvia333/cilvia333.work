<template>
  <section class="index">
    <div class="contents-wrapper">
      <div class="title">
        <img src="~/static/images/icon.jpg" alt="icon">
        <h1>
          Cilvia333's Official Website
        </h1>
      </div>
      <div class="information">
        <h2>
          Now Rebuilding
        </h2>
      </div>
      <div class="links">
        <div class="sns-button">
          <a href="https://nuxtjs.org/">
            <span class="icon"/>
          </a>
        </div>
        <div class="sns-button">
          <a href="https://nuxtjs.org/">
            <span class="icon"/>
          </a>
        </div>
        <div class="sns-button">
          <a href="https://nuxtjs.org/">
            <span class="icon"/>
          </a>
        </div>
        <div class="sns-button">
          <a href="https://nuxtjs.org/">
            <span class="icon"/>
          </a>
        </div>
      </div>
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
  src: url('/fonts/MorningDew.woff2') format('woff2'),
}

.index {
  width:100vw;
  height: 100vh;
  display: block;
  position:relative;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #f2f2f2;

  .contents-wrapper{
    display: block;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    transform: webkit-translateY(-50%) webkit-translateX(-50%);

    .title {
      font-family: 'morning-dew';
      width:100vw;
      font-weight: 200;
      font-size: 2.5rem;
      color: rgb(66, 66, 66);
      
      img{
        width:100px;
        height:auto;
        border-radius: 50px;
        transform: rotate(0deg);
        transition: .5s;

        &:hover{
          transform: rotate(720deg);
        }
      }

      .h1{
        font-family: 'morning-dew';
      }
    }

    .information {
      font-family: "ten-mincho";
      font-weight: 300;
      font-size: 1.5rem;
      color: #f7931e;
      word-spacing: 5px;
      padding-bottom: 15px;
      width:100vw;
      margin:50px 0px;
    }

    .links{
      height: auto;
      min-width: 268px; 
    
      .sns-button{
        display: inline-block;
        position: relative;
        box-shadow: inset 0 0 0 2px #f7931e;
        border-radius: 100%;
        transition: all .28s ease;
        width:60px;
        height:60px;
        margin:0px 30px;
        a{
          width: 60px;
          height: 60px;
          color: #f7931e;
          transition: all .28s ease;
          text-decoration: none;

          .icon{
            width: 60px;
            height: 60px;
            content:"❤️";
          }
        }
        &:hover{
          box-shadow: inset 0 0 0 30px #f7931e;
        }
      }
    }
  }
}
</style>



