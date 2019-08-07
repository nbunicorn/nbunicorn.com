<template>
  <div id='app'>
    <b-container>
      <top-nav :user="user" :auth="auth"></top-nav>
      <new-deployment :deployments="deployments" v-if="user.canDeploy && user.token" :token="user.token"></new-deployment>
      <deployments :deployments="deployments" :statistics="statistics" v-if="user.token"></deployments>
      <deployment v-for="deployment in deployments" :key="deployment.name" :deployment="deployment" :token="user.token"></deployment>
      <subscribe :user="user"></subscribe>
      <footer-links></footer-links>
    </b-container>
  </div>
</template>

<script>
  module.exports = {
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
        auth: null,
        timer: null
      }
    },
    watch: {
      'user.token': function (token, old) {
        
        localStorage.setItem('user', JSON.stringify(this.user));
        this.checkDeploy(token);
        this.checkDeployments(token);
      }
    },
    components: {
      TopNav: 'url:./TopNav.vue',
      NewDeployment: 'url:./NewDeployment.vue',
      Deployments: 'url:./Deployments.vue',
      Deployment: 'url:./Deployment.vue',
      Subscribe: 'url:./Subscribe.vue',
      FooterLinks: 'url:./FooterLinks.vue'
    },
    methods: {
      handleAuthentication () {
        if (localStorage.hasOwnProperty('user')) {
          this.resume(JSON.parse(localStorage.getItem('user')));
          return true;
        }
        
        this.auth.parseHash((err, authResult) => {
          if (err) return err;

          // if just logged in otherwise these will not be set
          if (authResult && authResult.accessToken && authResult.idToken) {
            // hide hash
            window.location.hash = '';

            // handle login
            this.login(authResult);
          }  

        });
        
      },
      login (authResult) {
        
        this.user.token = authResult.accessToken;
        this.user.payload = authResult;
        this.user.payload.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
      },
      resume (user) {
        // if not expired restore user
        if (new Date().getTime() < parseInt(user.payload.expiresAt)){
          this.user = user;
        } else {
          // attempt re-auth
          localStorage.removeItem('user');
          this.auth.authorize();
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
      this.auth = new auth0.WebAuth({
        domain: 'nbunicorn.auth0.com',
        clientID: 'hdVkAV2OPzugycruV7FY0emQlVrVrFDL',
        responseType: 'token id_token',
        scope: 'openid email profile',
        redirectUri: window.location.href
      });

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
  #app {
    max-width: 600px;
    margin: 10px auto 10px auto;
  }
  .card {
    margin-bottom: 10px;
  }
</style>