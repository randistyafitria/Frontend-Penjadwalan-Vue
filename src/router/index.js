//import vue router
import { createRouter, createWebHistory } from "vue-router";
//import Router from 'vue-router'
import NProgress from 'nprogress'
 
//define a routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '@/views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '@/views/auth/Register.vue')
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue')
    },
    {
        path: '/dosen',
        name: 'dosen.index',
        component: () => import( /* webpackChunkName: "dosen.index" */ '@/views/dosen/Index.vue')
    },
    {
        path: '/create',
        name: 'dosen.create',
        component: () => import( /* webpackChunkName: "dosen.create" */ '@/views/dosen/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'dosen.edit',
        component: () => import( /* webpackChunkName: "dosen.edit" */ '@/views/dosen/Edit.vue')
    },
    {
        path: '/hari',
        name: 'hari.index',
        component: () => import( /* webpackChunkName: "hari.index" */ '@/views/hari/Index.vue')
    },
    {
        path: '/create',
        name: 'hari.create',
        component: () => import( /* webpackChunkName: "hari.create" */ '@/views/hari/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'hari.edit',
        component: () => import( /* webpackChunkName: "hari.edit" */ '@/views/hari/Edit.vue')
    },
    {
        path: '/jadkul',
        name: 'jadkul.index',
        component: () => import( /* webpackChunkName: "jadkul.index" */ '@/views/jadkul/Index.vue')
    },
    {
        path: '/create',
        name: 'jadkul.create',
        component: () => import( /* webpackChunkName: "jadkul.create" */ '@/views/jadkul/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'jadkul.edit',
        component: () => import( /* webpackChunkName: "jadkul.edit" */ '@/views/jadkul/Edit.vue')
    },
    {
        path: '/jam',
        name: 'jam.index',
        component: () => import( /* webpackChunkName: "jam.index" */ '@/views/jam/Index.vue')
    },
    {
        path: '/create',
        name: 'jam.create',
        component: () => import( /* webpackChunkName: "jam.create" */ '@/views/jam/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'jam.edit',
        component: () => import( /* webpackChunkName: "jam.edit" */ '@/views/jam/Edit.vue')
    },
    {
        path: '/matkul',
        name: 'matkul.index',
        component: () => import( /* webpackChunkName: "matkul.index" */ '@/views/matkul/Index.vue')
    },
    {
        path: '/create',
        name: 'matkul.create',
        component: () => import( /* webpackChunkName: "matkul.create" */ '@/views/matkul/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'matkul.edit',
        component: () => import( /* webpackChunkName: "matkul.edit" */ '@/views/matkul/Edit.vue')
    },
    {
        path: '/pengampu',
        name: 'pengampu.index',
        component: () => import( /* webpackChunkName: "pengampu.index" */ '@/views/pengampu/Index.vue')
    },
    {
        path: '/create',
        name: 'pengampu.create',
        component: () => import( /* webpackChunkName: "pengampu.create" */ '@/views/pengampu/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'pengampu.edit',
        component: () => import( /* webpackChunkName: "pengampu.edit" */ '@/views/pengampu/Edit.vue')
    },
    {
        path: '/ruang',
        name: 'ruang.index',
        component: () => import( /* webpackChunkName: "ruang.index" */ '@/views/ruang/Index.vue')
    },
    {
        path: '/create',
        name: 'ruang.create',
        component: () => import( /* webpackChunkName: "ruang.create" */ '@/views/ruang/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'ruang.edit',
        component: () => import( /* webpackChunkName: "ruang.edit" */ '@/views/ruang/Edit.vue')
    },
    {
        path: '/waktu_tidak_bersedia',
        name: 'waktu_tidak_bersedia.index',
        component: () => import( /* webpackChunkName: "waktu_tidak_bersedia.index" */ '@/views/waktu_tidak_bersedia/Index.vue')
    },
    {
        path: '/create',
        name: 'waktu_tidak_bersedia.create',
        component: () => import( /* webpackChunkName: "waktu_tidak_bersedia.create" */ '@/views/waktu_tidak_bersedia/Create.vue')
    },
    {
        path: '/edit/:kode',
        name: 'waktu_tidak_bersedia.edit',
        component: () => import( /* webpackChunkName: "waktu_tidak_bersedia.edit" */ '@/views/waktu_tidak_bersedia/Edit.vue')
    },
    {
        path: '/penjadwalan',
        name: 'penjadwalan.index',
        component: () => import( /* webpackChunkName: "penjadwalan.index" */ '@/views/penjadwalan/Index.vue')
    },
    {
        path: '/tes',
        name: 'penjadwalan.tes',
        component: () => import( /* webpackChunkName: "penjadwalan.tes" */ '@/views/penjadwalan/Tes.vue')
    },
    {
        path: '/tesj',
        name: 'penjadwalan.tesj',
        component: () => import( /* webpackChunkName: "penjadwalan.tesj" */ '@/views/penjadwalan/Tesj.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    NProgress.set(0.5)
    next()
  })
  router.afterEach(() => {
    setTimeout(() => NProgress.done(), 20)
  })
 
export default router