<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    
                    <div class="card-body">
                        DATA JADWAL
                        <hr>
                        
                        <!-- <router-link :to="{name: 'ruang.create'}" class="btn btn-md btn-success">TAMBAH RUANG</router-link> -->
 
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
                                
                                <tr v-for="schedule in jadwal" :key="index">
                                    <td>{{ schedule.hari }}</td>
                                    <td>{{ schedule.sesi }}</td>
                                    <td>{{ schedule.jam_kuliah }}</td>
                                    <td>{{ schedule.nama_mk }}</td>
                                    <td>{{ schedule.sks }}</td>
                                    <td>{{ schedule.semester }}</td>
                                    <td>{{ schedule.kelas }}</td>
                                    <td>{{ schedule.dosen }}</td>
                                    <td>{{ schedule.ruang }}</td>
                                    
                                </tr>
                                <hr>
                                    <button @click.prevent="getJadwal()" class="btn btn-md btn-success">GENERATE</button>
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
          
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/tesj')
            .then(response => {
              
              //assign state jadwal with response data
              jadwal.value = response.data.data
 
            }).catch(error => {
                console.log(error.response.data)
            })
 
        })

        function getJadwal() {
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/tesj')
            .then(response => {
              
              //assign state jadwal with response data
              jadwal.value = response.data.data
 
            }).catch(error => {
                console.log(error.response.data)
            })
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
