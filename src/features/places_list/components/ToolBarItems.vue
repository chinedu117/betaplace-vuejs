<template>
   <div>
    <near-me></near-me>
    <v-icon class="pr-2" @click="displaySearchBox">search</v-icon>
    <v-icon class="pr-2" @click="displayFilterBox">filter_list</v-icon>
   </div>
</template>

<script>
import NearMe from './NearMe.vue'
export default {
    name: 'tool-bar-items',
    components:{NearMe},
    methods:{
        displaySearchBox()
        {  
            //  console.log(this.$vuetify.goTo)
            //hide toolBar
            //show searchBox
            //scrol up
            this.$store.commit('common/updateToolBar',{show: false})
            this.$store.commit('places_list_store/updateSearchBox',{show: true})
            this.$vuetify.goTo(0,this.scrollOptions)
        },

        displayFilterBox(){
             
            //  this.showFilters = true
            //  this.$vuetify.goTo(0,this.scrollOptions)
            this.$store.commit('common/updateToolBar',{show: false})
            this.$store.commit('places_list_store/updateFilterBox',{show: true})
            this.$vuetify.goTo(0,this.scrollOptions)
        },
    }
}
</script>

<style>

</style>
