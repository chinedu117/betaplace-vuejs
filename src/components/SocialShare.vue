<template>
  <closable-prompt :show="show_prompt" @close-prompt="show_prompt = false">
	<social-sharing 
          :url="url"
          :title="title"
          :description="description"
          :quote="quote"
          :hashtags="hashtags"
          :twitter-user="twitter_user"
          inline-template>
                  <div>
                      
                      <network network="facebook">
                        <!-- <v-chip 
                          :outline="$vuetify.breakpoint.lgAndUp"                   text-color="accent" 
                          :class="{ 'mr-2 pa-2': $vuetify.breakpoint.lgAndUp}"
                        > -->
                        <i class="fa fa-facebook"></i> facebook
                       <!--  </v-chip> -->
                      </network>
                      <network network="googleplus">
                        <i class="fa fa-google-plus"></i> Google +
                      </network>
                      <network network="telegram">
                        <i class="fa fa-telegram"></i> Telegram
                      </network>
                      <network network="twitter">
                        <i class="fa fa-twitter"></i> Twitter
                      </network>
                      <network network="whatsapp">
                        <i class="fa fa-whatsapp"></i> Whatsapp
                </network>
                  </div>
            </social-sharing>
      </closable-prompt>
</template>
<script type="text/javascript">
import ClosablePrompt from '@/components/ClosablePrompt.vue'

	export default {
  
		name: 'social-share',
    components: { ClosablePrompt },
    data(){
      return {
         show_prompt: false
      }
    },
    mounted(){
          window.eventBus.$on('SHARER_LAUNCHED', (payload) => {
              this.show_prompt = true
            // window.eventBus.$emit("SHOW_PROMPT",payload)
        })
    },
    beforeDestroy(){
      window.eventBus.$off('SHARER_LAUNCHED')
    },
		props: {
			'title':{
 				required: true,
        type: String,
			},

			'description':{
 				required: false,
        type: String,
			},
			'quote': {
				required: false,
        type: String,
			},
			'hashtags': {
 				required: false,
        type: String,
			},
			'twitter_user': {
 				required: false,
        type: String,
			},
      'url':{
        required: false,
        type: String,
      },
		}
	}
</script>