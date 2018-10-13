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
          <a href="https://twitter.com/cilvia333">
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }" class="icon"/>
          </a>
        </div>
        <div class="sns-button">
          <a href="https://github.com/cilvia333">
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" class="icon"/>
          </a>
        </div>
        <div class="sns-button">
          <a href="https://cilvia.hateblo.jp/">
            <font-awesome-icon icon="edit" class="icon icon-edit"/>
          </a>
        </div>
        <div class="sns-button">
          <a href="mailto:cilvia333x@gmail.com">
            <font-awesome-icon icon="envelope" class="icon"/>
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
      margin-bottom: 50px;
      
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
      font-size: 1.3rem;
      color: #f7931e;
      word-spacing: 5px;
      padding-bottom: 15px;
      width:100vw;
      margin:50px 0px;
    }

    .links{
      margin:auto;
      height: auto;
      min-width: 268px; 
      margin-top: 200px;
    
      .sns-button{
        display: inline-block;
        position: relative;
        width:60px;
        height:60px;
        margin:0px 30px;

        a{
          display: block;
          position:relative;
          width: 55px;
          height: 55px;
          transition: .2s ease-in-out;
          border-radius: 30px;
          background-color: #eee;
          color: #f7931e;
          box-shadow: inset 0 0 0 3px #f7931e;
          text-decoration: none;
          overflow: hidden;

          &:hover{
            color: #eee;
            box-shadow: inset 0 0 0 30px #f7931e;
          }

          .icon{
            position:absolute;
            width: 30px;
            height: auto;
            right: 12px;
            bottom: 12px;
          }

          .icon-edit{
            right: 10px;
            bottom: 15px;
          }
        }
      }
    }
  }
}

@media screen and (max-width:1000px){
  .index {
    .contents-wrapper{
      .title {
        margin-bottom: 0px;
        
      }
      .information {
        padding-bottom: 0px;
        margin:0px 0px;
      }

      .links{
        margin-top: 50px;
      
        .sns-button{
          margin:0px 10px;
        }
      }
    }
  }
}

@media screen and (max-width:450px){
  .index {
    .contents-wrapper{
      .title {
        margin-bottom: 0px;
        
      }
      .information {
        padding-bottom: 0px;
        margin:30px 0px;
      }

      .links{
        margin-top: 100px;
      
        .sns-button{
          margin:0px 10px;
        }
      }
    }
  }
}
</style>



