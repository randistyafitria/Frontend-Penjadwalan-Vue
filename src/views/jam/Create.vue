<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JAM</h4>
                        <hr>
 
                        <form @submit.prevent="store">
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
 
        //state jam
        const jam = reactive({
            range_jam: '',
            aktif: ''
        })
 
        //state validation
        const validation = ref([])
 
        //vue router
        const router = useRouter()

        //method store
        function store() {
 
            let range_jam   = jam.range_jam
            let aktif = jam.aktif
 
            axios.post('http://localhost:8000/api/jam', {
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
