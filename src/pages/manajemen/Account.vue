<template>
	<div class="scrollable only-y">
		<div class="page-header">
      <h1>Akun Pengguna</h1>
    </div>
    <el-card class="mb-10" v-if="inRole('superadmin')">
            <el-row>
				<el-col :span="14">
							<el-button type="" @click="dialogAccount({},'add')">
					<i class="mdi mdi-plus"></i> Tambah
					</el-button>
				</el-col>
				<el-col style="text-align:center; padding-top: 10px;" :span="4">
					<span>
						Filter by Date:
					</span>	
				</el-col>
				<el-col :span="6">
					<el-date-picker type="daterange" placeholder="Pick a filter date" v-model="date1"
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date"
					:picker-options="pickerOptions" format="yyyy/MM/dd" style="width: 100%; cursor: pointer;" @change="dosearchAkun()"></el-date-picker>
				</el-col>
		</el-row>
		</el-card>
    <el-card>
			<el-pagination
          background
          prev-text="Prev"
          next-text="Next"
          layout="prev, pager, next"
          @current-change="paginateAkun"
          :current-page="currentPage"
          :page-size="limit"
          :total="total"
          class="mb-5"
        />
			<el-table
		    :data="account"
		    style="width: 100%">
		    <el-table-column
		      fixed
		      prop="created_at"
		      label="TANGGAL"
		      width="180">
					<template slot-scope="props">
						{{ props.row.created_at ? formatDate(props.row.created_at):"-" }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="NAMA"
		      width="250">
			  <template slot-scope="scope">{{ scope.row.name || '-' }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="username"
		      label="USERNAME"
		      width="250">
			  <template slot-scope="scope">{{ scope.row.username || '-' }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="EMAIL"
		      width="350">
			  <template slot-scope="scope">{{ scope.row.email|| '-' }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="phone"
		      label="NOMOR TELEPON"
		      width="200">
			  <template slot-scope="scope">{{ scope.row.phone || '-' }}</template>
		    </el-table-column>
			<el-table-column
		      prop="bidang"
		      label="Bidang"
		      width="200">
			  <template slot-scope="scope">{{ scope.row.bidang != null ? scope.row.bidang : '-' }}</template>
		    </el-table-column>
		    <el-table-column
		      prop="rule"
		      label="ROLE"
		      width="300">
		    </el-table-column>
		    <el-table-column
		      prop="status"
		      label="STATUS"
		      width="300">
			  <template slot-scope="scope">
				  <el-tag v-if="scope.row.status == 'actived'" type="success">{{scope.row.status}}</el-tag>
				  <el-tag v-else type="info">{{scope.row.status}}</el-tag>
			  </template>
		    </el-table-column>
			<el-table-column
			  prop="status_user"
		      label="Status User"
		      width="150">
          <template slot-scope="props">
					<span v-if="props.row.status_user=='deleted'">
						<el-tooltip placement="top">
							<div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 350px;">User PO telah dihapus dari Procurement -> PO.
							</div>
							<i style="color:red;" class="mdi mdi-brightness-1"></i>
						</el-tooltip>
						Deleted
					</span>
					<span v-else>
						<el-tooltip placement="top">
							<div slot="content">User PO available.</div>
							<i style="color:green;" class="mdi mdi-brightness-1"></i>
						</el-tooltip>
						Available
					</span>
			</template>
        </el-table-column>
		    <el-table-column
			v-if="inRole('superadmin')"
		      fixed="right"
		      label="Operations"
		      width="200">
		      <template slot-scope="scope">
		        <el-button @click="dialogAccount(scope.row, 'edit')" type="text" size="small">Edit</el-button>
		        <el-button @click="dialogAccount(scope.row, 'delete')" type="text" size="small">Delete</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		   <el-pagination
          background
          prev-text="Prev"
          next-text="Next"
          layout="prev, pager, next"
          @current-change="paginateAkun"
          :current-page="currentPage"
          :page-size="limit"
          :total="total"
          class="mt-10"
        />
		</el-card>
		<el-dialog :visible.sync="dialogAddAccount" :title="dialogTitle" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Nama" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Username" :label-width="formLabelWidth">
					<el-input v-model="form.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Email" :label-width="formLabelWidth">
					<el-input v-model="form.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="dialogtype == 'add'" label="Password" :label-width="formLabelWidth">
					<el-input v-model="form.password" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="dialogtype == 'edit'">
					<div>Perbarui Password ?</div>
					<el-switch
					v-model="value1"
					active-text="Ya"
					inactive-text="Tidak">
					</el-switch>
				</el-form-item>
				<el-form-item v-if="value1 == true" label="Password Lama" :label-width="formLabelWidth">
					<el-input v-model="form.password" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="value1 == true" label="Password Baru" :label-width="formLabelWidth">
					<el-input v-model="form.newPassword" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Phone Number" :label-width="formLabelWidth">
					<el-input v-model="form.phone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item v-if="dialogtype == 'add'" label="Bidang" :label-width="formLabelWidth">
					<el-select  placeholder="Pilih Bidang" filterable v-model="form.bidang_id" style="width:100%">
						<el-option  v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="dialogtype == 'add'">
					<div>Rule</div>
						<el-select filterable v-model="form.rule" style="width:100%">
						<el-option label="Pilih rule" value=""></el-option>
						<el-option v-for="item in rule" :key="item.id" :label="item.rule" :value="item.rule"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Status" :label-width="formLabelWidth">
					<el-switch
					style="width:100%"
					v-model="form.status"
					active-color="#13ce66"
					inactive-color="#ff4949"
					active-text="actived"
					inactive-text="inactived"
					active-value="actived"
    				inactive-value="inactived">
					</el-switch>
				</el-form-item>
				
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddAccount = false">Cancel</el-button>
				<el-button type="primary" @click="doSubmit" :loading="loadingAddAccount">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Account"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Account: <strong>{{form.username}}</strong>?</span>
		<el-form :model="form">
			<el-form-item label="Username" :label-width="formLabelWidth">
				<el-input v-model="form.username" auto-complete="off" readonly=""></el-input>
			</el-form-item>
			<!--<el-form-item label="Password" :label-width="formLabelWidth">
				<el-input v-model="form.password" type="password" auto-complete="off"></el-input>
			</el-form-item>-->
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeleteAccount" type="primary" @click="deleteAccount">Confirm</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script>
import config from '../../config'
import api from '@/networkClient'
import moment from 'moment'
import _ from 'lodash'
import store from '@/store'

export default {
	name: 'Account',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
			pickerOptions: {
					disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			date1: null,
			value1: false,
			currentPage: 1,
			dialogTitle:'',
			dialogtype: 'add',
			searchAkun: '',
			account: [],
			rule: [],
			bidang: [],
			totalBidang:0,
			total: 0,
			limit: 10,
			loadingAccount: false,
			loadingAddAccount: false,
			loadingDeleteAccount: false,
			loadingRule: false,
			dialogAddAccount: false,
			deleteDialogVisible: false,
			form: {
				name: '',
				username: '',
				email: '',
				password: '',
				phone: '',
				bidang_id:'',
				rule: ''
			},
			formLabelWidth: '',
			timeout: null,

		}
	},
	watch:{
    total(){
     if (this.total> 10000) {
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
		dosearchAkun(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchAkun.length >= 3) {
				this.currentPage = 1;
				this.getAccount(this.searchAkun);
				} else {
				this.getAccount();
				}
			}, 1000);
		},
		doSubmit(){
			if (this.dialogtype == 'add') {
				this.createAccount()
			}
			else {
				this.updateAccount()
			}
		},
		dialogAccount(data,type){
			
			this.dialogtype = type
			this.dialogTitle = 'Edit Akun'
			this.form = data
			this.form.password = ''
			this.form.newPassword = ''

			if (type == 'add') {
				this.dialogTitle = 'Tambah Akun'
				this.form = {
					name: '',
					username: '',
					email: '',
					password: '',
					phone: '',
					bidang_id:'',
					rule: ''
				}
			}
			
			if (type == 'delete') {
				this.deleteDialogVisible = true
			}
			else {
				this.dialogAddAccount = true
			}
			
			
		},
		formatDate(str, format) {
			return moment(str).format("DD-MM-YYYY hh:mm:ss");
		},
		async getBidang(page = 1, perPage = 10){
			this.loadingAccount = true
			await api({
				method: 'get',
				url: 'bidang'
			}).then(result => {
				console.log('result bidang',result)
				this.bidang = result.data.data.rows
				this.totalBidang = result.data.data.count
				this.loadingAccount = false
			}).catch(error => {
				console.log(error);
				this.loadingAccount = false
			})
			this.loadingAccount = false
		},
		paginateAkun(page) {
			this.currentPage = page;
			if (this.searchAkun != '') {
				this.getAccount(this.searchAkun);
			}
			else {
				this.getAccount();
			}
		},
		async getAccount(query=''){
			this.loadingAccount = true
			await api({
				method: 'get',
				url: 'manajemen/akun',
				params: {
					// perPage: perPage,
          			query: query,
					page: this.currentPage,
          			total: this.total,
          			startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
          			endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
				},
        		timeout: 10 * 1000
				// params: {
				// 	perPage: perPage,
				// 	page: page
				// }
			}).then(result => {
				console.log('result account',result)
				this.account = result.data.data.rows
				this.total = result.data.data.count
				for (let index = 0; index < this.total; index++) {
					let fillArr = this.bidang.filter(v => v.id == this.account[index].bidang_id)
					this.account[index].bidang = fillArr.length > 0 ? fillArr[0].bidang:null;
				}
				this.loadingAccount = false
			}).catch(error => {
				console.log(error);
				this.loadingAccount = false
			})
			this.loadingAccount = false
		},
		async createAccount(){
			this.loadingAddAccount = true
			await api({
				method: 'post',
				url: 'manajemen/akun',
				data: {
					name: this.form.name,
					username: this.form.username,
					email: this.form.email,
					password: this.form.password,
					phone: this.form.phone,
					bidang_id: this.form.bidang_id,
					rule: this.form.rule
				}
			}).then(result => {
				this.loadingAddAccount = false
					this.dialogAddAccount = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.dosearchAkun()
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
				this.loadingAddAccount = false
				this.dialogAddAccount = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddAccount = false
		},
		async updateAccount(){
			this.loadingAddAccount = true
			await api({
				method: 'post',
				url: 'manajemen/akun/update',
				data: this.form
			}).then(result => {
				this.loadingAddAccount = false
				this.dialogAddAccount = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    // this.getAccount()
					this.dosearchAkun()
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
				this.loadingAddAccount = false
				this.dialogAddAccount = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddAccount = false
		},
		async deleteAccount(){
			this.loadingDeleteAccount = true
			await api({
				method: 'post',
				url: 'manajemen/akun/delete',
				data: this.form
			}).then(result => {
				this.loadingDeleteAccount = false
				this.deleteDialogVisible = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    // this.getAccount()
					this.dosearchAkun()
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
				this.loadingDeleteAccount = false
				this.deleteDialogVisible = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingDeleteAccount = false
		},
		async getRule(){
			this.loadingRule = true
			await api({
				method: 'get',
				url: 'manajemen/rule'
			}).then(result => {
				// console.log('result rule',result)
				this.rule = result.data.data.rows
				// this.total = result.data.data.count
				this.loadingRule = false
			}).catch(error => {
				console.log(error);
				this.loadingRule = false
			})
			this.loadingRule = false
		}
	},
	async mounted(){
		this.inRole()
		await this.getBidang()
		this.getAccount()
		await this.getRule()
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
