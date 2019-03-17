<template>
     <v-icon class="nearMeFilter ? 'text--red' : 'text--grey'" @click="toggleNearMe">my_location</v-icon>

     <!-- <v-switch label="Near me" v-model="nearMeFilter" ></v-switch> -->
</template>
<script>
export default {
    name: 'near-me',
    data() {
        return {
            nearMeFilter: false,
        }

    },
    watch: {
        nearMeFilter(val)
        {
            if(val){
                this.filterByDistance()
            }else{
                 
                 this.resetFilter()
            }
        }
    },
    methods: {

        filterByDistance(){
               
                // navigator.geolocation.getCurrentPosition(function(position){
                    
                // })
                let myLocation 
                
                    

                    this.$getLocation({
                        enableHighAccuracy: false,
                        timeout: Infinity,
                        maximumAge: 0
                    })
                    .then(coordinates => {
                       
                        myLocation  =  {
                                latitude: coordinates.lat,
                                longitude: coordinates.lng
                            }

                        this.$store.commit('places_list_store/updateUserCoords',myLocation)
                        
                    })  
            
                    .catch( error => {

                        this.nearMeFilter = false
                        this.$store.dispatch('common/updateSnackBar',{
                            show: true,
                            msg: error,
                            color: ''
                    })

                    })
               
        
            },

            resetFilter()
            {
                 this.$store.dispatch('places_list_store/updateFilter',{filterType: 'none', filterValue: ''})
            },


            toggleNearMe(){

                if(this.nearMeFilter){
                    
                    this.nearMeFilter = false
                }else{
                     
                     this.nearMeFilter = true
                }
            }
    

    },


}
</script>

