<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JAM</h4>
                        <hr>
 
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="range_jam" class="font-weight-bold">RANGE JAM</label>
                                <input type="text" class="form-control" v-model="jam.range_jam" placeholder="Masukkan Range Jam">
                                <!-- validation -->
                                <div v-if="validation.range_jam" class="mt-2 alert alert-danger">
                                    {{ validation.range_jam[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="aktif" class="font-weight-bold">AKTIF</label>
                                <input type="text" class="form-control" v-model="jam.aktif" placeholder="Pilih">
                                <!-- validation -->
                                <div v-if="validation.aktif" class="mt-2 alert alert-danger">
                                    {{ validation.aktif[0] }}
                                </div>
                            </div>
                            <br>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
</form>                        
 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
 
export default {
 
    setup() {
 
        //state jams
        const jam = reactive({
            range_jam: '',
            aktif: ''
        })
 
        //state validation
        const validation = ref([])
 
        //vue router
        const router = useRouter()
 
        //vue router
        const route = useRoute()
 
        //mounted
        onMounted(() => {
 
            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/jam/${route.params.kode}`)
            .then(response => {
              
              //assign state jams with response data
              jam.range_jam    = response.data.data.range_jam  
              jam.aktif  = response.data.data.aktif 
 
            }).catch(error => {
                console.log(error.response.data)
            })
})
 
        //method update
        function update() {
 
            let range_jam   = jam.range_jam
            let aktif = jam.aktif
 
            axios.put(`http://localhost:8000/api/jam/${route.params.kode}`, {
                range_jam: range_jam,
                aktif: aktif

            }).then(() => {
 
                //redirect ke jam index
                router.push({
                    name: 'jam.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }
 
        //return
        return {
            jam,
            validation,
            router,
            update
        }
 
    }
 
}
</script>
 
<style>
    body{
        background: lightgray;
    }
</style>
