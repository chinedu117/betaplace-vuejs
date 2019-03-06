<template>
    <div v-if="showFilters" id="filter-box" class="d-block pa-2 mx-auto">
            
            <v-select
                 v-for="(filter,filIndex) in filters"
                :key="filIndex"
                :label="filter.label"
                :items="filter.values"
                item-value="value"
                item-text="label"
                :ref = "filter.name"
                @change="addFilter"
                return-object
                v-model="selected"
                
            >
               
            </v-select>


            <v-btn flat  color="accent" @click="filterItems">OK</v-btn>
            <v-btn flat  color="accent" @click="resetFilter">RESET</v-btn>
            <v-btn flat  color="accent" @click="closeFilterBox">CLOSE</v-btn>

            
        </div>
</template>
<script>
export default {
    name:'filter-box',

    data(){
        return{
            showFilters: this.$store.state.places_list_store.filter_box.show,
           selected:[],
            filters:[
                    {
                    name: 'budget',
                    label: 'Filter by Your Budget',
                    values: [  
                                {
                                 'label': 'Less than 100,000',
                                 'name': 'budget',
                                 'value':'100000'
                                 },
                                 {
                                 'label': 'Less than 200,000',
                                 'name': 'budget',
                                 'value':'200000'
                                 },
                                 
                                 {
                                 'label': 'Less than 300,000',
                                 'name': 'budget',
                                 'value':'300000'
                                 },
                                 
                                 {
                                 'label': 'Less than 450,000',
                                 'name': 'budget',
                                 'value':'450000'
                                 },
                                 {
                                 'label': 'Less than 600,000',
                                 'name': 'budget',
                                 'value':'600000'
                                 },
                                 {
                                 'label': 'Less than 1m',
                                 'name': 'budget',
                                 'value':'1000000'
                                 },

                            ]
                },

                {
                    name: 'distance',
                    label: 'Filter by Distance',
                    values: [  
                                {
                                 'label': 'Less than 100km',
                                 'value':'100',
                                 'name': 'distance',
                                 },
                                 {
                                 'label': 'Less than 50km',
                                 'name': 'distance',
                                 'value':'50'
                                 },
                                 
                                 {
                                 'label': 'Less than 25km',
                                 'name': 'distance',
                                 'value':'25'
                                 },
                                 
                                 {
                                 'label': 'Less than 10km',
                                 'name': 'distance',
                                 'value':'10'
                                 },
                                 {
                                 'label': 'Less than 5km',
                                 'name': 'distance',
                                 'value':'5'
                                 },
                                 {
                                 'label': 'Less than 1km',
                                 'name': 'distance',
                                 'value':'1'
                                 },

                            ]
                },
                {
                    name: 'category',
                    label: 'Filter by Apartment',
                    values: [  
                                {
                                 'label': 'Self Contain',
                                 'name': 'category',
                                 'value':'1'
                                 },
                                 {
                                 'label': 'Single room',
                                 'name': 'category',
                                 'value':'2'
                                 },
                                 
                                 {
                                 'label': '3 Bedroom flat',
                                 'name': 'category',
                                 'value':'3'
                                 },
                                 
                                 {
                                 'label': '2 Bedroom flat',
                                 'name': 'category',
                                 'value':'4'
                                 },
                                 {
                                 'label': '4 Bedroom flat',
                                 'name': 'category',
                                 'value':'5'
                                 },
                                 {
                                 'label': '3 bedroom',
                                 'name': 'category',
                                 'value':'6'
                                 },

                            ]
                },
            ],
        }
    },
    methods:{
        _closeFilterBox()
        {
            this.$store.dispatch('common/updateToolBar',{show: true, component: 'PlacesListToolBarItems'})
            this.$store.commit('places_list_store/updateFilterBox',{show: false})
            this.$store.commit('places_list_store/changeMode',"all")

        },
        filterItems()
        {
            //this._closeFilterBox()
            this.$store.dispatch('places_list_store/filterList')
            
            
        },

        addFilter(payload){
           
           
            const filterName = payload.name
            const filterValue = payload.value
            
             
            if(filterName == "distance"){

                 this.$store.commit('places_list_store/addPreferredFilters',{filter_distance: filterValue })
                
            }else if(filterName == "budget"){

                 this.$store.commit('places_list_store/addPreferredFilters',{filter_budget: filterValue })
                 
            }else if(filterName == "category"){

                 this.$store.commit('places_list_store/addPreferredFilters',{filter_category: filterValue })
                 
            }else{

            }
        },
        resetFilter()
        {

            this.$store.dispatch('places_list_store/clearFilters')
            this.selected = []
            //refresh the filters
           // this._closeFilterBox()
        },

        closeFilterBox(){
            this._closeFilterBox()
        }
    }
}
</script>

