<template>
  <b-card no-body header-tag="header">
    <span slot="header" class="mb-0">Deployments <b-badge v-if="statistics.used">{{ statistics.used }}</b-badge></span>
    <b-list-group flush> 
      <b-list-group-item variant="info" v-if="statistics.used">
        <small>You can deploy <strong>{{ remaining }}</strong> more notebooks</small>
      </b-list-group-item>
      <b-progress height="2px" :value="remainingPct" variant="info"></b-progress>
      <b-list-group-item variant="success" v-if="statistics.used == 0">
        <small>You haven't deployed any notebooks yet! Read more in <a href='https://nbunicorn.readthedocs.io' target='_blank'>our docs</a></small>
      </b-list-group-item>
      <b-list-group-item variant="light" v-if="statistics.used == null">
        <center><b-spinner label="Loading..."></b-spinner></center>
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
  module.exports = {
    props: ['statistics'],
    components: {
      
    },
    data() {
      return {
        remainingPct: 100,
        remaining: null
      }
    },
    watch: {
      'statistics.used' (){
        this.remainingPct = Math.round((this.statistics.limit - this.statistics.used) / this.statistics.limit * 100);
        this.remaining = this.statistics.limit - this.statistics.used;
      }
    }
  }
</script>



