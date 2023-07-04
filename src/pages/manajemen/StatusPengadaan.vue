<template>
	<div class="scrollable only-y">
		<div class="page-header">
			<h1>Status Pengadaan</h1>
		</div>
		<el-card class="mb-10" v-if="inRole('superadmin')">
			<el-button type="" @click="dialogStatusPengadaan({},'add')">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
		<el-card style="width: 100%;">
			<el-table
			v-loading="loadingStatusPengadaan"
			:data="statuspengadaan"
			style="width: 100%">
			<el-table-column
				prop="status"
				label="Status Pengadaan"
				width="">
			</el-table-column>
			<el-table-column
			v-if="inRole('superadmin')"
				label="Operations"
				width="">
				<template slot-scope="scope">
				<el-button type="text" @click="dialogStatusPengadaan(scope.row,'edit')" size="small">Edit</el-button>
				<el-button type="text" @click="dialogStatusPengadaan(scope.row,'delete')" size="small">Delete</el-button>
				</template>
			</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :visible.sync="dialogAddStatusPengadaan" :title="dialogTitle" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Status Pengadaan" :label-width="formLabelWidth">
					<el-input v-model="form.status" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddStatusPengadaan = false">Cancel</el-button>
				<el-button v-if="dialogtype == 'add'" type="primary" @click="createStatusPengadaan" :loading="loadingAddStatusPengadaan">Submit</el-button>
				<el-button v-else type="primary" @click="updateStatusPengadaan" :loading="loadingAddStatusPengadaan">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Status Pengadaan"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Status Pengadaan: <strong>{{form.status}}</strong>?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeleteStatusPengadaan" type="primary" @click="deleteStatusPengadaan">Confirm</el-button>
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
	name: 'StatusPengadaan',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
      statuspengadaan: [],
      total: 0,
      loadingStatusPengadaan: false,
	  loadingAddStatusPengadaan: false,
	  dialogAddStatusPengadaan: false,
	  loadingDeleteStatusPengadaan: false,
	  dialogtype: '',
	  dialogTitle: '',
	  form : {
		  status: ''
	  },
	  deleteDialogVisible: false,
	  formLabelWidth:''
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
	dialogStatusPengadaan(data,type){	

		this.dialogtype = type
		this.dialogTitle = 'Edit Status Pengadaan'
		this.form = data

		if (type == 'add') {
			this.dialogTitle = 'Tambah Status Pengadaan'
			this.form = {
				status: ''
			}
		}
		
		if (type == 'delete') {
			this.deleteDialogVisible = true
		}
		else {
			this.dialogAddStatusPengadaan = true
		}
		
		
	},
    formatDate(str, format) {
      return moment(str).format("DD-MM-YYYY hh:mm:ss");
    },
		async getStatusPengadaan(page = 1, perPage = 10){
			this.loadingStatusPengadaan = true
			await api({
				method: 'get',
				url: 'status_pengadaan'
			}).then(result => {
				this.statuspengadaan = result.data.data.rows
				console.log('result status pengadaan',this.statuspengadaan)
				this.total = result.data.data.count
				this.loadingStatusPengadaan = false
			}).catch(error => {
				console.log(error);
				this.loadingStatusPengadaan = false
			})
			this.loadingStatusPengadaan = false
		},

		async createStatusPengadaan(){
			this.loadingAddStatusPengadaan = true
			await api({
				method: 'post',
				url: 'status_pengadaan',
				data: {
					status_pengadaan: this.form.status
				}
			}).then(result => {
				this.dialogAddStatusPengadaan = false
				this.loadingAddStatusPengadaan = false
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
				this.getStatusPengadaan()
			}).catch(error => {
				console.log(error);
				this.loadingAddStatusPengadaan = false
			})
			this.loadingAddStatusPengadaan = false
		},
		async updateStatusPengadaan(){
			this.loadingAddStatusPengadaan = true
			await api({
				method: 'post',
				url: 'status_pengadaan/update',
				data: {
					status_pengadaan: this.form
				}
			}).then(result => {
				this.dialogAddStatusPengadaan = false
				this.loadingAddStatusPengadaan = false
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
				this.getStatusPengadaan()
			}).catch(error => {
				console.log(error);
				this.loadingAddStatusPengadaan = false
			})
			this.loadingAddStatusPengadaan = false
		},
		async deleteStatusPengadaan(){
			this.loadingDeleteStatusPengadaan = true
			await api({
				method: 'post',
				url: 'status_pengadaan/delete',
				data: {
					status_pengadaan: this.form
				}
			}).then(result => {
				this.deleteDialogVisible = false
				this.loadingDeleteStatusPengadaan = false
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
				this.getStatusPengadaan()
			}).catch(error => {
				console.log(error);
				this.loadingDeleteStatusPengadaan = false
				this.deleteDialogVisible = false
			})
			this.loadingDeleteStatusPengadaan = false
		}
	},
	async mounted(){
		this.inRole()
		this.getStatusPengadaan()
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
