<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PENGAMPU</h4>
                        <hr>
 
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="kode_mk" class="font-weight-bold">KODE MK</label>
                                <input type="text" class="form-control" v-model="pengampu.kode_mk" placeholder="Masukkan Kode MK">
                                <!-- validation -->
                                <div v-if="validation.kode_mk" class="mt-2 alert alert-danger">
                                    {{ validation.kode_mk[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kode_dosen" class="font-weight-bold">KODE DOSEN</label>
                                <input type="text" class="form-control" v-model="pengampu.kode_dosen" placeholder="Masukkan Kode Dosen">
                                <!-- validation -->
                                <div v-if="validation.kode_dosen" class="mt-2 alert alert-danger">
                                    {{ validation.kode_dosen[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kelas" class="font-weight-bold">KELAS</label>
                                <input type="text" class="form-control" v-model="pengampu.kelas" placeholder="Masukkan Kelas">
                                <!-- validation -->
                                <div v-if="validation.kelas" class="mt-2 alert alert-danger">
                                    {{ validation.kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tahun_akademik" class="font-weight-bold">TAHUN AKADEMIK</label>
                                <input type="text" class="form-control" v-model="pengampu.tahun_akademik" placeholder="Masukkan Tahun Akademik">
                                <!-- validation -->
                                <div v-if="validation.tahun_akademik" class="mt-2 alert alert-danger">
                                    {{ validation.tahun_akademik[0] }}
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
 
        //state pengampus
        const pengampu = reactive({
            kode_mk: '',
            kode_dosen: '',
            kelas: '',
            tahun_akademik: ''
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
            axios.get(`http://localhost:8000/api/pengampu/${route.params.kode}`)
            .then(response => {
              
              //assign state pengampus with response data
              pengampu.kode_mk    = response.data.data.kode_mk  
              pengampu.kode_dosen  = response.data.data.kode_dosen 
              pengampu.kelas  = response.data.data.kelas 
              pengampu.tahun_akademik  = response.data.data.tahun_akademik 
 
            }).catch(error => {
                console.log(error.response.data)
            })
})
 
        //method update
        function update() {
 
            let kode_mk   = pengampu.kode_mk
            let kode_dosen = pengampu.kode_dosen
            let kelas = pengampu.kelas
            let tahun_akademik = pengampu.tahun_akademik
 
            axios.put(`http://localhost:8000/api/pengampu/${route.params.kode}`, {
                kode_mk: kode_mk,
                kode_dosen: kode_dosen,
                kelas: kelas,
                tahun_akademik: tahun_akademik
            }).then(() => {
 
                //redirect ke pengampu index
                router.push({
                    name: 'pengampu.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }
 
        //return
        return {
            pengampu,
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
