<template>
  <b-card>
    <p><strong>nbunicorn</strong> is the easiest way to turn a Jupyter notebook into a real product!</p>
    <p>As data scientists, we understand just how difficult it is to create a great algorithm to solve a worthy problem. As engineers, we also know how challenging deploying, securing and scaling complex data science solutions can be... So we built <strong>nbunicorn</strong> to solve just this.</p>
    <h3>How it works</h3>
    <p>With <strong>nbunicorn</strong>, you have everything you need to go from notebook to product, with only a few lines of code! Just import our package, decorate your functions, and upload your notebook.</p>
    <p>We'll convert it into a REST API, build all the complex dependencies into a container, and deploy it to a highly scalable cluster backed by Google Cloud.</p>
    <p>You can call the API directly, or embed our simple JavaScript client <code>nbunicorn.js</code> to access your functions in a website with ease!</p>
    <h3>Who made it</h3>
    <h6 class="mt-0">Blair Hudson (<a href='https://twitter.com/blairhudson' target='_blank'>@blairhudson</a>)</h6>
    <div class="media">
      <img class="mr-3" src="https://instagram.fsyd8-1.fna.fbcdn.net/vp/95acc5ab093828b97f81872478a16e06/5DDD9485/t51.2885-15/e35/c141.0.798.798a/s150x150/57026484_1081237828729900_2371537046527876778_n.jpg?_nc_ht=instagram.fsyd8-1.fna.fbcdn.net" width="110px" height="110px" style="margin-top: 6px">
      <div class="media-body">
        <small>Blair is the creator of <strong>nbunicorn</strong>. With a passion for data and innovation, and deep experience across commercialisng advanced data-driven solutions, his vision seeks to enable problem solvers everywhere to design and build great data products with ease.</small>
      </div>
    </div>
  </b-card>
</template>

<script>
  module.exports = {
    data () {
      return {
        user: {
          token: null
        }
      }
    },
    
    components: {
      TopNav: 'url:./TopNav.vue',
      FooterLinks: 'url:./FooterLinks.vue'
    },
    methods: {
      
    },
    created () {
      
    },
    beforeDestroy() {
      
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