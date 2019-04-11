<template>
      <v-layout row>
         <v-flex  xs12>

            <div class="pricing-grid"
               
            >

                <ul>
                    <li v-for="(subscription,index) in plans"
                        @click="nextPlan(subscription.package_name)"
                        v-resize="onResize"
                        >
                       
                         {{subscription.package_name}}
                      
                    </li>
                    
                </ul>

                <div class="pricing-grid-header"> 
                    <div class="pricing-grid-cell"
                     v-for="(subscription,index) in plans"
                    >
                    {{subscription.package_name}}
                   </div>
 
                </div>

                
                    <!-- display the slots available -->
                <div class="pricing-grid-row" @click="showDetail" v-resize="onResize" >
                    <div class="pricing-grid-cell pricing-grid-cell--title"> Slots</div>

                    <div class="pricing-grid-cell"
                       v-for="(subscription,index) in plans"
                       :data-plan="subscription.package_name"
                    > {{subscription.quantity_slot}}</div>
                    
                </div>

                <div class="pricing-grid-detail" style="display: none">
                    SLOTS: The number of places or accomodations you can upload.
                </div>
                       <!-- slots end -->


                   <!-- display the Duration -->
                <div class="pricing-grid-row" @click="showDetail" >
                    <div class="pricing-grid-cell pricing-grid-cell--title">Duration</div>

                    <div class="pricing-grid-cell"
                       v-for="(subscription,index) in plans"
                        :data-plan="subscription.package_name"
                    > {{subscription.duration_days}}</div>
                    
                </div>

                <div class="pricing-grid-detail" style="display: none">
                   DURATION: The number of days, counting from the day of purchase, before your subscription expires.
                </div>
                       <!-- duration end -->

                <div class="pricing-grid-row" >

                    <div class="pricing-grid-cell pricing-grid-cell--price"
                      v-for="(subscription,index) in plans" 
                       :data-plan="subscription.package_name"
                    ><h4>N {{subscription.price}}</h4>
                        <v-btn success class="mt-2" color="primary" @click="viewPlan(subscription.id)" >BUY</v-btn>
                    </div>
                    
                </div>


            </div>





                <div  class="pricing-wrapper clearfix">
                  <div class="d-flex justify-space-between">
                    <v-subheader>Plans <v-chip >{{plans.length}}</v-chip></v-subheader>
                </div>
                  <div 
                    v-for="(subscription,index) in plans"
                   
                    >
                    <div 
                    :index="index"
                    :key="subscription.id"
                    
                    >
                 
                  <div class="pricing-table">
                       <h3 class="pricing-title">{{subscription.package_name}}</h3>
                       <div class="price">N {{subscription.price}}</div>
                       <!-- Lista de Caracteristicas / Propiedades -->
                <ul class="table-list">
                    <li>{{subscription.quantity_slot}}  <span>Slots</span></li>
                    <li>{{subscription.duration_days}} days <span>Duration</span></li>
                
                </ul>
                <!-- Contratar / Comprar -->
                <div class="table-buy">
                  <p>N {{subscription.price}}</p>

                   <a href="#" class="pricing-action"  @click="viewPlan(subscription.id)">ORDER</a>
                  </div>
              </div>

                 <!-- <v-card  style="border-left: red solid thick" class="pa-2 mb-1">
                     <div class="subheading font-weight-bold py-2"> 
                                    {{subscription.package_name}}
                      </div>
                      <v-layout row wrap justify-end>
                          <v-flex xs6>
                              <div>
                                  <span>Duration: {{subscription.duration_days}}  days</span><br>
                                  <span>Slots: {{subscription.quantity_slot}}</span><br>
                                  <span class="red--text">Price : N {{subscription.price}}</span>
                              </div>
                          </v-flex>
                          <v-flex xs6 align-end>
                              <v-btn color="success" outline @click="viewPlan(subscription.id)">ORDER</v-btn>
                          </v-flex>
                      </v-layout>
                  </v-card> -->
                  
                  </div>
                </div>
                </div>
              
          </v-flex> <!-- End template for mobile display -->
         
      </v-layout>
</template>

<script>
import store from './store' 
import HandlesRequest from "@/mixins/RequestHandler"
export default { 
    data(){
        return {
            subscriptionList: [],

        }
    },
    computed:{
        plans(){
            // return this.subscriptionList
       
            return this.subscriptionList
        }
    },
    mixins: [ HandlesRequest ],
    created(){
         
        this.loadPlans()

        // this.$nextTick(() =>this.onResize())
    },
    mounted(){
        //  // console.log(this.$el.querySelector('.pricing-grid > ul > li:first-child'))
        
        //  // this.$el.querySelector('.pricing-grid').click()
         
           
        // // this.onResize()
        // const sm = this
        
        //  this.$nextTick(() =>{

        //     var t = setTimeout(() =>{
        //                 console.log(document.querySelector('.pricing-grid > ul > li'))  
        //                  document.querySelector('.pricing-grid > ul > li:first-child').click()
           
        //                },250)

        //  })
        // //  const sm = this
        // // window.addEventListener('load', (event) => {
        // //     sm.onResize()
        // // })
        //  // this.$nextTick(() =>this.onResize())
    },
    methods:{
        onResize(){
             
                  document.querySelectorAll('.pricing-grid-cell--mobile').forEach((element)=>{
                       element.classList.remove("pricing-grid-cell--mobile")
                  })

                 if(Number(window.innerWidth) < Number("959")){
                    
                     document.querySelectorAll('.pricing-grid-row > .pricing-grid-cell:nth-child(2)').forEach((element)=>{
                       
                         // console.log(element.classList.contains('pricing-grid-cell--price'))
                         if(element.classList.contains('pricing-grid-cell--price')){

                           element.previousElementSibling.classList.add("pricing-grid-cell--mobile")
                         }else{
                            element.classList.add("pricing-grid-cell--mobile")
                         }

                         
                     document.querySelector('.pricing-grid > ul > li:last-child').click()          
                       
                  })

                 }
        },
        nextPlan(plan){
               if(document.querySelector('.pricing-grid ul li.active') !== null){
                 document.querySelector('.pricing-grid ul li.active').classList.remove("active")

               }
               document.querySelectorAll('.pricing-grid-cell--mobile').forEach((element)=>{
                   element.classList.remove("pricing-grid-cell--mobile")
              })
              
              event.target.classList.add('active')
              let elements = document.querySelectorAll('[data-plan="'+plan+'"]').forEach((element)=>{
                   element.classList.add("pricing-grid-cell--mobile")
              })
              
           

        },
        showDetail(event){
            let detailsBox = event.target.parentNode.nextElementSibling
            var currentDisplay = detailsBox.style.display
  
            if(currentDisplay == "none"){
                 
                 detailsBox.classList.add("animated", "slideInDown", "faster")
                
                 detailsBox.style.display = "block"
             
                
            }else{
                 detailsBox.style.display = "none"
                 detailsBox.classList.remove("slideInDown")
                 detailsBox.classList.add( "fadeOutUp")
                 
            }
        },
        loadPlans(){
            //load packages
             const sm = this

             this.mixin_handleRequest(sm.$store.dispatch("dashboard_store/retrievePlans")
                                    .then((response) => {
                                       sm.subscriptionList = sm.$store.getters["dashboard_store/planList"]
                                   }))
               

        },

        viewPlan(planID){
         
            this.$router.push({name: 'PackageView', params:{planID}})

        }
    }
}
</script>

<style scoped>
 * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.pricing-grid {
    padding: 10px;
    width: 100%;
}

.pricing-grid ul {
    display: none;
}


.pricing-grid:after {
    content: "";
    clear: both;
}

.pricing-grid-row, .pricing-grid-header {
    display: grid;
    grid-template-columns: 25% repeat(5, 15%);

}

.pricing-grid-header .pricing-grid-cell:first-child, .pricing-grid-cell--price:first-child{

    grid-column-start: 2
}
.pricing-grid-cell {
    border: 1px solid #dddd;
    margin: -1px -1px 0 0 ;
    text-align: center;
    padding: 10px;
    
}

.pricing-grid-cell--price {
     padding: 25px;

}
 .pricing-grid-row:nth-child(2n) > .pricing-grid-cell, .pricing-grid-detail:nth-child(2n){
        background-color: #dddd;

    }

.pricing-grid-detail {
    border: 1px solid #dddd;
    border-top: 0px;
    margin: -1px -1px 0 0;
    text-align: center;
    padding: 10px;
}

 @media only screen and (max-width: 959px) {
    .pricing-grid-row {
        display: grid;
        grid-template-columns: 50% 50%;

     }
     .pricing-grid-cell--price.pricing-grid-cell--mobile{

         grid-column-start: span 2;
     }

     .pricing-grid-cell--price:nth-child(n+1){

        display: none;
      } 

      

    .pricing-grid-cell.pricing-grid-cell--title {
        border-bottom-color: transparent;
        margin: -1px -1px 0 0;
        text-align: center;
        padding: 10px;
        -webkit-transition: border 1s;
         transition: border 1s;
        display: block !important;
     }

     .pricing-grid-cell.pricing-grid-cell--mobile{
        border: 1px solid #dddd;
        border-left: 0.5px solid #dddd !important;
        margin: -1px -1px 0 0 ;
        text-align: center;
        padding: 10px;
        
     }

    .pricing-grid ul {
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        list-style: none;
        width: 100%;
    }

    .pricing-grid ul li {
        float: left;
        list-style: none;
        padding: 5px;

    }

    .pricing-grid ul li:hover {
        border-bottom: 5px solid #ddd;

    }
 
    .pricing-grid ul li.active {
        border-bottom: 5px solid red;

    }

    .pricing-grid-header{
        display: none;
    }
    .pricing-grid-cell:nth-child(n+1) {
        display:none;
    }
    .pricing-grid-cell--mobile {
         display:block !important;
      }

 }


body {
    background: #2e2a2a;
    color: #FFF;
    font-size: 62.5%;
    font-family: 'Roboto', Arial, Helvetica, Sans-serif, Verdana;
}

ul {
    list-style-type: none;
}

a {
    color: #e95846;
    text-decoration: none;
}

.pricing-table-title {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 2.6em;
    color: #FFF;
    margin-top: 15px;
    text-align: left;
    margin-bottom: 25px;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.pricing-table-title a {
    font-size: 0.6em;
}

.clearfix:after {
    content: '';
    display: block;
    height: 0;
    width: 0;
    clear: both;
}
/** ========================
 * Contenedor
 ============================*/
.pricing-wrapper {
    width: 960px;
    margin: 40px auto 0;
}

.pricing-table {
    margin: 0 10px;
    margin-bottom: 10px;
    text-align: center;
    width: 300px;
    float: left;
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.4);
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
}

.pricing-table:hover {
    -webkit-transform: scale(1.06);
    -ms-transform: scale(1.06);
    -o-transform: scale(1.06);
    transform: scale(1.06);
}

.pricing-title {
    color: #FFF;
    background: #e95846;
    padding: 20px 0;
    font-size: 2em;
    text-transform: uppercase;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.pricing-table.recommended .pricing-title {
    background: #2db3cb;
}

.pricing-table.recommended .pricing-action {
    background: #2db3cb;
}

.pricing-table .price {
    background: #403e3d;
    font-size: 3.4em;
    font-weight: 700;
    padding: 20px 0;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    color:#fcf7f7e6;
}

.pricing-table .price sup {
    font-size: 0.4em;
    position: relative;
    left: 5px;
}

.table-list {
    background: #FFF;
    color: #403d3a;
}

.table-list li {
    font-size: 1.4em;
    font-weight: 700;
    padding: 12px 8px;
}

.table-list li:before {
    content: "\e5ca";
    font-family: 'Material Icons';
    color: #3fab91;
    display: inline-block;
    position: relative;
    right: 5px;
    font-size: 16px;
} 

.table-list li span {
    font-weight: 400;
}

.table-list li span.unlimited {
    color: #FFF;
    background: #e95846;
    font-size: 0.9em;
    padding: 5px 7px;
    display: inline-block;
    -webkit-border-radius: 38px;
    -moz-border-radius: 38px;
    border-radius: 38px;
}


.table-list li:nth-child(2n) {
    background: #F0F0F0;
}

.table-buy {
    background: #FFF;
    padding: 15px;
    text-align: left;
    overflow: hidden;
}

.table-buy p {
    float: left;
    color: #37353a;
    font-weight: 700;
    font-size: 2.4em;
}

.table-buy p sup {
    font-size: 0.5em;
    position: relative;
    left: 5px;
}

.table-buy .pricing-action {
    float: right;
    color: #FFF;
    background: #e95846;
    padding: 10px 16px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-weight: 700;
    font-size: 1.4em;
    text-shadow: 0 1px 1px rgba(0,0,0,0.4);
    -webkit-transition: all 0.25s ease;
    -o-transition: all 0.25s ease;
    transition: all 0.25s ease;
}

.table-buy .pricing-action:hover {
    background: #cf4f3e;
}

.recommended .table-buy .pricing-action:hover {
    background: #228799;    
}

/** ================
 * Responsive
 ===================*/
 @media only screen and (min-width: 768px) and (max-width: 959px) {
    .pricing-wrapper {
        width: 768px;
    }

    .pricing-table {
        width: 236px;
    }
    
    .table-list li {
        font-size: 1.3em;
    }

 }

 @media only screen and (max-width: 767px) {
    .pricing-wrapper {
        width: 420px;
    }

    .pricing-table {
        display: block;
        float: none;
        margin: 0 0 20px 0;
        width: 100%;
    }
 }

@media only screen and (max-width: 479px) {
    .pricing-wrapper {
        width: 300px;
    }
} 
</style>
