<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    
                    <div class="card-body">
                        DATA RUANG
                        <hr>
                        <!-- <router-link :to="{name: 'ruang.create'}" class="btn btn-md btn-success">TAMBAH RUANG</router-link> -->
 
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">KAPASITAS</th>
                                    <th scope="col">JENIS</th>

                                </tr>
                            </thead>
                            <tbody>
                                
                                <tr v-for="room in ruangs" :key="index">
                                    <td>{{ room.nama }}</td>
                                    <td>{{ room.kapasitas }}</td>
                                    <td>{{ room.jenis }}</td>
                                    
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
        let ruangs = ref([])
 
        //mounted
        onMounted(() => {
          
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/tes')
            .then(response => {
              
              //assign state ruangs with response data
              ruangs.value = response.data.data
 
            }).catch(error => {
                console.log(error.response.data)
            })
 
        })


         //return
        return {
            ruangs
        }
 
    }
 
    }
 
</script>
 
<style>
    body{
        background: lightgray;
 }
</style>
