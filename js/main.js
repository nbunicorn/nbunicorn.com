Vue.use(httpVueLoader);

vm = new Vue({
  components: {
    App: 'url:./js/components/App.vue'
  }
}).$mount('#app');