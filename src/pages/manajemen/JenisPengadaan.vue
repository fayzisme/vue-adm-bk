<template>
	<div class="scrollable only-y">
		<div class="page-header">
			<h1>Jenis Pengadaan</h1>
		</div>
		<el-card class="mb-10" v-if="inRole('superadmin')">
			<el-button type="" @click="dialogPengadaan({}, 'add')">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
		<el-card style="width: 100%;" v-loading="loadingJenisPengadaan">
			<el-table
			:data="jenispengadaan"
			style="width: 100%">
			<el-table-column
				prop="jenis_pengadaan"
				label="Jenis Pengadaan"
				width="">
			</el-table-column>
			<el-table-column
			v-if="inRole('superadmin')"
				label="Operations"
				width="">
				<template slot-scope="scope">
				<el-button type="text" @click="dialogPengadaan(scope.row, 'edit')" size="small">Edit</el-button>
				<el-button type="text" @click="dialogPengadaan(scope.row, 'delete')" size="small">Delete</el-button>
				</template>
			</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :visible.sync="dialogAddPengadaan" title="Tambah Jenis Pengadaan">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Jenis Pengadaan" :label-width="formLabelWidth">
					<el-input v-model="form.jenis_pengadaan" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddPengadaan = false">Cancel</el-button>
				<el-button v-if="dialogtype == 'add'" type="primary" @click="createPengadaan" :loading="loadingAddPengadaan">Submit</el-button>
				<el-button v-else type="primary" @click="updatePengadaan" :loading="loadingAddPengadaan">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Pengadaan"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Pengadaan: <strong>{{form.jenis_pengadaan}}</strong>?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeletePengadaan" type="primary" @click="deletePengadaan">Confirm</el-button>
		</span>
		</el-dialog>
	<!-- </div> -->
	</div>
</template>

<script>
import config from '../../config'
import api from '@/networkClient'
import moment from 'moment'
import _ from 'lodash'
import store from '@/store'

export default {
	name: 'JenisPengadaan',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
			jenispengadaan: [],
			dialogAddPengadaan: false,
			total: 0,
			loadingJenisPengadaan: false,
			loadingAddPengadaan: false,
			loadingDeletePengadaan: false,
			deleteDialogVisible: false,
			form: {
				jenis_pengadaan: ''
			},
			formLabelWidth: '',
			dialogtype: 'add',
			dialogTitle: '',

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
		dialogPengadaan(data,type){	
			console.log('data', data);
			this.dialogtype = type
			this.dialogTitle = 'Edit Pengadaan'
			this.form = data

			if (type == 'add') {
				this.dialogTitle = 'Tambah Pengadaan'
				this.form = {
					jenis_pengadaan: ''
				}
			}
			
			if (type == 'delete') {
				this.deleteDialogVisible = true
			}
			else {
				this.dialogAddPengadaan = true
			}
			
			
		},
		formatDate(str, format) {
			return moment(str).format("DD-MM-YYYY hh:mm:ss");
		},
		async getJenisPengadaan(page = 1, perPage = 10){
			this.loadingJenisPengadaan = true
			await api({
				method: 'get',
				url: 'jenis_pengadaan'
			}).then(result => {
				console.log('result jenis pengadaan',result)
				this.jenispengadaan = result.data.data.rows
				this.total = result.data.data.count
				this.loadingJenisPengadaan = false
			}).catch(error => {
				console.log(error);
				this.loadingJenisPengadaan = false
			})
			this.loadingJenisPengadaan = false
		},
		async createPengadaan(){
			this.loadingAddPengadaan = true
			await api({
				method: 'post',
				url: 'jenis_pengadaan',
				data: {
					jenis_pengadaan: this.form.jenis_pengadaan
				}
			}).then(result => {
				this.loadingAddPengadaan = false
				this.dialogAddPengadaan = false
				if (result.data.ec == 200) {
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getJenisPengadaan()
                  });
                } else if (result.data.ec == 400) {
                  this.$swal({
                    title: this.$t("error"),
                    text: result.data.message,
                    type: "error"
                  });
                } else {
                  this.$swal(this.$t("error"), this.$t("error_text"), "error");
                }
			}).catch(error => {
				console.log(error);
				this.loadingAddPengadaan = false
				this.dialogAddPengadaan = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddPengadaan = false
		},

		async updatePengadaan(){
			this.loadingAddPengadaan = true
			await api({
				method: 'post',
				url: 'jenis_pengadaan/update',
				data: {
					jenis_pengadaan: this.form
				}
			}).then(result => {
				// console.log('result rule',result)
				this.loadingAddPengadaan = false
				this.dialogAddPengadaan = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getJenisPengadaan()
                  });
                } else if (result.data.ec == 400) {
                  this.$swal({
                    title: this.$t("error"),
                    text: result.data.message,
                    type: "error"
                  });
                } else {
                  this.$swal(this.$t("error"), this.$t("error_text"), "error");
                }
			}).catch(error => {
				console.log(error);
				this.dialogAddRule = false
				this.loadingAddPengadaan = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddPengadaan = false
		},

		async deletePengadaan(){
			this.loadingDeletePengadaan = true
			await api({
				method: 'post',
				url: 'jenis_pengadaan/delete',
				data: {
					jenis_pengadaan: this.form
				}
			}).then(result => {
				// console.log('result rule',result)
				this.deleteDialogVisible = false
				this.loadingDeletePengadaan = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getJenisPengadaan()
                  });
                } else if (result.data.ec == 400) {
                  this.$swal({
                    title: this.$t("error"),
                    text: result.data.message,
                    type: "error"
                  });
                } else {
                  this.$swal(this.$t("error"), this.$t("error_text"), "error");
                }
			}).catch(error => {
				console.log(error);
				this.loadingDeletePengadaan = false
				this.deleteDialogVisible = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingDeletePengadaan = false
		},
	},
	async mounted(){
		this.inRole()
		this.getJenisPengadaan()
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
