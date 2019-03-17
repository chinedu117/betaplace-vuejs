<template>
<v-text-field 
        :focus="showSearch"
        v-model="searchText"
        autofocus
        placeholder='Search Place eg. Wuse, Abuja'
        
        box
        id="search-box"
        class="pa-2 elevation-2"
        
        append-icon="mdi-close"
        prepend-icon="mdi-arrow-left"
        @click:prepend="clearSearch"
        @click:append="clearSearch"
        >
</v-text-field> 

</template>
<script>
//import store from './../store.js'
export default {
    name:'search',
    data(){
        return {
            searchText: '',
            showSearch: true//this.$store.state.places_list_store.search.show,
    
        }
    },
    
    watch:{
        searchText(val)
        {
            this.search(val)
        }
    },
    methods: {

        search(val){
           
            this.$store.dispatch('places_list_store/search',val.toLowerCase())
        },
        clearSearch()
        {   
            this.$store.dispatch('places_list_store/clearSearch')
            this.$store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
        }
    }
    
}
</script>
<style>
   
</style>
