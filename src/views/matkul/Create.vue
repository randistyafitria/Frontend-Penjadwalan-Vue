<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH MATKUL</h4>
                        <hr>
 
                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="kode_mk" class="font-weight-bold">KODE MK</label>
                                <input type="text" class="form-control" v-model="matkul.kode_mk" placeholder="Masukkan Kode MK">
                                <!-- validation -->
                                <div v-if="validation.kode_mk" class="mt-2 alert alert-danger">
                                    {{ validation.kode_mk[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="nama" class="font-weight-bold">NAMA</label>
                                <input type="text" class="form-control" v-model="matkul.nama" placeholder="Masukkan Nama">
                                <!-- validation -->
                                <div v-if="validation.matkul" class="mt-2 alert alert-danger">
                                    {{ validation.matkul[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="sks" class="font-weight-bold">SKS</label>
                                <input type="text" class="form-control" v-model="matkul.sks" placeholder="Masukkan Sks">
                                <!-- validation -->
                                <div v-if="validation.sks" class="mt-2 alert alert-danger">
                                    {{ validation.sks[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="semester" class="font-weight-bold">SEMESTER</label>
                                <input type="text" class="form-control" v-model="matkul.semester" placeholder="Masukkan Semester">
                                <!-- validation -->
                                <div v-if="validation.semester" class="mt-2 alert alert-danger">
                                    {{ validation.semester[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="aktif" class="font-weight-bold">AKTIF</label>
                                <input type="text" class="form-control" v-model="matkul.aktif" placeholder="Pilih">
                                <!-- validation -->
                                <div v-if="validation.aktif" class="mt-2 alert alert-danger">
                                    {{ validation.aktif[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jenis" class="font-weight-bold">JENIS</label>
                                <input type="text" class="form-control" v-model="matkul.jenis" placeholder="Pilih">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
 
export default {
 
    setup() {
 
        //state matkul
        const matkul = reactive({
            kode_mk: '',
            nama: '',
            sks: '',
            semester: '',
            aktif: '',
            jenis: ''
        })
 
        //state validation
        const validation = ref([])
 
        //vue router
        const router = useRouter()

        //method store
        function store() {
 
            let kode_mk   = matkul.kode_mk
            let nama = matkul.nama
            let sks = matkul.sks
            let semester = matkul.semester
            let aktif = matkul.aktif
            let jenis = matkul.jenis
 
            axios.post('http://localhost:8000/api/matakuliah', {
                kode_mk: kode_mk,
                nama: nama,
                sks: sks,
                semester: semester,
                aktif: aktif,
                jenis: jenis
            }).then(() => {
 
                //redirect ke matkul index
                router.push({
                    name: 'matkul.index'
                })
 
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
 
        }
 
        //return
        return {
            matkul,
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
