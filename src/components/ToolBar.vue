<template>
    <v-toolbar flat fixed dark color="accent" app>
        <v-toolbar-side-icon @click.stop="toggleNav()"></v-toolbar-side-icon> 
        <v-toolbar-title>{{ $store.state.common.title }}</v-toolbar-title> 
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <component :is="component" class="d-flex justify-center mt-1">
                <slot></slot>
            </component>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import PlacesListToolBarItems from '@/features/places_list/components/ToolBarItems.vue'
export default {
    name: 'tool-bar',
    data(){
        return {
            scrollOptions: {
                 duration: 300,
                 offset: -80,
                 easing: 'easeInOutCubic',
           },
          
        }
    },
    components:{ PlacesListToolBarItems },
    
    computed:{
        component:{
            get(){
                return this.$store.state.common.toolBar.component
            },
            set(val){
                return val
            }
            

        },
    },

    mounted () {
            // Update page title.
            this.$store.watch((state) => {
              return state.common.toolBar.component
            }, (component) => {

             this.component = component
            
            }, {
            deep: true
            })//watch end
        },
    methods: {
        
        toggleNav() {
            if(this.$store.state.common.sidebar.visible){

                this.$store.dispatch('common/updateSidebar',{visible: false})
                
            }else{
                 
                 this.$store.dispatch('common/updateSidebar',{visible: true})
            }

            //console.log('Toggle')
        },
    }

}
</script>

<style>

</style>
