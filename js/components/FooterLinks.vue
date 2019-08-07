<template>
  <div>
    <b-row>
      <b-col v-for="link in links" :key="link.url" cols="4">
        <b-link :href="link.url"  @click="$bvModal.show(link.modal)">{{ link.text }}</b-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        we <span class="text-danger">♥</span> nb
      </b-col>
    </b-row>

    <b-modal id="about-modal" hide-footer title="About nbunicorn">
      <p><img src="https://scontent.fsyd7-1.fna.fbcdn.net/v/t1.0-9/52011388_378653672983495_2187452338778669056_n.jpg?_nc_cat=106&_nc_ht=scontent.fsyd7-1.fna&oh=3bee9cb1b398e9b433870f6962c42971&oe=5D6E9524" width="200px" height="200px" class="mx-auto d-block"></p>
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
    </b-modal>
  </div>
</template>

<script>
  module.exports = {
    props: [],
    data () {
      return {
        links: [
          { url: '#', modal: 'about-modal', text: 'About' },
          { url: 'http://medium.com/nbunicorn', text: 'Blog' },
          { url: 'https://nbunicorn.readthedocs.io', text: 'Docs' },
          { url: 'http://twitter.com/nbunicorn', text: 'Twitter' },
          { url: 'http://github.com/nbunicorn', text: 'GitHub' },
          { url: 'mailto:hello@nbunicorn.com', text: 'Contact' },
          { url: '/legal', text: 'Privacy & Terms' },
        ]
      }
    }
  }
</script>

<style scoped>
  * {
    text-align: center;
  }
</style>