<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT WAKTU TIDAK BERSEDIA</h4>
                        <hr>
 
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="kode_dosen" class="font-weight-bold">KODE DOSEN</label>
                                <input type="text" class="form-control" v-model="wkt_tdk_bersedia.kode_dosen" placeholder="Pilih">
                                <!-- validation -->
                                <div v-if="validation.kode_dosen" class="mt-2 alert alert-danger">
                                    {{ validation.kode_dosen[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kode_hari" class="font-weight-bold">KODE HARI</label>
                                <input type="text" class="form-control" v-model="wkt_tdk_bersedia.kode_hari" placeholder="Pilih">
                                <!-- validation -->
                                <div v-if="validation.kode_hari" class="mt-2 alert alert-danger">
                                    {{ validation.kode_hari[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kode_jam" class="font-weight-bold">KODE JAM</label>
                                <input type="text" class="form-control" v-model="wkt_tdk_bersedia.kode_jam" placeholder="Pilih">
                                <!-- validation -->
                                <div v-if="validation.kode_jam" class="mt-2 alert alert-danger">
                                    {{ validation.kode_jam[0] }}
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
 
        //state waktu tidak bersedias
        const wkt_tdk_bersedia = reactive({
            kode_dosen: '',
            kode_hari: '',
            kode_jam: ''
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
            axios.get(`http://localhost:8000/api/waktu_tidak_bersedia/${route.params.kode}`)
            .then(response => {
              
              //assign state waktu tidak bersedias with response data
              wkt_tdk_bersedia.kode_dosen    = response.data.data.kode_dosen  
              wkt_tdk_bersedia.kode_hari  = response.data.data.kode_hari 
              wkt_tdk_bersedia.kode_jam  = response.data.data.kode_jam 
 
            }).catch(error => {
                console.log(error.response.data)
            })
})
 
        //method update
        function update() {
 
            let kode_dosen   = wkt_tdk_bersedia.kode_dosen
            let kode_hari = wkt_tdk_bersedia.kode_hari
            let kode_jam = wkt_tdk_bersedia.kode_jam
 
            axios.put(`http://localhost:8000/api/waktu_tidak_bersedia/${route.params.kode}`, {
                kode_dosen: kode_dosen,
                kode_hari: kode_hari,
                kode_jam: kode_jam
            }).then(() => {
 
                //redirect ke waktu tidak bersedia index
                router.push({
                    name: 'waktu_tidak_bersedia.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }
 
        //return
        return {
            wkt_tdk_bersedia,
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
