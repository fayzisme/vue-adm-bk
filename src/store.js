import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: true, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		splashScreen: true,
		logged: false,
		userdata:{},
		isLoadingPage: false,
		allowedRole: []
	},
	mutations: {
		setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar

			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer

			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setLogin(state, payload) {
			state.logged = true
			state.userdata = payload
		},
		setAllowedRole(state, payload){
			state.allowedRole = payload
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
			state.userdata = {}
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		},
		isLoadingPage(state, payload){
			state.isLoadingPage = payload
		}
	},
	actions: {

	},
	getters: {
		isLoadingPage(state, getters){
			return state.isLoadingPage
		},
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		isLogged(state, getters) {
			return state.logged
		},
		allowedRole(state, getters){
			console.log('state rule',state.userdata.user.rule)
			return state.userdata.user.rule
		},
		splashScreen(state, getters) {
			return state.splashScreen
		},
		accessToken(state, getters){
			return state.userdata.token
		},
		userID(state, getters){
			return state.userdata.user
		},
		email(state, getters){
			return state.userdata.user_email
		},
		userName(state, getters){
			return state.userdata.user.username
		},
		token(state, getters){
			return state.userdata.token
		}
	},
	plugins: [
		// createPersistedState({
		// 	paths: ['layout']
		// }),
		createPersistedState({
			storage: {
				getItem: key => atob(Cookies.get(key)),
				setItem: (key, value) =>
					Cookies.set(key, btoa(unescape(encodeURIComponent(value))), { expires: 3, secure: false, domain:'', path:'/' }),
				removeItem: key => Cookies.remove(key)
			}
		}),
	],
	strict: debug
})
