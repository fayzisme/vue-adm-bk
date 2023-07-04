<template>
	<div id='po-main' class="scrollable only-y">
		<div class="page-header">
			<h1>{{ $t("menu.bapp") }}</h1>
		</div>
		<el-card class="mb-10">
			<el-row>
				<el-col :span="10">
					<el-row>
						<el-col style="display:flex; flex-wrap: wrap;" :span="24">
							<el-input
								style="flex-basis: 200px; margin-right:10px;"
								prefix-icon="el-icon-search"
								:placeholder="`Search`"
								clearable
								@keypress.native="doSearchBAPP"
								@clear="doSearchBAPP"
								@keyup.native.delete="doSearchBAPP"
								v-model="searchBAPP"
							></el-input>
							<el-select style="flex-basis: 120px" @change="doSearchBAPP" placeholder="Filter by" v-model="searchBy">
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
				<el-col :span="10">
					<el-row>
						<el-col style="text-align:center; padding-top: 10px;" :span="6">
							<span>
								Filter by Date :
							</span>
						</el-col>
						<el-col :span="16" style="margin-left:5px;">
							<el-date-picker type="daterange" placeholder="Pick a filter date" v-model="date1"
								range-separator="To"
								start-placeholder="Start date"
								end-placeholder="End date"
								:picker-options="pickerOptions" format="yyyy/MM/dd" style="width: 100%; cursor: pointer;" @change="doSearchBAPP()"></el-date-picker>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="3">
					<el-button  style="width: 100%; height: 40px;" :loading='loadingDownload' class="animated fadeInRight" type="primary" small @click="download">
						<i class="mdi mdi-download"></i> Download
					</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="4" class="mr-10 mt-20">
					<el-button @click="dialogAddBAPP=true">
						<i class="mdi mdi-plus"></i> Tambah
					</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card v-loading="loadingBAPP">
			<div class="block mb-20">
				<el-pagination
					background
					prev-text="Prev"
					next-text="Next"
					layout="prev, pager, next"
					@current-change="paginateBAPP"
					:current-page="currentPage"
					:page-size="limit"
					:total="total"
					class="mb-5"
				/>
			</div>
			<el-table ref="singleTable" :data="bapp" style="width: 100%">
				<el-table-column fixed prop="created_at" label="CREATED AT" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.created_at) }}
					</template>
				</el-table-column>
				<el-table-column prop="updated_at" label="UPDATED AT" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.updated_at) }}
					</template>
				</el-table-column>
				<el-table-column
					prop="bidang"
					label="BIDANG"
					width="150">
					<template slot-scope="props">
						{{ props.row.bidang || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="do_kontrak"
					label="DO KONTRAK"
					width="150">
					<template slot-scope="props">
						{{ props.row.do_kontrak || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_bapp"
					label="NO BAPP"
					width="150">
					<template slot-scope="props">
						{{ props.row.no_bapp || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_kontrak"
					label="NO KONTRAK"
					width="150">
					<template slot-scope="props">
						{{ props.row.no_kontrak || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="deskripsi_kontrak"
					label="DESKRIPSI KONTRAK"
					width="250">
					<template slot-scope="props">
						{{ props.row.deskripsi_kontrak || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="nilai_kontrak"
					label="NILAI KONTRAK"
					width="150">
					<template slot-scope="props">
						{{ props.row.nilai_kontrak || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_kontrak"
					label="TANGGAL KONTRAK"
					width="250">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_kontrak) || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="start_date"
					label="START DATE"
					width="150">
					<template slot-scope="props">
						{{ formatDate(props.row.start_date) || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="finish_date"
					label="FINISH DATE"
					width="150">
					<template slot-scope="props">
						{{ formatDate(props.row.finish_date) || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_do_so_spmk"
					label="NO DO/SO/SPMK"
					width="250">
					<template slot-scope="props">
						{{ props.row.nomor_do_so_spmk || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="nilai_do_so_spmk"
					label="NILAI DO/SO/SPMK"
					width="250">
					<template slot-scope="props">
						{{ props.row.nilai_do_so_spmk || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_do_so_spmk"
					label="TANGGAL DO/SO/SPMK"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_do_so_spmk ? formatDate(props.row.tanggal_do_so_spmk): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="start_date_do_so_spmk"
					label="START DATE DO/SO/SPMK"
					width="250">
					<template slot-scope="props">
						 {{ props.row.start_date_do_so_spmk ? formatDate(props.row.start_date_do_so_spmk): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="finish_date_do_so_spmk"
					label="FINISH DATE DO/SO/SPMK"
					width="250">
					<template slot-scope="props">
						 {{ props.row.finish_date_do_so_spmk ? formatDate(props.row.finish_date_do_so_spmk): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="actual_finish_date"
					label="ACTUAL FINISH DATE"
					width="250">
					<template slot-scope="props">
						 {{ props.row.actual_finish_date ? formatDate(props.row.actual_finish_date): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="keterlambatan"
					label="KETERLAMBATAN"
					width="250">
					<template slot-scope="props">
						{{ props.row.keterlambatan || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="denda"
					label="DENDA"
					width="150">
					<template slot-scope="props">
						{{ props.row.denda || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="nilai_yang_dibayarkan"
					label="NILAI YANG DIBAYARKAN"
					width="250">
					<template slot-scope="props">
						{{ props.row.nilai_yang_dibayarkan || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="penyedia"
					label="PENYEDIA"
					width="250">
					<template slot-scope="props">
						{{ props.row.penyedia || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_sp1"
					label="NO SP 1"
					width="150">
					<template slot-scope="props">
						{{ props.row.no_sp1 || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_sp1"
					label="TANGGAL SP 1"
					width="150">
					<template slot-scope="props">
						 {{ props.row.tanggal_sp1 ? formatDate(props.row.tanggal_sp1): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_sp2"
					label="NO SP 2"
					width="150">
					<template slot-scope="props">
						{{ props.row.no_sp2 || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_sp2"
					label="TANGGAL SP 2"
					width="150">
					<template slot-scope="props">
						 {{ props.row.tanggal_sp2 ? formatDate(props.row.tanggal_sp2): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_sp3"
					label="NO SP 3"
					width="150">
					<template slot-scope="props">
						{{ props.row.no_sp3 || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_sp3"
					label="TANGGAL SP 3"
					width="150">
					<template slot-scope="props">
						 {{ props.row.tanggal_sp3 ? formatDate(props.row.tanggal_sp3): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_email_bapp"
					label="TANGGAL EMAIL BAPP"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_email_bapp ? formatDate(props.row.tanggal_email_bapp): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_feedback_ba"
					label="TANGGAL FEEDBACK BA"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_feedback_ba ? formatDate(props.row.tanggal_feedback_ba): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_recipt"
					label="TANGGAL RECEIPT"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_recipt ? formatDate(props.row.tanggal_recipt): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_recipt"
					label="NO RECEIPT"
					width="250">
					<template slot-scope="props">
						{{ props.row.no_recipt || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_ba_ke_direksi"
					label="TANGGAL BA ke DIREKSI"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_ba_ke_direksi ? formatDate(props.row.tanggal_ba_ke_direksi): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_ba_ke_gm"
					label="TANGGAL BA ke GM"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_ba_ke_gm ? formatDate(props.row.tanggal_ba_ke_gm): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="tanggal_ba_ke_keuangan"
					label="TANGGAL BA ke KEUANGAN"
					width="250">
					<template slot-scope="props">
						 {{ props.row.tanggal_ba_ke_keuangan ? formatDate(props.row.tanggal_ba_ke_keuangan): "-" }}
					</template>
				</el-table-column>
				<el-table-column
					prop="keterangan"
					label="KETERANGAN"
					width="250">
					<template slot-scope="props">
						{{ props.row.keterangan || "-" }}
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="Operations"
					width="300">
					<template slot-scope="scope">
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" size="small" @click="doShowDialogEdit(scope.row)">
							Edit
						</el-button>
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" type="danger" size="small" @click="deletePO(scope.row.id)">
							Delete
						</el-button>
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
					@current-change="paginateBAPP"
					:current-page="currentPage"
					:page-size="limit"
					:total="total"
					class="mt-10"
				/>
			</div>
		</el-card>
		<el-dialog @close="clearForm" :visible.sync="dialogAddBAPP" title="Tambah BAPP" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="form">
				<el-form-item>
					<div>No PR</div>
					<el-select @change="handleSelect" filterable v-model="po_id" style="width:100%">
						<el-option label="Pilih PO" value=""></el-option>
						<el-option v-for="item in list_po" :key="item.id" :label="item.no_pr" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<div>Bidang</div>
					<el-select filterable v-model="form.bidang" style="width:100%">
						<el-option label="Pilih bidang" value=""></el-option>
						<el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<div>DO/Kontrak</div>
					<el-select filterable v-model="form.do_kontrak" placeholder="Pilih DO/Kontrak" style="width:100%">
						<!-- <el-option label="Pilih DO/Kontrak" value=""></el-option> -->
						<el-option
							v-for="item in optionsDoKontrak"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="No BAPP">
					<el-input v-model="form.no_bapp" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="No Kontrak" :label-width="formLabelWidth">
					<el-input v-model="form.no_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Deskripsi Kontrak" :label-width="formLabelWidth">
					<el-input v-model="form.deskripsi_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nilai Kontrak" :label-width="formLabelWidth">
					<el-input v-model="form.nilai_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal Kontrak" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_kontrak" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Start Date" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.start_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Finish Date" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.finish_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No DO/SO/SPMK" :label-width="formLabelWidth">
					<el-input v-model="form.no_do_so_spmk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nilai DO/SO/SPMK" :label-width="formLabelWidth">
					<el-input v-model="form.nilai_do_so_spmk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal DO/SO/SPMK" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_do_so_spmk" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Start Date DO/SO/SPMK" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.start_date_do_so_spmk" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Finish Date DO/SO/SPMK" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.finish_date_do_so_spmk" format="dd/MM/yyyy" @change="autoDate()" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Actual Finish Date" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.actual_finish_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Keterlambatan (hari)" :label-width="formLabelWidth">
					<el-input v-model="form.keterlambatan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Denda" :label-width="formLabelWidth">
					<el-input v-model="form.denda" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nilai Yang Dibayarkan" :label-width="formLabelWidth">
					<el-input v-model="form.nilai_yang_dibayarkan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Penyedia</div>
					<el-select filterable v-model="form.penyedia" style="width:100%">
						<el-option label="Pilih penyedia" value=""></el-option>
						<el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="No SP 1" :label-width="formLabelWidth">
					<el-input v-model="form.no_sp1" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal SP 1" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_sp1" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No SP 2" :label-width="formLabelWidth">
					<el-input v-model="form.no_sp2" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal SP 2" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_sp2" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No SP 3" :label-width="formLabelWidth">
					<el-input v-model="form.no_sp3" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal SP 3" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_sp3" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Email BAPP/BAST" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_email_bapp" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Feedback BA" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_feedback_ba" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Recipt" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_recipt" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No Recipt" :label-width="formLabelWidth">
					<el-input v-model="form.no_recipt" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal BA ke Direksi" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_ba_ke_direksi" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal BA ke GM" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_ba_ke_gm" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal BA ke Keuangan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.tanggal_ba_ke_keuangan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Keterangan" :label-width="formLabelWidth">
					<el-input v-model="form.keterangan" type="textarea" auto-complete="off"></el-input>
				</el-form-item>


				<!-- <el-form-item label="No BA" :label-width="formLabelWidth">
					<el-input v-model="form.no_ba" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Judul BAE" :label-width="formLabelWidth">
					<el-input v-model="form.judul_bae" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Deskripsi Pekerjaan" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="form.deskripsi_pekerjaan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Estimasi Harga (Rp)" :label-width="formLabelWidth">
					<CurrencyInput
						ref="currInput"
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly"
						v-model="form.estimasi_harga" auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
				</el-form-item>
				<el-form-item>
					<div>Penyedia</div>
					<el-select filterable v-model="form.penyedia" style="width:100%">
						<el-option label="Pilih penyedia" value=""></el-option>
						<el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="No LOI" :label-width="formLabelWidth">
					<el-input v-model="form.no_loi" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Durasi Pekerjaan" :label-width="formLabelWidth">
					<el-input placeholder="Jumlah Hari" @keypress.native="numberOnly(),durasiClear()" @keyup.native.delete="numberOnly(),durasiClear()" v-model="form.durasi" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Mulai Pekerjaan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="form.mulai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Selesai Pekerjaan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" readonly v-model="form.selesai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Nomor PR" :label-width="formLabelWidth">
					<el-input v-model="form.no_pr" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Status Pengadaan</div>
					<el-select filterable v-model="form.status_pengadaan" style="width:100%">
						<el-option v-for="item in statusProgress" :key="item.id" :label="item.status" :value="item.status"></el-option>
					</el-select>
				</el-form-item> -->
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddBAPP = false">Cancel</el-button>
		    <el-button type="primary" @click="addBAE" :loading="loadingAddBAE">Submit</el-button>
		  </span>
		</el-dialog>

		<el-dialog @close="clearFormEdit()" :visible.sync="dialogChangeBAPP" :title="'Edit BAPP : '+selectedEditPO.bidang"  :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="selectedEditPO">
				<el-form-item>
					<div>Bidang</div>
					<el-select filterable v-model="selectedEditPO.bidang" style="width:100%">
						<el-option label="Pilih bidang" value=""></el-option>
						<el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<div>DO/Kontrak</div>
					<el-select filterable v-model="selectedEditPO.do_kontrak" placeholder="Pilih DO/Kontrak" style="width:100%">
						<!-- <el-option label="Pilih DO/Kontrak" value=""></el-option> -->
						<el-option
							v-for="item in optionsDoKontrak"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="No BAPP">
					<el-input v-model="selectedEditPO.no_bapp" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="No Kontrak" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Deskripsi Kontrak" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.deskripsi_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nilai Kontrak" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nilai_kontrak" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal Kontrak" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_kontrak" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Start Date" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.start_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Finish Date" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.finish_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No DO/SO/SPMK" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nomor_do_so_spmk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nilai DO/SO/SPMK" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nilai_do_so_spmk" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal DO/SO/SPMK" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_do_so_spmk" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Start Date DO/SO/SPMK" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.start_date_do_so_spmk" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Finish Date DO/SO/SPMK" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.finish_date_do_so_spmk" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Actual Finish Date" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.actual_finish_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Keterlambatan" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.keterlambatan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Denda" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.denda" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nilai Yang Dibayarkan" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nilai_yang_dibayarkan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>
					<div>Penyedia</div>
					<el-select filterable v-model="selectedEditPO.penyedia" style="width:100%">
						<el-option label="Pilih penyedia" value=""></el-option>
						<el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="No SP 1" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_sp1" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal SP 1" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_sp1" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No SP 2" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_sp2" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal SP 2" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_sp2" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No SP 3" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_sp3" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal SP 3" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_sp3" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Email BAPP/BAST" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_email_bapp" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Feedback BA" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_feedback_ba" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal Recipt" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_recipt" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="No Recipt" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_recipt" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Tanggal BA ke Direksi" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_ba_ke_direksi" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal BA ke GM" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_ba_ke_gm" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Tanggal BA ke Keuangan" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_ba_ke_keuangan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
				<el-form-item label="Keterangan" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.keterangan" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogChangeBAPP = false">Cancel</el-button>
				<el-button type="primary" @click="updatePO" :loading="loadingUpdateBAPP">Submit</el-button>
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
import { useCurrencyInput } from 'vue-currency-input'
// import CurrencyInput from './CurrencyInput'
import CurrencyInput from "../../components/CurrencyInput.vue";

export default {
	name: 'BAPP',
	directives: {
		'echarts': V_Echarts
	},
	props: {
		modelValue: Number, // Vue 2: value
		options: Object
	},
	setup (props) {
		const { formattedValue, inputRef } = useCurrencyInput(props.options)
		return { inputRef, formattedValue }
	},
	components: {
		Chart,
		ChartLabel,
		CurrencyInput
	},
	data() {
		return {
			list_po: [],
			po_id: '',
			value1 : false,
			value2: false,
			allowedRole: store.getters.allowedRole,
			date1: null,
			searchBAE:'',
			searchBAPP :'',
			bapp: [ { bapp: [] } ],
			bae: [ { bae: [] } ],
			loadingBAE: false,
			loadingBAPP: false,
			loadingAddBAE: false,
			loadingUpdateBAE: false,
			loadingUpdateBAPP: false,
			loadingDownload: false,
			dialogAddBAPP: false,
			dialogChangeBAE: false,
			dialogChangeBAPP: false,
			loadingJenisAnggaran: false,
			loadingBidang: false,
			loadingSubBidang: false,
			loadingJenisPengadaan: false,
			loadingPenyedia: false,
			loadingStatusKeterlambatan: false,
			loadingStatusPengadaan: false,
			loadingDelete: false,
			loadingSet: false,
			optionsDoKontrak: [{
				value: 'DO/SO/SPMK',
				label: 'DO/SO/SPMK'
			}, {
				value: 'Kontrak',
				label: 'Kontrak'
			}],
			form: {
				bidang: "",
				do_kontrak: "",
				no_bapp: "",
				no_kontrak: "",
				deskripsi_kontrak: "",
				nilai_kontrak: "",
				tanggal_kontrak: "",
				start_date: "",
				finish_date: "",
				nomor_do_so_spmk: "",
				nilai_do_so_spmk: "",
				tanggal_do_so_spmk: "",
				start_date_do_so_spmk: "",
				finish_date_do_so_spmk: "",
				actual_finish_date: "",
				keterlambatan: "",
				denda: "",
				nilai_yang_dibayarkan: "",
				penyedia: "",
				no_sp1: "",
				tanggal_sp1: "",
				no_sp2: "",
				tanggal_sp2: "",
				no_sp3: "",
				tanggal_sp3: "",
				tanggal_email_bapp: "",
				tanggal_feedback_ba: "",
				tanggal_recipt: "",
				no_recipt: "",
				tanggal_ba_ke_direksi: "",
				tanggal_ba_ke_gm: "",
				tanggal_ba_ke_keuangan: "",
				keterangan: ""
			},
			status_keterlambatan: '',
			checkdate: '',
			jenisAnggaran: [],
			bidang: [],
			sub_bidang: [],
			jenis_pengadaan: [],
			penyedia: [],
			statusKeterlambatan: [],
			statusProgress: [],
			formLabelWidth: '',
			currentPage: 1,
			selectedEditPO: {
				bidang: "",
				do_kontrak: "",
				no_bapp: "",
				no_kontrak: "",
				deskripsi_kontrak: "",
				nilai_kontrak: "",
				tanggal_kontrak: "",
				start_date: "",
				finish_date: "",
				nomor_do_so_spmk: "",
				nilai_do_so_spmk: "",
				tanggal_do_so_spmk: "",
				start_date_do_so_spmk: "",
				finish_date_do_so_spmk: "",
				actual_finish_date: "",
				keterlambatan: "",
				denda: "",
				nilai_yang_dibayarkan: "",
				penyedia: "",
				no_sp1: "",
				tanggal_sp1: "",
				no_sp2: "",
				tanggal_sp2: "",
				no_sp3: "",
				tanggal_sp3: "",
				tanggal_email_bapp: "",
				tanggal_feedback_ba: "",
				tanggal_recipt: "",
				no_recipt: "",
				tanggal_ba_ke_direksi: "",
				tanggal_ba_ke_gm: "",
				tanggal_ba_ke_keuangan: "",
				keterangan: ""
				// no_ba: '',
				// judul_bae: "",
				// nama_pekerjaan: "",
				// bidang: "",
				// estimasi_harga: "",
				// penyedia: "",
				// no_loi: '',
				// mulai_pekerjaan: "",
				// durasi: '',
				// selesai_pekerjaan: "",
				// no_pr: "",
				// no_kontrak: "",
				// status_pengadaan: ""
			},
			searchByList: [
				// { by: "bidang", name: "Bidang" },
				{ by: "do_kontrak", name: "DO/Kontrak" },
				{ by: "no_bapp", name: "No BAPP" },
				{ by: "no_kontrak", name: "No Kontrak" },
				{ by: "deskripsi_kontrak", name: "Deskripsi Kontrak" },
				{ by: "nilai_kontrak", name: "Nilai Kontrak" },
				// { by: "no_do_so_spmk", name: "No DO/SO/SPMK" },
				{ by: "nilai_do_so_spmk", name: "Nilai DO/SO/SPMK" },
				{ by: "penyedia", name: "Penyedia" },
				{ by: "no_sp1", name: "No SP 1" },
				{ by: "no_sp2", name: "No SP 2" },
				{ by: "no_sp3", name: "No SP 3" },
				{ by: "no_recipt", name: "No Recipt" },
				{ by: "keterangan", name: "Keterangan" }
			],
			searchBy: '',
			selectedStatusToEdit: "",
			total: 0,
			limit: 10,
			pickerOptions: {
					disabledDate(time) {
					return time.getTime() > Date.now();
				},
				// shortcuts: [{
				// 	text: 'Today',
				// 	onClick(picker) {
				// 		picker.$emit('pick', new Date());
				// 	}
				// },
				// {
				// 	text: 'Yesterday',
				// 	onClick(picker) {
				// 		const date = new Date();
				// 		date.setTime(date.getTime() - 3600 * 1000 * 24);
				// 		picker.$emit('pick', date);
				// 	}
				// },
				// {
				// 	text: 'A week ago',
				// 	onClick(picker) {
				// 		const date = new Date();
				// 		date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				// 		picker.$emit('pick', date);
				// 	}
				// }]
			},
			timeout: null
		}
	},
	computed: {
		smallWidget() {
			return this.dashboardWidth >= 970 && this.dashboardWidth <= 1412 && this.windowWidth >= 1200
		}
	},
	watch:{
		value1(){
			// if (this.value1 == false) {
			// 	if (this.dialogAddPo == true) {
			// 		this.form.nilai_pr_ppn = this.form.nilai_pr
			// 	}

			// 	if (this.dialogChangePO == true) {
			// 		this.selectedEditPO.nilai_pr_ppn = this.selectedEditPO.nilai_pr
			// 	}
			// }
			// else{
				this.changeNilaiPR()
			// }
		},
		value2(){
			// if (this.value2 == false) {
			// 	if (this.dialogAddPo == true) {
			// 		this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			// 	}

			// 	if (this.dialogChangePO == true) {
			// 		this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak
			// 	}
			// }
			// else{
				// console.log('masuk value2');
				this.changeNilaiKontrak()
			// }
			this.changeNilaiSaving()

		},
		total(){
			if (this.total > 10000) {
			 let elBtn = document.getElementsByClassName("btn-next")
			 for (let index = 0; index < elBtn.length; index++) {
				 elBtn[index].disabled = true

			 }
			}
		}
	},
	methods: {
		handleSelect(value){
			// console.log(this.po_id);
			this.form.bidang = this.bidang.find(el => this.po_id.bidang == el.bidang).id || ''
			this.form.deskripsi_kontrak = this.po_id.deskripsi_pekerjaan || ''
			this.form.no_kontrak = this.po_id.no_kontrak || ''
			this.form.nilai_kontrak = this.po_id.nilai_kontrak || 0
			this.form.tanggal_kontrak = this.po_id.tgl_kontrak ? new Date(this.po_id.tgl_kontrak) : ''
			this.form.start_date = this.po_id.mulai_pekerjaan ? new Date(this.po_id.mulai_pekerjaan) : ''
			this.form.finish_date = this.po_id.selesai_pekerjaan ? new Date(this.po_id.selesai_pekerjaan) : ''
			this.form.penyedia = this.po_id.penyedia || ''
			this.form.keterangan = this.po_id.keterangan || ''


		},
		doKontrakSelected(){
			if(this.form.do_kontrak == "Kontrak"){
				return moment(this.form.finish_date_do_so_spmk) - moment(this.form.finish_date)
			}
		},
		inRole(val, val2) {
			if(this.allowedRole.replace(/\s/g, '').includes(val) || this.allowedRole.replace(/\s/g, '').includes(val2)) {
				return true;
			} else {
				return false;
			}
		},
		doSearchBAPP(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchBAPP.length >= 1) {
				this.currentPage = 1;
					this.getPO(this.searchBAPP, false, this.searchBy);
				} else {
					this.getPO();
				}
			}, 1000);
		},
		doSearchBAE(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchPO.length >= 1) {
				this.currentPage = 1;
				this.getPO(this.searchPO, false, this.searchBy);
				} else {
				this.getPO();
				}
			}, 1000);
		},
		disabledDate(date) {
				return new Date() < date
		},
		download(){
			this.getPO(this.searchPO,true, this.searchBy)
		},
		pasteBa(event) {
		event.preventDefault();
		var totalCharacterCount = window.event.clipboardData.getData("Text"); // || window.clipboardData.getData('Text');
		var strValidChars = "+0123456789";
		var strChar;
		let FilteredChars = "";
		for (var i = 0; i < totalCharacterCount.length; i++) {
			strChar = totalCharacterCount.charAt(i);
			if (strValidChars.indexOf(strChar) != -1) {
			FilteredChars = FilteredChars + strChar;
			}
		}
		this.form.no_ba = FilteredChars;
		this.selectedEditPO.no_ba = FilteredChars
		},
		pasteLoi(event) {
		event.preventDefault();
		var totalCharacterCount = window.event.clipboardData.getData("Text"); // || window.clipboardData.getData('Text');
		var strValidChars = "+0123456789";
		var strChar;
		let FilteredChars = "";
		for (var i = 0; i < totalCharacterCount.length; i++) {
			strChar = totalCharacterCount.charAt(i);
			if (strValidChars.indexOf(strChar) != -1) {
			FilteredChars = FilteredChars + strChar;
			}
		}
		this.form.no_loi = FilteredChars;
		this.selectedEditPO.no_loi = FilteredChars;
		},
		numberOnly(e) {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.changeNilaiPR()
			this.changeNilaiKontrak()
			this.changeNilaiSaving()
		}, 700);
		var key = window.event ? e.keyCode : e.which;


		let isNumber = _.indexOf([8, 9, 27, 13, 190, 43], e.keyCode);
		if (
			isNumber !== -1 ||
			// Allow: Ctrl+C, Command+C
			(e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: Ctrl+R, Command+R
			(e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode > 42 &&
			e.keyCode <= 49 &&
			_.indexOf([44, 45, 46, 47], e.keyCode) == -1)
		) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if (
			(e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
			(e.keyCode > 96 || e.keyCode < 200)
		) {
			e.preventDefault();
		}
		},
		changeNilaiSaving(){
			this.form.saving = 0
			this.selectedEditPO.saving = 0

			if(parseInt(this.form.nilai_hps) != 0 && this.form.nilai_hps != ''){
				this.form.saving = parseInt(this.form.nilai_hps) - parseInt(this.form.nilai_kontrak_ppn)
			}
			if (this.selectedEditPO.nilai_hps != 0 && this.selectedEditPO.nilai_hps != '') {
					this.selectedEditPO.saving = parseInt(this.selectedEditPO.nilai_hps) - parseInt(this.selectedEditPO.nilai_kontrak_ppn)
				}
			// if(parseInt(this.selectedEditPO.saving) == 0 && this.selectedEditPO.saving == ''){
			// 	if (this.selectedEditPO.nilai_hps != 0) {
			// 		this.selectedEditPO.saving = parseInt(this.selectedEditPO.nilai_hps) - parseInt(this.selectedEditPO.nilai_kontrak_ppn)
			// 	}
			// }
			// else {
			// 	this.form.saving = 0
			// 	this.selectedEditPO.saving = 0
			// }
		},
		changeNilaiPR(){
			this.form.nilai_pr_ppn = this.form.nilai_pr
				this.selectedEditPO.nilai_pr_ppn = this.selectedEditPO.nilai_pr
			if(parseInt(this.form.nilai_pr) != 0 && this.form.nilai_pr != '' && this.value1 == true){
				// console.log('trim',this.form.nilai_pr)
				this.form.nilai_pr_ppn = (11 / 100 * parseInt(this.form.nilai_pr)) + parseInt(this.form.nilai_pr)
			}
			if(parseInt(this.selectedEditPO.nilai_pr) != 0 && this.selectedEditPO.nilai_pr && this.value1 == true){
				this.selectedEditPO.nilai_pr_ppn = (11 / 100 * parseInt(this.selectedEditPO.nilai_pr)) + parseInt(this.selectedEditPO.nilai_pr)
			}
			// else {
			// 	this.form.nilai_pr_ppn = this.form.nilai_pr
			// 	this.selectedEditPO.nilai_pr_ppn = this.selectedEditPO.nilai_pr
			// }
		},
		changeNilaiKontrak(){
			this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak

			if(parseInt(this.form.nilai_kontrak) != 0 && this.form.nilai_kontrak != '' && this.value2 == true){
				this.form.nilai_kontrak_ppn = (11 / 100 * parseInt(this.form.nilai_kontrak)) + parseInt(this.form.nilai_kontrak)
			}
			if(parseInt(this.selectedEditPO.nilai_kontrak) != 0 && this.selectedEditPO.nilai_kontrak && this.value2 == true){
				this.selectedEditPO.nilai_kontrak_ppn = (11 / 100 * parseInt(this.selectedEditPO.nilai_kontrak)) + parseInt(this.selectedEditPO.nilai_kontrak)
			}
			// else {
			// 	this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			// 	this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak
			// }
		},
		// checkDate(){
		// 	var begin = moment().subtract(1, 'days').startOf(this.po.selesai_pekerjaan)
		// 	var end = moment().add(2, 'days').endOf('day')
		// 	// var checking = moment().add(this.po.durasi_pembuatan_po, )
		// 	// var checkdate =	moment().diff(this.form.durasi_pembuatan_po, 'days')
		// 	console.log('cekdate slse',moment(begin._d).format('DD-MM-YYYY'))
		// 	console.log('cekdate end',end)
		// },
		check() {
			var now = moment();
			var hourToCheck = (now.day() !== 0)?17:15;
			var dateToCheck = now.hour(hourToCheck).minute(30);
			// console.log('datetocek',moment().isAfter(dateToCheck))
			return moment().isAfter(dateToCheck);
		},

		durasiClear(){
			this.form.mulai_pekerjaan = ''
			this.selectedEditPO.mulai_pekerjaan = ''
			this.selectedEditPO.selesai_pekerjaan = ''
		},

		autoDate(){
			// this.form.selesai_pekerjaan = moment(this.form.mulai_pekerjaan).add(this.form.durasi,'days').subtract(1, 'days')
			// this.selectedEditPO.selesai_pekerjaan = moment(this.selectedEditPO.mulai_pekerjaan).add(this.selectedEditPO.durasi,'days').subtract(1, 'days')
			// console.log('form selesai',this.form.selesai_pekerjaan)

			switch (this.form.do_kontrak) {
				case 'Kontrak':
					this.form.keterlambatan = this.form.finish_date_do_so_spmk && this.form.start_date ? moment(this.form.finish_date_do_so_spmk).diff(moment(this.form.start_date), 'days'): null
					break;
				case 'DO/SO/SPMK':
					this.form.keterlambatan = this.form.finish_date_do_so_spmk && this.form.start_date_do_so_spmk ? moment(this.form.finish_date_do_so_spmk).diff(moment(this.form.start_date_do_so_spmk), 'days'): null
					break;
			}
		},

		doShowDialogEdit(key){
			console.log('key edit',key);
			let data = {...key}
			this.dialogChangeBAPP = true;
			// key.estimasi_harga = this.convertToAngka(key.estimasi_harga)
			// key.nilai_pr = this.convertToAngka(key.nilai_pr)
			// key.nilai_kontrak = this.convertToAngka(key.nilai_kontrak)
			this.selectedEditPO = data
		},

		// clearForm(){
		// 	this.form = {
		// 		pic_pengadaan: "",
		// 		jenis_anggaran: "",
		// 		tahun_anggaran: "",
		// 		bidang: "",
		// 		sub_bidang: "",
		// 		deskripsi_pekerjaan: "",
		// 		metode_pengadaan: "",
		// 		penyedia: "",
		// 		no_pr: "",
		// 		nilai_pr: '',
		// 		nilai_pr_ppn: '',
		// 		nilai_hps: '',
		// 		tgl_masuk_dokumen: "",
		// 		no_ba: '',
		// 		no_loi: '',
		// 		//tgl_kirim_dokumen: "",
		// 		durasi_pembuatan_po: '',
		// 		status_keterlambatan: "",
		// 		status_pengadaan: "",
		// 		no_kontrak: "",
		// 		tgl_kontrak: "",
		// 		nilai_kontrak: '',
		// 		nilai_kontrak_ppn: '',
		// 		saving: 0,
		// 		mulai_pekerjaan: "",
		// 		warning_date: "",
		// 		selesai_pekerjaan: "",
		// 		keterangan: ""
		// 	}
		// },

		tableRowClassName({row, rowIndex}) {
			// console.log('row',this.formatDate(row.selesai_pekerjaan));
			// console.log('row index',rowIndex)
			let date1 = new Date(moment(row.selesai_pekerjaan).format("MM/DD/YYYY"));
			let date2 = new Date(moment().format("MM/DD/YYYY"));
			let date3 = new Date(moment(row.warning_date).format("MM/DD/YYYY"));

			// To calculate the time difference of two dates
			let difference1 = date1.getTime() - date2.getTime();
			let difference2 = date1.getTime() - date3.getTime();
			let Difference_In_Days1 = difference1 / (1000 * 3600 * 24);
			let Difference_In_Days2 = difference2 / (1000 * 3600 * 24);

			if (Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 > 0) {
				return 'warning-row';

			} else if(Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 <= 0 && row.status_pengadaan != 'TERKONTRAK' || row.status_pengadaan != 'CLOSED' || row.status_pengadaan != 'CLOSE'){
				return 'danger-row';
			}
			else if(row.status_pengadaan == 'TERKONTRAK' || row.status_pengadaan != 'CLOSED' || row.status_pengadaan != 'CLOSE' && row.keterangan == 'Selesai'){
				return 'default-row';
			}
			else {
				return '';
			}
		},
		formatDate(str, format) {
			if (!str) {
				return '-'
			}
			
			return moment(str).format(format || "DD-MMM-YYYY");
		},
		formatDateInput(value, event) {
			return moment(str).format("DD-MM-YYYY");
		},
		async getStatusPengadaan(){
			this.loadingStatusPengadaan = true
			await api({
				method: 'get',
				url: 'status_progress'
			}).then(response => {
				this.statusProgress = response.data.data.rows
				this.loadingStatusPengadaan = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data status progress pengadaan gagal terambil", "error")
				this.loadingStatusPengadaan = false
			})
		},
		async getBidang(){
			this.loadingBidang = true
			await api({
				method: 'get',
				url: 'bidang'
			}).then(response => {
				this.bidang = response.data.data.rows
				console.log("bidang",this.bidang)
				this.loadingBidang = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data bidang gagal terambil", "error")
				this.loadingBidang = false
			})
		},
		async getSubBidang(){
			this.loadingSubBidang = true
			await api({
				method: 'get',
				url: 'sub_bidang'
			}).then(response => {
				this.sub_bidang = response.data.data.rows
				this.loadingSubBidang = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data sub bidang gagal terambil", "error")
				this.loadingSubBidang = false
			})
		},
		async getJenisPengadaan(){
			this.loadingJenisPengadaan = true
			await api({
				method: 'get',
				url: 'jenis_pengadaan'
			}).then(response => {
				this.jenis_pengadaan = response.data.data.rows
				this.loadingJenisPengadaan = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data jenis pengadaan gagal terambil", "error")
				this.loadingJenisPengadaan = false
			})
		},
		async getSubBidang(){
			this.loadingSubBidang = true
			await api({
				method: 'get',
				url: 'sub_bidang'
			}).then(response => {
				this.sub_bidang = response.data.data.rows
				this.loadingSubBidang = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data sub bidang gagal terambil", "error")
				this.loadingSubBidang = false
			})
		},
		async getPenyedia(){
			this.loadingPenyedia = true
			await api({
				method: 'get',
				url: 'procurement/provider'
			}).then(response => {
				this.penyedia = response.data.data.rows
				this.loadingPenyedia = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data penyedia gagal terambil", "error")
				this.loadingPenyedia = false
			})
		},
		async getJenisAnggaran() {
			this.loadingJenisAnggaran = true
			await api({
				method: 'get',
				url: 'jenis_anggaran'
			}).then(response => {
				this.jenisAnggaran = response.data.data.rows
				this.loadingJenisAnggaran = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data jenis anggaran gagal terambil", "error")
				this.loadingJenisAnggaran = false
			})
		},
		async getStatusKeterlambatan() {
			this.loadingStatusKeterlambatan = true
			await api({
				method: 'get',
				url: 'status_keterlambatan'
			}).then(response => {
				this.status_keterlambatan = response.data.data.rows
				this.loadingStatusKeterlambatan = false
			}).catch(error => {
				this.$swal(this.$t('error'), "Data status keterlambatan gagal terambil", "error")
				this.loadingStatusKeterlambatan = false
			})
		},
		async getPO(query = '', download = false, filter = '') {
			if (filter == 'bidang') {
				if (query != '' && typeof query != "undefined") {
					const regex = new RegExp(`${query.toLowerCase()}.*`);
					let queryBidang = this.bidang.filter(el => regex.test(el.bidang.toLowerCase()))
					// console.log('queryBidang', queryBidang);
					if (queryBidang.length > 0) {
						query = queryBidang[0].id
					}
					else{
						this.$message.error('Nama Bidang Tidak Ditemukan');
						return
					}
				}
			}
			this.loadingBAPP = true
			let apiOptions = {
				method: 'get',
				url: 'procurement/bapp',
				params: {
					perPage: this.limit,
					query: query,
					filter: filter,
					download: download,
					page: this.currentPage,
					total: this.total,
					startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
                    endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
				},
				timeout: 10 * 1000
			}

			if(download == true){
				apiOptions.responseType = "arraybuffer"
				this.loadingDownload = true
			}

			await api(apiOptions).then(result => {
				if(result.data.ec == 200){
					console.log('result po', result)
					this.bapp = result.data.data.rows
					this.total = result.data.data.count
					this.checkdate = moment().format('MM/DD/YYYY')
					// console.log('hahaha',this.checkdate)
					this.loadingBAPP = false
        		}
        		else if(download == true){
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([result.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Data Monitoring BAPP.xlsx'); //or any other extension
							link.click();
						} catch(err){
							// console.log(err.message)
						}
					} else{
						this.$swal(this.$t('error'), "Terjadi kesalahan", "error")
					}
				}
				this.loadingDownload = false

			}).catch(error => {
				// console.log(error);
				this.loadingBAPP = false
				this.loadingDownload = false
			})
			this.loadingBAPP = false
			// this.clearForm()
		},
		async getPBJ(query = '', download = false, filter = '') {
			// if (filter == 'bidang') {
			// 	if (query != '' && typeof query != "undefined") {
			// 		const regex = new RegExp(`${query.toLowerCase()}.*`);
			// 		let queryBidang = this.bidang.filter(el => regex.test(el.bidang.toLowerCase()))
			// 		// console.log('queryBidang', queryBidang);
			// 		if (queryBidang.length > 0) {
			// 			query = queryBidang[0].id
			// 		}
			// 		else{
			// 			this.$message.error('Nama Bidang Tidak Ditemukan');
			// 			return
			// 		}
			// 	}
			// }

			this.loadingPo = true
			let apiOptions = {
				method: 'get',
				url: 'procurement/po',
				params: {
					// perPage: this.limit,
					query: query,
					filter: filter,
					status: 'CLOSED',
					bapp: true
					// download: download,
					// page: this.currentPage,
					// total: this.total,
					// startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
                    // endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
					},
				timeout: 10 * 1000
			}

			// if(download == true){
			// 	apiOptions.responseType = "arraybuffer"
			// 	this.loadingDownload = true
			// }

			await api(apiOptions).then(result => {
				if(result.data.ec == 200){
					console.log('result pbj', result.data.data)
					this.list_po = result.data.data.rows
					// this.list_po.forEach(el=> {
					// 	el.nilai_pr =  this.convertToRupiah(el.nilai_pr || 0)
					// 	el.nilai_pr_ppn = this.convertToRupiah(el.nilai_pr_ppn || 0)
					// 	el.nilai_kontrak = this.convertToRupiah(el.nilai_kontrak || 0)
					// 	el.nilai_kontrak_ppn = this.convertToRupiah(el.nilai_kontrak_ppn || 0)
					// 	el.nilai_hps = this.convertToRupiah(el.nilai_hps||0)
					// 	el.saving = this.convertToRupiah(el.saving || 0)
					// })
					// this.total = result.data.data.count
					// this.checkdate = moment().format('MM/DD/YYYY')
					// console.log('hahaha',this.checkdate)
					this.loadingPo = false
        		}
        		
				
			}).catch(error => {
				// console.log(error);
				this.loadingPo = false
			})
			// this.loadingPo = false
			// this.clearForm()
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
		async paginateBAPP(page) {
			// console.log('page', page)
			this.currentPage = page
				if (this.searchBAPP != '') {
				this.getPO(this.searchBAPP, false, this.searchBy);
			}
			else {
				this.getPO();
			}
		},
		addBAE() {
			this.loadingAddBAE = true
			api({
				method: 'post',
				url: 'procurement/bapp',
				data: this.form
			}).then(result => {
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data BAPP berhasil ditambahkan", "success")
					this.dialogAddBAPP = false
					this.getPO()
					this.getPBJ()
					this.clearForm()
				} else {
					this.$message.error(result.data.message == 'invalid_value' ? 'Lengkapi kolom yang tersedia' : 'Terjadi kesalahan');
				}
				this.loadingAddBAE = false
				this.dialogAddBAPP = false
			}).catch(error => {
				// console.log(error);
				this.loadingAddBAE = false
			})
			// this.loadingBAE = false
		},

		updatePO() {
			this.loadingUpdateBAPP = true
			api({
				method: 'patch',
				url: 'procurement/bapp/'+this.selectedEditPO.id,
				data: {
					// no_ba: this.selectedEditPO.no_ba,
					// judul_bae: this.selectedEditPO.judul_bae,
					// nama_pekerjaan: this.selectedEditPO.nama_pekerjaan,
					// bidang: this.selectedEditPO.bidang,
					// estimasi_harga: this.selectedEditPO.estimasi_harga,
					// penyedia: this.selectedEditPO.penyedia,
					// no_loi: this.selectedEditPO.no_loi,
					// mulai_pekerjaan: this.selectedEditPO.mulai_pekerjaan,
					// durasi: this.selectedEditPO.durasi,
					// selesai_pekerjaan: this.selectedEditPO.selesai_pekerjaan,
					// no_pr: this.selectedEditPO.no_pr,
					// no_kontrak: this.selectedEditPO.no_kontrak,
					// status_pengadaan: this.selectedEditPO.status_pengadaan,

					bidang: this.selectedEditPO.bidang,
					do_kontrak: this.selectedEditPO.do_kontrak,
					no_bapp: this.selectedEditPO.no_bapp,
					no_kontrak: this.selectedEditPO.no_kontrak,
					deskripsi_kontrak: this.selectedEditPO.deskripsi_kontrak,
					nilai_kontrak: this.selectedEditPO.nilai_kontrak,
					tanggal_kontrak: this.selectedEditPO.tanggal_kontrak,
					start_date: this.selectedEditPO.start_date,
					finish_date: this.selectedEditPO.finish_date,
					nomor_do_so_spmk: this.selectedEditPO.nomor_do_so_spmk,
					nilai_do_so_spmk: this.selectedEditPO.nilai_do_so_spmk,
					tanggal_do_so_spmk: this.selectedEditPO.tanggal_do_so_spmk,
					start_date_do_so_spmk: this.selectedEditPO.start_date_do_so_spmk,
					finish_date_do_so_spmk: this.selectedEditPO.finish_date_do_so_spmk,
					actual_finish_date: this.selectedEditPO.actual_finish_date,
					keterlambatan: this.selectedEditPO.keterlambatan,
					denda: this.selectedEditPO.denda,
					nilai_yang_dibayarkan: this.selectedEditPO.nilai_yang_dibayarkan,
					penyedia: this.selectedEditPO.penyedia,
					no_sp1: this.selectedEditPO.no_sp1,
					tanggal_sp1: this.selectedEditPO.tanggal_sp1,
					no_sp2: this.selectedEditPO.no_sp2,
					tanggal_sp2: this.selectedEditPO.tanggal_sp2,
					no_sp3: this.selectedEditPO.no_sp3,
					tanggal_sp3: this.selectedEditPO.tanggal_sp3,
					tanggal_email_bapp: this.selectedEditPO.tanggal_email_bapp,
					tanggal_feedback_ba: this.selectedEditPO.tanggal_feedback_ba,
					tanggal_recipt: this.selectedEditPO.tanggal_recipt,
					no_recipt: this.selectedEditPO.no_recipt,
					tanggal_ba_ke_direksi: this.selectedEditPO.tanggal_ba_ke_direksi,
					tanggal_ba_ke_gm: this.selectedEditPO.tanggal_ba_ke_gm,
					tanggal_ba_ke_keuangan: this.selectedEditPO.tanggal_ba_ke_keuangan,
					keterangan: this.selectedEditPO.keterangan
				}
			}).then(result => {
				// console.log('result update', result)
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data BAPP berhasil di update", "success")
					this.dialogChangeBAPP = false
					this.loadingUpdateBAPP = false
					this.getPO()
				} else {
					this.$message.error(this.$t('error_text'));
				}
				this.loadingUpdateBAPP = false
			}).catch(error => {
				console.log(error);
				this.loadingUpdateBAPP = false
			})
			this.loadingUpdateBAPP = false
		},

		getSummaries(param) {
			// console.log('param', param)
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
		},

		deletePO(id) {
			console.log('id hapus',id)
			this.$confirm('Anda yakin akan menghapus data ini?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingDelete = true
				api({
					method: 'delete',
					url: 'procurement/bapp/'+id
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data berhasil di hapus'
						});
						this.getPO()
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

		setSelesai(row) {
			console.log('id selesai',row)
			this.$confirm('Anda yakin untuk menandai data ini sebagai Selesai?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Ya',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingSet = true
				api({
					method: 'patch',
					url: 'procurement/poSelesai/'+row.id,
					data: {
						keterangan: "Selesai"
					}
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data telah ditandai sebagai selesai'
						});
						this.getPO()
					}
					this.loadingSet = false
				}).catch(error => {
					this.loadingSet = false
				})
				this.loadingSet = false
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Anda batal menandai'
				});
			});
		},
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
			// console.log(this.$refs.singleTable);
		},

		clearForm(){
			this.form = {
				actual_finish_date: '',
				bidang: '',
				created_at: '',
				denda: 0,
				deskripsi_kontrak: '',
				do_kontrak: '',
				finish_date: '',
				finish_date_do_so_spmk: '',
				id: '',
				keterangan: '',
				keterlambatan: '',
				nilai_do_so_spmk: '',
				nilai_kontrak: '',
				nilai_yang_dibayarkan: '',
				no_bapp: '',
				no_kontrak: '',
				no_recipt: '',
				no_sp1: '',
				no_sp2: '',
				no_sp3: '',
				nomor_do_so_spmk: '',
				penyedia: '',
				start_date: '',
				start_date_do_so_spmk: '',
				tanggal_ba_ke_direksi: '',
				tanggal_ba_ke_gm: '',
				tanggal_ba_ke_keuangan: '',
				tanggal_do_so_spmk: '',
				tanggal_email_bapp: '',
				tanggal_feedback_ba: '',
				tanggal_kontrak: '',
				tanggal_recipt: '',
				tanggal_sp1: '',
				tanggal_sp2: '',
				tanggal_sp3: '',
				updated_at: ''
			}
			// this.$refs.currInput.clearValue()
			this.value1 = false
			this.value2 = false
			this.po_id = ''
		},
		clearFormEdit(){
			this.selectedEditPO = {
				actual_finish_date: '',
				bidang: '',
				created_at: '',
				denda: 0,
				deskripsi_kontrak: '',
				do_kontrak: '',
				finish_date: '',
				finish_date_do_so_spmk: '',
				id: '',
				keterangan: '',
				keterlambatan: '',
				nilai_do_so_spmk: '',
				nilai_kontrak: '',
				nilai_yang_dibayarkan: '',
				no_bapp: '',
				no_kontrak: '',
				no_recipt: '',
				no_sp1: '',
				no_sp2: '',
				no_sp3: '',
				nomor_do_so_spmk: '',
				penyedia: '',
				start_date: '',
				start_date_do_so_spmk: '',
				tanggal_ba_ke_direksi: '',
				tanggal_ba_ke_gm: '',
				tanggal_ba_ke_keuangan: '',
				tanggal_do_so_spmk: '',
				tanggal_email_bapp: '',
				tanggal_feedback_ba: '',
				tanggal_kontrak: '',
				tanggal_recipt: '',
				tanggal_sp1: '',
				tanggal_sp2: '',
				tanggal_sp3: '',
				updated_at: ''
			}
			// this.$refs.currInput.clearValue()
			this.value1 = false
			this.value2 = false
		}
	},
	async mounted() {
		this.inRole()
		await this.getPO()
		await this.getPBJ()
		await this.getJenisAnggaran()
		await this.getBidang()
		await this.getSubBidang()
		await this.getJenisPengadaan()
		await this.getPenyedia()
		await this.getStatusKeterlambatan()
		await this.getStatusPengadaan()
		// console.log(document.getElementById("po-main"));
		document.getElementById("po-main").addEventListener('click', (e)=> {
			let classes = Array.from(e.target.classList)
			//handle active row table
			if (classes.length != 0) {
				if (classes[0].includes("cell") || classes[0].includes("el-table")) {

				}
				else {
					this.setCurrent()
				}
			}
		});
	}
}
</script>

<style>
.chart {
	width: 100%;
	height: 400px;
}

.float-image {
	float: right;
	z-index: 1;
	bottom: 10px;
	left: 10px;
}

.gradient-api {
	background: #249393;
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
