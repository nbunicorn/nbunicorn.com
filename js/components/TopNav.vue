<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="loggedIn">
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><b-img :src="user.payload.idTokenPayload.picture" height="20" width="20" rounded="circle" fluid disabled></b-img>&nbsp;{{ user.payload.idTokenPayload.name }}</template>
          <b-dropdown-item @click="logout">Sign out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-else @click="login">Login with Github</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-alert variant="success" show v-if="(user.token) && (user.canDeploy)">
      <h4 class="alert-heading">Welcome!</h4>
      You're in. Welcome to <strong>nbunicorn</strong>! Check out the instructions below to deploy your first notebook in a few simple steps.
      <hr>
      You can also always find more information in <a href='https://nbunicorn.readthedocs.io' target='_blank' class="alert-link">our docs</a>.
    </b-alert>

    <b-alert variant="warning" show v-else-if="(user.token) && (user.canDeploy !== null)">
      Uh oh. Looks like your account is not authorised for deployment just yet. Join the waitlist below! (<em>Reference:</em> <code>{{ userRef }}</code>)
    </b-alert>

    <div id='logo'></div>
    <p class="lead">The easiest way from notebook to impact, so you can focus more on <strong>{{ more }}</strong>, and less on <strong>{{ less }}</strong>.</p>
  </div>
</template>

<script>
  module.exports = {
    props: [ 'user' ],
    data () {
      return {
        more: 'data science',
        less: 'infrastructure'
      }
    },
    computed: {
      loggedIn () {
        return this.user.token;
      },
      userRef () {
        return this.user.payload.idTokenPayload.sub;
      }
    },
    methods: {
      logout(){
        // clear credentials and refresh
        localStorage.removeItem('user');
        document.location.reload();
      },
      login(){
        localStorage.setItem('callbackRedirect', window.location.href);
        this.$root.auth.authorize();
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