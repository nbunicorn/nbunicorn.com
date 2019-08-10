<template>
  <div>
    <new-deployment :deployments="deployments" v-if="user.canDeploy && user.token" :token="user.token"></new-deployment>
    <deployments :deployments="deployments" :statistics="statistics" v-if="user.token"></deployments>
    <deployment v-for="deployment in deployments" :key="deployment.name" :deployment="deployment" :token="user.token"></deployment>
  </div>
</template>

<script>
  module.exports = {
    props: ['deployments', 'user', 'statistics'],
    components: {
      NewDeployment: 'url:./NewDeployment.vue',
      Deployments: 'url:./Deployments.vue',
      Deployment: 'url:./Deployment.vue',
    }
  }
</script>
