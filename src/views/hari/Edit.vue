<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT HARI</h4>
                        <hr>
 
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">NAMA</label>
                                <input type="text" class="form-control" v-model="hari.nama" placeholder="Masukkan Nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
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
 
        //state haris
        const hari = reactive({
            nama: ''
        })
 
        //state validation
        const validation = ref([])
 
        //state token
        const token = localStorage.getItem('token')

        //vue router
        const router = useRouter()
 
        //vue router
        const route = useRoute()
 
        //mounted
        onMounted(() => {
 
            //check Token exist
            if(!token) {
                return router.push({
                name: 'login'
                })
            }

            //get API from Laravel Backend
            axios.get(`http://localhost:8000/api/hari/${route.params.kode}`)
            .then(response => {
              
              //assign state hari with response data
              hari.nama  = response.data.data.nama 
 
            }).catch(error => {
                console.log(error.response.data)
            })
})
 
        //method update
        function update() {

            let nama = hari.nama
 
            axios.put(`http://localhost:8000/api/hari/${route.params.kode}`, {
                nama: nama
            }).then(() => {
 
                //redirect ke hari index
                router.push({
                    name: 'hari.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }

        //method logout
        function logout() {

        //logout
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        axios.post('http://localhost:8000/api/logout')
        .then(response => {

            if(response.data.success) {

            //remove localstorage
            localStorage.removeItem('token')

            //redirect ke halaman login
            return router.push({
                name: 'login'
            })

            }

        })
        .catch(error => {
            console.log(error.response.data)
        })

        }
 
        //return
        return {
            hari,
            validation,
            router,
            update,
            logout
        }
 
    }
 
}
</script>
 
<style>
    body{
        background: lightgray;
    }
</style>
