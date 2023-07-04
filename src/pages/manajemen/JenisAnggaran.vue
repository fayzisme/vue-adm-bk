<template>
	<div class="scrollable only-y">
		<div class="page-header">
			<h1>Jenis Anggaran</h1>
		</div>
		<el-card class="mb-10" v-if="inRole('superadmin')">
			<el-button type="" @click="dialogJenisAnggaran({},'add')">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
		<el-card style="width: 100%;" v-loading="loadingJenisAnggaran">
			<el-table
			:data="jenisanggaran"
			style="width: 100%">
			<el-table-column
				prop="jenis_anggaran"
				label="Jenis Anggaran"
				width="">
			</el-table-column>
			<el-table-column
				v-if="inRole('superadmin')"
				label="Operations"
				width="">
				<template slot-scope="scope">
				<el-button type="text" @click="dialogJenisAnggaran(scope.row,'edit')" size="small">Edit</el-button>
				<el-button type="text" @click="dialogJenisAnggaran(scope.row,'delete')" size="small">Delete</el-button>
				</template>
			</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :visible.sync="dialogAddJenisAnggaran" :title="dialogTitle" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Jenis Anggaran" :label-width="formLabelWidth">
					<el-input v-model="form.jenis_anggaran" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddJenisAnggaran = false">Cancel</el-button>
				<el-button v-if="dialogtype == 'add'" type="primary" @click="createJenisAnggaran" :loading="loadingAddJenisAnggaran">Submit</el-button>
				<el-button v-else type="primary" @click="updateJenisAnggaran" :loading="loadingAddJenisAnggaran">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Jenis Anggaran"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Jenis Anggaran: <strong>{{form.jenis_pengadaan}}</strong>?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeleteJenisAnggaran" type="primary" @click="deleteJenisAnggaran">Confirm</el-button>
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
	name: 'JenisAnggaran',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
      jenisanggaran: [],
      total: 0,
      loadingJenisAnggaran: false,
	  loadingAddJenisAnggaran: false,
	  dialogAddJenisAnggaran: false,
	  loadingDeleteJenisAnggaran: false,
	  form: {
		  jenis_anggaran: ''
	  },
	  formLabelWidth: '',
	  dialogtype: 'add',
	  dialogTitle: '',
	  deleteDialogVisible: false,


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
		dialogJenisAnggaran(data,type){	

		this.dialogtype = type
		this.dialogTitle = 'Edit Jenis Anggaran'
		this.form = data

		if (type == 'add') {
			this.dialogTitle = 'Tambah Jenis Anggaran'
			this.form = {
				jenis_anggaran: ''
			}
		}
		
		if (type == 'delete') {
			this.deleteDialogVisible = true
		}
		else {
			this.dialogAddJenisAnggaran = true
		}
		
		
	},
    formatDate(str, format) {
      return moment(str).format("DD-MM-YYYY hh:mm:ss");
    },
		async getJenisAnggaran(page = 1, perPage = 10){
			this.loadingJenisAnggaran = true
			await api({
				method: 'get',
				url: 'jenis_anggaran'
			}).then(result => {
				this.jenisanggaran = result.data.data.rows
				console.log('result jenis anggaran',this.jenisanggaran)
				this.total = result.data.data.count
				this.loadingJenisAnggaran = false
			}).catch(error => {
				console.log(error);
				this.loadingJenisAnggaran = false
			})
			this.loadingJenisAnggaran = false
		},
		async createJenisAnggaran(){
			this.loadingAddJenisAnggaran = true
			await api({
				method: 'post',
				url: 'jenis_anggaran',
				data: {
					jenis_anggaran: this.form.jenis_anggaran
				}
			}).then(result => {
				this.dialogAddJenisAnggaran = false
				this.loadingAddJenisAnggaran = false
				if (result.data.ec == 200) {
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
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
				this.getJenisAnggaran()
			}).catch(error => {
				console.log(error);
				this.loadingAddJenisAnggaran = false
			})
			this.loadingAddJenisAnggaran = false
		},
		async updateJenisAnggaran(){
			this.loadingAddJenisAnggaran = true
			await api({
				method: 'post',
				url: 'jenis_anggaran/update',
				data: {
					jenis_anggaran: this.form
				}
			}).then(result => {
				this.dialogAddJenisAnggaran = false
				this.loadingAddJenisAnggaran = false
				if (result.data.ec == 200) {
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
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
				this.getJenisAnggaran()
			}).catch(error => {
				console.log(error);
				this.loadingAddJenisAnggaran = false
			})
			this.loadingAddJenisAnggaran = false
		},
		async deleteJenisAnggaran(){
			this.loadingDeleteJenisAnggaran = true
			await api({
				method: 'post',
				url: 'jenis_anggaran/delete',
				data: {
					jenis_anggaran: this.form
				}
			}).then(result => {
				this.deleteDialogVisible = false
				this.loadingDeleteJenisAnggaran = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
				
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
				this.getJenisAnggaran()
			}).catch(error => {
				console.log(error);
				this.loadingDeleteJenisAnggaran = false
				this.deleteDialogVisible = false
			})
			this.loadingDeleteJenisAnggaran = false
		}
	},
	async mounted(){
		this.inRole()
		this.getJenisAnggaran()
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
