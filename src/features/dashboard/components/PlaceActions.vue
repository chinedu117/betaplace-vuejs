<template>
    
    <!-- <v-menu open-on-hover top offset-y>
        <v-btn color="primary" dark slot="activator"><v-icon>more_vert</v-icon></v-btn>
        <v-list>
            <v-list-tile @click="publish">
                <v-list-tile-title>Hey</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu> -->

  <div>
      <v-menu offset-y v-if="!$vuetify.breakpoint.mdAndUp">
        <template v-slot:activator="{ on }">
           <v-btn dark color="grey lighten-2" :loading="loading" icon v-on="on">
                <v-icon>more_vert</v-icon>
           </v-btn>
        </template>
        <v-list>
              <v-list-tile  @click="visitPlace(slug)">
                  <v-list-tile-action>
                      <v-icon>visibility</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>View</v-list-tile-title>
              </v-list-tile>

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

      <div  v-else class="d-flex space-between justify-left">
         
            <v-btn small  :loading="loading" @click="deletePlace"  ><v-icon color="red">delete</v-icon>Delete</v-btn>

            <v-btn small   v-if="agent_published" @click="publish"><v-icon color="red">highlight_off</v-icon>Unpublish</v-btn>

            <v-btn small v-else @click="publish" ><v-icon  color="green">check_circle_outline</v-icon> Publish</v-btn>

            <v-btn :loading="loading"small dark v-if="place_expired" @click="renew" color="green darken-2"><v-icon>access_time</v-icon>Renew</v-btn>

            <v-btn small dark @click="edit" color="green darken-2"><v-icon>edit</v-icon>EDIT</v-btn>
            
            <v-btn small  @click="visitPlace(slug)"><v-icon color="blue darken-2">visibility</v-icon>VIEW</v-btn>
      </div>
  </div>
  
</template>

<script>
import HandlesRequest from '@/mixins/RequestHandler'
import store from "@/store"
export default {
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
         required:true, 
         type: Boolean,  
      },
      'index':{
          required: true,
          // type: Number,

      }
    },
    methods: {
        publish(){
           const sm = this
           if(this.published){
            this.mixin_handleRequest(
                this.$store.dispatch("dashboard_store/unpublishPlace",{'place_slug':this.slug})
                  .then((response) => { 
                    sm.agent_published = false
                    
               }))
               
           }else{
              this.mixin_handleRequest(
                  sm.$store.dispatch("dashboard_store/publishPlace",
                       {'place_slug':sm.slug})
                     .then((response) => { 
                        sm.agent_published = true
                       
               }))
           }
        },
        deletePlace(){
              const sm = this
            if(confirm("Do you want to delete this and all its content?")){
               this.mixin_handleRequest(
                    sm.$store.dispatch("dashboard_store/deletePlace",{'place_slug': sm.slug})
                     .then((response) => { 
                    //emits delete event
                   
                   sm.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: 'Deleted',
                    color: ''
                    })
                    
                }))
                

          }
    },
    renew(){
        const sm = this
        this.mixin_handleRequest(
            sm.$store.dispatch("dashboard_store/renewPlace",{'place_slug':this.slug})
              .then((response) => { 
                     sm.place_expired = true
                  
               }))
    },

    edit(){

         this.$emit('place-edit',this.slug)
    },
   
   visitPlace(placeSlug){

        this.$router.push({name: 'PlaceView', params:{id: placeSlug}})

   }

}
}
</script>

<style>

</style>
