<template>
	<div id='po-main' class="scrollable only-y">
		<div class="page-header">
			<h1>{{ $t("menu.tagihan") }}</h1>
		</div>
		<!-- <el-card class="mb-10">
			<el-row> -->
				<!-- <el-col :span="4" class="mr-10">
					<el-button @click="dialogAddBAE=true" v-if="inRole('superadmin')">
						<i class="mdi mdi-plus"></i> Tambah
					</el-button>
				</el-col> -->
				<!-- <el-col :span="10">
					<el-row>
						<el-col style="display:flex; flex-wrap: wrap;" :span="24">
							<el-input
								style="flex-basis: 200px; margin-right: 10px;"
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
								Filter by Date :
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
				</el-col> -->
				<!-- <el-col :span="3">
					<el-button  style="width: 100%; height: 40px;" :loading='loadingDownload' class="animated fadeInRight" type="primary" small @click="download">
						<i class="mdi mdi-download"></i> Download
					</el-button>	
				</el-col> -->
			<!-- </el-row>
		</el-card> -->
		<el-card v-loading="loadingBAE">
			<!-- <div class="block mb-20">
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
			</div> -->
			
			<el-table ref="singleTable" :data="tagihan" style="width: 100%">
				<el-table-column fixed prop="created_at" label="CREATED AT" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.created_at) }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_bapp"
					label="NO BAPP"
					width="250">
					<template slot-scope="props">
						{{ props.row.no_bapp || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_kontrak"
					label="NO KONTRAK"
					width="600">
					<template slot-scope="props">
						{{ props.row.no_kontrak || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_do_so_spmk"
					label="NO DO/SO/SPMK"
					width="550">
					<template slot-scope="props">
						{{ props.row.no_do_so_spmk || "-" }}
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
				<el-table-column
					prop="tanggal_terima_ba_dari_keuangan"
					label="TGL TERIMA BA DARI KEUANGAN"
					width="300">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_terima_ba_dari_keuangan) || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="nilai_ba"
					label="NILAI BA (INC. PPN)"
					width="300">
					<template slot-scope="props">
						{{ props.row.nilai_ba || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="nilai_denda"
					label="NILAI DENDA"
					width="250">
					<template slot-scope="props">
						{{ props.row.nilai_denda || '-' }}
					</template>
				</el-table-column>
				<el-table-column
					prop="email_vendor"
					label="EMAIL VENDOR"
					width="300">
					<template slot-scope="props">
						{{ props.row.email_vendor || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_email_ke_vendor"
					label="TGL EMAIL KE VENDOR"
					width="300">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_email_ke_vendor) || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_terima_invoice"
					label="TGL TERIMA INVOICE"
					width="300">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_terima_invoice) || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="voucher_number"
					label="VOUCHER NUMBER"
					width="150">
					<template slot-scope="props">
						{{ props.row.voucher_number || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_bayar"
					label="TGL BAYAR"
					width="200">
					<template slot-scope="props">
						{{ props.row.tanggal_bayar || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					prop="status"
					label="STATUS TAGIHAN"
					width="220">
					<template slot-scope="props">
						{{ props.row.status || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="Operations"
					width="300">
					<template slot-scope="scope">
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' ? true: false" size="small" @click="doShowDialogEdit(scope.row)">
							Edit
						</el-button>
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' ? true: false" type="danger" size="small" @click="deletePO(scope.row.id)">
							Delete
						</el-button>
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
					@current-change="paginatePO"
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
					<el-input v-model="form.no_ba" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Judul BAE" :label-width="formLabelWidth">
					<el-input v-model="form.judul_bae" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Deskripsi Pekerjaan" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="form.deskripsi_pekerjaan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Bidang</div>
					<el-select filterable v-model="form.bidang" style="width:100%">
						<el-option label="Pilih bidang" value=""></el-option>
						<el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Estimasi Harga (Rp)" :label-width="formLabelWidth">
					<CurrencyInput
						ref="currInput"
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="form.estimasi_harga" auto-complete="off"
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
				<el-form-item label="No LOI" :label-width="formLabelWidth">
					<el-input v-model="form.no_loi" auto-complete="off" type="text"></el-input>
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

		<el-dialog @close="getPO(),clearFormEdit()" :visible.sync="dialogChangeBAE" :title="'Edit Tagihan : '+selectedEditPO.no_bapp"  :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="selectedEditPO">
				<el-form-item label="No BAPP" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_bapp" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="No Kontrak" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="No DO/SO/SPMK" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_do_so_spmk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Penyedia" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.penyedia" readonly auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item>
					<div>Penyedia</div>
					<el-select filterable v-model="selectedEditPO.penyedia" style="width:100%">
						<el-option label="Pilih penyedia" value=""></el-option>
						<el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="Tanggal Terima BA dari Keuangan" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.tanggal_terima_ba_dari_keuangan" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Nilai BA" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nilai_ba" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Nilai Denda" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nilai_denda" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Email Vendor" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.email_vendor" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal Email ke Vendor" :label-width="formLabelWidth">
					<el-input placeholder="Tanggal kirim email ke vendor" v-model="selectedEditPO.tanggal_email_ke_vendor" readonly auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal Terima Invoice" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_terima_invoice" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Bayar" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_bayar" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Voucher Number" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.voucher_number" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Status Tagihan</div>
					<el-select filterable v-model="selectedEditPO.status" style="width:100%">
						<!-- <el-option label="Pilih status tagihan" value=""></el-option> -->
						<el-option v-for="(item, k) in statusTagihan" :key="k" :label="item.label" :value="item.value"></el-option>
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
			value1 : false,
			value2: false,
			allowedRole: store.getters.allowedRole,
			date1: null,
			searchBAE:'',
			bae: [ { bae: [] } ],
			tagihan: [ { tagihan: [] } ],
			bapp: [{
				no_bapp: "",
				no_kontrak: "",
				no_do_so_spmk:"",
				penyedia:"",
				tgl_terima_ba:"",
				nilai_ba:"",
				nilai_denda: "",
				email_vendor:"",
				tanggal_kirim_email: "",
				tanggal_terima_invoice: "",
				voucher_number:"",
				tanggal_bayar:"",
				status:""
			}],
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
				deskripsi_pekerjaan: "",
				bidang: "",
				estimasi_harga: "",
				penyedia: "",
				no_loi: '',
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
			statusTagihan: [{
				label: "Tagihan OK",
				value: "OK"
			},{
				label: "Revisi Tagihan",
				value: "Revisi"
			},{
				label: "Tagihan Terbayar",
				value: "Terbayar"
			}],
			selectedEditPO: {
				no_bapp: '',
				no_kontrak: "",
				no_do_so_spmk: "",
				penyedia: "",
				tanggal_terima_ba_dari_keuangan: "",
				nilai_ba: "",
				nilai_denda: "",
				email_vendor: "",
				tanggal_email_ke_vendor: "",
				tanggal_terima_invoice: "",
				voucher_number: "",
				tanggal_bayar: "",
				status: ""
			},
			searchByList: [
				{ by: "metode_pengadaan", name: "Metode Pengadaan" },
				{ by: "status_pengadaan", name: "Status Pengadaan" },
				{ by: "jenis_anggaran", name: "Jenis Anggaran" },
				{ by: "bidang", name: "Bidang" },
				{ by: "pic_pengadaan", name: "PIC Pengadaan" },
				{ by: "sub_bidang", name: "Sub Bidang" },
				{ by: "tahun_anggaran", name: "Tahun Anggaran" },
				{ by: "deskripsi_pekerjaan", name: "Deskripsi Pekerjaan" },
				{ by: "penyedia", name: "Penyedia" },
				{ by: "no_pr", name: "Nomor PR" },
				{ by: "no_ba", name: "Nomor BA" },
				{ by: "no_loi", name: "Nomor LOI" },
				{ by: "no_kontrak", name: "Nomor Kontrak" },
				{ by: "keterangan", name: "Keterangan" },
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
				if (this.searchPO.length >= 1) {
				this.currentPage = 1;
				this.getPO(this.searchPO, false, this.searchBy);
				} else {
				this.getPO();
				}
			}, 1000);
		},
		disabledDate(date) {
				return new Date() < date
		},
		download(){
			this.getPO(this.searchPO,true, this.searchBy)
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
			this.form.nilai_pr_ppn = this.form.nilai_pr
				this.selectedEditPO.nilai_pr_ppn = this.selectedEditPO.nilai_pr
			if(parseInt(this.form.nilai_pr) != 0 && this.form.nilai_pr != '' && this.value1 == true){
				// console.log('trim',this.form.nilai_pr)
				this.form.nilai_pr_ppn = (11 / 100 * parseInt(this.form.nilai_pr)) + parseInt(this.form.nilai_pr)
			}
			if(parseInt(this.selectedEditPO.nilai_pr) != 0 && this.selectedEditPO.nilai_pr && this.value1 == true){
				this.selectedEditPO.nilai_pr_ppn = (11 / 100 * parseInt(this.selectedEditPO.nilai_pr)) + parseInt(this.selectedEditPO.nilai_pr)
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
			console.log('key edit',key);
			this.dialogChangeBAE = true;
			// key.estimasi_harga = this.convertToAngka(key.estimasi_harga)
			// key.nilai_pr = this.convertToAngka(key.nilai_pr)
			// key.nilai_kontrak = this.convertToAngka(key.nilai_kontrak)
			this.selectedEditPO = key
		},

		// clearForm(){
		// 	this.form = {
		// 		pic_pengadaan: "",
		// 		jenis_anggaran: "",
		// 		tahun_anggaran: "",
		// 		bidang: "",
		// 		sub_bidang: "",
		// 		deskripsi_pekerjaan: "",
		// 		metode_pengadaan: "",
		// 		penyedia: "",
		// 		no_pr: "",
		// 		nilai_pr: '',
		// 		nilai_pr_ppn: '',
		// 		nilai_hps: '',
		// 		tgl_masuk_dokumen: "",
		// 		no_ba: '',
		// 		no_loi: '',
		// 		//tgl_kirim_dokumen: "",
		// 		durasi_pembuatan_po: '',
		// 		status_keterlambatan: "",
		// 		status_pengadaan: "",
		// 		no_kontrak: "",
		// 		tgl_kontrak: "",
		// 		nilai_kontrak: '',
		// 		nilai_kontrak_ppn: '',
		// 		saving: 0,
		// 		mulai_pekerjaan: "",
		// 		warning_date: "",
		// 		selesai_pekerjaan: "",
		// 		keterangan: ""
		// 	}
		// },

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
			return moment(str).format("DD-MMM-YYYY");
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
				console.log("bidang",this.bidang)
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
				url: 'procurement/tagihan',
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
					console.log('result tagihan', result)
					this.tagihan = result.data.data.rows
					this.total = result.data.data.count
					// this.checkdate = moment().format('MM/DD/YYYY')
					// console.log('hahaha',this.checkdate)
					this.loadingPo = false
        		}
        		else if(download == true){
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([result.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Data PO.xlsx'); //or any other extension
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
		async paginatePO(page) {
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
			api({
				method: 'post',
				url: 'procurement/bae',
				data: {
					no_ba: this.form.no_ba,
					judul_bae: this.form.judul_bae,
					nama_pekerjaan: this.form.deskripsi_pekerjaan,
					bidang: this.form.bidang,
					estimasi_harga: this.form.estimasi_harga,
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
				url: 'procurement/tagihan/'+this.selectedEditPO.id,
				data: {
					no_bapp: this.selectedEditPO.no_bapp,
					no_kontrak: this.selectedEditPO.no_kontrak,
					no_do_so_spmk: this.selectedEditPO.no_do_so_spmk,
					penyedia: this.selectedEditPO.penyedia,
					tanggal_terima_ba_dari_keuangan: this.selectedEditPO.tanggal_terima_ba_dari_keuangan,
					nilai_ba: this.selectedEditPO.nilai_ba,
					nilai_denda: this.selectedEditPO.nilai_denda,
					email_vendor: this.selectedEditPO.email_vendor,
					tanggal_email_ke_vendor: this.selectedEditPO.tanggal_email_ke_vendor,
					tanggal_terima_invoice: this.selectedEditPO.tanggal_terima_invoice,
					voucher_number: this.selectedEditPO.voucher_number,
					tanggal_bayar: this.selectedEditPO.tanggal_bayar,
					status: this.selectedEditPO.status
				}
			}).then(result => {
				// console.log('result update', result)
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data tagihan berhasil di update", "success")
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
			console.log('id hapus',id)
			this.$confirm('Anda yakin akan menghapus data tagihan ini?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingDelete = true
				api({
					method: 'delete',
					url: 'procurement/tagihan/'+id
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data tagihan berhasil di hapus'
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
			console.log('id selesai',row)
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
			this.value1 = false
			this.value2 = false
		},
		clearFormEdit(){
			this.selectedEditPO.judul_bae=""
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
			this.value1 = false
			this.value2 = false
		}
	},
	async mounted() {
		this.inRole()
		await this.getPO()
		// await this.getJenisAnggaran()
		// await this.getBidang()
		// await this.getSubBidang()
		// await this.getJenisPengadaan()
		// await this.getPenyedia()
		// await this.getStatusKeterlambatan()
		// await this.getStatusPengadaan()
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
