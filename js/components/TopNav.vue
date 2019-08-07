<template>
  <div>
    <div class="clearfix" style="height: 47px;">
      <b-button @click="click" variant="light">{{ buttonText }}</b-button>
    </div>

    <b-alert variant="success" show v-if="(user.token) && (user.canDeploy)">
      <h4 class="alert-heading">Welcome!</h4>
      You're in. Welcome to <strong>nbunicorn</strong>! Check out the instructions below to deploy your first notebook in a few simple steps.
      <hr>
      You can also always find more information in <a href='https://nbunicorn.readthedocs.io' target='_blank' class="alert-link">our docs</a>.
    </b-alert>

    <b-alert variant="warning" show v-else-if="user.canDeploy !== null">
      Uh oh. Looks like your account is not authorised for deployment just yet. Join the waitlist below! (<em>Reference:</em> <code>{{ userRef }}</code>)
    </b-alert>

    <div id='logo'></div>
    <p class="lead">The easiest way from notebook to impact, so you can focus more on <strong>{{ more }}</strong>, and less on <strong>{{ less }}</strong>.</p>
  </div>
</template>

<script>
  module.exports = {
    props: [ 'user', 'auth' ],
    data () {
      return {
        ref: '123',
        more: 'data science',
        less: 'infrastructure'
      }
    },
    computed: {
      loggedIn () {
        return this.user.token;
      },
      buttonText () {
        return this.loggedIn ? 'Logout' : 'Login with GitHub'
      },
      userRef () {
        return this.ref;
      }
    },
    methods: {
      click(evt){
        if(this.loggedIn){
          // clear credentials and refresh
          localStorage.removeItem('user');
          document.location.reload();
        } else {
          this.auth.authorize();
        }
      }
    },
    created () {
      //console.log(this.auth);
    }
  }
</script>

<style scoped>
  #logo {
    background-image: url(../../images/nbunicorn-text-no-margin.png);
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 0;
    padding-top: 24.35%;
    margin: 20px 0 10px 0;
  }
</style>