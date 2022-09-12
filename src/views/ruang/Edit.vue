<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT RUANG</h4>
                        <hr>
 
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">NAMA</label>
                                <input type="text" class="form-control" v-model="ruang.nama" placeholder="Masukkan Nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kapasitas" class="font-weight-bold">KAPASITAS</label>
                                <input type="text" class="form-control" v-model="ruang.kapasitas" placeholder="Masukkan Kapasitas">
                                <!-- validation -->
                                <div v-if="validation.kapasitas" class="mt-2 alert alert-danger">
                                    {{ validation.kapasitas[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jenis" class="font-weight-bold">JENIS</label>
                                <input type="text" class="form-control" v-model="ruang.jenis" placeholder="Masukkan Jenis">
                                <!-- validation -->
                                <div v-if="validation.jenis" class="mt-2 alert alert-danger">
                                    {{ validation.jenis[0] }}
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
 
        //state ruangs
        const ruang = reactive({
            nama: '',
            kapasitas: '',
            jenis: ''
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
            axios.get(`http://localhost:8000/api/ruang/${route.params.kode}`)
            .then(response => {
              
              //assign state ruangs with response data
              ruang.nama  = response.data.data.nama 
              ruang.kapasitas  = response.data.data.kapasitas 
              ruang.jenis  = response.data.data.jenis 
 
            }).catch(error => {
                console.log(error.response.data)
            })
})
 
        //method update
        function update() {
 
            let nama = ruang.nama
            let kapasitas = ruang.kapasitas
            let jenis = ruang.jenis
 
            axios.put(`http://localhost:8000/api/ruang/${route.params.kode}`, {
                nama: nama,
                kapasitas: kapasitas,
                jenis: jenis
            }).then(() => {
 
                //redirect ke ruang index
                router.push({
                    name: 'ruang.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }
 
        //return
        return {
            ruang,
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
