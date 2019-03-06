<template>
  <div class="image-section">
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
                                 <v-btn color="success" @click="uploadImage">UPLOAD</v-btn>
                             </v-card-actions>
                       
                        
                        <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >
    </div>
</template>

<script>
export default {
  
  data(){
      return {

      }
  },
 
 methods:{

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
                

                 this.$options.service.saveImage(formData)
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
                                    msg: error.data,
                                    color: ''
                                })
                                
                            })
                     }
                })

        },
        removeImage(imageID){
            let formData = new FormData()
            formData.append('place_id',this.newPlace.id)
            formData.append('image_id',imageID)
            formData.append('place_slug',this.newPlace.slug)

            this.$options.service.removeImage(formData)
             .then(response => {
                 this.images = response.data

                 this.$store.dispatch('common/updateSnackBar',{
                 show: true,
                 msg: 'Image Removed Successfully',
                 color: ''
                 })
                 
             })

        },
          pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...

                    //console.log(files[0]);
                    

                    let image = new Image()
                    let newSize 
                    
                    image.onload = () =>{
                        console.log('width___'+image.naturalWidth)
                        console.log('height___'+image.naturalHeight)
                        newSize = this.calculateAspectRatioFit(image.naturalWidth,
                                                image.naturalHeight,
                                                 800,
                                                  600)
                        console.log(newSize)
                       // console.log(this.imageFile)
                        // console.log(image)
                        this.imageFile = this.imageToDataUri(image,newSize.width,newSize.height,newSize.quality)
                        this.imageUrl = this.imageToDataUri(image,newSize.width,newSize.height,newSize.quality)
                        // console.log(this.imageUrl)
                        this.imageBlob =  this.convertImageToBlob(this.imageUrl,'image/jpeg')
                        console.log(this.imageBlob);
                       
                    }

                    

                    image.src = fr.result
                      
                   
                    
                    console.log(fr.width)
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        
     
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

        var maxWidth = maxWidth // Max width for the image
        var maxHeight = maxHeight   // Max height for the image
        var ratio = 0  // Used for aspect ratio
        var width = srcWidth    // Current image width
        var height = srcHeight // Current image height
        var quality = 0.5
        var imgRatio = srcWidth/srcHeight
        var maxRatio =  maxWidth/maxHeight
        // Check if the current width is larger than the max
        if(srcHeight > maxHeight || srcWidth > maxWidth){
            if(imgRatio < maxRatio){
                    //adjust width
                    imgRatio = maxHeight /height

                    height = maxHeight    // Reset height to match scaled image
                    width = imgRatio * width   // Reset width to match scaled image

                }else if(imgRatio  > maxRatio){
                    //adjust height
                    imgRatio  = maxWidth / srcWidth // get ratio for scaling image
                   
                    width = maxWidth    // Reset width to match scaled image
                    height = imgRatio * height    // Reset height to match scaled image
                }else{
                    
                    width = maxWidth
                    height = maxHeight
                    quality = 1
                }
        }
                

           return { 'width': width, 'height': height, 'quality': quality }
    },

    imageToDataUri(img, width, height,quality) {

        // create an off-screen canvas
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        // set its dimension to target size
        canvas.width = width;
        canvas.height = height;

        // draw source image into the off-screen canvas:
        ctx.drawImage(img, 0, 0, width, height);

        // encode image to data-uri with base64 version of compressed image
        //  return canvas.toDataURL();
         return canvas.toDataURL('image/jpeg', quality);  // quality = [0.0, 1.0]

},

    convertImageToBlob(imageBase64,mimeType){
       let base64ImageContent  =  imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/ ,"")
       let mime = mimeType || ''
       let sliceSize = 1024
      // console.log(base64ImageContent)
       let byteChars = window.atob(base64ImageContent)
       let byteArrays  = []

       for( var offset = 0, len = byteChars.length; offset < len; offset += sliceSize){
            var slice = byteChars.slice(offset, offset + sliceSize)

            var byteNumbers = new Array(slice.length)
            for( var i = 0; i < slice.length; i++){
                byteNumbers[i] = slice.charCodeAt(i)
            }
            var byteArray = new Uint8Array(byteNumbers)
            
            byteArrays.push(byteArray)
       }
           
           
            return new Blob(byteArrays, {type: mime})
         
    },
}

}
</script>

<style>

</style>
