<template>
    <div>
            <v-chip 
                :outline="$vuetify.breakpoint.lgAndUp" 
                text-color="accent"
                :class="{ 'mr-2 pa-2': $vuetify.breakpoint.lgAndUp}"
                @click="like()"
                >
                <v-avatar>
                    <v-icon>thumb_up</v-icon>
                </v-avatar>
                {{ tempLikes | abbrNum(1) }}
            </v-chip>
            <v-chip 
            :outline="$vuetify.breakpoint.lgAndUp"
                text-color="accent" 
            :class="{ 'mr-2 pa-2': $vuetify.breakpoint.lgAndUp}"
            @click="shareLink(1)"
                >
                <v-icon color="accent">share</v-icon>
            </v-chip>

            <v-chip 
                :outline="$vuetify.breakpoint.lgAndUp" 
                text-color="accent" 
            :class="{ 'mr-2 pa-2': $vuetify.breakpoint.lgAndUp}"
            @click="gotoAgentInfo(agentID)"
                >
                <v-icon color="green darken-2" >person</v-icon>
            </v-chip>

            <v-chip 
            :outline="$vuetify.breakpoint.lgAndUp"
            
            text-color="accent" 
            :class="{ 'mr-2 pa-2': $vuetify.breakpoint.lgAndUp}"
            @click.prevent="seeMap(latitude,longitude)"
            >
                <v-icon color="red darken-2" >place</v-icon>
            </v-chip> 
                
 </div>
</template>
<script>

import Service from './../Service.js'

export default {
    service: new Service(),
    name: 'action-btn',
    data() {
        return {
            userHasLiked: false,
            tempLikes: Number(this.likes),
            userHasSeen: false,
            userHasShared: false,
        }
    },

    mounted(){
        this.seen() 
    },

    props:{

        stat_id:{
            required: true,
        },
        likes:{
            //type: Number,
            required: true,
        },

        latitude:{
            //type: Number,
            required:true,
           
        },

        longitude: {
           // type: Number,
            required: true,
           
        },

        agentID:{
            required: true,
            
        }
    },

    computed:{

    },

    methods:{

        seeMap(lat,long){
           const googleMapUrl = 'https://www.google.com/maps/search/?api=1&query='+lat+','+long 
        //    location.href = googleMapUrl
            this.$options.service.statRequest(this.stat_id,'map')
            window.open(googleMapUrl,'_blank')
        },

        gotoAgentInfo(agentID)
        {  
            this.$router.push({ name: 'Agent', params:{ id: agentID}})
        },

        shareLink(link)
        {
                const url = encodeURI(location.href)
                this.share()
                // if mobile device is in use defined in main.js
                if(window.mobileAndTabletCheck){
                    location.href = 'whatsapp://send?text='+url
                }
                
                
            // if(navigator.share){

            //     navigator.share({
            //         title: 'Free Accomodation',
            //         text: 'Check this out',
            //         url: location.pathname
            //     })
            //     .then(() => console.log('share success'))
            //     .catch((error) => console.log('Not successful'))
            // }else{
                
            //     const url = encodeURI(location.href)

            //     // ifa mobile device is in use
            //     if(window.mobileAndTabletCheck){
            //         location.href = 'whatsapp://send?text='+url
            //     }
                
            //     // console.log('Not successful')
            // }
        },

        like(){
            
            
            if(!this.userHasLiked)
            {
              
               // this.$store.dispatch('place-view/like')
               this.$options.service.statRequest(this.stat_id,'like')

               this.userHasLiked = true
            }
            this.tempLikes++
        },
        share(){  
               // this.$store.dispatch('place-view/like')
                if(!this.userHasShared){
                 this.$options.service.statRequest(this.stat_id,'share')

                }

        },

        seen(){
            if(!this.userHasSeen)
             {
                this.$options.service.statRequest(this.stat_id,'seen')
                    
                   this.userHasSeen = true
             }
        }


        // convert(n,d)
        // {x=(''+n).length,p=Math.pow,d=p(10,d)
        //  x-=x%3
        // return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]
        // },

     
    },

 filters: {
          abbrNum(number, decPlaces) {

               if(!number) return ''

               if(isNaN(decPlaces)){

                   decPlaces = 1
               }
                // 2 decimal places => 100, 3 => 1000, etc
                decPlaces = Math.pow(10,decPlaces) 
                // console.log(decPlaces)
                // Enumerate number abbreviations
                var abbrev = [ "K", "M", "B", "T" ] 

                // Go through the array backwards, so we do the largest first
                for (var i=abbrev.length-1; i>=0; i--) {

                    // Convert array index to "1000", "1000000", etc
                    var size = Math.pow(10,(i+1)*3) 

                    // If the number is bigger or equal do the abbreviation
                    if(size <= number) {
                        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                        // This gives us nice rounding to a particular decimal place.
                        number = Math.round(number*decPlaces/size)/decPlaces 

                        // Handle special case where we round up to the next abbreviation
                        if((number == 1000) && (i < abbrev.length - 1)) {
                            number = 1 
                            i++ 
                        }

                        // Add the letter for the abbreviation
                        number += abbrev[i] 

                        // We are done... stop
                        break 
                    }
                }

                return number 
    },
 }
}
</script>

