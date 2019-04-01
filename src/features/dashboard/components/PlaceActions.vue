<template>
    
    <!-- <v-menu open-on-hover top offset-y>
        <v-btn color="primary" dark slot="activator"><v-icon>more_vert</v-icon></v-btn>
        <v-list>
            <v-list-tile @click="publish">
                <v-list-tile-title>Hey</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu> -->

 
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
         <v-btn dark color="grey lighten-2" :loading="loading" icon v-on="on">
              <v-icon>more_vert</v-icon>
         </v-btn>
      </template>
      <v-list>
          
            <v-list-tile  @click="deletePlace">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
            <v-list-tile  @click="publish">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-if="agent_published"> UnPublish</v-list-tile-title>
                <v-list-tile-title v-else> Publish</v-list-tile-title>
            </v-list-tile>
            <v-list-tile  v-if="place_expired" @click="renew">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title > Renew </v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
  

    <!-- <v-menu open-on-hover left>
        
           <v-btn dark color="grey lighten-2" :loading="loading" icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
       

        <v-list>
          
            <v-list-tile  @click="deletePlace">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
            <v-list-tile  @click="publish">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-if="agent_published"> UnPublish</v-list-tile-title>
                <v-list-tile-title v-else> Publish</v-list-tile-title>
            </v-list-tile>
            <v-list-tile  v-if="place_expired" @click="renew">
                <v-list-tile-action>
                    <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title > Renew </v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu> -->
</template>

<script>
import HandlesRequest from '@/mixins/RequestHandler'
import Service from './../Service.js'
export default {
    service: new Service(),
    name: 'place-actions',
    data(){
        return {
            agent_published: this.published,
            place_expired: this.expired
            // slug:3,
        }
    },
    mixins: [ HandlesRequest ],
    props:{
        'expired': {
            required: true,
          
        },
      'slug': {
        required:true   
      },
      'published':{
         required:true   
      },
      'index':{
          required: true,
          // type: Number,

      }
    },
    methods: {
        publish(){
           if(this.published){
               this.mixin_handleRequest(this.$options.service.publishPlaceToggle({'place_slug':this.slug}).then((response) => { 
                    this.agent_published = false
                    this.$emit('place-unpublished',this.index)
               }))
               
           }else{
              this.mixin_handleRequest(this.$options.service.publishPlaceToggle({'place_slug':this.slug}).then((response) => { 
                    this.agent_published = true
                    this.$emit('place-published',this.index)
               }))
           }
        },
        deletePlace(){

            if(confirm("Do you want to delete this and all its content?")){
               this.mixin_handleRequest(this.$options.service.deletePlace({'place_slug':this.slug})
                .then(response => {
                    //emits delete event
                    this.$emit('delete-place',this.index)
                    // this.placeList.splice(this.index,1)
                    this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'Deleted',
                    color: ''
                    })
                    
                }))
                

          }
    },
    renew(){
        this.mixin_handleRequest(this.$options.service.renewPlace({'place_slug':this.slug}).then((response) => { 
                    this.place_expired = true
                    this.$emit('place-renewed',this.index)
               }))
    }

}
}
</script>

<style>

</style>
