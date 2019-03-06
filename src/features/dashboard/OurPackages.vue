<template>
    <div>
        our packages goes here
    </div>
</template>

<script>
export default { 
    data(){
        return {
            packageList: []
        }
    },
    created(){
        this.loadPackages()
    },
    methods:{
        loadPackages(){
            //load packages
        }
    }
}
</script>

<style>

</style>
