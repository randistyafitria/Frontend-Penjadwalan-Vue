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
                        DASHBOARD
                        <hr>
                        Selamat Datang <strong>{{user.name}}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  
  setup() {

    //state token
    const token = localStorage.getItem('token')

    //inisialisasi vue router on Composition API
    const router = useRouter()

    //state user
    const user = ref('') 

    //mounted properti
    onMounted(() => { 

      //check Token exist
      if(!token) {
        return router.push({
          name: 'dashboard'
        })
      }

      //get data user
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      axios.get('http://localhost:8000/api/user')
      .then(response => {

        //console.log(response.data.name)
        user.value = response.data

      })
      .catch(error => {
        console.log(error.response.data)
      })

    })

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
          router.push({
            name: 'login'
          })

        }

      })
      .catch(error => {
        console.log(error.response.data)
      })

    }

    return {
      token,    // <-- state token
      user,     // <-- state user
      logout,   // <-- method logout
    }
  }
}
</script>