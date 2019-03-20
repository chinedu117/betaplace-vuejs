var InsertBreaks = {
	
	methods:{
			buildAddress(){
                 
                 let address = ''

                 for (var i = 0; i <= arguments.length - 1; i++) {
                 	let temp = '' //clear temp
                 	  if(i === 0){
                 	 	
                 	 	if(!arguments[i].match(/(,)$/)){
                 	 		temp = arguments[i].concat(",")
                 		}else{
                 			temp = arguments[i]
                 		}
                         
                         
                       }else{

                        	if(i !== arguments.length - 1){
                        	
                        	temp = temp.concat(arguments[i]).concat(",")
                            }
                        } 


                        if(i === arguments.length - 1){
                        	
                        	temp = temp.concat(arguments[i])
                        }

                 	  address = address.concat(temp)
                 	 
                 }

               

				 return address
			}
	},
	filters:{
	    insertBreaks(string){

     		return string.replace(/(,|\t)/g,",<br>")
     	}
	}
}

export default InsertBreaks