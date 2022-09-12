<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH HARI</h4>
                        <hr>
 
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">NAMA</label>
                                <input type="text" class="form-control" v-model="hari.nama" placeholder="Masukkan NAMA">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
 
export default {
 
    setup() {
 
        //state hari
        const hari = reactive({
            nama: ''
        })
 
        //state validation
        const validation = ref([])
 
        //vue router
        const router = useRouter()

        //method store
        function store() {

            let nama = hari.nama
 
            axios.post('http://localhost:8000/api/hari', {
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
 
        //return
        return {
            hari,
            validation,
            router,
            store
        }
 
    }
 
}
</script>
 
<style>
    body{
        background: lightgray;
    }
</style>
