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
                        DATA HARI
                        <hr>
                        <router-link :to="{name: 'hari.create'}" class="btn btn-md btn-success">TAMBAH HARI</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">OPTION</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr v-for="(hari, index) in post" :key="index">
                                    <td>{{ hari.nama}}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'hari.edit', params:{kode: hari.kode}}" class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button @click.prevent="hariDelete(hari.kode)" class="btn btn-sm btn-danger ml-1">DELETE</button>
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
        let post = ref([])

        //mounted
        onMounted(() => {
          
            //get API from Laravel Backend
            axios.get('http://localhost:8000/api/hari')
            .then(response => {

                //assign state post with response data
                post.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        //method delete
        function hariDelete(kode) {

            //delete data hari by ID
            axios.delete(`http://localhost:8000/api/hari/${kode}`)
            .then(() => {

                //splice post
                post.value.splice(post.value.indexOf(kode), 1);

            }).catch(error => {
                console.log(error.response.data)
            })
        }

        //return
        return {
            post,
            hariDelete
        }
    }
}

</script>
 
<style>
    body{
        background: lightgray;
 }
</style>