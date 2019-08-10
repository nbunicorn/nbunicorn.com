Vue.use(httpVueLoader);
Vue.use(VueRouter);

var router = new VueRouter();

var vm = new Vue({
  components: {
    App: 'url:./js/components/App.vue',
    About: 'url:./js/components/About.vue',
    Deploy: 'url:./js/components/Deploy.vue',
  },
  data(){
    return {
      authConfig: null,
      auth: null
    }
  },
  computed: {
    routes(){
      return [
        { path:'/', component: this.$options.components.Deploy },
        { path:'/about', component: this.$options.components.About }
      ]
    }
  },
  template: '<app></app>',
  router: router,
  created(){
    this.authConfig = {
      domain: 'nbunicorn.auth0.com',
      clientID: 'hdVkAV2OPzugycruV7FY0emQlVrVrFDL',
      responseType: 'token id_token',
      scope: 'openid email profile',
      redirectUri: window.location.origin + '/callback'
    };
    this.$root.auth = new auth0.WebAuth(this.authConfig);
    localStorage.setItem('authConfig', JSON.stringify(this.authConfig));
    alert('authConfig set');
  },
  beforeMount(){
    this.$router.addRoutes(this.routes);
  }
}).$mount('#app');




