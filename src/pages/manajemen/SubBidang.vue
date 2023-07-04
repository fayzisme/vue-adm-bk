<template>
	<div class="scrollable only-y">
		<div class="page-header">
			<h1>Sub Bidang</h1>
		</div>
		<el-card class="mb-10" v-if="inRole('superadmin')">
			<el-button type="" @click="dialogSubBidang({}, 'add')">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
		<el-card style="width: 100%;">
			<el-table
			:data="subbidang"
			style="width: 100%">
			<el-table-column
				prop="sub_bidang"
				label="Sub Bidang"
				width="">
			</el-table-column>
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
				<el-button type="text" @click="dialogSubBidang(scope.row, 'edit')" size="small">Edit</el-button>
				<el-button type="text" @click="dialogSubBidang(scope.row, 'delete')" size="small">Delete</el-button>
				</template>
			</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :visible.sync="dialogAddSub" :title="dialogTitle" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Sub Bidang" :label-width="formLabelWidth">
					<el-input v-model="form.sub_bidang" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Bidang" :label-width="formLabelWidth">
					<el-select placeholder="Pilih Bidang" filterable v-model="form.bidang_id" style="width:100%">
						<el-option  v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddSub = false">Cancel</el-button>
				<el-button v-if="dialogtype == 'add'" type="primary" @click="createSub" :loading="loadingAddSub">Submit</el-button>
				<el-button v-else type="primary" @click="updateSub" :loading="loadingAddSub">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Sub Bidang"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Sub Bidang: <strong>{{form.sub_bidang}}</strong>?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeleteSubBidang" type="primary" @click="deleteSub">Confirm</el-button>
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
	name: 'subbidang',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
      subbidang: [],
	  bidang: [],
      total: 0,
	  totalBidang: 0,
      loadingSubBidang: true,
	  loadingAddSub: false,
	  loadingDeleteSubBidang: false,
	  dialogAddSub: false,
	  form: {
		  sub_bidang: '',
		  bidang_id: ''
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
		dialogSubBidang(data,type){	

		this.dialogtype = type
		this.dialogTitle = 'Edit Sub Bidang'
		this.form = data

		if (type == 'add') {
			this.dialogTitle = 'Tambah Sub Bidang'
			this.form = {
				sub_bidang: '',
				bidang_id: ''
			}
		}
		
		if (type == 'delete') {
			this.deleteDialogVisible = true
		}
		else {
			this.dialogAddSub = true
		}
		
		
	},
    formatDate(str, format) {
      return moment(str).format("DD-MM-YYYY hh:mm:ss");
    },
	async getBidang(page = 1, perPage = 10){
			this.loadingSubBidang = true
			await api({
				method: 'get',
				url: 'bidang'
			}).then(result => {
				console.log('result bidang',result)
				this.bidang = result.data.data.rows
				this.totalBidang = result.data.data.count
				this.loadingSubBidang = false
			}).catch(error => {
				console.log(error);
				this.loadingSubBidang = false
			})
			this.loadingSubBidang = false
		},
		async getSubBidang(page = 1, perPage = 10){
			this.loadingSubBidang = true
			await api({
				method: 'get',
				url: 'sub_bidang'
			}).then(result => {
				console.log('result sub bidang',result)
				this.subbidang = result.data.data.rows
				this.total = result.data.data.count
				for (let index = 0; index < this.total; index++) {
					let fillArr = this.bidang.filter(v => v.id == this.subbidang[index].bidang_id)
					this.subbidang[index].bidang = fillArr.length > 0 ? fillArr[0].bidang:null;
				}
				this.loadingSubBidang = false
			}).catch(error => {
				console.log(error);
				this.loadingSubBidang = false
			})
			this.loadingSubBidang = false
		},
		async createSub(){
			this.loadingAddSub = true
			if (this.form.sub_bidang == ''|| this.form.bidang_id == '' || typeof this.form.bidang_id == 'undefined') {
				this.dialogAddSub = false
				this.$swal({
                    title: this.$t("error"),
                    text: 'Semua Kolom Wajib diisi.',
                    type: "error"
                  });
				  this.loadingAddSub = false
				  return
			}
			await api({
				method: 'post',
				url: 'sub_bidang',
				data: {
					sub_bidang: this.form.sub_bidang,
					bidang_id: this.form.bidang_id
				}
			}).then(result => {
				this.dialogAddSub = false
				this.loadingAddSub = false
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
				this.getBidang()
				this.getSubBidang()
			}).catch(error => {
				console.log(error);
				this.loadingAddSub = false
				this.dialogAddSub = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddSub = false
		},

		async updateSub(){
			this.loadingAddSub = true
			await api({
				method: 'post',
				url: 'sub_bidang/update',
				data: {
					sub_bidang: this.form
				}
			}).then(result => {
				this.dialogAddSub = false
				this.loadingAddSub = false
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
				this.getBidang()
				this.getSubBidang()
			}).catch(error => {
				console.log(error);
				this.loadingAddSub = false
				this.dialogAddSub = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddSub = false
		},

		async deleteSub(){
			this.loadingDeleteSubBidang = true
			await api({
				method: 'post',
				url: 'sub_bidang/delete',
				data: {
					sub_bidang: this.form
				}
			}).then(result => {
				// console.log('result rule',result)
				this.deleteDialogVisible = false
				this.loadingDeleteSubBidang = false
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
				this.getBidang()
				this.getSubBidang()
			}).catch(error => {
				console.log(error);
				this.loadingDeleteSubBidang = false
				this.deleteDialogVisible = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingDeleteSubBidang = false
		},
	},
	async mounted(){
		this.inRole()
		await this.getBidang()
		await this.getSubBidang()
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
