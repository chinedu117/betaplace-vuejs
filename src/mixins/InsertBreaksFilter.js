var InsertBreaks = {
	
	methods:{
			buildAddress(){
                 
                 let address = ''

                 for (var i = 0; i <= arguments.length - 1; i++) {
                 	let temp = '' //clear temp
                 	 //  if(i === 0){
                 	 	
                 	 // 	if(!arguments[i].match(/(,)$/)){
                 	 // 		temp = arguments[i].trim().concat(",")
                 		// }else{
                 		// 	temp = arguments[i].trim()
                 		// }
                         
                         
                   //     }else{

                          if(i !== arguments.length - 1){
                        	    if(!arguments[i].match(/(,)$/)){
                        	        temp = temp.concat(arguments[i]).trim().concat(",")
                                 }else{
                                    temp = arguments[i].trim()
                                 }
                             } 
                        //} 


                        if(i === arguments.length - 1){
                        	
                        	temp = temp.concat(arguments[i]).trim()
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