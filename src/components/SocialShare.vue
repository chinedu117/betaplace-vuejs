<template>
	<social-sharing 
          title="title"
          description="description"
          quote="quote"
          hashtags="hashtags"
          twitter-user="twitter-user"
          inline-template>
                  <div>
                      
                      <network network="facebook">
                        <v-chip 
                          :outline="$vuetify.breakpoint.lgAndUp"                   text-color="accent" 
                          :class="{ 'mr-2 pa-2': $vuetify.breakpoint.lgAndUp}"
                        >
                            <v-icon color="red darken-2">social_facebook</v-icon>
                        </v-chip>
                      </network>
                      <network network="googleplus">
                        <i class="fa fa-google-plus"></i> Google +
                      </network>
                      <!-- <network network="line">
                        <i class="fa fa-line"></i> Line
                      </network>
                      <network network="linkedin">
                        <i class="fa fa-linkedin"></i> LinkedIn
                      </network>
                      <network network="odnoklassniki">
                        <i class="fa fa-odnoklassniki"></i> Odnoklassniki
                      </network>
                      <network network="pinterest">
                        <i class="fa fa-pinterest"></i> Pinterest
                      </network>
                      <network network="reddit">
                        <i class="fa fa-reddit"></i> Reddit
                      </network>
                      <network network="skype">
                        <i class="fa fa-skype"></i> Skype
                      </network>
                      <network network="sms">
                        <i class="fa fa-commenting-o"></i> SMS
                      </network> -->
                      <network network="telegram">
                        <i class="fa fa-telegram"></i> Telegram
                      </network>
                      <network network="twitter">
                        <i class="fa fa-twitter"></i> Twitter
                      </network>
                      <!-- <network network="vk">
                        <i class="fa fa-vk"></i> VKontakte
                      </network>
                      <network network="weibo">
                        <i class="fa fa-weibo"></i> Weibo
                      </network>  -->
                      <network network="whatsapp">
                        <i class="fa fa-whatsapp"></i> Whatsapp
                </network>
                  </div>
                </social-sharing>
</template>

<script type="text/javascript">
	export default {

		name: 'social-sharer',
		props: {
			'title':{
 				required: true,
			},
			'description':{
 				required: false,
			},
			'quote': {
				required: false,
			},
			'hashtags': {
 				required: false,
			},
			'twitter-user': {
 				required: false,
			}
		}
	}
</script>