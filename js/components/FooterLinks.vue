<template>
  <div>
    <b-row>
      <b-col v-for="link in links" :key="link.url" cols="4">
        <b-link :href="link.url" :to="link.to">{{ link.text }}</b-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        we <span class="text-danger">♥</span> nb
      </b-col>
    </b-row>
  </div>
</template>

<script>
  module.exports = {
    props: [],
    data () {
      return {
        links: [
          { url: '#', to: '/about', text: 'About' },
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