<template>
   <v-layout row v-if="$vuetify.breakpoint.smAndDown">
        
         <v-flex  xs12>
          
          <!-- template for mobile phones -->
          <v-container grid-list-xs>
              <v-layout row wrap>
                  <v-flex xs12>
                      <!-- first page -->
                      <v-card class="pa-2" v-if="pageNum === 1">
                        <!-- <v-form> -->
                            <v-select
                                item-value="id"
                                item-text="name"
                                :items="category"
                                v-model="newPlace.place_category_id"
                                label="Select Category"
                                
                                :error-messages="errors.collect('category')"
                                v-validate="'required'"
                                data-vv-name="category"
                                outline
                            ></v-select>
                            
                            
                            <v-textarea
                                label="Description"
                                name="description"
                                v-model="newPlace.description"
                                :counter="200"
                                :error-messages="errors.collect('description')"
                                v-validate="'required|max:200'"
                                data-vv-name="description"
                                outline
                            ></v-textarea>

                            <v-text-field
                                label="Price"
                                name="price"
                                v-model="newPlace.price"
                                :error-messages="errors.collect('price')"
                                v-validate="'required|integer'"
                                data-vv-name="price"
                                outline
                            ></v-text-field>
                            <v-card-actions class="justify-end">

                               <!-- <v-btn color="success" @click.prevent="prevPage">PREVIOUS</v-btn> -->
                               <v-btn color="success" @click.prevent="nextPage">NEXT</v-btn>

                           </v-card-actions>

                        </v-card >
                        <!--First page end  -->

                        <!-- second page -->
                         <v-card v-if="pageNum === 2" class="pa-2">
                             <v-card-title primary-title>
                                 <div class="title">Location Information</div>  
                             </v-card-title>
                             <v-card-text>
                                 This step requires that you enter this information at the position.

                             </v-card-text>

                              <v-text-field
                               outline
                               name="country"
                               label="Country"
                               id="country"
                                v-model="newPlace.country"
                           ></v-text-field>

                           <v-text-field
                               name="state"
                               label="State"
                               id="state"
                               outline
                                v-model="newPlace.state"
                           ></v-text-field>

                           <v-text-field
                               name="city"
                               label="City"
                               id="city"
                                v-model="newPlace.location"
                                outline
                           ></v-text-field>

                           <v-textarea
                               name="address"
                               label="Address"
                               id="address"
                                v-model="newPlace.address"
                                @blur="showAddress = true"
                                outline
                           ></v-textarea>
                            
                            <v-card v-if="showAddress"> 
                             <v-subheader class="subheading font-weight-medium">It Will Be Shown Like this:</v-subheader>

                             <v-card-text>  
                              <span class="caption red--text">Use comma(,) to punctuate your address</span>
                                <p  class="title font-weight-medium" :innerHtml.prop="buildAddress(newPlace.address,newPlace.location,newPlace.state,newPlace.country) | insertBreaks">
                            </p>
                             </v-card-text>
                            
                            </v-card>
                            

                           <v-switch v-if="!geoLocation" label="Mark this Point" v-model="geoLocation"></v-switch>
                            <div v-if="geoLocation">
                                <v-subheader>Location of the Accomodation</v-subheader>   
                                <v-text-field
                                name="latitude"
                                label="Latitude"
                                id="latitude"
                                    v-model="newPlace.latitude"
                                    disabled
                              ></v-text-field>

                                <v-text-field
                                    name="longitude"
                                    label="Longitude"
                                    id="longitude"
                                    v-model="newPlace.longitude"
                                    disabled
                                ></v-text-field>
                           </div>

                           <v-card-actions class="justify-space-between">

                               <v-btn color="success" @click.prevent="prevPage">PREVIOUS</v-btn>

                               <!-- <v-btn color="success" @click.prevent="submitPlace">SUBMIT</v-btn> -->

                               <v-btn color="success" @click.prevent="submitPlace">NEXT</v-btn>

                           </v-card-actions>
                         </v-card>

                         <!-- second page end -->
                          
                     <v-card v-if="pageNum == 3">

                         
                             <v-card-title primary-title>
                                 <div class="title">Location Information</div>  
                             </v-card-title>
                             <v-card-text>
                                 This step requires that you enter this information at the position.

                             </v-card-text>
                            
                                
                               
                              <v-container grid-list-xs class="pb-5" >
                                <v-layout row wrap>
                                    <v-flex xs4>
                                    <v-text-field
                                        outline
                                        name="feature"
                                        label="Feature"
                                        id="feature"
                                        v-model="newFeature.feature"   
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs8>
                                    <v-text-field
                                        outline
                                        name="value"
                                        label="Specification"
                                        id="specification"
                                        append-icon="save"
                                        @click:append="addFeature"
                                        v-model="newFeature.value" 
                                    ></v-text-field>
                                </v-flex>
                                </v-layout> 
                                

                                <v-layout 
                                row 
                                wrap 
                                v-for="(feature,index) in features" 
                                :key="index"
                                :index="index"
                                fill-height
                                >
                                    <v-flex xs4 fill-height>
                                        <div  class="pa-2 grey lighten-4 font-weight-bold " style="word-wrap:break-word"> 
                                            {{ feature.feature }}
                                        </div>
                                        
                                    </v-flex>
                                    <v-flex xs6 class="justify-space-between"> 
                                        <div style="height:auto" class="d-block pa-2 grey lighten-4 ">
                                            {{ feature.value }}
                                            
                                        </div>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-icon class="pa-2 grey lighten-4" color="red" @click="removeFeature(index)">close</v-icon>
                                    </v-flex>
                                </v-layout>
                              
                          </v-container>
                           
                         <v-card-actions class="justify-space-between">
                               

                               <v-btn color="success" @click="prevPage">PREVIOUS</v-btn>

                               <v-btn align-end v-if="features.length > 0" color="success" @click.prevent="nextPage">NEXT</v-btn>

                           </v-card-actions>
                     </v-card>

                     <v-card v-if="pageNum == 4">
                        
                        <v-card 
                        flat 
                        
                        v-for="(image, index) in images"
                        :key="index"
                        color="grey lighten-2"
                         class="pa-3 ma-2"
                        >
                            <v-img 
                            :src="image.src"
                            max-width="100%" 
                               
                            >
                                <v-layout 
                                    slot="placeholder"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                    >
                                        <v-progress-circular indeterminate color="grey lighten-5">

                                        </v-progress-circular>
                                </v-layout>
                        </v-img>
                        <v-card-title class="pb-2" >
                            <div class="text-truncate subheading font-weight-bold">
                                {{ image.title }}
                            </div>
                              
                        </v-card-title >
                        <v-card-text class="pt-0">

                            <read-more 
                                more-str="Read more" 
                                :text="image.description" 
                                link="#" 
                                less-str="Read Less" 
                                :max-chars="50"
                                class="text--grey"
                                >
                            </read-more>
                           
                       </v-card-text>
                       <v-card-actions>
                           <v-btn color="success" @click="removeImage(image.id,index)">DELETE</v-btn>
                       </v-card-actions>
                   </v-card>


                         <!-- <img src="http://betaplace.test/storage/place_images/LiKt73H1M3jWgOpA4YSGv4Y8ofQHDf3go5FtxNWA.jpeg" style="max-width:400" /> -->
                        <v-card 
                          v-if="imageUrl"
                           class="pa-3"
                           
                           >
                            <img :src="imageUrl"  height="auto" style="max-width:100%"/>
                            <v-text-field
                                name="image_title"
                                label="Image Title"
                                id="title"
                                :error-messages="errors.collect('image_title')"
                                v-validate="'required'"
                                data-vv-name="image_title"
                                v-model="imageTitle"
                            ></v-text-field>
                            <v-text-field
                                name="image_description"
                                label="Image Description"
                                id="image-description"
                                :error-messages="errors.collect('image_description')"
                                v-validate="'required'"
                                data-vv-name="image_description"
                                v-model="imageDescription"
                            ></v-text-field>
                             <v-card-actions>
                                 <v-btn color="success">CANCEL</v-btn>
                                 <v-btn  color="success" @click="uploadImage"><v-icon> cloud_upload</v-icon></v-btn>
                             </v-card-actions>
                        </v-card>
                        
                        <v-btn fab dark @click='pickFile' left center fixed bottom color="primary">
                            <v-icon dark>camera</v-icon>
                        </v-btn>
                        <!-- <v-text-field label="Select Image"  v-model='imageName' prepend-icon='attach_file'></v-text-field> -->
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >

                        <v-card-actions class="justify-space-between">
                               

                               <v-btn color="success" @click.prevent="prevPage">PREVIOUS</v-btn>

                               <v-btn align-end v-if="images.length > 0" color="success" @click="publish">PUBLISH</v-btn>


                           </v-card-actions>
                     </v-card>
                  </v-flex>
                  
              </v-layout>
          </v-container>
          
           
              
          </v-flex> <!-- End template for mobile display -->
   
      </v-layout>
</template>

<script>
import Service from './Service.js'
import insertBreaksFilter from  '@/mixins/InsertBreaksFilter'
import UploadsImage from '@/mixins/UploadsImage'
import HandlesRequest from '@/mixins/RequestHandler'
export default {
    service: new Service(),
    data(){
        return {
            pageNum:1,
            creating: true,//checks if wwe are editing or creating
            geoLocation: false,
            // imageName: '',
		    // imageUrl: '',
		    // imageFile: '',
            imageDescription:'',
            imageTitle:'',
            // imageBlob:"",
            newFeature:{ feature: '',value:''},
            newPlace:{
                place_category_id:'',
                description:'',
                latitude:'',
                longitude:'',
                address:'',
                state:'',
                country: '',
                agent_id: this.$route.params.agentSlug,
                price:'',
                price_description: 'erer',
                location: 'ere',
                timezone: 'rer',
                
           },
           placeSlug:'',//after creating the place
           features:[],
           images:[],
           category:[],
           featuresEdited: false,
          showAddress:false
        }
    },
    mixins: [UploadsImage, HandlesRequest,insertBreaksFilter],
    watch:{
        geoLocation(val){
            if(val){
                this.markLocation()
            }
        }
    },

    created(){
        //  console.log(country.all())
         //fetch the category list from db
         this.mixin_handleRequest(this.$options.service.getCategoryList()
           .then( (response) => {
               this.category = response.data
           }))
         
         if(!this.$route.params.placeSlug){
            //creating mode
            this.creating = true
         }else{
             //editing mode
             this.creating = false
             this.mixin_handleRequest(this.$store.dispatch('place_view_store/retrievePlace',this.$route.params.placeSlug)
            .then((response)=>{
                //console.log(response.data)
                //delete it
                if(response.data.features !== null)
                {
                   this.features = response.data.features.features
                }

                if(response.data.images !== null)
                {
                  this.images= response.data.images.images
                }
                
                
                delete response.data['statistics']
                delete response.data['images']
                delete response.data['agent']
                delete response.data['features']
                this.newPlace = response.data
                
            })
             )//handle request

         } 
            
    },
    methods:{
       prevPage(){
           
 
           if(this.pageNum == 3)
           {

                   //features
                   if(this.featuresEdited)
                   {
                           if(this.submitFeatures()){
                             this.pageNum--
                           }
                          
                      
                   }else{
                        this.pageNum--
                   }
           }else{

              this.pageNum--
           }

           

        
       },

       nextPage(){

           this.$validator.validate().then(result => {
        			if (result) {
							//only go to the next field if all is well
                if(this.pageNum == 3){

							     if(this.submitFeatures()){
                       this.pageNum++
                   }
                }else{
                  this.pageNum++
                }
                
       				 }
      			})
   			
           
       },

       markLocation(){
            let myLocation 
        
            this.$getLocation({
                enableHighAccuracy: true,
                timeout: Infinity,
                maximumAge: 0
            })
            .then((coordinates) => {
        
                this.newPlace.latitude = coordinates.lat
                this.newPlace.longitude =  coordinates.lng
            
            })  
            .catch( error => {
                this.geoLocation = false
                this.$store.dispatch('common/updateSnackBar',{
                    show: true,
                    msg: error,
                    color: ''
            })

            })
               
       },

       addFeature(){
            
            this.featuresEdited = true
            if(this.newFeature.feature != '' && this.newFeature.value != ''){
                    //copy the new feature
                let newFeatureCopy = Object.assign({},this.newFeature)
                //add to feature list
                this.features.push(newFeatureCopy)
                //clear new feature
                this.newFeature.feature = ''
                this.newFeature.value = ''
            }
            console.log('unable to add feature');
            
       },
       removeFeature(index){
            this.featuresEdited = true
            this.features.splice(index,1)
        },

        uploadImage(){

           this.$validator.validate()
                .then(result => {
        	 		if (result) {
                    let formData = new FormData()
                    formData.append('image',this.imageBlob)
                    formData.append('title', this.imageTitle)
                    formData.append('description',this.imageDescription)
                    formData.append('place_id',this.newPlace.id)
                    formData.append('place_slug',this.newPlace.slug)
                

                 this.$options.service.saveImage(this.newPlace.slug,formData)
                            .then(response => {
                                //set the new data
                                this.images = response.data
                                //console.log(response.data);
                                
                                //this.nextPage()
                                //clear vars
                                this.imageTitle = ''
                                this.imageDescription = ''
                                this.imageBlob = ''
                                this.imageUrl = ''
                                this.imageName = ''
                                this.$store.dispatch('common/updateSnackBar',{
                                    show: true,
                                    msg: "Upload Successful !",
                                    color: ''
                                })
                            })
                            .catch(error => {
                                this.$store.dispatch('common/updateSnackBar',{
                                    show: true,
                                    msg: error.response.data,
                                    color: ''
                                })
                                
                            })
                     }
                })

        },

        removeImage(imageID,index){
            let formData = new FormData()
            formData.append('place_id',this.newPlace.id)
            formData.append('image_id',imageID)
            formData.append('place_slug',this.newPlace.slug)
            // console.log(index,this.images[index].src)
            this.mixin_handleRequest(this.$options.service.removeImage(formData)
                    .then(response => {
                        this.images.splice(index,1)
                        
                        this.$store.dispatch('common/updateSnackBar',{
                        show: true,
                        msg: 'Image Removed Successfully',
                        color: ''
                        })
                 
             }))

            //if all the images are removed, unpublish the place
            if(this.images.length < 1){

                this.unpublish()
            }
            

        },
       submitFeatures(){
              if(this.featuresEdited){

                  if(this.features.length < 1)
                  {
                     //features cannot be empty
                     this.$store.dispatch('common/updateSnackBar',{
                          show: true,
                          msg: 'features cannot be empty',
                          color: ''
                          })

                     return false
                  }

                this.mixin_handleRequest(this.$options.service.saveFeatures({
                                    features:this.features,
                                    place_id:this.newPlace.id,
                                    place_slug:this.newPlace.slug
                                    })
                            .then(response => {
                                //set the new data
                                this.features = response.data.features
                                this.featuresEdited = false
                                // this.nextPage()
                                // console.log(response.data.id)
                            }))//end handlereq

              }
              return true
            
              
       },
       submitPlace(){
        const editingMode = this.newPlace.slug ? true : false
        this.$validator.validate().then(result => {
        	if (result) {
                            //only go to the next field if all is well
                this.mixin_handleRequest(this.$options.service.savePlace(this.newPlace,editingMode)
                            .then(response => {
                                //set the new data
                                this.newPlace = Object.assign(this.newPlace,response.data)
                                this.nextPage()
                                //console.log(response.data.id)
                            }))
       				 }
                  })
    
       },

       publish(){
              //expilicity publish a place
              this.$store.dispatch("dashboard_store/publishPlace",{place_slug:this.newPlace.slug})
              this.$store.dispatch('common/updateSnackBar',{
                        show: true,
                        msg: 'Your Acomodation has been published',
                        color: ''
                        })
              //go back to list


       },

       unpublish(){
          //expilicity unpublish a place
          this.$store.dispatch("dashboard_store/unpublishPlace",{ place_slug:this.newPlace.slug})
       }
  

    }//end method

    
}
</script>

<style>

</style>
