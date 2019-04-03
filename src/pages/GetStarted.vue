<template>
  <v-container>
  	<v-layout row wrap>
  		<v-flex md12 xs12>
  		 <header>
  			<h1 class="display-3 mb-3"> Getting Started</h1>
              <ul>
              	<li class="main_link"><a href="#introduction">Introduction</a></li>
              	    
              	<li class="main_link"><a href="#requirements">Requirements</a></li>
              	    <ul>
              	    	<li class="sub_link"><a href="#first">Set up your profile</a></li>
              	    	<li class="sub_link"><a href="#first">Get permission</a></li>
              	    	<li class="sub_link">Reach an agreement</li>
              	    	<li class="sub_link">Get the apartment information</li>
              	    </ul>
              	<li class="main_link"><a href="#apartment-category">Apartment Category</a></li>
              	<ul>
              	    	<li class="sub_link">Sub link for sub headings</li>
              	    	<li class="sub_link">Sub link for sub headings</li>
              	    	<li class="sub_link">Sub link for sub headings</li>
              	    </ul>
              	<li class="main_link">Link one</li>
              	<li class="main_link">Link one</li>
              </ul>
            </header>

             <article>


             <h2 class="display-2" id="introduction"><a href="#introduction" class="anc ">Introduction</a></h2>

			  	<p>Betaplacae.com.ng is a platform to help you to  rent out your apartment or condomium easily. This guide will help you to package the apartment or condomium  (where we  refer to as “place”), profitably. We assume that you are either the house owner (LandLord) or the agent  (individual ) or agency company  entrusted with the responsibility of marketing or finding potential  tenant.		
			  	</p>


             <h2 class="display-2" id="Requirements"><a href="#Requirements" class="anc ">Requirements</a></h2>
  		
				<p>To get started we assume that you are above 18 years old and have the necessary legal backing to upload an apartment to the public. We recommend that the following steps.</p>

               <h4 class="display-1" id="first"><a href="#first" class="anc ">Get permission </a></h4>
                
				<p>You need to get permission from the landlord or the care taker of the place you want to rent out. Though our system does not enforce this but we assume that you already have a written or spoken permission to carry on.  The permission is to allow you to take the necessary data.</p>

				<h4 class="display-1" id="first"><a href="#first" class="anc ">Agreement</a></h4>

				<p>Except you are the landlord, you may need to reach an agreement about  your commission or accruable in cash or in kind from the potential transaction. The percentage or the benefits depends on you. We want  you to succeed as well.</p>

				<h4 class="display-1" id="first"><a href="#first" class="">Data Collection</a></h4>

				<p>The data to collect is to inform the potential tenant of the nature of the place, the type of apartment, and other relevant  environment information. For example some tenants prefer a quite environment while some may prefer a moderate distraction, some may prefer that filled with gaiety. </p>

				<p>Giving accurate information about the place is highly encouraged and benefitial.  Below are some the information that would required.  You will be require to provide the following information.</p>
                
                <h4 class="display-1" id="first"><a href="#first" class="">Apartment Type</a></h4>
 				<p>See information on our categories of apartment</p>
				
				<h4 class="display-1" id="first"><a href="#first" class="">  Price  </a></h4>
				<p>Here you give the price of the apartment per year. However if the tenant is require to pay a different  amount at first and another subsequenty, you can specity that in the price description field</p>
				
				<h4 class="display-1" id="first"><a href="#first" class="">Description</a></h4>
 				<p>This requires a brief summary of the apartment and its features and other things that makes it to compete competitively.</p>


				<h4 class="display-1" id="first"><a href="#first" class="">The location information</a></h4>

				<p> The state, city, address of the place.  The “Mark this point”  button is required to be taken at most 50m from the point. This is to help to make your place discoverable on the map or by our proximity estimation filter system. If for privacy purpose you do not want to declare the exact point the you can take do that at most 50m from the point. Though we try to make sure that we get the accurate location, however we also inform you that the accuracy also depends on the GPS system of  your device.</p>

				<h4 class="display-1" id="first"><a href="#first" class="">Cover Picture</a></h4>











  			</article>



  		</v-flex>
  	</v-layout>
  </v-container>


  
</template>
<script>
export default {
    name: 'get-started',

}
</script>
<style lang="stylus" scoped>

.main_link,.sub_link
	color: red
	line-spacing: 4px
	text-decoration: none
	list-style: "#  "

.main_link:hover,.sub_link:hover
	color: grey
.sub_link
	font-size: 18px
	font-weight: 300
.sub_link a
	text-decoration: none
.main_link
	font-size: 24px
	font-weight: 700
p
	line-height: 1.9
	font-size: 18px
article, header
	padding:25px 205px 50px 120px
header
	margin-top: 20px
	margin-bottom: 15px
.anc::before
	content: "#";
	margin-left: -35px;
	margin-bottom: -55px
	position: absolute;
	font-size: 28px;
	color: #f4645f;
	opacity: .6;
	color: red
a
	text-decoration: none !important
h2 a
	color: black !important
article h2:first-of-type
	margin-top: 35px
	margin-bottom: 10px

</style>

    