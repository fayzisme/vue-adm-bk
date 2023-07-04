<template>
	<div id='po-main' class="scrollable only-y">
		<div class="page-header">
			<h1>{{ $t("menu.bae") }}</h1>
		</div>
		<el-card class="mb-10">
			<el-row>
				<el-col :span="4" class="mr-10">
					<el-button @click="dialogAddBAE=true" v-if="inRole('superadmin')">
						<i class="mdi mdi-plus"></i> Tambah
					</el-button>
				</el-col>
				<el-col :span="6">
					<el-row>
						<el-col style="display:flex; flex-wrap: wrap;" :span="24">
							<el-input
								style="flex-basis: 200px"
								prefix-icon="el-icon-search"
								:placeholder="`Search`"
								clearable
								@keypress.native="doSearchBAE"
								@clear="doSearchBAE"
								@keyup.native.delete="doSearchBAE"
								v-model="searchBAE"
							></el-input>
							<el-select style="flex-basis: 120px" @change="doSearchBAE" placeholder="Filter by" v-model="searchBy">
								<el-option
								v-for="by in searchByList"
								:key="by.by"
								:value="by.by"
								:label="by.name"
								/>
							</el-select>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="10">
					<el-row>
						<el-col style="text-align:center; padding-top: 10px;" :span="6">
							<span>
								Filter by Date:
							</span>	
						</el-col>
						<el-col :span="16">
							<el-date-picker type="daterange" placeholder="Pick a filter date" v-model="date1"
								range-separator="To"
								start-placeholder="Start date"
								end-placeholder="End date"
								:picker-options="pickerOptions" format="yyyy/MM/dd" style="width: 100%; cursor: pointer;" @change="doSearchBAE()"></el-date-picker>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="3">
					<el-button  style="width: 100%; height: 40px;" :loading='loadingDownload' class="animated fadeInRight" type="primary" small @click="download">
						<i class="mdi mdi-download"></i> Download
					</el-button>	
				</el-col>
			</el-row>
		</el-card>
		<el-card v-loading="loadingBAE">
			<div class="block mb-20">
				<el-pagination
					background
					prev-text="Prev"
					next-text="Next"
					layout="prev, pager, next"
					@current-change="paginateBAE"
					:current-page="currentPage"
					:page-size="limit"
					:total="total"
					class="mb-5"
				/>
			</div>
			<el-table ref="singleTable" :data="bae" style="width: 100%">
				<el-table-column fixed prop="created_at" label="CREATED AT" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.created_at) }}
					</template>
				</el-table-column>
				<el-table-column prop="tanggal_bae" label="TANGGAL BAE" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_bae) }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_ba"
					label="NOMOR BAE"
					width="250">
					<template slot-scope="props">
						{{ props.row.no_ba || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="judul_bae"
					label="JUDUL BAE"
					width="600">
					<template slot-scope="props">
						{{ props.row.judul_bae || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="nama_pekerjaan"
					label="NAMA PEKERJAAN"
					width="550">
					<template slot-scope="props">
						{{ props.row.nama_pekerjaan || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="bidang"
					label="BIDANG"
					width="150">
					<template slot-scope="props">
						{{ props.row.bidang || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="estimasi_harga"
					label="ESTIMASI HARGA"
					width="300">
					<template slot-scope="props">
						{{ props.row.estimasi_harga || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="estimasi_harga"
					label="ESTIMASI HARGA (+PPn)"
					width="300">
					<template slot-scope="props">
						{{ props.row.estimasi_harga_ppn || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="penyedia"
					label="PENYEDIA"
					width="300">
					<template slot-scope="props">
						{{ props.row.penyedia || "-" }}
					</template>
				</el-table-column>
				<el-table-column prop="tanggal_loi" label="TANGGAL LOI" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_loi) }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_loi"
					label="No LOI"
					width="250">
					<template slot-scope="props">
						{{ props.row.no_loi || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="mulai_pekerjaan"
					label="MULAI PEKERJAAN"
					width="180">
					<template slot-scope="props">
						{{ props.row.mulai_pekerjaan ? formatDate(props.row.mulai_pekerjaan): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="durasi"
					label="DURASI"
					width="120">
					<template slot-scope="props">
						{{ props.row.durasi || 0 }}
					</template>
				</el-table-column>
				<el-table-column
					prop="selesai_pekerjaan"
					label="SELESAI PEKERJAAN"
					width="180">
					<template slot-scope="props">
						{{ props.row.selesai_pekerjaan ? formatDate(props.row.selesai_pekerjaan): "-"}}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_pr"
					label="Nomor PR"
					width="150">
					<template slot-scope="props">
						{{ props.row.no_pr || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_kontrak"
					label="NO KONTRAK"
					width="200">
					<template slot-scope="props">
						{{ props.row.no_kontrak || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="status_pengadaan"
					label="STATUS PENGADAAN"
					width="220">
					<template slot-scope="props">
						{{ props.row.status_pengadaan || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="Operations"
					width="180">
					<template slot-scope="scope">
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" size="small" @click="doShowDialogEdit(scope.row)">
							Edit
						</el-button>
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" type="danger" size="small" @click="deletePO(scope.row.id)">
							Delete
						</el-button>
						<!-- <el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' ? true: false" type="info" size="small" @click="updateToPO(scope.row)">
							Ubah ke PO
						</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card class="mt-10">
			<div class="block">
				<el-pagination
					background
					prev-text="Prev"
					next-text="Next"
					layout="prev, pager, next"
					@current-change="paginateBAE"
					:current-page="currentPage"
					:page-size="limit"
					:total="total"
					class="mt-10"
				/>
			</div>
		</el-card>
		<el-dialog @close="clearForm" :visible.sync="dialogAddBAE" title="Tambah BA Emergency" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="form">
				<el-form-item label="No BA" :label-width="formLabelWidth">
					<!-- <el-input v-model="form.no_ba" auto-complete="off" type="text"></el-input> -->
					<el-autocomplete
						class="auto-input"
						v-model="form.no_ba"
						:fetch-suggestions="querySearch"
						placeholder="Cari atau Input No BA"
						:trigger-on-focus="false"
						@select="handleSelect"
						></el-autocomplete>
				</el-form-item>
				
				<el-form-item label="Judul BAE" :label-width="formLabelWidth">
					<el-input v-model="form.judul_bae" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal BAE" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_bae" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Deskripsi Pekerjaan" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="form.deskripsi_pekerjaan" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="Tanggal BAE" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.mulai_pekerjaan" format="dd/MM/yyyy" @change="autoDate()" style="width: 100%; cursor: pointer;"/>
				</el-form-item> -->
				<el-form-item label="No LOI" :label-width="formLabelWidth">
					<!-- <el-input v-model="form.no_loi" auto-complete="off" type="text"></el-input> -->
					<el-autocomplete
						class="auto-input"
						ref="noLoi"
						v-model="form.no_loi"
						:fetch-suggestions="querySearch2"
						placeholder="Cari atau Input No LOI"
						@select="handleSelect2"
						></el-autocomplete>
				</el-form-item>
				<el-form-item label="Tanggal LOI" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_loi" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item>
					<div>Bidang</div>
					<el-select filterable v-model="form.bidang" style="width:100%">
						<el-option label="Pilih bidang" value=""></el-option>
						<el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.bidang"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Estimasi Harga" :label-width="formLabelWidth">
					<CurrencyInput
						ref="currInput"
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="form.estimasi_harga" auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
				</el-form-item>
				<el-form-item label="Estimasi Harga +PPn" :label-width="formLabelWidth">
					<CurrencyInput
						ref="currInput"
						v-if="value1 == true"
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="form.estimasi_harga_ppn" auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
				</el-form-item>
				<el-form-item>
					<div>Penyedia</div>
					<el-select filterable v-model="form.penyedia" style="width:100%">
						<el-option label="Pilih penyedia" value=""></el-option>
						<el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Durasi Pekerjaan" :label-width="formLabelWidth">
					<el-input placeholder="Jumlah Hari" @keypress.native="numberOnly(),durasiClear()" @keyup.native.delete="numberOnly(),durasiClear()" v-model="form.durasi" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Mulai Pekerjaan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.mulai_pekerjaan" format="dd/MM/yyyy" @change="autoDate()" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Selesai Pekerjaan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" readonly v-model="form.selesai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Nomor PR" :label-width="formLabelWidth">
					<el-input v-model="form.no_pr" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="No Kontrak" :label-width="formLabelWidth">
					<el-input v-model="form.no_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Status Pengadaan</div>
					<el-select filterable v-model="form.status_pengadaan" style="width:100%">
						<el-option v-for="item in statusProgress" :key="item.id" :label="item.status" :value="item.status"></el-option>
					</el-select>
				</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddBAE = false">Cancel</el-button>
		    <el-button type="primary" @click="addBAE" :loading="loadingAddBAE">Submit</el-button>
		  </span>
		</el-dialog>

		<el-dialog @close="clearFormEdit()" :visible.sync="dialogChangeBAE" :title="'Edit BAE : '+selectedEditPO.no_ba"  :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="selectedEditPO">
				<el-form-item label="No BAE" :label-width="formLabelWidth">
					<!-- <el-input v-model="selectedEditPO.no_ba" auto-complete="off" type="text"></el-input> -->
					<el-autocomplete
						class="auto-input"
						v-model="selectedEditPO.no_ba"
						:fetch-suggestions="querySearch"
						placeholder="Cari atau Input No BA"
						:trigger-on-focus="false"
						@select="handleSelect"
						></el-autocomplete>
				</el-form-item>
				
				<el-form-item label="Judul BAE" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.judul_bae" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal BAE" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_bae" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Deskripsi Pekerjaan" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="selectedEditPO.nama_pekerjaan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="No LOI" :label-width="formLabelWidth">
					<!-- <el-input v-model="selectedEditPO.no_loi" auto-complete="off" type="text"></el-input> -->
					<el-autocomplete
						class="auto-input"
						ref="noLoi"
						v-model="selectedEditPO.no_loi"
						:fetch-suggestions="querySearch2"
						placeholder="Cari atau Input No LOI"
						@select="handleSelect2"
						></el-autocomplete>
				</el-form-item>
				<el-form-item label="Tanggal LOI" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_loi" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item>
					<div>Bidang</div>
					<el-select filterable v-model="selectedEditPO.bidang" style="width:100%">
						<el-option label="Pilih bidang" value=""></el-option>
						<el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Estimasi Harga (Rp)" :label-width="formLabelWidth">
					<CurrencyInput
						ref="currInput"
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="selectedEditPO.estimasi_harga" auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
				</el-form-item>
				<el-form-item label="Estimasi Harga +PPn" :label-width="formLabelWidth">
					<CurrencyInput
						ref="currInput"
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="selectedEditPO.estimasi_harga_ppn" auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
				</el-form-item>
				<el-form-item>
					<div>Penyedia</div>
					<el-select filterable v-model="selectedEditPO.penyedia" style="width:100%">
						<el-option label="Pilih penyedia" value=""></el-option>
						<el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Durasi Pekerjaan" :label-width="formLabelWidth">
					<el-input placeholder="Jumlah Hari" @keypress.native="numberOnly,durasiClear()" @keyup.native.delete="numberOnly,durasiClear()" v-model="selectedEditPO.durasi" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Mulai Pekerjaan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.mulai_pekerjaan" format="dd/MM/yyyy" @change="autoDate()" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Selesai Pekerjaan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" readonly v-model="selectedEditPO.selesai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Nomor PR" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_pr" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="No Kontrak" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Status Pengadaan</div>
					<el-select filterable v-model="selectedEditPO.status_pengadaan" style="width:100%">
						<el-option v-for="item in statusProgress" :key="item.id" :label="item.status" :value="item.status"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogChangeBAE = false">Cancel</el-button>
				<el-button type="primary" @click="updatePO" :loading="loadingUpdateBAE">Submit</el-button>
			</span>
		</el-dialog>

		
	</div>
</template>

<script>
import config from '../../config'
import api from '@/networkClient'
import moment from 'moment'
import _ from 'lodash'
import V_Echarts from '../../directives/echarts';
import Chart from 'vue-bulma-chartjs'
import ChartLabel from 'chartjs-plugin-labels'
import store from '@/store'
import { useCurrencyInput } from 'vue-currency-input'
// import CurrencyInput from './CurrencyInput'
import CurrencyInput from "../../components/CurrencyInput.vue";

export default {
	name: 'BAE',
	directives: {
		'echarts': V_Echarts
	},
	props: {
		modelValue: Number, // Vue 2: value
		options: Object
	},
	setup (props) {
		const { formattedValue, inputRef } = useCurrencyInput(props.options)
		return { inputRef, formattedValue }
	},
	components: {
		Chart,
		ChartLabel,
		CurrencyInput
	},
	data() {
		return {
			items: [],
			links: [],
			value1 : true,
			value2: false,
			allowedRole: store.getters.allowedRole,
			date1: null,
			searchBAE:'',
			bae: [ { bae: [] } ],
			loadingBAE: false,
			loadingAddBAE: false,
			loadingUpdateBAE: false,
			loadingDownload: false,
			dialogAddBAE: false,
			dialogChangeBAE: false,
			loadingJenisAnggaran: false,
			loadingBidang: false,
			loadingSubBidang: false,
			loadingJenisPengadaan: false,
			loadingPenyedia: false,
			loadingStatusKeterlambatan: false,
			loadingStatusPengadaan: false,
			loadingDelete: false,
			loadingSet: false,
			form: {
				no_ba: '',
				judul_bae: "",
				tanggal_bae:"",
				deskripsi_pekerjaan: "",
				bidang: "",
				estimasi_harga: "",
				estimasi_harga_ppn: "",
				penyedia: "",
				no_loi: '',
				tanggal_loi:'',
				mulai_pekerjaan: "",
				durasi: '',
				selesai_pekerjaan: "",
				no_pr: "",
				no_kontrak: "",
				status_pengadaan: ""
			},
			status_keterlambatan: '',
			checkdate: '',
			jenisAnggaran: [],
			bidang: [],
			sub_bidang: [],
			jenis_pengadaan: [],
			penyedia: [],
			statusKeterlambatan: [],
			statusProgress: [],
			formLabelWidth: '',
			currentPage: 1,
			selectedEditPO: {
				no_ba: '',
				judul_bae: "",
				tanggal_bae:"",
				nama_pekerjaan: "",
				bidang: "",
				estimasi_harga: "",
				estimasi_harga_ppn: "",
				penyedia: "",
				no_loi: '',
				tanggal_loi: "",
				mulai_pekerjaan: "",
				durasi: '',
				selesai_pekerjaan: "",
				no_pr: "",
				no_kontrak: "",
				status_pengadaan: ""
			},
			searchByList: [
				{ by: "status_pengadaan", name: "Status Pengadaan" },
				{ by: "bidang", name: "Bidang" },
				{ by: "nama_pekerjaan", name: "Nama Pekerjaan" },
				{ by: "penyedia", name: "Penyedia" },
				{ by: "no_pr", name: "Nomor PR" },
				{ by: "no_ba", name: "Nomor BA" },
				{ by: "no_loi", name: "Nomor LOI" },
				{ by: "no_kontrak", name: "Nomor Kontrak" }
			],
			searchBy: '',
			selectedStatusToEdit: "",
			total: 0,
			limit: 10,
			pickerOptions: {
					disabledDate(time) {
					return time.getTime() > Date.now();
				},
				// shortcuts: [{
				// 	text: 'Today',
				// 	onClick(picker) {
				// 		picker.$emit('pick', new Date());
				// 	}
				// }, 
				// {
				// 	text: 'Yesterday',
				// 	onClick(picker) {
				// 		const date = new Date();
				// 		date.setTime(date.getTime() - 3600 * 1000 * 24);
				// 		picker.$emit('pick', date);
				// 	}
				// }, 
				// {
				// 	text: 'A week ago',
				// 	onClick(picker) {
				// 		const date = new Date();
				// 		date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				// 		picker.$emit('pick', date);
				// 	}
				// }]
			},
			timeout: null 
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	watch:{
		value1(){
			// if (this.value1 == false) {
			// 	if (this.dialogAddPo == true) {
			// 		this.form.nilai_pr_ppn = this.form.nilai_pr
			// 	}

			// 	if (this.dialogChangePO == true) {
			// 		this.selectedEditPO.nilai_pr_ppn = this.selectedEditPO.nilai_pr
			// 	}
			// }
			// else{
				this.changeNilaiPR()
			// }
		},
		value2(){
			// if (this.value2 == false) {
			// 	if (this.dialogAddPo == true) {
			// 		this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			// 	}

			// 	if (this.dialogChangePO == true) {
			// 		this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak
			// 	}
			// }
			// else{
				// console.log('masuk value2');
				this.changeNilaiKontrak()
			// }
			this.changeNilaiSaving()
			
		},
		total(){
			if (this.total > 10000) {
			 let elBtn = document.getElementsByClassName("btn-next")
			 for (let index = 0; index < elBtn.length; index++) {
				 elBtn[index].disabled = true
				 
			 }
			}
		}
	},
	methods: {
		// doSearchPO(ev) {
		// 	clearTimeout(this.timeout);
		// 	this.timeout = setTimeout(() => {
		// 		if (ev.length >= 1) {
		// 		this.getBA(ev, false, 'no_ba');
		// 		} else {
		// 		this.getBA();
		// 		}
		// 	}, 500);
		// },
		async getBA(query = '', download = false, filter = '') {
			this.items = []
			let param = {
					query: query,
					filter: filter
				}

			if (filter == 'no_loi') {
				if (this.form.no_ba) {
					param.no_ba = this.form.no_ba
				}

				if (this.selectedEditPO.no_ba) {
					param.no_ba = this.selectedEditPO.no_ba
				}
			}

			let apiOptions = {
				method: 'get',
				url: 'procurement/po',
				params: param,
				timeout: 10 * 1000
			}
			
			return new Promise(async (resolve, reject) => {
				await api(apiOptions).then(result => {
					if(result.data.ec == 200){
						let maping = result.data.data.rows.length > 0 ? result.data.data.rows.map(el => { 
									let val = {...el}
									val.value = filter == 'no_ba' ? el.no_ba: el.no_loi
									return val
								}):[]
						let links = maping.length > 0 && filter == 'no_ba'? _.uniqBy(maping, 'value'): maping;
						resolve(links)
					}
					else{
						resolve([])
					}
				}).catch(error => {
					console.log(error);
					resolve([])
				})
			});

			
			// this.clearForm()
		},
		handleSelect(item) {
			this.form.no_loi = ''
			this.selectedEditPO.no_loi = ''
			clearTimeout(this.timeout);
			setTimeout(() => {
				this.$refs.noLoi.$el.getElementsByTagName('input')[0].focus()
			}, 300);
		},
		handleSelect2(item) {
			if (this.dialogChangeBAE) {
				this.selectedEditPO.deskripsi_pekerjaan = item.deskripsi_pekerjaan || ''
				if (item.bidang) {
					let findBidang = this.bidang.find(el => el.bidang == item.bidang)
					this.selectedEditPO.bidang = findBidang ? findBidang.id : item.bidang
				}
				this.selectedEditPO.bidang = item.bidang || ''
				this.selectedEditPO.estimasi_harga = item.nilai_pr || 0
				this.selectedEditPO.estimasi_harga_ppn = item.nilai_pr_ppn || 0
				this.selectedEditPO.penyedia = item.penyedia || ''
				this.selectedEditPO.no_ba = item.no_ba || ''
				this.selectedEditPO.no_loi = item.no_loi || ''
				this.selectedEditPO.durasi = item.durasi_pembuatan_po || 0
				this.selectedEditPO.mulai_pekerjaan = item.mulai_pekerjaan || ''
				this.selectedEditPO.selesai_pekerjaan = item.selesai_pekerjaan || ''
				this.selectedEditPO.no_pr = item.no_pr || ''
				this.selectedEditPO.no_kontrak = item.no_kontrak || ''
				this.selectedEditPO.status_pengadaan = item.status_pengadaan || ''
			}

			else {
				this.form.deskripsi_pekerjaan = item.deskripsi_pekerjaan || ''
				if (item.bidang) {
					let findBidang = this.bidang.find(el => el.bidang == item.bidang)
					this.form.bidang = findBidang ? findBidang.id : item.bidang
				}
				// this.form.bidang = item.bidang || ''
				this.form.estimasi_harga = item.nilai_pr || 0
				this.form.estimasi_harga_ppn = item.nilai_pr_ppn || 0
				this.form.penyedia = item.penyedia || ''
				this.form.no_ba = item.no_ba || ''
				this.form.no_loi = item.no_loi || ''
				this.form.durasi = item.durasi_pembuatan_po || 0
				this.form.mulai_pekerjaan = item.mulai_pekerjaan || ''
				this.form.selesai_pekerjaan = item.selesai_pekerjaan || ''
				this.form.no_pr = item.no_pr || ''
				this.form.no_kontrak = item.no_kontrak || ''
				this.form.status_pengadaan = item.status_pengadaan || ''
			}
		},
		async querySearch(queryString, cb) {
			// console.log(queryString);
			if (queryString.trim() != '') {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					if (queryString.trim().length >= 1) {
					  await this.getBA(queryString.trim(), false, 'no_ba').then( res => {
						   let links = res
						   let results = queryString ? links.filter(this.createFilter(queryString)) : links;
							// call callback function to return suggestions
							cb(results);
					  })
					 
					}
				}, 500);
			}
			
		},
		async querySearch2(queryString, cb) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					await this.getBA(queryString.trim(), false, 'no_loi').then( res => {
						let links = res
						let results = queryString ? links.filter(this.createFilter(queryString)) : links;
						// call callback function to return suggestions
						cb(results);
					})
				}, 500);
			
		},
		createFilter(queryString) {
			return (link) => {
			return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		inRole(val, val2) {
			if(this.allowedRole.replace(/\s/g, '').includes(val) || this.allowedRole.replace(/\s/g, '').includes(val2)) {
				return true;
			} else {
				return false;
			}
		},
		doSearchBAE(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchBAE.length >= 1) {
				this.currentPage = 1;
				this.getPO(this.searchBAE, false, this.searchBy);
				} else {
				this.getPO();
				}
			}, 1000);
		},
		disabledDate(date) {
				return new Date() < date
		},
		download(){
			this.getPO(this.searchBAE,true, this.searchBy)
		},
		pasteBa(event) {
		event.preventDefault();
		var totalCharacterCount = window.event.clipboardData.getData("Text"); // || window.clipboardData.getData('Text');
		var strValidChars = "+0123456789";
		var strChar;
		let FilteredChars = "";
		for (var i = 0; i < totalCharacterCount.length; i++) {
			strChar = totalCharacterCount.charAt(i);
			if (strValidChars.indexOf(strChar) != -1) {
			FilteredChars = FilteredChars + strChar;
			}
		}
		this.form.no_ba = FilteredChars;
		this.selectedEditPO.no_ba = FilteredChars
		},
		pasteLoi(event) {
		event.preventDefault();
		var totalCharacterCount = window.event.clipboardData.getData("Text"); // || window.clipboardData.getData('Text');
		var strValidChars = "+0123456789";
		var strChar;
		let FilteredChars = "";
		for (var i = 0; i < totalCharacterCount.length; i++) {
			strChar = totalCharacterCount.charAt(i);
			if (strValidChars.indexOf(strChar) != -1) {
			FilteredChars = FilteredChars + strChar;
			}
		}
		this.form.no_loi = FilteredChars;
		this.selectedEditPO.no_loi = FilteredChars;
		},
		numberOnly(e) {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.changeNilaiPR()
			this.changeNilaiKontrak()
			this.changeNilaiSaving()
		}, 700);
		var key = window.event ? e.keyCode : e.which;
		

		let isNumber = _.indexOf([8, 9, 27, 13, 190, 43], e.keyCode);
		if (
			isNumber !== -1 ||
			// Allow: Ctrl+C, Command+C
			(e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl+R, Command+R
			(e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode > 42 &&
			e.keyCode <= 49 &&
			_.indexOf([44, 45, 46, 47], e.keyCode) == -1)
		) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if (
			(e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
			(e.keyCode > 96 || e.keyCode < 200)
		) {
			e.preventDefault();
		}
		},
		changeNilaiSaving(){
			this.form.saving = 0
			this.selectedEditPO.saving = 0

			if(parseInt(this.form.nilai_hps) != 0 && this.form.nilai_hps != ''){
				this.form.saving = parseInt(this.form.nilai_hps) - parseInt(this.form.nilai_kontrak_ppn)
			}
			if (this.selectedEditPO.nilai_hps != 0 && this.selectedEditPO.nilai_hps != '') {
					this.selectedEditPO.saving = parseInt(this.selectedEditPO.nilai_hps) - parseInt(this.selectedEditPO.nilai_kontrak_ppn)
				}
			// if(parseInt(this.selectedEditPO.saving) == 0 && this.selectedEditPO.saving == ''){
			// 	if (this.selectedEditPO.nilai_hps != 0) {
			// 		this.selectedEditPO.saving = parseInt(this.selectedEditPO.nilai_hps) - parseInt(this.selectedEditPO.nilai_kontrak_ppn)
			// 	}
			// }
			// else {
			// 	this.form.saving = 0
			// 	this.selectedEditPO.saving = 0
			// }
		},
		changeNilaiPR(){
			this.form.estimasi_harga_ppn = this.form.estimasi_harga
			this.selectedEditPO.estimasi_harga_ppn = this.selectedEditPO.estimasi_harga
			if(parseInt(this.form.estimasi_harga) != 0 && this.form.estimasi_harga != '' && this.value1 == true){
				this.form.estimasi_harga_ppn = (11 / 100 * parseInt(this.form.estimasi_harga)) + parseInt(this.form.estimasi_harga)
			}
			if(parseInt(this.selectedEditPO.estimasi_harga) != 0 && this.selectedEditPO.estimasi_harga && this.value1 == true){
				this.selectedEditPO.estimasi_harga_ppn = (11 / 100 * parseInt(this.selectedEditPO.estimasi_harga)) + parseInt(this.selectedEditPO.estimasi_harga)
			}
			// else {
			// 	this.form.nilai_pr_ppn = this.form.nilai_pr
			// 	this.selectedEditPO.nilai_pr_ppn = this.selectedEditPO.nilai_pr
			// }
		},
		changeNilaiKontrak(){
			this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak

			if(parseInt(this.form.nilai_kontrak) != 0 && this.form.nilai_kontrak != '' && this.value2 == true){
				this.form.nilai_kontrak_ppn = (11 / 100 * parseInt(this.form.nilai_kontrak)) + parseInt(this.form.nilai_kontrak)
			}
			if(parseInt(this.selectedEditPO.nilai_kontrak) != 0 && this.selectedEditPO.nilai_kontrak && this.value2 == true){
				this.selectedEditPO.nilai_kontrak_ppn = (11 / 100 * parseInt(this.selectedEditPO.nilai_kontrak)) + parseInt(this.selectedEditPO.nilai_kontrak)
			}
			// else {
			// 	this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			// 	this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak
			// }
		},
		// checkDate(){
		// 	var begin = moment().subtract(1, 'days').startOf(this.po.selesai_pekerjaan)
		// 	var end = moment().add(2, 'days').endOf('day')
		// 	// var checking = moment().add(this.po.durasi_pembuatan_po, )
		// 	// var checkdate =	moment().diff(this.form.durasi_pembuatan_po, 'days')
		// 	console.log('cekdate slse',moment(begin._d).format('DD-MM-YYYY'))
		// 	console.log('cekdate end',end)
		// },
		check() {
			var now = moment();
			var hourToCheck = (now.day() !== 0)?17:15;
			var dateToCheck = now.hour(hourToCheck).minute(30);
			// console.log('datetocek',moment().isAfter(dateToCheck))
			return moment().isAfter(dateToCheck);
		},

		durasiClear(){
			this.form.mulai_pekerjaan = ''
			this.selectedEditPO.mulai_pekerjaan = ''
			this.selectedEditPO.selesai_pekerjaan = ''
		},

		autoDate(){
			this.form.selesai_pekerjaan = moment(this.form.mulai_pekerjaan).add(this.form.durasi,'days').subtract(1, 'days')
			this.selectedEditPO.selesai_pekerjaan = moment(this.selectedEditPO.mulai_pekerjaan).add(this.selectedEditPO.durasi,'days').subtract(1, 'days')
			// console.log('form selesai',this.form.selesai_pekerjaan)
		},

		doShowDialogEdit(key){
			let valKey = {...key}
			valKey.estimasi_harga = this.convertToAngka(valKey.estimasi_harga || 0)
			valKey.estimasi_harga_ppn = this.convertToAngka(valKey.estimasi_harga_ppn || 0)
			valKey.tanggal_loi = valKey.tanggal_loi ? new Date(valKey.tanggal_loi) : ''
			valKey.tanggal_bae = valKey.tanggal_bae ? new Date(valKey.tanggal_bae) : ''
			valKey.mulai_pekerjaan = new Date(valKey.mulai_pekerjaan)
			this.selectedEditPO = valKey
			this.dialogChangeBAE = true;
		},


		tableRowClassName({row, rowIndex}) {
			// console.log('row',this.formatDate(row.selesai_pekerjaan));
			// console.log('row index',rowIndex)
			let date1 = new Date(moment(row.selesai_pekerjaan).format("MM/DD/YYYY"));
			let date2 = new Date(moment().format("MM/DD/YYYY"));
			let date3 = new Date(moment(row.warning_date).format("MM/DD/YYYY"));
			
			// To calculate the time difference of two dates
			let difference1 = date1.getTime() - date2.getTime();
			let difference2 = date1.getTime() - date3.getTime();
			let Difference_In_Days1 = difference1 / (1000 * 3600 * 24);
			let Difference_In_Days2 = difference2 / (1000 * 3600 * 24);

			if (Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 > 0) {
				return 'warning-row';
				
			} else if(Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 <= 0 && row.status_pengadaan != 'TERKONTRAK' || row.status_pengadaan != 'CLOSED' || row.status_pengadaan != 'CLOSE'){
				return 'danger-row';
			}
			else if(row.status_pengadaan == 'TERKONTRAK' || row.status_pengadaan != 'CLOSED' || row.status_pengadaan != 'CLOSE' && row.keterangan == 'Selesai'){
				return 'default-row';
			}
			else {
				return '';
			}
		},
		formatDate(str, format) {
			if (!str) {
				return '-'
			}
			return moment(str).format(format || "DD-MMM-YYYY");
		},
		formatDateInput(value, event) {
			return moment(str).format("DD-MM-YYYY");
		},
		async getStatusPengadaan(){
			this.loadingStatusPengadaan = true
			await api({
				method: 'get',
				url: 'status_progress'
			}).then(response => {
				this.statusProgress = response.data.data.rows
				this.loadingStatusPengadaan = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data status progress pengadaan gagal terambil", "error")
				this.loadingStatusPengadaan = false
			})
		},
		async getBidang(){
			this.loadingBidang = true
			await api({
				method: 'get',
				url: 'bidang'
			}).then(response => {
				this.bidang = response.data.data.rows
				this.loadingBidang = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data bidang gagal terambil", "error")
				this.loadingBidang = false
			})
		},
		async getSubBidang(){
			this.loadingSubBidang = true
			await api({
				method: 'get',
				url: 'sub_bidang'
			}).then(response => {
				this.sub_bidang = response.data.data.rows
				this.loadingSubBidang = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data sub bidang gagal terambil", "error")
				this.loadingSubBidang = false
			})
		},
		async getJenisPengadaan(){
			this.loadingJenisPengadaan = true
			await api({
				method: 'get',
				url: 'jenis_pengadaan'
			}).then(response => {
				this.jenis_pengadaan = response.data.data.rows
				this.loadingJenisPengadaan = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data jenis pengadaan gagal terambil", "error")
				this.loadingJenisPengadaan = false
			})
		},
		async getSubBidang(){
			this.loadingSubBidang = true
			await api({
				method: 'get',
				url: 'sub_bidang'
			}).then(response => {
				this.sub_bidang = response.data.data.rows
				this.loadingSubBidang = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data sub bidang gagal terambil", "error")
				this.loadingSubBidang = false
			})
		},
		async getPenyedia(){
			this.loadingPenyedia = true
			await api({
				method: 'get',
				url: 'procurement/provider'
			}).then(response => {
				this.penyedia = response.data.data.rows
				this.loadingPenyedia = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data penyedia gagal terambil", "error")
				this.loadingPenyedia = false
			})
		},
		async getJenisAnggaran() {
			this.loadingJenisAnggaran = true
			await api({
				method: 'get',
				url: 'jenis_anggaran'
			}).then(response => {
				this.jenisAnggaran = response.data.data.rows
				this.loadingJenisAnggaran = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data jenis anggaran gagal terambil", "error")
				this.loadingJenisAnggaran = false
			})
		},
		async getStatusKeterlambatan() {
			this.loadingStatusKeterlambatan = true
			await api({
				method: 'get',
				url: 'status_keterlambatan'
			}).then(response => {
				this.status_keterlambatan = response.data.data.rows
				this.loadingStatusKeterlambatan = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data status keterlambatan gagal terambil", "error")
				this.loadingStatusKeterlambatan = false
			})
		},
		async getPO(query = '', download = false, filter = '') {
			if (filter == 'bidang') {
				if (query != '' && typeof query != "undefined") {
					const regex = new RegExp(`${query.toLowerCase()}.*`);
					let queryBidang = this.bidang.filter(el => regex.test(el.bidang.toLowerCase()))
					// console.log('queryBidang', queryBidang);
					if (queryBidang.length > 0) {
						query = queryBidang[0].id
					}
					else{
						this.$message.error('Nama Bidang Tidak Ditemukan');
						return
					}
				}
			}
			this.loadingPo = true
			let apiOptions = {
				method: 'get',
				url: 'procurement/bae',
				params: {
					perPage: this.limit,
					query: query,
					filter: filter,
					download: download,
					page: this.currentPage,
					total: this.total,
					startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
                    endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
					},
				timeout: 10 * 1000
			}

			if(download == true){
				apiOptions.responseType = "arraybuffer"
				this.loadingDownload = true
			}

			await api(apiOptions).then(result => {
				if(result.data.ec == 200){
					this.bae = result.data.data.rows
					this.bae.forEach(el=> {
						el.estimasi_harga = this.convertToRupiah(el.estimasi_harga || 0) || 0
						el.estimasi_harga_ppn = this.convertToRupiah(el.estimasi_harga_ppn || 0) || 0
					})
					this.total = result.data.data.count
					this.checkdate = moment().format('MM/DD/YYYY')
					// console.log('hahaha',this.checkdate)
					this.loadingPo = false
        		}
        		else if(download == true){
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([result.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Data BA Emergency.xlsx'); //or any other extension
							link.click();
						} catch(err){
							// console.log(err.message)
						}
					} else{
						this.$swal(this.$t('error'), "Terjadi kesalahan", "error")
					}
				}
				this.loadingDownload = false
				
			}).catch(error => {
				// console.log(error);
				this.loadingPo = false
				this.loadingDownload = false
			})
			this.loadingPo = false
			// this.clearForm()
		},
		convertToRupiah(angka)
		{
			var rupiah = '';		
			var angkarev = angka.toString().split('').reverse().join('');
			for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
			return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
		},
		convertToAngka(rupiah)
		{
			if (rupiah.includes("Rp. ")) {
				return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10);
			}
			else {
				return rupiah
			}
			
		},
		async paginateBAE(page) {
			// console.log('page', page)
			this.currentPage = page
				if (this.searchPO != '') {
				this.getPO(this.searchPO, false, this.searchBy);
			}
			else {
				this.getPO();
			}
		},
		addBAE() {
			this.loadingAddBAE = true

			if (this.form.no_pr.trim() == '' || this.form.no_kontrak.trim() == '' || this.form.status_pengadaan.trim() == '') {
				this.loadingAddBAE = false
				this.$message({
					type: 'warning',
					message: 'Lengkapi form yang belum terisi.'
				});
				return
			}

			api({
				method: 'post',
				url: 'procurement/bae',
				data: {
					no_ba: this.form.no_ba,
					judul_bae: this.form.judul_bae,
					tanggal_bae: this.form.tanggal_bae,
					nama_pekerjaan: this.form.deskripsi_pekerjaan,
					tanggal_loi: this.form.tanggal_loi,
					bidang: this.form.bidang,
					estimasi_harga: this.form.estimasi_harga,
					estimasi_harga_ppn: this.form.estimasi_harga_ppn,
					penyedia: this.form.penyedia,
					no_loi: this.form.no_loi,
					mulai_pekerjaan: this.form.mulai_pekerjaan,
					durasi: this.form.durasi,
					selesai_pekerjaan: this.form.selesai_pekerjaan,
					no_pr: this.form.no_pr,
					no_kontrak: this.form.no_kontrak,
					status_pengadaan: this.form.status_pengadaan
				}
			}).then(result => {
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data BA Emergency berhasil ditambahkan", "success")
					this.dialogAddBAE = false
					this.loadingAddBAE = false
					this.getPO()
					this.clearForm()
				} else {
					this.$message.error(result.data.message == 'invalid_value' ? 'Lengkapi kolom yang tersedia' : 'Terjadi kesalahan');
				}
				this.loadingBAE = false
				this.loadingAddBAE = false
			}).catch(error => {
				// console.log(error);
				this.loadingBAE = false
				this.loadingAddBAE = false
			})
			this.loadingBAE = false
		},

		updatePO() {
			this.loadingUpdatePo = true
			api({
				method: 'patch',
				url: 'procurement/bae/'+this.selectedEditPO.id,
				data: {
					no_ba: this.selectedEditPO.no_ba,
					judul_bae: this.selectedEditPO.judul_bae,
					tanggal_bae: this.selectedEditPO.tanggal_bae,
					nama_pekerjaan: this.selectedEditPO.nama_pekerjaan,
					bidang: this.selectedEditPO.bidang,
					tanggal_loi: this.selectedEditPO.tanggal_loi,
					estimasi_harga: this.selectedEditPO.estimasi_harga,
					estimasi_harga_ppn: this.selectedEditPO.estimasi_harga_ppn,
					penyedia: this.selectedEditPO.penyedia,
					no_loi: this.selectedEditPO.no_loi,
					mulai_pekerjaan: this.selectedEditPO.mulai_pekerjaan,
					durasi: this.selectedEditPO.durasi,
					selesai_pekerjaan: this.selectedEditPO.selesai_pekerjaan,
					no_pr: this.selectedEditPO.no_pr,
					no_kontrak: this.selectedEditPO.no_kontrak,
					status_pengadaan: this.selectedEditPO.status_pengadaan
				}
			}).then(result => {
				// console.log('result update', result)
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data BA Emergency berhasil di update", "success")
					this.dialogChangeBAE = false
					this.loadingUpdateBAE = false
					this.getPO()
				} else {
					this.$message.error(this.$t('error_text'));
				}
				this.loadingUpdateBAE = false
			}).catch(error => {
				console.log(error);
				this.loadingUpdateBAE = false
			})
			this.loadingUpdateBAE = false
		},

		updateToPO(row) {
			this.$confirm('Anda yakin ingin mengubah data ini menjadi PO?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Ya',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingSet = true
				api({
					method: 'patch',
					url: 'procurement/baeToPO/'+row.id,
					data: {
						no_ba: row.no_ba,
						judul_bae: row.judul_bae,
						nama_pekerjaan: row.nama_pekerjaan,
						bidang: row.bidang,
						estimasi_harga: parseInt(row.estimasi_harga),
						estimasi_harga_ppn: parseInt(row.estimasi_harga_ppn),
						penyedia: row.penyedia,
						no_loi: row.no_loi,
						mulai_pekerjaan: row.mulai_pekerjaan,
						durasi: parseInt(row.durasi),
						selesai_pekerjaan: row.selesai_pekerjaan,
						no_pr: row.no_pr,
						no_kontrak: row.no_kontrak,
						status_pengadaan: row.status_pengadaan
					}
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data telah diubah menjadi PO'
						});
						this.getPO()
					}
					this.loadingSet = false
				}).catch(error => {
					this.loadingSet = false
				})
				this.loadingSet = false
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Anda batal mengubah'
				});          
			});
		},

		getSummaries(param) {
			// console.log('param', param)
			const { columns, data } = param;
			const sums = [];
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = 'TOTAK KONTRAK PENGADAAN';
					return;
				}
				const values = data.map(item => Number(item[column.property]));
				if (!values.every(value => isNaN(value))) {
					sums[index] = '$ ' + values.reduce((prev, curr) => {
						const value = Number(curr);
						if (!isNaN(value)) {
							return prev + curr;
						} else {
							return prev;
						}
					}, 0);
				} else {
					sums[index] = 'N/A';
				}
			});

			return sums;
		},

		deletePO(id) {
			this.$confirm('Anda yakin akan menghapus data ini?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingDelete = true
				api({
					method: 'delete',
					url: 'procurement/bae/'+id
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data berhasil di hapus'
						});
						this.getPO()
					}
					this.loadingDelete = false
				}).catch(error => {
					this.loadingDelete = false
				})
				this.loadingDelete = false
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Hapus data di batalkan'
				});          
			});
		},

		setSelesai(row) {
			this.$confirm('Anda yakin untuk menandai data ini sebagai Selesai?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Ya',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingSet = true
				api({
					method: 'patch',
					url: 'procurement/poSelesai/'+row.id,
					data: {
						keterangan: "Selesai"
					}
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data telah ditandai sebagai selesai'
						});
						this.getPO()
					}
					this.loadingSet = false
				}).catch(error => {
					this.loadingSet = false
				})
				this.loadingSet = false
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Anda batal menandai'
				});          
			});
		},
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
			// console.log(this.$refs.singleTable);
		},

		clearForm(){
			this.form.judul_bae=""
			this.form.estimasi_harga=0
			this.form.estimasi_harga_ppn=0
			this.form.pic_pengadaan= ""
			this.form.jenis_anggaran= ""
			this.form.tahun_anggaran= ""
			this.form.bidang= ""
			this.form.sub_bidang= ""
			this.form.deskripsi_pekerjaan= ""
			this.form.metode_pengadaan= ""
			this.form.penyedia= ""
			this.form.no_pr= ""
			this.form.nilai_pr= 0
			this.form.nilai_pr_ppn= 0
			this.form.nilai_hps= 0
			this.form.tgl_masuk_dokumen= ""
			this.form.no_ba= ''
			this.form.no_loi=''
			this.form.tanggal_loi= ""
			this.form.tanggal_bae= ""
			//tgl_kirim_dokumen: ""
			this.form.durasi= ''
			this.form.status_keterlambatan= ""
			this.form.status_pengadaan= ""
			this.form.no_kontrak= ""
			this.form.tgl_kontrak= ""
			this.form.nilai_kontrak= 0
			this.form.nilai_kontrak_ppn= 0
			this.form.saving= 0
			this.form.mulai_pekerjaan= ""
			this.form.warning_date= ""
			this.form.selesai_pekerjaan= ""
			this.form.keterangan=""
			this.$refs.currInput.clearValue()
			this.value1 = true
			this.value2 = false
		},
		clearFormEdit(){
			this.selectedEditPO.judul_bae=""
			this.selectedEditPO.estimasi_harga=0
			this.selectedEditPO.estimasi_harga_ppn=0
			this.selectedEditPO.pic_pengadaan= ""
			this.selectedEditPO.jenis_anggaran= ""
			this.selectedEditPO.tahun_anggaran= ""
			this.selectedEditPO.bidang= ""
			this.selectedEditPO.sub_bidang= ""
			this.selectedEditPO.deskripsi_pekerjaan= ""
			this.selectedEditPO.metode_pengadaan= ""
			this.selectedEditPO.penyedia= ""
			this.selectedEditPO.no_pr= ""
			this.selectedEditPO.nilai_pr= 0
			this.selectedEditPO.nilai_pr_ppn= 0
			this.selectedEditPO.nilai_hps= 0
			this.selectedEditPO.tgl_masuk_dokumen= ""
			this.selectedEditPO.no_ba= ''
			this.selectedEditPO.no_loi=''
			this.selectedEditPO.tanggal_loi=''
			this.selectedEditPO.tanggal_bae=''
			//tgl_kirim_dokumen: ""
			this.selectedEditPO.durasi_pembuatan_po= ''
			this.selectedEditPO.status_keterlambatan= ""
			this.selectedEditPO.status_pengadaan= ""
			this.selectedEditPO.no_kontrak= ""
			this.selectedEditPO.tgl_kontrak= ""
			this.selectedEditPO.nilai_kontrak= 0
			this.selectedEditPO.nilai_kontrak_ppn= 0
			this.selectedEditPO.saving= 0
			this.selectedEditPO.mulai_pekerjaan= ""
			this.selectedEditPO.warning_date= ""
			this.selectedEditPO.selesai_pekerjaan= ""
			this.selectedEditPO.keterangan=""
			// this.$refs.currInput.clearValue()
			this.value1 = true
			this.value2 = false
		}
	},
	async mounted() {
		this.inRole()
		await this.getPO()
		await this.getJenisAnggaran()
		await this.getBidang()
		await this.getSubBidang()
		await this.getJenisPengadaan()
		await this.getPenyedia()
		await this.getStatusKeterlambatan()
		await this.getStatusPengadaan()
		// console.log(document.getElementById("po-main"));
		document.getElementById("po-main").addEventListener('click', (e)=> {
			let classes = Array.from(e.target.classList)
			//handle active row table
			if (classes.length != 0) {
				if (classes[0].includes("cell") || classes[0].includes("el-table")) {

				}
				else {
					this.setCurrent()
				}
			}
		});
	}
}
</script>

<style>
.el-autocomplete {
	display: block;
}

.chart {
	width: 100%;
	height: 400px;
}

.float-image {
	float: right;
	z-index: 1;
	bottom: 10px;
	left: 10px;
}

.gradient-api {
	background: #249393;
	background: linear-gradient(260deg, #4ac5c5, #249393);
}

.no-shadow {
	text-shadow: none;
}

.white-text {
	color: white;
}

.page-header {
	margin-bottom: 30px;
}
</style>

<style lang="scss">
.page-dashboard {
	.widget {
		.peity {
			position: absolute;
			bottom: -1px;
			left: 0;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
		}
	}
	table.styled {
		.peity {
			margin-right: 10px;
		}
	}
	.vb-content {
		padding: 0 20px;
		box-sizing: border-box !important;
		margin-top: -5px;
		margin-left: -20px;
		margin-right: -20px;
		height: calc(100% + 15px) !important;
		width: calc(100% + 40px) !important;
	}
}

@media (max-width: 768px) {
	.page-dashboard {
		.vb-content {
			padding: 0 5px !important;
			margin: -5px;
			width: calc(100% + 10px) !important;
		}
	}
}
</style>
