webpackJsonp([0],{LKHz:function(t,e){},lm3I:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{}},computed:{card_style:function(){return this.$vuetify.breakpoint.smAndDown?{class:"mx-auto pa-2 my-2"}:{width:"500",class:"mx-auto pa-2 my-2"}}},mixins:[i("Vp1X").a],methods:{resendVerificationEmail:function(){var t=this;this.mixin_handleRequest(this.$store.dispatch("auth/resendVerificationMail").then(function(e){t.$store.dispatch("common/updateSnackBar",{show:!0,msg:"Another Verification Email has been Sent",color:""})}))}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"page-wrapper",attrs:{"grid-list-md":"","text-xs-center":""}},[i("v-layout",[i("v-card",t._b({},"v-card",t.card_style,!1),[i("v-card-text",[i("v-flex",{attrs:{xs12:""}},[i("div",{staticClass:"d-block mx-auto"},[i("v-icon",{staticClass:"d-block mx-auto text-xs-center",attrs:{size:"72"}},[t._v("mail")])],1)]),t._v(" "),i("p",{staticClass:"font-size-14"},[t._v("\n                    A Verification email has been sent to your mail.\n                    Check your email and click the link provided. \n\n                    But if you did not see the mail, kindly click the button below to resend another one to your mail\n                ")])],1),t._v(" "),i("v-btn",{staticClass:"d-block mx-auto",attrs:{loading:t.loading,disabled:t.loading},on:{click:t.resendVerificationEmail}},[t._v("Resend Verification Email")])],1)],1)],1)},staticRenderFns:[]};var s=i("VU/8")(a,n,!1,function(t){i("LKHz")},null,null);e.default=s.exports}});
//# sourceMappingURL=0.d0181bc93c8d3635ba16.js.map