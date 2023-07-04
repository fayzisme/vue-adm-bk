<template>
	<div class="scrollable only-y">
		<div class="page-header">
      <h1>Role</h1>
    </div>
    <el-card class="mb-10" v-if="inRole('superadmin')">
			<el-button type="" @click="dialogAddRule= true">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<!--<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>-->
		</el-card>
    <el-card style="width: 100%;">
			<el-table
		    :data="rule"
		    style="width: 100%">
		    <el-table-column
		      prop="rule"
		      label="Role Name"
		      width="">
		    </el-table-column>
		    <el-table-column
			v-if="inRole('superadmin')"
		      label="Operations"
		      width="">
		      <template slot-scope="scope">
		        <el-button type="text" @click="dialogRule(scope.row, 'edit')" size="small">Edit</el-button>
		        <el-button type="text" @click="dialogRule(scope.row, 'delete')" size="small">Delete</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-card>
		<!-- </div> -->
		<el-dialog :visible.sync="dialogAddRule" :title="dialogTitle" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form @submit.native.prevent :model="form">
				<el-form-item label="Rule" :label-width="`200px`">
					<el-input v-model="form.rule" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogAddRule = false">Cancel</el-button>
				<el-button v-if="dialogtype == 'add'" type="primary" @click="createRule" :loading="loadingAddRule">Submit</el-button>
				<el-button v-else type="primary" @click="updateRule" :loading="loadingAddRule">Submit</el-button>
			</span>
		</el-dialog>
		<el-dialog
		title="Delete Rule"
		:visible.sync="deleteDialogVisible"
		width="30%"
		center
		:close-on-click-modal="false" :close-on-press-escape="false">
		<span>Apakah anda yakin akan menghapus Rule: <strong>{{form.rule}}</strong>?</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="deleteDialogVisible = false">Cancel</el-button>
			<el-button :loading="loadingDeleteRule" type="primary" @click="deleteRule">Confirm</el-button>
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
	name: 'Rule',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
			rule: [],
			total: 0,
			loadingRule: false,
			dialogAddRule: false,
			loadingAddRule: false,
			loadingDeleteRule: false,
			form: {
				rule: ''
			},
			deleteDialogVisible: false,
			dialogtype: 'add',
			dialogTitle: ''
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
		dialogRule(data,type){	
			console.log('data', data);
			this.dialogtype = type
			this.dialogTitle = 'Edit Role'
			this.form = data

			if (type == 'add') {
				this.dialogTitle = 'Tambah Role'
				this.form = {
					rule: ''
				}
			}
			
			if (type == 'delete') {
				this.deleteDialogVisible = true
			}
			else {
				this.dialogAddRule = true
			}
			
			
		},
		formatDate(str, format) {
			return moment(str).format("DD-MM-YYYY hh:mm:ss");
		},
		async getRule(page = 1, perPage = 10){
			this.loadingRule = true
			await api({
				method: 'get',
				url: 'manajemen/rule'
			}).then(result => {
				console.log('result rule',result)
				this.rule = result.data.data.rows
				this.total = result.data.data.count
				this.loadingRule = false
			}).catch(error => {
				console.log(error);
				this.loadingRule = false
			})
			this.loadingRule = false
		},
		async createRule(){
			this.loadingAddRule = true
			await api({
				method: 'post',
				url: 'manajemen/rule',
				data: {
					rule: this.form.rule
				}
			}).then(result => {
				// console.log('result rule',result)
				this.dialogAddRule = false
				this.loadingAddRule = false
				
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getRule()
					this.form.rule = ''
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
				this.loadingAddRule = false
				this.dialogAddRule = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddRule = false
		},
		
		async updateRule(){
			this.loadingAddRule = true
			await api({
				method: 'post',
				url: 'manajemen/rule/update',
				data: {
					rule: this.form
				}
			}).then(result => {
				// console.log('result rule',result)
				this.dialogAddRule = false
				this.loadingAddRule = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getRule()
					this.form.rule = ''
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
				this.loadingAddRule = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingAddRule = false
		},

		async deleteRule(){
			this.loadingDeleteRule = true
			await api({
				method: 'post',
				url: 'manajemen/rule/delete',
				data: {
					rule: this.form
				}
			}).then(result => {
				// console.log('result rule',result)
				this.deleteDialogVisible = false
				this.loadingDeleteRule = false
				if (result.data.ec == 200) {
				// this.account = result.data.data.rows
				// this.total = result.data.data.count
				
				 this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getRule()
					this.form.rule = ''
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
				this.loadingDeleteRule = false
				this.deleteDialogVisible = false
				this.$swal(this.$t("error"), this.$t("error_text"), "error");
			})
			this.loadingDeleteRule = false
		},

	},
	async mounted(){
		this.inRole()
		this.getRule()
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
