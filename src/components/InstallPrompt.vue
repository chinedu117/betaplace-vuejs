<template>
  <div class="d-flex justify-space-between elevation-4 prompt grey--text font-weight-bold" v-if="showInstallBanner">
    
    <v-btn small dark color="red darken-2" @click.prevent="dontInstall">NO</v-btn>
    
    <div>
    	<a href="#" @click.prevent="install">Add to home screen ?</a>
    </div>
    

    <v-btn small dark color="green darken-2" @click.prevent="install">YES</v-btn>
  </div>
</template>
<script>
// src/components/InstallPrompt.vue

let installEvent;

export default {
  name: 'installPrompt',
  data() {
    return {
      showInstallBanner: false
    };
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      installEvent = e
      this.showInstallBanner = true
    });
  },
  methods: {
    install() {
      this.showInstallBanner = false
      installEvent.prompt();
      installEvent.userChoice.then(() => {
        installEvent = null;
      });
    },
    dontInstall(){
    	this.showInstallBanner = false
    }
  }
};
</script>
<style type="text/css">
	.prompt {
		position: fixed;
		left: 0px;
		bottom: 0px;
		background-color: #ffff;
		border-radius: 2px;
		color: #0000;
		width: 100%;
		padding: 10px 10px;
		height: 50px;
		text-align: center;
		font-size: 18px;
		text-decoration: none;
		z-index: 900000;


	}
</style>
