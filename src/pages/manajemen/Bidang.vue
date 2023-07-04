<template>
	<div class="scrollable only-y">
		<div class="page-header">
			<h1>Bidang</h1>
		</div>
		<el-card class="mb-10" v-if="inRole('superadmin')">
			<el-button type="" @click="dialogBidang({}, 'add')">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
		<el-card style="width: 100%;" v-loading="loadingBidang">
			<el-table
			:data="bidang"
			style="width: 100%">
			<el-table-column
				prop="bidang"
				label="Bidang"
				width="">
			</el-table-column>
			<el-table-column
				v-if="inRole('superadmin')"
				label="Operations"
				width="">
				<template slot-scope="scope">
				<el-button type="text" @click="dialogBidang(scope.row, 'edit')" size="small">Edit</el-button>
				<el-button type="text" @click="dialogBidang(scope.row, 'delete')" size="small">Delete</el-button>
				</template>
			</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :visible.sync="dialogAddBidang" :title="dialogTitle">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Bidang" :label-width="formLabelWidth">
					<el-input v-model="form.bidang" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddBidang = false">Cancel</el-button>
				<el-button v-if="dialogtype == 'add'" type="primary" @click="createBidang" :loading="loadingAddBidang">Submit</el-button>
				<el-button v-else type="primary" @click="updateBidang" :loading="loadingAddBidang">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Bidang"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Bidang: <strong>{{form.bidang}}</strong>?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeleteBidang" type="primary" @click="deleteBidang">Confirm</el-button>
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
	name: 'bidang',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
      bidang: [],
      total: 0,
      loadingBidang: false,
	  loadingAddBidang: false,
	  loadingDeleteBidang: false,
	  dialogAddBidang: false,
	  form: {
		  bidang: ''
	  },
	  formLabelWidth: '',
	  dialogtype: 'add',
	  dialogTitle: '',
	  deleteDialogVisible: false
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
	dialogBidang(data,type){	
		console.log('data', data);
		this.dialogtype = type
		this.dialogTitle = 'Edit Bidang'
		this.form = data

		if (type == 'add') {
			this.dialogTitle = 'Tambah Bidang'
			this.form = {
				bidang: ''
			}
		}
		
		if (type == 'delete') {
			this.deleteDialogVisible = true
		}
		else {
			this.dialogAddBidang = true
		}
		
		
	},
    formatDate(str, format) {
      return moment(str).format("DD-MM-YYYY hh:mm:ss");
    },
		async getBidang(page = 1, perPage = 10){
			this.loadingBidang = true
			await api({
				method: 'get',
				url: 'bidang'
			}).then(result => {
				console.log('result bidang',result)
				this.bidang = result.data.data.rows
				this.total = result.data.data.count
				this.loadingBidang = false
			}).catch(error => {
				console.log(error);
				this.loadingBidang = false
			})
			this.loadingBidang = false
		},
		async createBidang(){
			this.loadingAddBidang = true
			await api({
				method: 'post',
				url: 'bidang',
				data: {
					bidang: this.form.bidang
				}
			}).then(result => {
				this.dialogAddBidang = false
				this.loadingAddBidang = false
				if (result.data.ec == 200) {
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getBidang()
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
				this.loadingAddBidang = false
				this.dialogAddBidang = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddBidang = false
		},

		async updateBidang(){
			this.loadingAddBidang = true
			await api({
				method: 'post',
				url: 'bidang/update',
				data: {
					bidang: this.form
				}
			}).then(result => {
				this.dialogAddBidang = false
				this.loadingAddBidang = false
				if (result.data.ec == 200) {
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getBidang()
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
				this.loadingAddBidang = false
				this.dialogAddBidang = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddBidang = false
		},

		async deleteBidang(){
			this.loadingDeleteBidang = true
			await api({
				method: 'post',
				url: 'bidang/delete',
				data: {
					bidang: this.form
				}
			}).then(result => {
				// console.log('result rule',result)
				this.deleteDialogVisible = false
				this.loadingDeleteBidang = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getBidang()
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
				this.loadingDeleteBidang = false
				this.deleteDialogVisible = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingDeleteBidang = false
		},
	},
	async mounted(){
		this.inRole()
		this.getBidang()
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
