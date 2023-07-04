<template>
	<div class="scrollable only-y">
		<div class="page-header">
      <h1>{{ $t("menu.dashboard") }}</h1>
    </div>
		<el-card v-loading="data.loadingTransaction">
			<el-row>
				<el-col :span="10">
					<el-button @click="pickYear" class="mb-20">
						<i class="el-icon-refresh"></i> Reload
					</el-button>
					<el-button :loading='loadingDownload' class="animated fadeInRight" type="primary" small @click="download">
						<i class="mdi mdi-download"></i> Download
					</el-button>
				</el-col>
				<el-col :span="6">
					<el-form :model="yearSelect" label-width="80px">
						<el-form-item label="Tahun">
							<el-date-picker
							v-model="yearSelect.year"
							type="year"
							placeholder="Pilih tahun"
							@change="pickYear">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-col>
				<!-- <el-col :span="6">
					<el-form :model="fillSearch">
						<el-form-item style="display:flex;" label="Filter">
							<el-input
							style="max-width: 200px"
							prefix-icon="el-icon-search"
							:placeholder="`Search`"
							clearable
							@keypress.native="pickYear"
							@clear="pickYear"
							@keyup.native.delete="pickYear"
							v-model="fillSearch.query"
						></el-input>
							<el-select style="max-width: 120px" @change="pickYear" v-model="fillSearch.searchBy" placeholder="Filter by">
								<el-option v-for="item in searchByList" :key="item.by" :label="item.name" :value="item.by"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col> -->
				<el-col :span="8">
					<el-form :model="fillJenisAnggaran" label-width="220px">
						<el-form-item label="Jenis Anggaran">
							<el-select @change="pickYear" v-model="fillJenisAnggaran.jenis_anggaran" placeholder="Pilih jenis anggaran">
								<el-option label="Pilih jenis anggaran" value=""></el-option>
								<el-option v-for="item in jenisAnggaran" :key="item.id" :label="item.jenis_anggaran" :value="item.jenis_anggaran"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			
			<!-- <div class="block" style="float: right;"> -->
			
				<!-- <span class="demonstration">Tahun</span>
				<el-date-picker
				v-model="yearSelect"
				type="year"
				placeholder="Pilih tahun"
				@change="pickYear">
				</el-date-picker> -->
			<!-- </div> -->
			<!-- <div class="block" style="float: right;">
			
			</div> -->
			<!-- <div class="block" style="float: right;">
			
			</div> -->
			<el-table
				:data="transaksi_pengadaan"
				show-summary
				:summary-method="getSummaries"
				height="400"
				style="width: 100%">
					<el-table-column
						fixed
						prop="jenis_pengadaan"
						label="JENIS PENGADAAN"
						width="250">
						<template slot-scope="props">
						{{ props.row.jenis_pengadaan || "-" }}
						</template>
					</el-table-column>
					<el-table-column label="PR MASUK">
						<el-table-column
							prop="total_jumlah_pekerjaan"
							label="JUMLAH PEKERJAAN"
							width="200">
						</el-table-column>
						<!--<el-table-column
							prop="total_persentase_pekerjaan"
							label="%"
							width="100">
						</el-table-column>-->
						<el-table-column
							prop="total_nilai_pr"
							label="NILAI (Rp)"
							width="200">
						</el-table-column>
						<!--<el-table-column
							prop="total_persentase_pr"
							label="%"
							width="100">
						</el-table-column>-->
					</el-table-column>

					<el-table-column label="IN PROGRESS">
						<el-table-column
							prop="total_jumlah_pekerjaan_in_progress"
							label="JUMLAH PEKERJAAN"
							width="200">
						</el-table-column>
						<!--<el-table-column
							prop="total_persentase_pekerjaan_in_progress"
							label="%"
							width="100">
						</el-table-column>-->
						<el-table-column
							prop="total_nilai_pr_in_progress"
							label="NILAI (Rp)"
							width="200">
						</el-table-column>
						<!--<el-table-column
							prop="total_persentase_pr_in_progress"
							label="%"
							width="100">
						</el-table-column>-->
					</el-table-column>

					<el-table-column label="TERKONTRAK">
						<el-table-column
							prop="total_jumlah_pekerjaan_terkontrak"
							label="JUMLAH PEKERJAAN"
							width="200">
						</el-table-column>
						<!--<el-table-column
							prop="total_persentase_pekerjaan_terkontrak"
							label="%"
							width="100">
						</el-table-column>-->
						<el-table-column
							prop="total_nilai_pr_terkontrak"
							label="NILAI (Rp)"
							width="200">
						</el-table-column>
						<!--<el-table-column
							prop="total_persentase_pr_terkontrak"
							label="%"
							width="100">
						</el-table-column>-->
					</el-table-column>
			</el-table>
		</el-card>
		<el-card class="mt-10" v-loading="data.loadingTransaction">
			<!-- <div class="chart-one"  v-if="!data.loadingTransaction"> -->
			<ChartOne id="chart-1" :type="'bar'" :data="data" :options="options" v-if="data.loadingTransaction == false"></ChartOne>
			<!-- <chart id="dataChart" :data="data" :options="options"></chart> -->
				<!-- <canvas style="margin-top: 10px" id="dataChart" width="400" height="260"></canvas> -->
			<!-- </div> -->
		</el-card>
		<!-- <el-card class="mt-10"> -->
			<el-row :gutter="30" class="mt-20">
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<el-card v-loading="dataStatus.loadingTransaction">
							<!-- <chart :type="'pie'" :data="data" :options="donutHsmOptions"></chart> -->
								<ChartTwo id="chart-2" :type="donutDataTopStatus.type" :data="donutHsmDataStatus" :options="donutHsmOptionsStatus" v-if="donutHsmDataStatus.datasets[0].data.length > 0 &&
								!dataStatus.loadingTransaction"></ChartTwo>
								 <template v-else>
									<p align="center">
										<img src="../assets/images/no_data@3x.png" width="250px">
									</p>
								</template>
						</el-card>
					</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
					<el-card v-loading="dataStatus.loadingTransaction">
						<ChartThree id="chart-3" :type="'doughnut'" :data="dataStatus" :options="optionsStatusTerkontrak" v-if="dataStatus.datasets[0].data.length > 0 && !dataStatus.loadingTransaction"></ChartThree>
						<template v-else>
							<p align="center">
								<img src="../assets/images/no_data@3x.png" width="250px">
							</p>
						</template>
					</el-card>
				</el-col>
			</el-row>
		<!-- </el-card> -->
		<el-dialog title="Data" :visible.sync="dialogDetailChartStatus">

		</el-dialog>
	</div>
</template>

<script>
import config from '../config'
import api from '@/networkClient'
import moment from 'moment'
import _ from 'lodash'
import V_Echarts from '../directives/echarts';
import ChartOne from 'vue-bulma-chartjs'
import ChartTwo from 'vue-bulma-chartjs'
import ChartThree from 'vue-bulma-chartjs'
import ChartLabel from 'chartjs-plugin-labels'
import store from '@/store'
import Vue from 'vue'

export default {
	name: 'Dashboard',
	directives: {
        'echarts': V_Echarts
	},
	components: {
		ChartOne,
		ChartTwo,
		ChartThree,
		ChartLabel
  	},
	data () {
		var self = this;
		return {
			timeout: null,
			yearSelect: {
				year: null
			},
			transaksi_pengadaan: [],
			pbjstatus: [],
			pbjOnestatus: [],
			trx_status: [],
			searchByList: [
				{ by: "jenis_pengadaan", name: "Jenis Pengadaan" },
				{ by: "bidang", name: "Bidang" },
				{ by: "pic_pengadaan", name: "PIC Pengadaan" }
			],
			dialogDetailChartStatus: false,
			loadingDownload: false,
			data: {
				loadingTransaction: false,
				labels: [],
				datasets: [{
					label: 'Data PR MASUK',
					data: [],
					backgroundColor: [
						'#8984d8',
						'#83cb9d',
						'#42afe3',
						'#ed6c63',
						'#97cd76'
					]
				}]
			},
			dataStatus: {
				loadingTransaction: false,
				labels: [],
				datasets: [{
					label: 'Data',
					data: [],
					backgroundColor: [
						'#8984d8',
						'#83cb9d',
						'#42afe3',
						'#ed6c63',
						'#97cd76'
					]
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				},
				segmentShowStroke: false,
				responsive: true,
				legend: {
					onClick: function(event){
						// console.log(event)
					},
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'DATA PR MASUK'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',

						// font size, default is defaultFontSize
						fontSize: 12,

						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#ffff',

						// font style, default is defaultFontStyle
						fontStyle: 'normal',

						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				},
				hover: {
					onHover: function(e,i) {
					let el = document.getElementsByClassName("chartjs");
					el[0].style.cursor = i[0] ? "pointer" : "default";
					}
				},
				onClick : (event, item)=>{
				// console.log('item on bar chart',item[0]._index);
				// console.log('event options',event)
				let id = event.path[0].getAttribute('id')
				if (id == 'chart-1') {
					this.detailChart(id,item[0]._index)
				}
				}
			},
			optionsStatusTerkontrak: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					onClick: function(event){
						// console.log(event)
					},
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'RATIO BERDASARKAN NILAI PENGADAAN'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',

						// font size, default is defaultFontSize
						fontSize: 12,

						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#ffff',

						// font style, default is defaultFontStyle
						fontStyle: 'normal',

						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				},
				hover: {
					onHover: function(e,i) {
					let el = document.getElementsByClassName("chartjs");
					el[2].style.cursor = i[0] ? "pointer" : "default";
					}
				},
				onClick : function(event, item){
				// console.log('item on donut 2 chart',item[0]);
				// console.log('event options',event)

				let id = event.path[0].getAttribute('id')
					if (id == 'chart-3') {
						self.detailChart(id,item[0]._index)
					}
				}
			},

			asyncComponent: 'peity',
			monthOfTheSelected: '',
			dialogDetailOutbound: false,
			loadingUniqueOutboundDetail: false,
			user: store.getters.userID,
			startDate: '',
			endDate: '',
			jenisAnggaran:[],
			fillSearch:{
				searchBy:'',
				query:''
			},
			fillJenisAnggaran:{
				jenis_anggaran:''
			},
			outbondDetail: [],
			resized: false,
			config:config,
			loadingWA: true,
			timeout: null,
			loading: {
				// billing: true,
				ticket: true,
				overview: true,
				mostTemplate: true,
				uniqueUser: true,
				uniqueOutbound: false
			},
			showAlertMessage: false,
			showAlertError: false,
			loadingTable: true,
			isLoading: true,
			totalWA: 0,
			totalBill: 0,
			loadingContact: true,
			totalContact: 0,
			selectedPhoneNumber: '',
            companyPhone: '',
            monthName: moment().format('MMMM'),
			prevMonth: moment().subtract(1, 'months').format("YYYY-MM"),
			currentMonth: moment().format("YYYY-MM"),
			prevMonthTicket: `${moment().subtract(1, 'months').format('YYYY-MM')}-01 00:00:00`,
			currentMonthTicket: `${moment().format('YYYY-MM')}-01 00:00:00`,
			ticketPrevMonth: {
				open: 0,
				process: 0,
				close: 0
			},
			ticketCurrMonth: {
				open: 0,
				process: 0,
				close: 0
			},
			thisMonth: {
				tanggal: [0],
				textTotal: [0],
				image: {
					total: [0]
				},
				hsm: {
					total: [0]
				},
				document: {
					total: [0]
				},
				audio: {
					total: [0]
				},
				outbond: {
					total: [0]
				}
			},
			previousMonth: {
				tanggal: [0],
				textTotal: [0],
				image: {
					total: [0]
				},
				hsm: {
					total: [0]
				},
				document: {
					total: [0]
				},
				audio: {
					total: [0]
				},
				outbond: {
					total: [0]
				}
			},
			chartOptionNotification: {
                // backgroundColor: "#FFF",
                areaColor: "#FFF",
                grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : [0],
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
						type: 'value',
                        splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						}
                    }
                ],
                series : [
                    {
                        name:'Total Notification Previous Month',
						type:'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff',
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					},
					{
                        name:'Total Notification This Month',
						type:'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#f98643'
						},
						itemStyle: {
							color: '#f98643',
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					}
                ]
			},
			chartOptionOutbond: {
                // backgroundColor: "#FFF",
                areaColor: "#FFF",
                grid: {
					show: false,
					left: '20px',
					right: '50px',
					bottom: '20px',
					top: '20px',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					show: false,
					data: ['line', 'bar'],
					textStyle: {
						color: '#ccc'
					}
				},
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : [0],
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.5)'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
						type: 'value',
                        splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: 'rgba(255,255,255,0.5)'
							}
						}
                    }
                ],
                series : [
                    {
                        name:'Total Outbond Previous Month',
						type:'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#fff'
						},
						itemStyle: {
							color: '#fff',
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					},
					{
                        name:'Total Outbond This Month',
						type:'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 10,
						lineStyle: {
							color: '#f98643'
						},
						itemStyle: {
							color: '#f98643',
							borderColor: '#5f8fdf',
							borderWidth: 3
						},
						areaStyle: {
							color: 'rgba(255,255,255,0.2)'
						},
						animationDuration: 2800,
						animationEasing: 'cubicInOut',
                        data: [0]
					}
                ]
			},
			donutHsmData: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [
						'#4aa0f1',
						'#249393',
						'#bb4c3f',
						'#ed6c63',
						'#97cd76',
						'#ff8a65',
						'#964af1',
						'#5d4037',
						'#00796b',
						'#827717',
						'#7986cb',
						'#7f8c8d'
					]
				}]

			},
			donutHsmDataStatus: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [
						'#4aa0f1',
						'#249393',
						'#bb4c3f',
						'#ed6c63',
						'#97cd76',
						'#ff8a65',
						'#964af1',
						'#5d4037',
						'#00796b',
						'#827717',
						'#7986cb',
						'#7f8c8d'
					]
				}]

			},
			donutHsmOptions: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'RATIO BERDASARKAN STATUS PENGADAAN'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',

						// font size, default is defaultFontSize
						fontSize: 12,

						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#ffff',

						// font style, default is defaultFontStyle
						fontStyle: 'normal',

						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				}
			},
			donutHsmOptionsStatus: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					onClick: function(event){
						console.log(event)
					},
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'RATIO BERDASARKAN STATUS PENGADAAN'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',

						// font size, default is defaultFontSize
						fontSize: 12,

						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#ffff',

						// font style, default is defaultFontStyle
						fontStyle: 'normal',

						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				},
				hover: {
					onHover: function(e,i) {
					let el = document.getElementsByClassName("chartjs");
					el[1].style.cursor = i[0] ? "pointer" : "default";
					}
				},
				onClick : function(event, item){
				let id = event.path[0].getAttribute('id')
					if (id == 'chart-2') {
						self.detailChart(id,item[0]._index)
					}
				}
			},
			barHsmOptions: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					position: 'left',
				},
				title: {
					display: true,
					text: 'TODAY'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',

						// font size, default is defaultFontSize
						fontSize: 12,

						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#ffff',

						// font style, default is defaultFontStyle
						fontStyle: 'normal',

						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				}
			},
			donutDataTopHsm: {
				labels: [],
				data: [],
				type: 'bars'
			},
			donutDataTopStatus: {
				labels: [],
				data: [],
				type: 'pie'
			},
			donutUniqueData: {
				labels: [],
				datasets: [{
					data: [],
					backgroundColor: [
						'#4aa0f1',
						'#249393',
						'#bb4c3f',
						'#ed6c63',
						'#97cd76',
						'#ff8a65',
						'#964af1',
						'#5d4037',
						'#00796b',
						'#827717',
						'#7986cb'
					]
				}]

			},
			donutUniqueOptions: {
				segmentShowStroke: false,
				responsive: true,
				legend: {
					position: 'left',
					orient: 'vertical',
                    x: 'left'
				},
				title: {
					display: true,
					text: 'Total Unique User'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
				plugins: {
					labels: {
						// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
						render: 'value',

						// font size, default is defaultFontSize
						fontSize: 12,

						// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
						fontColor: '#fff',

						// font style, default is defaultFontStyle
						fontStyle: 'normal',

						// font family, default is defaultFontFamily
						fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

						// position to draw label, available value is 'default', 'border' and 'outside'
						// bar chart ignores this
						// default is 'default'
						position: 'default',

					}
				}
			},
			// donutDataUnique: {
			// 	labels: [],
			// 	data: [],
			// 	type: 'pie',
			// 	labelLine: {
			// 		normal: {
			// 			show: true
			// 		}
			// 	},
			// 	selectedMode: 'single',
			// 	radius: [0, '30%'],
			// },
			// uniqueOutboundDonuts: {
			// 	labels: [],
			// 	data: [],
			// 	type: 'pie',
			// 	labelLine: {
			// 		normal: {
			// 			show: true
			// 		}
			// 	},
			// 	selectedMode: 'single',
			// 	// radius: [0, '30%']
			// 	radius: ['50%', '70%'],
			// },
			// uniqueOutboundData: {
			// 	labels: [],
			// 	datasets: [{
			// 		data: [],
			// 		backgroundColor: [
			// 			'#4aa0f2',
			// 			'#249393',
			// 			'#bb4c3f',
			// 			'#ed6c63',
			// 			'#97cd76',
			// 			'#ff8a65',
			// 			'#5d4037',
			// 			'#00796b',
			// 			'#827717',
			// 			'#7986cb',
			// 			'#964af1'
			// 		]
			// 	}],
			// },
			// uniqueOutboundOptions: {
			// 	segmentShowStroke: false,
			// 	responsive: true,
			// 	legend: {
			// 		onClick: function(event){
			// 			// console.log(event)
			// 		},
			// 		display: true,
			// 		// onClick:function(event, item){
			// 		// 	console.log(this.dialogDetailOutbound)
			// 		// },
			// 		position: 'left',
			// 		orient: 'vertical',
            //         x: 'left'
			// 	},
			// 	title: {
			// 		display: true,
			// 		text: 'RATIO BERDASARKAN NILAI PENGADAAN',
			// 	},
			// 	animation: {
			// 		// onClick:function(event, item){
			// 		// 	console.log(this.dialogDetailOutbound)
			// 		// },
			// 		animateScale: true,
			// 		animateRotate: true,
			// 		animationDelay: function (idx) {
			// 			return Math.random() * 200;
			// 		}
			// 	},
			// 	plugins: {
			// 		labels: {
			// 			// render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
			// 			render: 'value',

			// 			// font size, default is defaultFontSize
			// 			fontSize: 12,

			// 			// font color, can be color array for each data or function for dynamic color, default is defaultFontColor
			// 			fontColor: '#fff',

			// 			// font style, default is defaultFontStyle
			// 			fontStyle: 'normal',

			// 			// font family, default is defaultFontFamily
			// 			fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// 			// position to draw label, available value is 'default', 'border' and 'outside'
			// 			// bar chart ignores this
			// 			// default is 'default'
			// 			position: 'default',

			// 		}
			// 	}
			// }
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	}, 
	methods: {
		download(){
			// this.getTransaction(true)
			this.getAllTransaction(true)
		},
		detailChart(chart, index){
			let status = this.data.labels[index]

			switch (chart) {
				case 'chart-2':
					status = this.donutHsmDataStatus.labels[index]
					break;
			
				case 'chart-3':
					status = this.dataStatus.labels[index]
					break;
			}

			this.$router.replace({ name: 'po-detail', params: { chart: chart, status: status, jenis_anggaran: this.fillJenisAnggaran.jenis_anggaran||null, tahun:this.yearSelect.year} })
		},
		async pickYear(){
			clearTimeout(this.timeout);
			this.timeout = setTimeout(async () => {
				await this.getTransaction();
				await this.getStatus()
				await this.getStatusTrx()
			}, 800);
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
		// async getProcurementMethodTrx(){
		// 	await api({
		// 		method: 'get',
		// 		url: 'transaksi/metode_pengadaan',
		// 	}).then(result => {
		// 		console.log('trx',result)
		// 		// this.transaction =datas.numRows
		// 	}).catch(error => {
		// 		// this.tokenLoader = false
		// 	})
		// 	// this.loadingContact = false
		// },
		// settingtimeout(){
		// 	this.timeout = setTimeout(function () {
		// 		this.data.loadingTransaction = true
		// 		this.data.datasets.data = []
		// 		this.getTransaction()
		// 	}, 500);
		// },
		async getTransaction(){
			// console.log(this.yearSelect.year);
			// var self = this
			this.data.loadingTransaction = true
			let apiOptions = {
				method: 'get',
				url: 'transaksi/metode_pengadaan',
				params: {
					// download: download,
                    year: this.yearSelect.year ? moment(this.yearSelect.year).format("YYYY-MM-DD"):"",
					jenis_anggaran: this.fillJenisAnggaran.jenis_anggaran != "" ? this.fillJenisAnggaran.jenis_anggaran : ""
				},
				timeout: 10 * 1000
			}

			await api(apiOptions).then(response => {
				// console.log('response transaction', response);
				if(response.data.ec == 200){
					this.transaksi_pengadaan = response.data.data.rows
					let labelsArr = []
					let dataArr = []
					let bgColor = []

					let dataArrTerkontrak = []
					let dataArrIP = []

					_.forEach(this.transaksi_pengadaan, (d,i) => {
						// console.log('d di trx pengadaan',d)
						labelsArr.push(d.jenis_pengadaan || "?")
						dataArr.push(Number(d.total_jumlah_pekerjaan))
						bgColor.push('#'+Math.floor(Math.random()*16777215).toString(16))
						d.total_nilai_pr = this.convertToRupiah(d.total_nilai_pr || 0)
						d.total_nilai_pr_in_progress = this.convertToRupiah(d.total_nilai_pr_in_progress || 0)
						d.total_nilai_pr_terkontrak = this.convertToRupiah(d.total_nilai_pr_terkontrak || 0)
					})
					// this.renderTrxChart(labelsArr, dataArr)
					// console.log('chartdata',dataArr);
					// console.log('ChartLabel',labelsArr);
					//
					this.data.labels = labelsArr
					this.data.datasets[0].data = dataArr
					this.data.datasets[0].backgroundColor = bgColor
					// console.log(this.data.datasets[0].data);
					// this.dataStatusTerkontrak.datasets[0].data.push(dataArrTerkontrak, dataArrIP)
					// console.log('anu',this.data.labels);
					// console.log('anu jeneng',this.data.datasets.data);
					// console.log(this.transaksi_pengadaan);
        		}
				else{
						this.$swal(this.$t('error'), this.$t(`helpdesk.${response.data.message}`), "error")
					}
				this.loadingDownload = false
				
				setTimeout(()=> {
					this.data.loadingTransaction = false
				}, 800);
			}).catch(error => {
				this.$swal(this.$t('error'), "Data transaksi gagal terambil", "error")
				this.data.loadingTransaction = false
			})
			this.renderDoughnutTopTrx()
			this.data.loadingTransaction = false
		},
		async getAllTransaction(download = false){
			// console.log(this.yearSelect.year);
			// var self = this
			this.data.loadingTransaction = true
			let apiOptions = {
				method: 'get',
				url: 'transaksi/semua',
				params: {
					download: download,
                    year: this.yearSelect.year ? moment(this.yearSelect.year).format("YYYY-MM-DD"):"",
					jenis_anggaran: this.fillJenisAnggaran.jenis_anggaran != "" ? this.fillJenisAnggaran.jenis_anggaran : ""
				},
				timeout: 10 * 1000
			}

			if(download == true){
				apiOptions.responseType = "arraybuffer"
				this.loadingDownload = true
			}

			await api(apiOptions).then(response => {
				
				if(response.data.ec == 200){
					// console.log('response all transaction', response);
        		}
        		else if(download == true){
					if(response.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([response.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Data Dashboard.xlsx'); //or any other extension
							link.click();
						} catch(err){
							// console.log(err.message)
						}
					} else{
						this.$swal(this.$t('error'), this.$t(`helpdesk.${response.data.message}`), "error")
					}
				}
				this.loadingDownload = false
				
				setTimeout(()=> {
					this.data.loadingTransaction = false
				}, 800);
			}).catch(error => {
				this.$swal(this.$t('error'), "Data transaksi gagal terambil", "error")
				this.data.loadingTransaction = false
			})
			this.data.loadingTransaction = false
		},
		async getStatusTrx(){
			// var self = this
			this.dataStatus.loadingTransaction = true
			await api({
				method: 'get',
				url: 'transaksi/iptstatus',
				params: {
                    year: this.yearSelect.year ? moment(this.yearSelect.year).format("YYYY-MM-DD"):"",
					jenis_anggaran: this.fillJenisAnggaran.jenis_anggaran != "" ? this.fillJenisAnggaran.jenis_anggaran : ""
				},
				timeout: 10 * 1000
			}).then(response => {
				// console.log('trx_status', response);
				this.trx_status = response.data.data.count
				// console.log('transaksi',this.trx_status);
				let labelsArr = []
				let dataArr = []

				_.forEach(this.trx_status, d => {
					labelsArr.push(d.status)
					dataArr.push(d.count)
				})
				this.dataStatus.labels = labelsArr
				this.dataStatus.datasets[0].data = dataArr
				// this.dataStatusTerkontrak.datasets[0].data.push(dataArrTerkontrak, dataArrIP)
				// console.log('anu',this.data.labels);
				// console.log('anu jeneng',this.data.datasets.data);
				// console.log(this.transaksi_pengadaan);
				setTimeout(()=> {
					this.dataStatus.loadingTransaction = false
				}, 500);
			}).catch(error => {
				// console.log('error', error);
				this.$swal(this.$t('error'), "Data transaksi gagal terambil", "error")
				this.dataStatus.loadingTransaction = false
			})
			this.renderDoughnutTopTrxStatus()
			this.dataStatus.loadingTransaction = false
		},
		async getStatus(){
			var self = this
			this.dataStatus.loadingTransaction = true
			await api({
				method: 'get',
				url: 'procurement/po/status',
				params: {
                    year: this.yearSelect.year ? moment(this.yearSelect.year).format("YYYY-MM-DD"):"",
					jenis_anggaran: this.fillJenisAnggaran.jenis_anggaran != "" ? this.fillJenisAnggaran.jenis_anggaran : "" 
				},
			}).then(response => {
				// console.log('status', response);
				this.pbjstatus = response.data.data.count
				// console.log('status',this.pbjstatus);
				let labelsArr = []
				let dataArr = []
				let bgColor = []

				_.forEach(this.pbjstatus, d => {
					labelsArr.push(d.status_pengadaan)
					dataArr.push(d.count)
					bgColor.push('#'+Math.floor(Math.random()*16777215).toString(16))
					// console.log('d',d);
				})

				this.donutDataTopStatus.labels = labelsArr
				this.donutDataTopStatus.data = dataArr
				this.donutHsmDataStatus.datasets[0].backgroundColor = bgColor
				setTimeout(()=> {
					this.dataStatus.loadingTransaction = false
				}, 500);
			}).catch(error => {
				// console.log('error', error);
				this.$swal(this.$t('error'), "Data status gagal terambil", "error")
				this.dataStatus.loadingTransaction = false
			})
			this.renderDoughnutTopStatus()
			this.dataStatus.loadingTransaction = false
		},
		// async getOneStatus(){
		// 	var self = this
		// 	this.data.loadingTransaction = true
		// 	await api({
		// 		method: 'get',
		// 		url: 'procurement/po/status/'
		// 	}).then(response => {
		// 		this.pbjOnestatus = response.data.data.count
		// 		// console.log('status',this.pbjstatus);
		// 		// let labelsArr = []
		// 		// let dataArr = []
		// 		//
		// 		// _.forEach(this.pbjstatus, d => {
		// 		// 	labelsArr.push(d.status_pengadaan)
		// 		// 	dataArr.push(d.count)
		// 		// 	// console.log('d',d);
		// 		// })
		// 		//
		// 		// this.donutDataTopStatus.labels = labelsArr
		// 		// this.donutDataTopStatus.data = dataArr
		// 		// this.data.loadingTransaction = false
		// 	}).catch(error => {
		// 		this.$swal(this.$t('error'), "Data status gagal terambil", "error")
		// 		// this.data.loadingTransaction = false
		// 	})
		// 	// this.renderDoughnutTopStatus()
		// 	// this.data.loadingTransaction = false
		// },
		getSummaries(param) {
			// console.log('param',param)
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'TOTAL KONTRAK PENGADAAN';
          return;
        }
        const values = data.map(item => Number(this.convertToAngka(item[column.property])));
		// console.log('values', values);
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

		  if (index > 0 && index % 2 == 0) {
			 sums[index] = this.convertToRupiah(sums[index])
		  }
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    },
		// getDetailStatus(){
		// 	var self = this
		// 	// this.data.loadingTransaction = true
		// 	await api({
		// 		method: 'get',
		// 		url: 'procurement/po/status/'
		// 	}).then(response => {
		// 		this.pbjstatus = response.data.data.count
		// 		// console.log('status',this.pbjstatus);
		// 		let labelsArr = []
		// 		let dataArr = []
		//
		// 		_.forEach(this.pbjstatus, d => {
		// 			labelsArr.push(d.status_pengadaan)
		// 			dataArr.push(d.count)
		// 			// console.log('d',d);
		// 		})
		//
		// 		this.donutDataTopStatus.labels = labelsArr
		// 		this.donutDataTopStatus.data = dataArr
		// 		this.data.loadingTransaction = false
		// 	}).catch(error => {
		// 		this.$swal(this.$t('error'), "Data status gagal terambil", "error")
		// 		this.data.loadingTransaction = false
		// 	})
		// 	this.renderDoughnutTopStatus()
		// 	this.data.loadingTransaction = false
		// },
		dialogDetail(){
            this.dialogDetailOutbound = true
		},

		async renderTrxChart(labels = [], data = []) {
			setTimeout(() => {
        var ctx = document.getElementById("dataChart")
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: labels,
						datasets: [{
							label: '# of Trx(s)',
							data: data,
							backgroundColor: 'rgba(31, 200, 219, 0.2)',
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
									gridLines: {
										color: "rgba(0, 0, 0, 0)",
									},
									ticks: {
                      precision: 0,
											beginAtZero: true
									}
							}],
							xAxes: [{
								gridLines: {
									color: "rgba(0, 0, 0, 0)",
								}
							}]
						}
					}
				});
			}, 50)
		},

		renderChart(){
			// creat a fresh object with properties from the original object
			var newChartOptionNotification = Object.assign({}, this.chartOptionNotification);
			var newChartOptionOutbond = Object.assign({}, this.chartOptionOutbond);
			// modify properties of the new object
			newChartOptionNotification.xAxis[0].data = this.thisMonth.tanggal
			newChartOptionNotification.series[0].data = this.previousMonth.hsm.total
			newChartOptionNotification.series[1].data = this.thisMonth.hsm.total

			newChartOptionOutbond.xAxis[0].data = this.thisMonth.tanggal
			newChartOptionOutbond.series[0].data = this.previousMonth.outbond.total
			newChartOptionOutbond.series[1].data = this.thisMonth.outbond.total

			this.chartOptionNotification = newChartOptionNotification;
			this.chartOptionOutbond = newChartOptionOutbond;

			this.isLoading = false
		},

		renderDoughnutTopHsm() {

			var donutHsmData = Object.assign({}, this.donutHsmData)
			donutHsmData.labels = this.donutDataTopHsm.labels
			donutHsmData.datasets[0].data = this.donutDataTopHsm.data
			this.donutHsmData = donutHsmData

			this.donutDataTopHsm.type = 'doughnut'
			this.isLoading = false
		},
		renderDoughnutTopTrx() {
			var self = this
			// var donutHsmData = Object.assign({}, this.donutHsmData)
			// donutHsmData.labels = this.donutDataTopHsm.labels
			// donutHsmData.datasets[0].data = this.donutDataTopHsm.data
			// this.donutHsmData = donutHsmData


			// self.options.onClick = function(event, item){
			// 	console.log('haloooooooooo event', event)
			// }

		    // self.options.onClick = function (evt) {
			// 	const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
			// 	console.log(points);

			// 	if (points.length) {
			// 		const firstPoint = points[0];
			// 		var label = myChart.data.labels[firstPoint.index];
			// 		var value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
			// 	}
			// }

			// console.log('donut hsm',this.options)

			// this.donutDataTopHsm.type = 'doughnut'
			this.isLoading = false
		},
		renderDoughnutTopTrxStatus() {
			var donutHsmData = Object.assign({}, this.donutHsmData)
			donutHsmData.labels = this.donutDataTopHsm.labels
			donutHsmData.datasets[0].data = this.donutDataTopHsm.data
			this.donutHsmData = donutHsmData

			this.donutDataTopHsm.type = 'doughnut'
			this.isLoading = false
		},
		renderDoughnutTopStatus() {
			var self = this
			var donutHsmDataStatus = Object.assign({}, this.donutHsmDataStatus)
			donutHsmDataStatus.labels = this.donutDataTopStatus.labels
			donutHsmDataStatus.datasets[0].data = this.donutDataTopStatus.data
			this.donutHsmDataStatus = donutHsmDataStatus

			// self.donutHsmOptionsStatus.onClick = function(event, item){
			// 	console.log('item on donut chart',self.donutHsmDataStatus);
			// 	console.log('event options',event)
			// 	// console.log(self.dialogDetailChartStatus);
			// 	// self.dialogDetailChartStatus = true
			// 	// self.$router.push('/procurement/po/detailpostatus/')
			// }

			this.donutDataTopStatus.type = 'doughnut'
			this.isLoading = false
		},

		// renderDoughnutUniqueUser() {

		// 	var donutUniqueData = Object.assign({}, this.donutUniqueData)
		// 	donutUniqueData.labels = this.donutDataUnique.labels
		// 	donutUniqueData.datasets[0].data = this.donutDataUnique.data
		// 	this.donutUniqueData = donutUniqueData

		// 	this.donutDataUnique.type = 'doughnut'
		// 	this.isLoading = false
		// },

		// renderDoughnutUniqueOutbound() {
		// 	var self = this
		// 	var uniqueOutboundData = Object.assign({}, this.uniqueOutboundData)
		// 	uniqueOutboundData.labels = this.uniqueOutboundDonuts.labels
		// 	uniqueOutboundData.datasets[0].data = this.uniqueOutboundDonuts.data
		// 	this.uniqueOutboundData = uniqueOutboundData
		// 	this.uniqueOutboundOptions.onClick = function(event, item){
		// 		let month = item[0]._view.label
		// 		let sd = month.substring(0,3)
		// 		// console.log(month)
		// 		self.monthOfTheSelected = month
		// 		sd = moment().month(sd).format("YYYY-MM-DD")
		// 		let csd = moment(sd).startOf('month').format('YYYY-MM-DD')
		// 		let ced = moment(sd).endOf('month').format('YYYY-MM-DD')

		// 		self.uniqueOutboundDetail(csd,ced)

		// 		self.dialogDetailOutbound = true
		// 	}

		// 	this.uniqueOutboundDonuts.type = 'doughnut'
		// 	this.isLoading = false
		// },

		goToUrl(url) {
			let win = window.open(url, '_blank');
			win.focus();
		},

		async getJenisAnggaran() {
			// this.loadingJenisAnggaran = true
			await api({
				method: 'get',
				url: 'jenis_anggaran'
			}).then(response => {
				this.jenisAnggaran = response.data.data.rows
				// this.loadingJenisAnggaran = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data jenis anggaran gagal terambil", "error")
				// this.loadingJenisAnggaran = false
			})
		},
	},
	created(){
		if (this.$route.params.jenis_anggaran && this.$route.params.tahun) {
			this.fillJenisAnggaran.jenis_anggaran = this.$route.params.jenis_anggaran
			this.yearSelect.year = this.$route.params.tahun != 'null' ? moment(this.$route.params.tahun).format(): null
			if (this.$route.params.jenis_anggaran == 'null') {
				this.fillJenisAnggaran.jenis_anggaran = ''
			}
		}
	},
	async mounted(){
		await this.getTransaction()
		await this.getStatus()
		await this.getStatusTrx()
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
