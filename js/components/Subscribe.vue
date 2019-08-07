<template>
  <div>
    <b-card no-body header="Latest updates">
      <b-list-group flush>
        <b-list-group-item v-for="article in articles" :key="article.url" class="d-flex justify-content-between align-items-center"><em>{{ article.title }}</em> <b-link :href="article.url" class="text-secondary">Read more</b-link></b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card header="Stay up to date">
      <b-card-text><strong>nbunicorn</strong> is incubating with new users by invitation. Subscribe and we'll keep you up to date on our progress.</b-card-text>
      <b-form action="https://docs.google.com/forms/d/e/1FAIpQLSdvUx4Xur604v9E5SuaRrUPAx6Cgd-mlgcPWNvtAoADBc-yJQ/viewform?usp=pp_url">
        <b-input-group>
          <b-form-input type="email" :value="email" name="entry.1106452456" placeholder="email@address.com" required></b-form-input>
          <b-input-group-append>
            <b-button variant="dark" type="submit">Subscribe</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  module.exports = {
    props: ['email'],
    data () {
      return {
        articles: [
          { title: 'Notebooks, from the heart', url: 'https://medium.com/nbunicorn/notebooks-from-the-heart-a93de49db871' },
          { title: 'nbwhat? A primer on notebooks for data science', url: 'https://medium.com/nbunicorn/nbwhat-a-primer-on-notebooks-for-data-science-2b48a36ff547' }
        ]
      }
    }
  }
</script>