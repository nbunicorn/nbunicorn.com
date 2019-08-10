<template>
  <b-container fluid id="main">
    {{ auth }}
    <top-nav :user="user"></top-nav>
    <router-view :user="user" :deployments="deployments" :statistics="statistics"></router-view>
    <subscribe :user="user"></subscribe>
    <footer-links></footer-links>
  </b-container>
</template>

<script>
  module.exports = {
    props: [],
    data () {
      return {
        deployments: [],
        statistics: {
          used: null,
          limit: null
        },
        user: {
          token: null,
          payload: {
            idTokenPayload: {
              email: null
            }
          },
          canDeploy: null
        },
        timer: null,
        auth: null
      }
    },
    components: {
      TopNav: 'url:./TopNav.vue',
      Subscribe: 'url:./Subscribe.vue',
      FooterLinks: 'url:./FooterLinks.vue'
    },
    methods: {
      handleAuthentication () {
        if (localStorage.hasOwnProperty('user')) {
          alert('user found');
          this.resume(JSON.parse(localStorage.getItem('user')));
          this.checkDeploy(this.user.token);
          this.checkDeployments(this.user.token);
        } else {
          alert('user not found');
        }      
      },
      resume (user) {
        // if not expired restore user
        if (new Date().getTime() < parseInt(user.payload.expiresAt)){
          alert('user session restored');
          this.user = user;
        } else {
          // attempt re-auth
          alert('user session cleared, attempting re-auth');
          localStorage.removeItem('user');
          this.$root.auth.authorize();
        }
      },
      setDeploy (setting) {
        this.user.canDeploy = setting;
      },
      setDeployments (payload){
        this.deployments = payload.deployments;
        this.statistics.used = payload.num_deployments;
        this.statistics.limit = payload.max_deployments;
      },
      checkDeploy (token){

        if (token == null){
          console.error('Cannot check deploy privileges: token is null');
          return false;
        }

        console.log('Checking deploy privileges...');

        var url = new URL("https://app.nbunicorn.com/can_deploy"),
              queryParams = {token: token}
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

        var requestParams = {
          method: "GET",
          mode: "cors"
        };

        // async 
        fetch(url, requestParams)
          .then(function (data) {
            return data.json();
          })
          .then((r) => {
            this.setDeploy(r.can_deploy);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      },
      checkDeployments (token){

        if (token == null){
          console.error('Cannot check deployments: token is null');
          return false;
        }

        console.log('Checking deployments...');

        var url = new URL("https://app.nbunicorn.com/deployments"),
              queryParams = {token: token}
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

        var requestParams = {
          method: "GET",
          mode: "cors"
        };

        // async 
        fetch(url, requestParams)
          .then(function (data) {
            return data.json();
          })
          .then((r) => {
            this.setDeployments(r);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      }
    },
    created () {

      this.handleAuthentication();

      // infrequent refresh 30 seconds
      this.timer = setInterval(() => {
        if(this.user.token != null) this.checkDeployments(this.user.token);
      }, 30000);

      // refresh on action
      this.$root.$on('refresh', () => {
        this.checkDeployments(this.user.token);
      });
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  }
</script>

<style scoped>
  #main {
    max-width: 700px;
    margin: 10px auto 10px auto;
  }
  .card {
    margin-bottom: 10px;
  }
</style>