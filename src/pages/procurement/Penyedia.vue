<template>
	<div class="scrollable only-y">
		<div class="page-header">
      <h1>{{ $t("menu.penyedia") }}</h1>
    </div>
		<el-card class="mb-10">
			<el-row>
				<el-col :span="4" class="mr-20" style="border: 0px solid black;">
						<el-button type="" @click="dialogAddPenyedia=true" v-if="inRole('superadmin')">
							<i class="mdi mdi-plus"></i> Tambah
						</el-button>
				</el-col>
				<el-col :span="12" style="border: 0px solid black;">
					<el-row>
						<el-col style="display:flex; flex-wrap: wrap;" :span="24">
							<el-input
								style="width: 450px;"
								prefix-icon="el-icon-search"
								:placeholder="`Search`"
								clearable
								@keypress.native="doSearchPenyedia"
								@clear="doSearchPenyedia"
								@keyup.native.delete="doSearchPenyedia"
								v-model="searchPenyedia"
							></el-input>
							<el-select @change="doSearchPenyedia" placeholder="Filter by" v-model="searchBy">
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
				<!--<el-col :span="10">
					<el-row>
						<el-col style="text-align:center; padding-top: 10px;" :span="10">
							<span>
								Cari Nama Penyedia:
							</span>	
						</el-col>
						<el-col :span="10">
							<el-input
							clearable
							@keypress.native="doSearchPenyedia"
							@clear="clearSearchPenyedia"
							@keyup.native.delete="doSearchPenyedia"
							v-model="searchPenyedia" 
							placeholder="Search penyedia by name">
							</el-input>
						</el-col>
						
					</el-row>
				</el-col>-->
				<el-col :span="3" style="border: 0px solid black; float: right;">
						<el-button :loading='loadingDownload' class="animated fadeInRight" type="primary" small @click="download">
							<i class="mdi mdi-download"></i> Download Data
						</el-button>	
				</el-col>
			</el-row>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
		<el-card>
			<div class="block mb-20">
				<el-pagination
					background
					prev-text="Prev"
					next-text="Next"
					layout="prev, pager, next"
					:page-size="30"
					@current-change="paginatePenyedia"
					:current-page="currentPage"
					:total="parseInt(total)">
				</el-pagination>
			</div>
			<el-table
		    :data="penyedia"
		    style="width: 100%">
		    <el-table-column
		      fixed
		      prop="created_at"
		      label="TANGGAL"
		      width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.created_at) }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="nama"
		      label="NAMA"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="EMAIL"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      prop="phone_number"
		      label="PHONE NUMBER"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="ADDRESS"
		      width="300">
		    </el-table-column>
			<el-table-column
		      prop="kompetensi_1"
		      label="Kompetensi 1"
		      width="300">
		    </el-table-column>
			<el-table-column
		      prop="kompetensi_2"
		      label="Kompetensi 2"
		      width="300">
		    </el-table-column>
			<el-table-column
		      prop="kompetensi_3"
		      label="CSMS"
		      width="300">
		    </el-table-column>
		    <el-table-column v-if="inRole('superadmin')"
		      fixed="right"
		      label="Operations"
		      width="200">
		      <template slot-scope="scope">
		        <el-button type="text" size="small" @click="doShowDialogEdit(scope.row)">Edit</el-button>
		        <el-button type="text" size="small" @click="deletePenyedia(scope.row)" :loading="loadingDelete">Delete</el-button>
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
					:page-size="30"
					@current-change="paginatePenyedia"
					:current-page="currentPage"
					:total="parseInt(total)">
				</el-pagination>
		  </div>
		</el-card>
		<el-dialog :visible.sync="dialogAddPenyedia" title="Tambah Penyedia" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="form">
		    <el-form-item label="Nama" :label-width="formLabelWidth">
		      <el-input v-model="form.nama" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Email" :label-width="formLabelWidth">
		      <el-input v-model="form.email" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Nomor Telepon" :label-width="formLabelWidth">
		      <el-input v-model="form.phone_number" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Alamat" :label-width="formLabelWidth">
		      <el-input v-model="form.address" auto-complete="off" type="textarea"></el-input>
		    </el-form-item>
			<el-form-item label="Kompetensi 1" :label-width="formLabelWidth">
		      <el-input v-model="form.kompetensi_1" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			<el-form-item label="Kompetensi 2" :label-width="formLabelWidth">
		      <el-input v-model="form.kompetensi_2" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			<el-form-item label="CSMS" :label-width="formLabelWidth">
		      <el-input v-model="form.kompetensi_3" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddPenyedia = false">Cancel</el-button>
				<el-button type="primary" @click="addPenyedia" :loading="loadingAddPenyedia">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog :visible.sync="dialogChange" title="Edit Penyedia" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="form">
		    <el-form-item label="Nama" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.nama" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Email" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.email" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Nomor Telepon" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.phone_number" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Alamat" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.address" auto-complete="off" type="textarea"></el-input>
		    </el-form-item>
			<el-form-item label="Kompetensi 1" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.kompetensi_1" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			<el-form-item label="Kompetensi 2" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.kompetensi_2" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			<el-form-item label="CSMS" :label-width="formLabelWidth">
		      <el-input v-model="selectedEdit.kompetensi_3" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogChange = false">Cancel</el-button>
				<el-button type="primary" @click="updatePenyedia" :loading="loadingChange">Submit</el-button>
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

export default {
	name: 'Penyedia',
	directives: {
        'echarts': V_Echarts
	},
	components: {
		Chart,
		ChartLabel
  	},
	data () {
		return {
			// penyedia: [],
			allowedRole: store.getters.allowedRole,
			penyedia: [ { penyedia: [] } ],
			loadingPenyedia: false,
			loadingAddPenyedia: false,
			loadingChange: false,
			loadingDownload: false,
			loadingDelete: false,
			dialogAddPenyedia: false,
			dialogChange: false,
			selectedEdit: {},
			form: {
				nama: '',
				email: '',
				phone_number: '',
				address: '',
				kompetensi_1: '',
				kompetensi_2: '',
				kompetensi_3: ''
			},
			formLabelWidth: '',
			currentPage: 1,
			searchPenyedia: '',
			total: 0,
			selectedStatusToEdit: '',
			timeout: null,
			searchByList: [
				{ by: "nama", name: "Nama Penyedia" },
				{ by: "email", name: "Email" },
				{ by: "phone_number", name: "Nomor Telepon" },
				{ by: "address", name: "Address" },
				{ by: "kompetensi_1", name: "Kompetensi 1" },
				{ by: "kompetensi_2", name: "Kompetensi 2" },
				{ by: "kompetensi_3", name: "Kompetensi 3" }
			],
			searchBy: ''
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	methods: {
		download(){
			this.getPenyedia(this.searchPenyedia, true, this.searchBy)
		},
		clearSearchPenyedia(){
			this.currentPage = 1;
			this.getPenyedia();
		},
		doSearchPenyedia(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchPenyedia.length >= 3) {
				this.currentPage = 1;
				this.getPenyedia(this.searchPenyedia, false, this.searchBy);
				} else {
				this.getPenyedia();
				}
			}, 1000);
		},
		inRole(val, val2) {
			if(this.allowedRole.replace(/\s/g, '').includes(val) || this.allowedRole.replace(/\s/g, '').includes(val2)) {
				return true;
			} else {
				return false;
			}
		},
		formatDate(str, format) {
			return moment(str).format("DD-MM-YYYY hh:mm:ss");
		},
		doShowDialogEdit(key){
			this.dialogChange = true;
			this.selectedEdit = key;
			this.selectedStatusToEdit = this.penyedia[key].id

		},
		buildQueryParam(key = null, val = null){
			// let q = window.location.search.split("?")
			// q.shift()
			// console.log(q)
			// if(q.length < 1){
			// 	q = { [key]: val }
			// } else {
			// 	_.map(q[0].split("&"), (val, key) => {
			// 		let [k, v] = val.split("=")
			// 		q.push({ [k]: v })
			// 	})
			// }
			// console.log(q)
			// let query =_.map(q, (val, key) => {
			// 	return { key: key, value: val }
			// })
			// if(key != null) {
			// 	let index = _.findIndex(query, v => v.key == key)
			// 	if(index !== -1){
			// 		query[index] = { key: key, value: val }
			// 	} else {
			// 		query.push({ key: key, value: val })
			// 	}
			// }
			// query = query.filter(v => { return v.value != null && v.value != "" })
			// // this.$route.query[key] = val
			// window.history.replaceState(null, null, "?" + query.map((v, k) => { return v.key + "=" + v.value }).join("&"));
		},
		async getPenyedia(query="", download = false, filter = ''){
			this.loadingPenyedia = true
			let apiOptions = {
				method: 'get',
				url: 'procurement/provider',
				params: {
					page: this.currentPage,
					query: query,
					filter: filter,
					download: download,
					total: this.total,
				},
				timeout: 10 * 1000
			}

			if(download == true){
				apiOptions.responseType = "arraybuffer"
				this.loadingDownload = true
			}

			await api(apiOptions).then(result => {
				if(result.data.ec == 200){
					// console.log('result penyedia',result)
					this.penyedia = result.data.data.rows
					this.total = result.data.data.count
        		}
        		else if(download == true){
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([result.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Data Penyedia.xlsx'); //or any other extension
							link.click();
						} catch(err){
							// console.log(err.message)
						}
					} else{
						this.$swal(this.$t('error'), "Terjadi kesalahan", "error")
					}
				}
				this.loadingDownload = false
				this.loadingPenyedia = false
			}).catch(error => {
				console.log(error);
				this.loadingPenyedia = false
				this.loadingDownload = false
			})
			this.loadingPenyedia = false
		},
		addPenyedia(){
			this.loadingAddPenyedia = true
			api({
				method: 'post',
				url: 'procurement/provider',
				data: {
					nama:this.form.nama,
					email:this.form.email,
					phone_number:this.form.phone_number,
					address:this.form.address,
					kompetensi_1: this.form.kompetensi_1,
					kompetensi_2: this.form.kompetensi_2,
					kompetensi_3: this.form.kompetensi_3
				}
			}).then(result => {
				// console.log('result penyedia',result)
				if(result.data.ec == 200){
					this.$swal(this.$t('success'), "Data Penyedia berhasil ditambahkan", "success")
					// this.penyedia = result.data.data.rows
					this.loadingAddPenyedia = false
					this.dialogAddPenyedia = false
					this.getPenyedia()
				} else {
					this.$message.error(this.$t('error_text'));
				}
				this.loadingPenyedia = false
			}).catch(error => {
				console.log(error);
				this.loadingPenyedia = false
			})
			this.loadingPenyedia = false
		},
		updatePenyedia(id){
			this.loadingChange = true
			api({
				method: 'patch',
				url: 'procurement/provider/'+this.selectedEdit.id,
				data: {
					nama:this.selectedEdit.nama,
					email:this.selectedEdit.email,
					phone_number:this.selectedEdit.phone_number,
					address:this.selectedEdit.address,
					kompetensi_1: this.selectedEdit.kompetensi_1,
					kompetensi_2: this.selectedEdit.kompetensi_2,
					kompetensi_3: this.selectedEdit.kompetensi_3
				}
			}).then(result => {
				// console.log('result penyedia',result)
				if(result.data.ec == 200){
					this.$swal(this.$t('success'), "Data Penyedia berhasil diupdate", "success")
					// this.penyedia = result.data.data.rows
					this.loadingChange = false
					this.dialogChange = false
					this.getPenyedia()
				} else {
					this.$message.error(this.$t('error_text'));
				}
				this.loadingChange = false
			}).catch(error => {
				console.log(error);
				this.loadingChange = false
			})
			this.loadingChange = false
		},
		async paginatePenyedia(page){
			// console.log('page',page)
			this.currentPage = page
			if (this.searchPenyedia != '') {
				this.getPenyedia(this.searchPenyedia, false, this.searchBy);
			}
			else {
				this.getPenyedia();
			}
		},
		deletePenyedia(row) {
			console.log('id hapus',row.id)
			this.$confirm('Anda yakin akan menghapus data ini?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingDelete = true
				api({
					method: 'delete',
					url: 'procurement/provider/'+row.id
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data berhasil di hapus'
						});
						this.getPenyedia()
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
    getSummaries(param) {
		console.log('param',param)
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
		}
	},
	async mounted(){
		this.inRole()
		this.getPenyedia()
		// this.overview_wa()
		// await this.wa_detail()
		// this.fetchOverview()
		// this.fetchTicket()
		// this.getTopHsm()
		// this.getUniqueUser()
		// this.uniqueOutbound()
	}
}
</script>

<style lang="scss" scoped>
.chart {
     width: 100%;
     height: 400px;
 }
.float-image {
	float:right;
	z-index: 1;
	bottom: 10px;
	left: 10px;
}
.gradient-api {
	background:#249393;
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
