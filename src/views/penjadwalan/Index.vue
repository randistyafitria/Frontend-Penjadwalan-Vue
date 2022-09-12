<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        MAIN MENU 
                        <hr>
                        <ul class="list-group">
                            <router-link :to="{name: 'dashboard'}"
                            class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'penjadwalan.index'}"
                            class="list-group-item text-dark text-decoration-none">PENJADWALAN</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'dosen.index'}"
                            class="list-group-item text-dark text-decoration-none">DOSEN</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'hari.index'}"
                            class="list-group-item text-dark text-decoration-none">HARI</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'jadkul.index'}"
                            class="list-group-item text-dark text-decoration-none">JADWAL KULIAH</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'jam.index'}"
                            class="list-group-item text-dark text-decoration-none">JAM</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'matkul.index'}"
                            class="list-group-item text-dark text-decoration-none">MATA KULIAH</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'pengampu.index'}"
                            class="list-group-item text-dark text-decoration-none">PENGAMPU</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'ruang.index'}"
                            class="list-group-item text-dark text-decoration-none">RUANG</router-link>
                        </ul>
                        <ul class="list-group">
                            <router-link :to="{name: 'waktu_tidak_bersedia.index'}"
                            class="list-group-item text-dark text-decoration-none">WAKTU TIDAK BERSEDIA</router-link>
                        </ul>
                        <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none" style="cursor:pointer">LOGOUT</li>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        DATA JADWAL
                        <hr>


<button @click.prevent="getJadwal()" class="btn btn-md btn-success">GENERATE</button>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">HARI</th>
                                    <th scope="col">SESI</th>
                                    <th scope="col">JAM KULIAH</th>
                                    <th scope="col">MATAKULIAH</th>
                                    <th scope="col">SKS</th>
                                    <th scope="col">SEMESTER</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">DOSEN</th>
                                    <th scope="col">RUANG</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="(schedule, index) in jadwal" :key="index">
                                    <td>{{ schedule.hari }}</td>
                                    <td>{{ schedule.sesi }}</td>
                                    <td>{{ schedule.jam_kuliah }}</td>
                                    <td>{{ schedule.nama_mk }}</td>
                                    <td>{{ schedule.sks }}</td>
                                    <td>{{ schedule.semester }}</td>
                                    <td>{{ schedule.kelas }}</td>
                                    <td>{{ schedule.dosen }}</td>
                                    <td>{{ schedule.ruang }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{name: 'dosen.edit', params:{id: dosen.id }}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="dosenDelete(dosen.id)" class="btn btn-sm btn-danger ml-1">DELETE</button> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'
 
export default {
 
    setup() {
 
        //reactive state
        let jadwal = ref([])
 
        //mounted
        onMounted(() => {
          
            if (window.confirm("Proses ini memakan waktu, jadi tunggu sebentar, ya!")){

            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/jadwal')
            .then(response => {
              
              //assign state jadwal with response data
              jadwal.value = response.data.data
 
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        })

        function getJadwal() {
            if (window.confirm("Apakah yakin untuk mengacak?")){

            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/tesj')
            .then(response => {
              
                //assign state jadwal with response data
                if(jadwal.value = response.data.data){
                    alert("Data berhasil diacak!");
                }
 
            }).catch(error => {
                console.log(error.response.data)
            })
        }
    }


         //return
        return {
            jadwal,
            getJadwal
        }
 
    }
 
    }
 
</script>
 
<style>
    body{
        background: lightgray;
 }
</style>
