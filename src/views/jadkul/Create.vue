<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL KULIAH</h4>
                        <hr>
 
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="kode_pengampu" class="font-weight-bold">KODE PENGAMPU</label>
                                <input type="text" class="form-control" v-model="jadkul.kode_pengampu" placeholder="Masukkan Kode Pengampu">
                                <!-- validation -->
                                <div v-if="validation.kode_pengampu" class="mt-2 alert alert-danger">
                                    {{ validation.kode_pengampu[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kode_jam" class="font-weight-bold">KODE JAM</label>
                                <input type="text" class="form-control" v-model="jadkul.kode_jam" placeholder="Masukkan Kode Jam">
                                <!-- validation -->
                                <div v-if="validation.kode_jam" class="mt-2 alert alert-danger">
                                    {{ validation.kode_jam[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kode_hari" class="font-weight-bold">KODE HARI</label>
                                <input type="text" class="form-control" v-model="jadkul.kode_hari" placeholder="Masukkan Kode Hari">
                                <!-- validation -->
                                <div v-if="validation.kode_hari" class="mt-2 alert alert-danger">
                                    {{ validation.kode_hari[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kode_ruang" class="font-weight-bold">KODE RUANG</label>
                                <input type="text" class="form-control" v-model="jadkul.kode_ruang" placeholder="Masukkan Kode Ruang">
                                <!-- validation -->
                                <div v-if="validation.kode_ruang" class="mt-2 alert alert-danger">
                                    {{ validation.kode_ruang[0] }}
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
 
        //state jadkul
        const jadkul = reactive({
            kode_pengampu: '',
            kode_jam: '',
            kode_hari: '',
            kode_ruang: ''
        })
 
        //state validation
        const validation = ref([])
 
        //vue router
        const router = useRouter()

        //method store
        function store() {
 
            let kode_pengampu   = jadkul.kode_pengampu
            let kode_jam = jadkul.kode_jam
            let kode_hari = jadkul.kode_hari
            let kode_ruang = jadkul.kode_ruang
 
            axios.post('http://localhost:8000/api/jadwalkuliah', {
                kode_pengampu: kode_pengampu,
                kode_jam: kode_jam,
                kode_hari: kode_hari,
                kode_ruang: kode_ruang
            }).then(() => {
 
                //redirect ke jadkul index
                router.push({
                    name: 'jadkul.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }
 
        //return
        return {
            jadkul,
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
