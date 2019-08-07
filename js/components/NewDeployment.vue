<template>
  <div>
    <b-card header="Get started">
      <b-card-text>
        <p>Run <kbd>pip install nbunicorn</kbd> to install the nbunicorn package.</p>
        <p>Import the package with <kbd>import nbunicorn</kbd> in the first cell of your notebook.</p>
        <p>For each function you want nbunicorn to expose, decorate the function with <kbd>@nbunicorn.expose</kbd>.</p>
        <p>Your functions should look like this:</p>
        <p><div style="padding-left: 20px;"><code><b>@nbunicorn</b>.<em>expose</em><br>def <b>your_function(</b><em>x</em><b>)</b>:<br>&nbsp;&nbsp;&nbsp;&nbsp;return <em>x</em></code></div></p>
        <p>Now, select your notebook below and hit deploy!</p>
      </b-card-text>
    </b-card>
    <b-card header="Deploy a notebook">
      <b-form action="https://app.nbunicorn.com/deploy" method="post" enctype="multipart/form-data">
        <b-form-group label="Your notebook" description="Accepts a Jupyter notebook (.ipynb)">
          <b-form-file name="notebook" v-model="notebook" required></b-form-file>
        </b-form-group>

        <b-button v-b-toggle.advanced class="m-1"  variant="dark">Options</b-button>

        <b-collapse id="advanced">
          <b-form-group label="Redeploy" description="Optionally replace an existing deployment">
            <b-form-select v-model="redeploy" :options="redeployOptions" name="existing_project"></b-form-select>
          </b-form-group>

          <b-form-group label="Runtime" description="Optionally select a previous runtime">
            <b-form-select v-model="runtime" :options="runtimeOptions" name="version"></b-form-select>
          </b-form-group>

          <b-form-group label="Required packages" description="Accepts a pip requirements.txt">
            <b-form-file v-model="requirements" name="requirements.txt"></b-form-file>
          </b-form-group>

        </b-collapse>
         
        <input type="hidden" name="token" :value="token"> 
        <b-button variant="dark" @click.prevent="deploy" type="submit">Deploy</b-button>
      
      </b-form>
    </b-card>
  </div>
</template>

<script>
  module.exports = {
    props: ['deployments', 'token'],
    data () {
      return {
        notebook: null,
        redeploy: null,
        runtime: null,
        requirements: null,
        runtimes: []
      }
    },
    computed: {
      redeployOptions () {
        var opts =  this.deployments.map(el => {
          return { value: el.name, text: el.name };
        });
        opts.unshift({ value: null, text: 'New Deployment' });
        return opts;
      },
      runtimeOptions () {

        var opts = this.runtimes.map(el => {
          return { value: el, text: el };
        });;
        opts.unshift({ value: null, text: 'Latest' });
        return opts;
      }
    },
    methods: {
      deploy(){

        this.$bvToast.toast(`Upload in progress...`, {
          title: this.notebook.name,
          toaster: 'b-toaster-bottom-right',
          solid: true,
          appendToast: true
        });

        var url = new URL("https://app.nbunicorn.com/deploy"),
            queryParams = {token: this.token}

        // if redploying exising project, add that param
        if (this.redeploy != null) {
          queryParams.existing_project = this.redeploy;
        }

        // if setting runtime version, add that param
        if (this.runtime != null) {
          queryParams.version = this.runtime;
        }

        // process params
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
        
        var formData = new FormData();

        // attach notebook
        console.log(this.notebook);
        formData.append('notebook', this.notebook);

        // attach requirements if specified
        if (this.requirements != null) {
          formData.append('requirements.txt', this.requirements);
        }

        var requestParams = {
          method: "POST",
          mode: "cors",
          body: formData
        };

        // async 
        fetch(url, requestParams)
          .then(function (data) {

            return data.json();

          })
          .then((r) => {

            this.$root.$emit('refresh', this.notebook.name);

            this.$bvToast.toast(`Deployment in progress...`, {
              title: this.notebook.name,
              toaster: 'b-toaster-bottom-right',
              solid: true,
              appendToast: true
            });

          })
          .catch((error) => {

            this.$bvToast.toast(`Deployment failed... See console for details`, {
              title: this.deployment.name,
              toaster: 'b-toaster-bottom-right',
              solid: true,
              appendToast: true,
              variant: 'warning'
            });

            console.error('Request failed', error);

          });
      },
      setRuntimes(runtimes){
        this.runtimes = runtimes;
      },
      checkRuntimes(){
        console.log('Checking runtime versions...');
        var url = new URL("https://app.nbunicorn.com/versions"),
            queryParams = {token: this.token}
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
          .then( (r) => {

            this.setRuntimes(r.versions);

          })
          .catch(function (error) {

            console.log('Request failed', error);

          });
      }
    },
    created(){
      this.checkRuntimes();
    }
  }
</script>