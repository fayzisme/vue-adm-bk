<template>
	<div class="scrollable only-y">
		<div class="page-header">
			<h1>Status Keterlambatan</h1>
		</div>
		<!--<el-card class="mb-10">
			<el-button type="" @click="">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>
		</el-card>-->
		<el-card style="width: 100%;" v-loading="loadingStatusKeterlambatan">
			<el-table
			:data="statusketerlambatan"
			style="width: 100%">
			<el-table-column
				prop="status_keterlambatan"
				label="Status Keterlambatan"
				width="">
			</el-table-column>
			<!--<el-table-column
				label="Operations"
				width="">
				<template slot-scope="scope">
				<el-button type="text" size="small">Edit</el-button>
				<el-button type="text" size="small">Delete</el-button>
				</template>
			</el-table-column> -->
			</el-table>
		</el-card>
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
	name: 'StatusKeterlambatan',
	data () {
		return {
			allowedRole: store.getters.allowedRole,
      statusketerlambatan: [],
      total: 0,
      loadingStatusKeterlambatan: false
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
    formatDate(str, format) {
      return moment(str).format("DD-MM-YYYY hh:mm:ss");
    },
		async getStatusKeterlambatan(page = 1, perPage = 10){
			this.loadingStatusKeterlambatan = true
			await api({
				method: 'get',
				url: 'status_keterlambatan'
			}).then(result => {
				this.statusketerlambatan = result.data.data.rows
				console.log('result jenis anggaran',this.jenisanggaran)
				this.total = result.data.data.count
				this.loadingStatusKeterlambatan = false
			}).catch(error => {
				console.log(error);
				this.loadingStatusKeterlambatan = false
			})
			this.loadingStatusKeterlambatan = false
		}
	},
	async mounted(){
		this.inRole()
		this.getStatusKeterlambatan()
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
