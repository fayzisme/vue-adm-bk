import Vue from 'vue'
import Router from 'vue-router'

import layouts from '../layout'
import store from '../store'

Vue.use(Router)

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import(/* webpackChunkName: "dashboard" */ `../pages/Dashboard.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['dashboard']
			}
		},
		{
			path: '/dashboard/:jenis_anggaran/:tahun',
			name: 'dashboard',
			component: () => import(/* webpackChunkName: "dashboard" */ `../pages/Dashboard.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['dashboard']
			}
		},
		{
			path: '/procurement/po',
			name: 'po',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/PO.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'po']
			}
		},
		{
			path: '/procurement/po/detailpostatus/:chart/:status/:jenis_anggaran/:tahun',
			name: 'po-detail',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/DetailPO.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'po']
			}
		},
		{
			path: '/procurement/penyedia',
			name: 'penyedia',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/Penyedia.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'penyedia']
			}
		},
		{
			path: '/procurement/ba-emergency',
			name: 'baemergency',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/BAEmergency.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'ba emergency']
			}
		},
		{
			path: '/procurement/monitoring-bapp',
			name: 'monitoringbapp',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/MonitoringBAPP.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'monitoring bapp']
			}
		},
		{
			path: '/procurement/tagihan',
			name: 'tagihan',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/Tagihan.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'tagihan']
			}
		},
		{
			path: '/procurement/email',
			name: 'email',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/procurement/KirimEmail.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['procurement', 'kirim email']
			}
		},
		{
			path: '/user',
			name: 'user',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/User.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['user']
			}
		},
		{
			path: '/manajemen/akun',
			name: 'akun',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/Account.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['account']
			}
		},
		{
			path: '/manajemen/rule',
			name: 'rule',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/Rule.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['rule']
			}
		},
		{
			path: '/manajemen/jenis_pengadaan',
			name: 'jenis_pengadaan',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/JenisPengadaan.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['jenis_pengadaan']
			}
		},
		{
			path: '/manajemen/bidang',
			name: 'bidang',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/Bidang.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['bidang']
			}
		},
		{
			path: '/manajemen/sub_bidang',
			name: 'sub bidang',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/SubBidang.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['sub bidang']
			}
		},
		{
			path: '/manajemen/jenis_anggaran',
			name: 'jenis anggaran',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/JenisAnggaran.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['jenis anggaran']
			}
		},
		{
			path: '/manajemen/status_pengadaan',
			name: 'status pengadaan',
			component: () => import(/* webpackChunkName: "contacts" */ `../pages/manajemen/StatusPengadaan.vue`),
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['status pengadaan']
			}
		},
		{
			path: '/',
			alias: '/login',
			name: 'login',
			component: () => import(/* webpackChunkName: "login" */ `../pages/authentication/Login.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: () => import(/* webpackChunkName: "register" */ `../pages/authentication/Register.vue`),
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true
	store.commit('isLoadingPage', true)
	// console.log("to", to.name);
	// console.log("from", from.name);
	// console.log("islogin", auth.loggedIn());
	// console.log("requireauth", authrequired);

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				// next({path:'/dashboard'})
				window.location.href = '/dashboard'
				return false
			} else {
				next()
			}
		} else {
			if(to.name !== 'login'){
				// next({path:'/login'})
				window.location.href = '/login'
				return false
			}
			else {
				next()
			}
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			// next({path:'/dashboard'})
			window.location.href = '/dashboard'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}
})

router.afterEach((to, from) => {
	store.commit('isLoadingPage', false)
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router
