<template>
  <b-card no-body header-tag="header">
    <span slot="header" class="mb-0">Deployments <b-badge v-if="statistics.used">{{ statistics.used }}</b-badge></span>
    <b-list-group flush> 
      <b-list-group-item variant="info" v-if="statistics.used">
        <small>You can deploy <strong>{{ remaining }}</strong> more notebooks</small>
      </b-list-group-item>
      <b-list-group-item variant="success" v-if="statistics.used == 0">
        <small>You haven't deployed any notebooks yet! Read how in <a href='https://nbunicorn.readthedocs.io' target='_blank'>our docs</a></small>
      </b-list-group-item>
      <b-progress height="2px" :value="remainingPct" :variant="progressVariant"></b-progress>
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
    computed: {
      progressVariant(){
        if(this.statistics.used == 0){
          return "success";
        } else if (this.remaining == 0){
          return "warning";
        } else if (this.statistics.used == null){
          return "light";
        } else {
          return "info";
        }
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



