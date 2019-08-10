<template>
  <b-card no-body header-tag="header">
    <span slot="header" class="d-flex justify-content-between align-items-center">{{ deployment.name }} <b-spinner small v-if="updating" label="Loading..."></b-spinner></span>
    <b-tabs card pills small>
      <b-tab title="Manage" active>
        <b-list-group flush>
          <b-list-group-item>
            <h6>URL</h6>
            <b-badge :href="url" variant="light">{{ url }}</b-badge>
          </b-list-group-item>
          <b-list-group-item>
            <h6>Deployment state</h6>
            <span class="capitalise">{{ deployment.status }}</span> <b-spinner small v-if="updating" label="Loading...">
          </b-list-group-item>
          <b-list-group-item>
            <h6>Health <b-badge href="#" size="sm" class="m-10" variant="light" @click='checkHealth'>Refresh</b-badge></h6>
            <div class="justify-content-between">
              <b-row>
                <b-col cols="4">
                  <pre>HTTP  <b-badge pill :variant="httpVariant">{{ health.HTTP }}</b-badge><b-spinner small v-if="!health.HTTP" label="Loading..."></b-spinner></pre>
                </b-col>
                <b-col cols="4">
                  <pre>HTTPS <b-badge pill :variant="httpsVariant">{{ health.HTTPS }}</b-badge><b-spinner small v-if="!health.HTTPS" label="Loading..."></b-spinner></pre>
                </b-col>
              </b-row>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <h6>Actions</h6>
            <b-form-group description="Download the deployed Jupyter notebook">
              <b-button size="sm" variant="dark" :href="downloadUrl">Download</b-button>
            </b-form-group>
            <b-form-group description="Upgrade (or downgrade) the deployment runtime">
              <b-button size="sm" variant="dark" disabled>Upgrade</b-button>
            </b-form-group>
            <b-form-group description="Redeploy a new notebook at the same URL">
              <b-button size="sm" variant="dark" disabled>Redeploy</b-button>
            </b-form-group>
            <b-form-group description="Completely remove this deployment">
              <b-button size="sm" variant="danger" @click="teardown">Teardown</b-button>
            </b-form-group>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="Endpoints">
        <b-list-group flush>
          <b-list-group-item>Endpoint 1</b-list-group-item>
          <b-list-group-item>Endpoint 2</b-list-group-item>
          <b-list-group-item>...</b-list-group-item>
        </b-list-group>
      </b-tab>
      <b-tab title="Integrations">
        <b-list-group flush>
          <b-list-group-item>
            <h6 class="mb-3">JavaScript with nbunicorn.js</h6>
            <b-form>
              <b-form-group label-cols="2" label-size="sm" label="URL" label-for="nbujsurl">
                <b-form-input id="nbujsurl" v-model="nbujsUrl" disabled size="sm"></b-form-input>
              </b-form-group>
              <b-form-group label-cols="2" label-size="sm" label="Script Tag" label-for="nbujsscript">
                <b-form-input id="nbujsscript" v-model="nbujsEmbed"disabled size="sm"></b-form-input>
              </b-form-group>
              <b-form-group label-cols="2" label-size="sm" label="Example" label-for="nbujssample">
                <b-form-textarea
                  disabled
                  size="sm"
                  rows="10"
                  max-rows="10"
                  v-model="examples.html"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-list-group-item>
          <b-list-group-item>
            <h6 class="mb-3">Python with requests</h6>
            <b-form>
              <b-form-group label-cols="2" label-size="sm" label="Example" label-for="nbupysample">
                <b-form-textarea
                  disabled
                  size="sm"
                  rows="10"
                  max-rows="10"
                  v-model="examples.python"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-list-group-item>
          <b-list-group-item>
            <h6 class="mb-3">Bash with curl</h6>
            <b-form>
              <b-form-group label-cols="2" label-size="sm" label="Example" label-for="nbushsample">
                <b-form-textarea
                  disabled
                  size="sm"
                  rows="10"
                  max-rows="10"
                  v-model="examples.bash"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-list-group-item>
        </b-list-group>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
  module.exports = {
    props: ['deployment', 'token'],
    data() {
      return {
        health: {
          HTTP: null,
          HTTPS: null
        },
        timer: null,
        examples: {
          html: null,
          python: null,
          bash: null
        }
      }
    },
    watch: {
      'deployment.status'() {
        if (this.deployment.status != 'available'){
          console.log("Setting quick refresh timer");

          this.timer = setInterval(() => {
            this.$root.$emit('refresh', this.deployment.name);
          }, 3000);
        } else {
          console.log("Clearing quick refresh timer");
          clearInterval(this.timer);
        }
      }
    },
    computed: {
      url() {
        return 'https://' + this.deployment.name + '.on.nbunicorn.com';
      },
      downloadUrl() {
        return this.url + '/download';
      },
      nbujsUrl() {
        return this.url + '/nbunicorn.js';
      },
      nbujsEmbed() {
        return "<script src=\"" + this.nbujsUrl + "\"><\/script>";
      },
      httpVariant() {
        return this.statusColourMapper(this.health.HTTP);
      },
      httpsVariant() {
        return this.statusColourMapper(this.health.HTTPS);
      },
      updating() {
        return this.deployment.status != 'available';
      }
    },
    methods: {
      statusColourMapper(status){
        if (status == 'OK') return 'success';
        if (status == 'NOT OK') return 'warning';
      },
      setHealth (setting) {
        this.health = setting;
      },
      setHtml (html){
        this.examples.html = html;
      },
      setPython (python){
        this.examples.python = python;
      },
      setBash (bash){
        this.examples.bash = bash;
      },
      checkHtml (){
        var url = new URL(this.url + '/sample.html');
        var requestParams = {
          method: "GET",
          mode: "cors"
        };

        // async 
        fetch(url, requestParams)
          .then(function (data) {
            return data.text();
          })
          .then((r) => {
            this.setHtml(r);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      },
      checkPython (){
        var url = new URL(this.url + '/sample.py');
        var requestParams = {
          method: "GET",
          mode: "cors"
        };

        // async 
        fetch(url, requestParams)
          .then(function (data) {
            return data.text();
          })
          .then((r) => {
            this.setPython(r);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      },
      checkBash (){
        var url = new URL(this.url + '/sample.sh');
        var requestParams = {
          method: "GET",
          mode: "cors"
        };

        // async 
        fetch(url, requestParams)
          .then(function (data) {
            return data.text();
          })
          .then((r) => {
            this.setBash(r);
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      },
      checkHealth (){

        this.health = {
          HTTP: null,
          HTTPS: null
        }

        var url = new URL("https://app.nbunicorn.com/healthcheck"),
            queryParams = {
              token: this.token, 
              existing_project: this.deployment.name
            }
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
          .then((r) => {
            if('health' in r){
              this.setHealth(r.health);
            }
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });
      },
      teardown() {

          this.$bvToast.toast(`Teardown requested...`, {
            title: this.deployment.name,
            toaster: 'b-toaster-bottom-right',
            solid: true,
            appendToast: true
          });

          var url = new URL("https://app.nbunicorn.com/teardown"),
              queryParams = {
                token: this.token, 
                existing_project: this.deployment.name
              }
          Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

          var requestParams = {
            method: "POST",
            mode: "cors"
          };

          // async 
          fetch(url, requestParams)
            .then(function (data) {

              return data.json();

            })
            .then((r) => {

              this.$root.$emit('refresh', this.deployment.name);

              this.$bvToast.toast(`Teardown in progress...`, {
                title: this.deployment.name,
                toaster: 'b-toaster-bottom-right',
                solid: true,
                appendToast: true
              });

            })
            .catch(function (error) {

              this.$bvToast.toast(`Teardown request failed... See console for details`, {
                title: this.deployment.name,
                toaster: 'b-toaster-bottom-right',
                solid: true,
                appendToast: true,
                variant: 'warning'
              });

              console.error('Request failed', error);

            });
      }
    },
    created(){
      this.checkHealth();
      this.checkHtml();
      this.checkPython();
      this.checkBash();
    },
    beforeDestroy () {
      clearInterval(this.timer);
    }
  }
</script>

<style scoped>
  .capitalise {
    text-transform: capitalize;
  }
</style>