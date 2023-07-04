<template>
	<div id='po-main' class="scrollable only-y">
		<div class="page-header">
			<h1>Detail {{ $t("menu.po") }} by {{params_status}}</h1>
		</div>
		<!-- <h3>PO</h3> -->
		<el-card class="mb-10">
			<el-button @click="$router.push(`/dashboard/${params_jenis_anggaran}/${params_tahun}`)">
				<i class="mdi mdi-keyboard-backspace"></i> Kembali
			</el-button>
			<!-- <el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button> -->
		</el-card>
		<el-card v-loading="loadingPo">
			<div class="block mb-20">
				<!-- <span class="demonstration">All combined</span> -->
				<el-pagination background prev-text="Prev" next-text="Next" layout="prev, pager, next" :page-size="10" @current-change="paginatePO" :current-page="currentPage" :total="parseInt(total)">
				</el-pagination>
			</div>
			<el-table ref="singleTable" :data="po" style="width: 100%" :row-class-name="tableRowClassName">
			<el-table-column fixed prop="created_at" label="TANGGAL" width="180">
				<template slot-scope="props">
					{{ formatDate(props.row.created_at) }}
				</template>
		    </el-table-column>
			<el-table-column
				prop="tgl_masuk_dokumen"
				label="TANGGAL MASUK DOKUMEN"
				width="220">
				<template slot-scope="props">
						{{ props.row.tgl_masuk_dokumen ? formatDate(props.row.tgl_masuk_dokumen) : "-" }}
				</template>
		    </el-table-column>
		    <el-table-column
		      prop="pic_pengadaan"
		      label="PIC PENGADAAN"
		      width="150">
			  <template slot-scope="props">
					{{ props.row.pic_pengadaan || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
		      prop="jenis_anggaran"
		      label="JENIS ANGGARAN"
		      width="150">
			  <template slot-scope="props">
					{{ props.row.jenis_anggaran || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
		      prop="tahun_anggaran"
		      label="TAHUN ANGGARAN"
		      width="150">
			  <template slot-scope="props">
					{{ props.row.tahun_anggaran || "-" }}
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
		      prop="sub_bidang"
		      label="SUB BIDANG"
		      width="150">
			  <template slot-scope="props">
					{{ props.row.sub_bidang || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
		      prop="deskripsi_pekerjaan"
		      label="DESKRIPSI PEKERJAAN"
		      width="550">
			  <template slot-scope="props">
					{{ props.row.deskripsi_pekerjaan || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
		      prop="metode_pengadaan"
		      label="METODE PENGADAAN"
		      width="200">
			  <template slot-scope="props">
					{{ props.row.metode_pengadaan || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
		      prop="penyedia"
		      label="PENYEDIA"
		      width="300">
			  <template slot-scope="props">
					{{ props.row.penyedia || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
		      prop="no_pr"
		      label="Nomor PR"
		      width="150">
			  <template slot-scope="props">
					{{ props.row.no_pr || "-" }}
			</template>
		    </el-table-column>
		    <el-table-column
				class="number-separator"
		      prop="nilai_pr"
		      label="NILAI (Rp)"
		      width="120">
			  <template slot-scope="props">
					{{ props.row.nilai_pr || 0 }}
			</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="nilai_pr_ppn"
		      label="NILAI (Rp) (+PPn)"
		      width="180">
			  <template slot-scope="props">
					{{ props.row.nilai_pr_ppn || 0 }}
			</template>
		    </el-table-column>
			<el-table-column
		      prop="nilai_hps"
		      label="NILAI HPS"
		      width="120">
			  <template slot-scope="props">
					{{ props.row.nilai_hps || 0 }}
			</template>
		    </el-table-column>
			<el-table-column
		      prop="no_ba"
		      label="No BA"
		      width="180">
			  <template slot-scope="props">
						 {{ props.row.no_ba || '-' }}
					</template>
		    </el-table-column>
			<el-table-column
		      prop="no_loi"
		      label="No LOI"
		      width="180">
			  	<template slot-scope="props">
						 {{ props.row.no_loi || '-' }}
					</template>
		    </el-table-column>
			<el-table-column prop="tanggal_loi" label="TANGGAL LOI" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.tanggal_loi) }}
					</template>
				</el-table-column>
		    <!--<el-table-column
		      prop="tgl_kirim_dokumen"
		      label="TANGGAL KIRIM DOKUMEN"
		      width="220">
					<template slot-scope="props">
						 {{ formatDate(props.row.tgl_kirim_dokumen) }}
					</template>
		    </el-table-column>-->
		    <el-table-column
		      prop="durasi_pembuatan_po"
		      label="DURASI PO"
		      width="220">
			  <template slot-scope="props">
					{{ props.row.durasi_pembuatan_po || 0 }}
			</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="status_keterlambatan"
		      label="STATUS KETERLAMBATAN"
		      width="220">
			  <template slot-scope="props">
					{{ props.row.status_keterlambatan || "-" }}
				</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="no_kontrak"
		      label="NO KONTRAK"
		      width="120">
			  <template slot-scope="props">
					{{ props.row.no_kontrak || "-" }}
				</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="tgl_kontrak"
		      label="TANGGAL KONTRAK"
		      width="180">
					<template slot-scope="props">
						 {{ props.row.tgl_kontrak ? formatDate(props.row.tgl_kontrak): "-" }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="nilai_kontrak"
		      label="NILAI KONTRAK"
		      width="150">
			  <template slot-scope="props">
					{{ props.row.nilai_kontrak || 0 }}
			</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="nilai_kontrak_ppn"
		      label="NILAI KONTRAK + PPN"
		      width="220">
			  <template slot-scope="props">
					{{ props.row.nilai_kontrak_ppn || 0 }}
			</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="saving"
		      label="SAVING"
		      width="120">
			  <template slot-scope="props">
					{{ props.row.saving || 0 }}
			</template>
		    </el-table-column>
			
		    <el-table-column
		      prop="mulai_pekerjaan"
		      label="MULAI PEKERJAAN"
		      width="180">
					<template slot-scope="props">
						 {{ props.row.mulai_pekerjaan ? formatDate(props.row.mulai_pekerjaan): "-" }}
					</template>
		    </el-table-column>
			<el-table-column
		      label="WARNING DATE"
		      width="180">
				<template slot-scope="props">
				{{ props.row.warning_date ? formatDate(props.row.warning_date): "-"}}
				</template>
		    </el-table-column>
		    <el-table-column
		      prop="selesai_pekerjaan"
		      label="SELESAI PEKERJAAN"
		      width="180">
					<template slot-scope="props">
						 {{ props.row.selesai_pekerjaan ? formatDate(props.row.selesai_pekerjaan): "-"}}
						 <!--<span v-if="props.row.selesai_pekerjaan < checkdate">Dela maning rampung</span>-->
					</template>
		    </el-table-column>
			<!--<el-table-column
		      label="PERINGATAN"
		      width="180">
					<template slot-scope="props">
					
						 <span v-if="formatDate(props.row.selesai_pekerjaan) < formatDate(checkdate) == true"><el-tag type="danger">arep rampung</el-tag></span>
						 <span v-if="formatDate(props.row.selesai_pekerjaan) < formatDate(checkdate) == false">masih ada waktu</span>
					</template>
		    </el-table-column>-->
		    <el-table-column
		      prop="keterangan"
		      label="KETERANGAN"
		      width="200">
			  <template slot-scope="props">
					{{ props.row.keterangan || "-" }}
			</template>
		    </el-table-column>
				<el-table-column
					fixed="right"
					prop="status_pengadaan"
					label="STATUS PENGADAAN"
					width="220">
					<template slot-scope="props">
					{{ props.row.status_pengadaan || "-" }}
					</template>
					<!-- <template slot-scope="props">
						<el-tag v-if="props.row.status_pengadaan=='RKS & HPS'" type="success">{{ props.row.status_pengadaan }}</el-tag>
					</template> -->
				</el-table-column>
				<el-table-column
		      fixed="right"
		      label="Operations"
		      width="300">
		      <template slot-scope="scope">
		        <el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" size="small" @click="doShowDialogEdit(scope.row)">Edit</el-button>
		        <el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" type="danger" size="small" @click="deletePO(scope.row.id)">Delete</el-button>
				<el-button v-if="allowedRole == 'manajemen' || allowedRole == 'keuangan'" disabled type="info" size="small" @click="setSelesai(scope.row)">Tandai Selesai</el-button>
				<el-button v-else type="info" size="small" :disabled="scope.row.keterangan == 'selesai' || scope.row.keterangan == 'Selesai' || scope.row.status_pengadaan == 'TERKONTRAK' || scope.row.status_pengadaan == 'CLOSED'" @click="setSelesai(scope.row)">Tandai Selesai</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-card>
		<el-card class="mt-10">
			<div class="block">
		    <!-- <span class="demonstration">All combined</span> -->
				<el-pagination
					background
					prev-text="Prev"
					next-text="Next"
					layout="prev, pager, next"
					:page-size="10"
					@current-change="paginatePO"
					:current-page="currentPage"
					:total="parseInt(total)">
				</el-pagination>
		  </div>
		</el-card>
		<el-dialog :visible.sync="dialogAddPo" title="Tambah PO" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="form">
		    <el-form-item label="Tanggal Masuk Dokumen" :label-width="formLabelWidth">
		      <!-- <el-input v-model="form.tgl_masuk_dokumen" auto-complete="off" ref="selectDate"
            @click="$refs.selectDate.select()" type="date"></el-input> -->
				<el-date-picker placeholder="Pilih Tanggal" v-model="form.tgl_masuk_dokumen" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="PIC Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="form.pic_pengadaan" auto-complete="off"></el-input>
		    </el-form-item>
				<el-form-item>
					<div>Jenis Anggaran</div>
	        <el-select filterable v-model="form.jenis_anggaran" style="width:100%">
	          <el-option label="Pilih jenis anggaran" value=""></el-option>
	          <el-option v-for="item in jenisAnggaran" :key="item.id" :label="item.jenis_anggaran" :value="item.jenis_anggaran"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Jenis Anggaran" :label-width="formLabelWidth">
		      <el-input v-model="form.jenis_anggaran" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="Tahun Anggaran" :label-width="formLabelWidth">
		      <!-- <el-input v-model="form.tahun_anggaran" auto-complete="off"></el-input> -->
			<el-date-picker
			v-model="form.tahun_anggaran"
			type="year"
			placeholder="Pilih Tahun"
			style="width: 100%; cursor: pointer;">
			</el-date-picker>
		    </el-form-item>
				<el-form-item>
					<div>Bidang</div>
	        <el-select filterable v-model="form.bidang" style="width:100%">
	          <el-option label="Pilih bidang" value=""></el-option>
	          <el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Bidang" :label-width="formLabelWidth">
		      <el-input v-model="form.bidang" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Sub Bidang</div>
	        <el-select filterable v-model="form.sub_bidang" style="width:100%">
	          <el-option label="Pilih sub bidang" value=""></el-option>
	          <el-option v-for="item in sub_bidang" :key="item.id" :label="item.sub_bidang" :value="item.id"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Sub Bidang" :label-width="formLabelWidth">
		      <el-input v-model="form.sub_bidang" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="Deskripsi Pekerjaan" :label-width="formLabelWidth">
		      <el-input type="textarea" v-model="form.deskripsi_pekerjaan" auto-complete="off"></el-input>
		    </el-form-item>
				<el-form-item>
					<div>Jenis Pengadaan</div>
	        <el-select filterable v-model="form.metode_pengadaan" style="width:100%">
	          <el-option label="Pilih jenis pengadaan" value=""></el-option>
	          <el-option v-for="item in jenis_pengadaan" :key="item.id" :label="item.jenis_pengadaan" :value="item.jenis_pengadaan"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Metode Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="form.metode_pengadaan" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Penyedia</div>
	        <el-select filterable v-model="form.penyedia" style="width:100%">
	          <el-option label="Pilih penyedia" value=""></el-option>
	          <el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Penyedia" :label-width="formLabelWidth">
		      <el-input v-model="form.penyedia" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="Nomor PR" :label-width="formLabelWidth">
		      <el-input v-model="form.no_pr" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Nilai (Rp)" :label-width="formLabelWidth">
				<CurrencyInput
					@keypress.native="numberOnly"
					@keyup.native.delete="numberOnly" 
					v-model="form.nilai_pr" auto-complete="off"
					:options="{ currency: 'IDR', locale: 'id' }"
				/>
		      <!--<el-input 
			  	:options="{ currency: 'IDR', locale: 'id' }"
			  	  @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" 
				  v-model="form.nilai_pr" auto-complete="off"></el-input>-->
		    </el-form-item>
		    <el-form-item >
				<div>Nilai (Rp) PPN</div>
				<el-switch
					v-model="value1"
					active-text="PPN"
					inactive-text="Non PPN"
					class="mb-4">
				</el-switch>
		      <el-input v-if="value1 == true" v-model="form.nilai_pr_ppn" auto-complete="off" readonly type="number"></el-input>
			  <!--<CurrencyInput
					v-model="form.nilai_pr_ppn" auto-complete="off"
					:options="{ currency: 'IDR', locale: 'id' }" readonly
				/>-->
		    </el-form-item>
			<el-form-item label="Nilai HPS" :label-width="formLabelWidth">
				<CurrencyInput
					@keypress.native="numberOnly"
					@keyup.native.delete="numberOnly" 
					v-model="form.nilai_hps" auto-complete="off"
					:options="{ currency: 'IDR', locale: 'id' }"
				/>
		      <!--<el-input @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" v-model="form.nilai_hps" auto-complete="off"></el-input>-->
		    </el-form-item>
			<el-form-item label="No BA" :label-width="formLabelWidth">
		      <el-input v-model="form.no_ba" auto-complete="off" type="text"></el-input>
		    </el-form-item>
			<el-form-item label="No LOI" :label-width="formLabelWidth">
		      <el-input v-model="form.no_loi" auto-complete="off" type="text"></el-input>
		    </el-form-item>
		    <!--<el-form-item label="Tanggal Kirim Dokumen" :label-width="formLabelWidth">
		      <el-input v-model="form.tgl_kirim_dokumen" auto-complete="off" type="date"></el-input>
		    </el-form-item>-->
				<el-form-item>
					<div>Status Keterlambatan</div>
	        <el-select filterable v-model="form.status_keterlambatan" style="width:100%">
	          <el-option label="Pilih status keterlambatan" value=""></el-option>
	          <el-option v-for="item in status_keterlambatan" :key="item.id" :label="item.status_keterlambatan" :value="item.status_keterlambatan"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Status Keterlambatan" :label-width="formLabelWidth">
		      <el-input v-model="form.status_keterlambatan" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Status Pengadaan</div>
	        <el-select filterable v-model="form.status_pengadaan" style="width:100%">
	          <!-- <el-option label="Pilih status pengadaan" value=""></el-option> -->
	          <el-option v-for="item in statusProgress" :key="item.id" :label="item.status" :value="item.status"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Status Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="form.status_pengadaan" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="No Kontrak" :label-width="formLabelWidth">
		      <el-input v-model="form.no_kontrak" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Tanggal Kontrak" :label-width="formLabelWidth">
		      <!-- <el-input v-model="form.tgl_kontrak" auto-complete="off" type="date"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="form.tgl_kontrak" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="Nilai Kontrak" :label-width="formLabelWidth">
			<CurrencyInput
					@keypress.native="numberOnly"
					@keyup.native.delete="numberOnly" 
					v-model="form.nilai_kontrak" auto-complete="off"
					:options="{ currency: 'IDR', locale: 'id' }"
				/>
		      <!--<el-input  @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" 
				  v-model="form.nilai_kontrak" auto-complete="off"></el-input>-->
		    </el-form-item>
		    <el-form-item>
				<div>Nilai Kontrak PPN</div>
				<el-switch
					v-model="value2"
					active-text="PPN"
					inactive-text="Non PPN"
					class="mb-4">
				</el-switch>
		      <el-input v-if="value2 == true" v-model="form.nilai_kontrak_ppn" auto-complete="off" type="number" readonly></el-input>
		    </el-form-item>
		    <el-form-item label="Saving" :label-width="formLabelWidth">
		      <el-input v-model="form.saving" auto-complete="off" readonly type="number"></el-input>
		    </el-form-item>
			<el-form-item label="Durasi PO" :label-width="formLabelWidth">
		      <el-input placeholder="Jumlah Hari" @keypress.native="numberOnly(),durasiClear()"
                  @keyup.native.delete="numberOnly(),durasiClear()" v-model="form.durasi_pembuatan_po" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Mulai Pekerjaan" :label-width="formLabelWidth">
					<!-- <el-date-picker
			      v-model="form.mulai_pekerjaan"
			      type="datetime"
						:picker-options="{
					    start: '00:00',
					    step: '00:00',
					    end: '23:59'
					  }"
						@change="autoDate()"
			      placeholder="Pick a day">
			    </el-date-picker> -->
					<!-- <el-date-picker
			      v-model="form.mulai_pekerjaan"
			      type="datetime"
						:pickerOptions="pickerOptions"
						@change="autoDate()"
			      placeholder="Select date and time">
			    </el-date-picker> -->
		      <!-- <el-input v-model="form.mulai_pekerjaan" auto-complete="off" type="date" :formatter="formatDateInput" @change="autoDate()"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="form.mulai_pekerjaan" format="dd/MM/yyyy" @change="autoDate()" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
			<el-form-item label="Warning Date" :label-width="formLabelWidth">
					<!-- <el-date-picker
						v-model="form.selesai_pekerjaan"
						type="datetime"
						disabled
						placeholder="Automatic date">
					</el-date-picker> -->
		      <!-- <el-input v-model="form.warning_date" auto-complete="off" type="date"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="form.warning_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="Selesai Pekerjaan" :label-width="formLabelWidth">
					<!-- <el-date-picker
						v-model="form.selesai_pekerjaan"
						type="datetime"
						disabled
						placeholder="Automatic date">
					</el-date-picker> -->
		      <!-- <el-input v-model="form.selesai_pekerjaan" auto-complete="off" type="date"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="form.selesai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="Keterangan" :label-width="formLabelWidth">
		      <el-input v-model="form.keterangan" auto-complete="off" type="textarea"></el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddPo = false">Cancel</el-button>
		    <el-button type="primary" @click="addPO" :loading="loadingAddPo">Submit</el-button>
		  </span>
		</el-dialog>

		<el-dialog @close="clearFormEdit()" :visible.sync="dialogChangePO" :title="`Edit PO : ${selectedEditPO.metode_pengadaan ? selectedEditPO.metode_pengadaan : '-'}, tahun anggaran ${formatDate(selectedEditPO.tahun_anggaran ? new Date(selectedEditPO.tahun_anggaran): null, 'YYYY')}`"  :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="selectedEditPO">
				<el-form-item label="Tanggal Masuk Dokumen" :label-width="formLabelWidth">
				<!-- <el-input v-model="form.tgl_masuk_dokumen" auto-complete="off" ref="selectDate"
				@click="$refs.selectDate.select()" type="date"></el-input> -->
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tgl_masuk_dokumen" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
		    <!-- <el-form-item label="PIC Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.pic_pengadaan" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="PIC Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.pic_pengadaan" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="Tahun Anggaran" :label-width="formLabelWidth">
		      <!-- <el-input v-model="selectedEditPO.tahun_anggaran" auto-complete="off"></el-input> -->
			  <el-date-picker
			v-model="selectedEditPO.tahun_anggaran"
			type="year"
			placeholder="Pilih Tahun"
			style="width: 100%; cursor: pointer;">
			</el-date-picker>
		    </el-form-item>
				<el-form-item label="PIC Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.pic_pengadaan" auto-complete="off"></el-input>
		    </el-form-item>
				<el-form-item>
					<div>Jenis Anggaran</div>
	        <el-select filterable v-model="selectedEditPO.jenis_anggaran" style="width:100%">
	          <el-option label="Pilih jenis anggaran" value=""></el-option>
	          <el-option v-for="item in jenisAnggaran" :key="item.id" :label="item.jenis_anggaran" :value="item.jenis_anggaran"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Jenis Anggaran" :label-width="formLabelWidth">
		      <el-input v-model="form.jenis_anggaran" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Bidang</div>
	        <el-select filterable v-model="selectedEditPO.bidang" style="width:100%">
	          <el-option label="Pilih bidang" value=""></el-option>
	          <el-option v-for="item in bidang" :key="item.id" :label="item.bidang" :value="item.id"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Bidang" :label-width="formLabelWidth">
		      <el-input v-model="form.bidang" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Sub Bidang</div>
	        <el-select filterable v-model="selectedEditPO.sub_bidang" style="width:100%">
	          <el-option label="Pilih sub bidang" value=""></el-option>
	          <el-option v-for="item in sub_bidang" :key="item.id" :label="item.sub_bidang" :value="item.id"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Sub Bidang" :label-width="formLabelWidth">
		      <el-input v-model="form.sub_bidang" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="Deskripsi Pekerjaan" :label-width="formLabelWidth">
		      <el-input type="textarea" v-model="selectedEditPO.deskripsi_pekerjaan" auto-complete="off"></el-input>
		    </el-form-item>
				<el-form-item>
					<div>Jenis Pengadaan</div>
	        <el-select filterable v-model="selectedEditPO.metode_pengadaan" style="width:100%">
	          <el-option label="Pilih jenis pengadaan" value=""></el-option>
	          <el-option v-for="item in jenis_pengadaan" :key="item.id" :label="item.jenis_pengadaan" :value="item.jenis_pengadaan"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Metode Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="form.metode_pengadaan" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Penyedia</div>
	        <el-select filterable v-model="selectedEditPO.penyedia" style="width:100%">
	          <el-option label="Pilih penyedia" value=""></el-option>
	          <el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Penyedia" :label-width="formLabelWidth">
		      <el-input v-model="form.penyedia" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="Nomor PR" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.no_pr" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Nilai (Rp)" :label-width="formLabelWidth">
				<CurrencyInput
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="selectedEditPO.nilai_pr" auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
		      <!-- <el-input 
				  @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" 
				  v-model="selectedEditPO.nilai_pr" auto-complete="off" ></el-input> -->
		    </el-form-item>
		    <el-form-item>
				<div>Nilai (Rp) PPN</div>
				<el-switch
					v-model="value1"
					active-text="PPN"
					inactive-text="Non PPN"
					class="mb-4">
				</el-switch>
		      <el-input v-if="value1 == true" v-model="selectedEditPO.nilai_pr_ppn" auto-complete="off" readonly type="number"></el-input>
		    </el-form-item>
			<el-form-item label="Nilai HPS" :label-width="formLabelWidth">
				<CurrencyInput
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="selectedEditPO.nilai_hps"
						auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
		      <!-- <el-input @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" v-model="selectedEditPO.nilai_hps" auto-complete="off" readonly></el-input> -->
		    </el-form-item>
			<el-form-item label="No BA" :label-width="formLabelWidth">
		      <!-- <el-input  v-model="selectedEditPO.no_ba" auto-complete="off" type="text"></el-input> -->
			  <el-autocomplete
			  			disabled
						class="auto-input"
						v-model="selectedEditPO.no_ba"
						:fetch-suggestions="querySearch"
						placeholder="Cari atau Input No BA"
						:trigger-on-focus="false"
						@select="handleSelect"
						></el-autocomplete>
		    </el-form-item>
			<el-form-item label="No LOI" :label-width="formLabelWidth">
		      <!-- <el-input  v-model="selectedEditPO.no_loi" auto-complete="off" type="text"></el-input> -->
			  <el-autocomplete
			  			disabled
						class="auto-input"
						ref="noLoi"
						v-model="selectedEditPO.no_loi"
						:fetch-suggestions="querySearch2"
						placeholder="Cari atau Input No LOI"
						@select="handleSelect2"
						></el-autocomplete>
		    </el-form-item>
			<el-form-item label="Tanggal LOI" :label-width="formLabelWidth">
					<el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tanggal_loi" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
				</el-form-item>
		    <!--<el-form-item label="Tanggal Kirim Dokumen" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.tgl_kirim_dokumen" auto-complete="off" type="date"></el-input>
		    </el-form-item>-->
			<el-form-item>
				<div>Status Keterlambatan</div>
	        <el-select filterable v-model="selectedEditPO.status_keterlambatan" style="width:100%">
	          <el-option label="Pilih status keterlambatan" value=""></el-option>
	          <el-option v-for="item in status_keterlambatan" :key="item.id" :label="item.status_keterlambatan" :value="item.status_keterlambatan"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Status Keterlambatan" :label-width="formLabelWidth">
		      <el-input v-model="form.status_keterlambatan" auto-complete="off"></el-input>
		    </el-form-item> -->
				<el-form-item>
					<div>Status Pengadaan</div>
	        <el-select filterable v-model="selectedEditPO.status_pengadaan" style="width:100%">
	          <!-- <el-option label="Pilih status pengadaan" value=""></el-option> -->
	          <el-option v-for="item in statusProgress" :key="item.id" :label="item.status" :value="item.status"></el-option>
	        </el-select>
				</el-form-item>
		    <!-- <el-form-item label="Status Pengadaan" :label-width="formLabelWidth">
		      <el-input v-model="form.status_pengadaan" auto-complete="off"></el-input>
		    </el-form-item> -->
		    <el-form-item label="No Kontrak" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.no_kontrak" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Tanggal Kontrak" :label-width="formLabelWidth">
		      <!-- <el-input v-model="selectedEditPO.tgl_kontrak" auto-complete="off" type="date"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.tgl_kontrak" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="Nilai Kontrak" :label-width="formLabelWidth">
				<CurrencyInput
						@keypress.native="numberOnly"
						@keyup.native.delete="numberOnly" 
						v-model="selectedEditPO.nilai_kontrak"
						auto-complete="off"
						:options="{ currency: 'IDR', locale: 'id' }"
					/>
		      <!-- <el-input @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" v-model="selectedEditPO.nilai_kontrak" auto-complete="off"></el-input> -->
		    </el-form-item>
		    <el-form-item>
				<div>Nilai (Rp) Kontrak PPN</div>
				<el-switch
					v-model="value2"
					active-text="PPN"
					inactive-text="Non PPN"
					class="mb-4">
				</el-switch>
		      <el-input v-if="value2 == true" v-model="selectedEditPO.nilai_kontrak_ppn" auto-complete="off" type="number" readonly></el-input>
		    </el-form-item>
		    <el-form-item label="Saving" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.saving" auto-complete="off" readonly type="number"></el-input>
		    </el-form-item>
			<el-form-item label="Durasi PO" :label-width="formLabelWidth">
		      <el-input placeholder="Jumlah Hari" @keypress.native="numberOnly,durasiClear()"
					@keyup.native.delete="numberOnly,durasiClear()" v-model="selectedEditPO.durasi_pembuatan_po" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="Mulai Pekerjaan" :label-width="formLabelWidth">
					<!-- <template slot-scope="props">
						{{ formatDate(selectedEditPO.mulai_pekerjaan) }}
					</template> -->
					<!-- <el-date-picker
			      v-model="form.mulai_pekerjaan"
			      type="datetime"
						:picker-options="{
					    start: '00:00',
					    step: '00:00',
					    end: '23:59'
					  }"
						@change="autoDate()"
			      placeholder="Pick a day">
			    </el-date-picker> -->
					<!-- <el-date-picker
			      v-model="form.mulai_pekerjaan"
			      type="datetime"
						:pickerOptions="pickerOptions"
						@change="autoDate()"
			      placeholder="Select date and time">
			    </el-date-picker> -->
		      <!-- <el-input v-model="selectedEditPO.mulai_pekerjaan" auto-complete="off" type="date" :formatter="formatDateInput" @change="autoDate()"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.mulai_pekerjaan" format="dd/MM/yyyy" @change="autoDate()" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
			<el-form-item label="Warning Date" :label-width="formLabelWidth">
		      <!-- <el-input v-model="selectedEditPO.warning_date" auto-complete="off" type="date"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.warning_date" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="Selesai Pekerjaan" :label-width="formLabelWidth">
					<!-- <el-date-picker
						v-model="form.selesai_pekerjaan"
						type="datetime"
						disabled
						placeholder="Automatic date">
					</el-date-picker> -->
		      <!-- <el-input v-model="selectedEditPO.selesai_pekerjaan" auto-complete="off" type="date"></el-input> -->
			  <el-date-picker placeholder="Pilih Tanggal" v-model="selectedEditPO.selesai_pekerjaan" format="dd/MM/yyyy" readonly style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item label="Keterangan" :label-width="formLabelWidth">
		      <el-input v-model="selectedEditPO.keterangan" auto-complete="off" type="textarea"></el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogChangePO = false">Cancel</el-button>
		    <el-button type="primary" @click="updatePO" :loading="loadingUpdatePo">Submit</el-button>
		  </span>
			<!-- </el-form> -->
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
	name: 'PO',
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
			value1 : false,
			value2: false,
			selectSumberBAE: false,
			selectSumberLOI: false,
			allowedRole: store.getters.allowedRole,
			date1: null,
			searchPO:'',
			params_chart:'',
			params_status: '',
			params_jenis_anggaran:'',
			params_tahun: '',
			po: [ { po: [] } ],
			bae: [ { bae: [] } ],
			loadingPo: false,
			loadingAddPo: false,
			loadingUpdatePo: false,
			loadingDownload: false,
			dialogAddPo: false,
			dialogChangePO: false,
			loadingJenisAnggaran: false,
			loadingBidang: false,
			loadingSubBidang: false,
			loadingJenisPengadaan: false,
			loadingPenyedia: false,
			loadingStatusKeterlambatan: false,
			loadingStatusPengadaan: false,
			loadingDelete: false,
			loadingSet: false,
			form: {
				pic_pengadaan: "",
				jenis_anggaran: "",
				tahun_anggaran: "",
				bidang: "",
				sub_bidang: "",
				deskripsi_pekerjaan: "",
				metode_pengadaan: "",
				penyedia: "",
				email: "",
				no_pr: "",
				nilai_pr: 0,
				nilai_pr_ppn: 0,
				nilai_hps: 0,
				tgl_masuk_dokumen: "",
				no_ba: '',
				no_loi: '',
				tanggal_loi: '',
				//tgl_kirim_dokumen: "",
				durasi_pembuatan_po: '',
				status_keterlambatan: "",
				status_pengadaan: "",
				no_kontrak: "",
				tgl_kontrak: "",
				nilai_kontrak: 0,
				nilai_kontrak_ppn: 0,
				saving: 0,
				mulai_pekerjaan: "",
				warning_date: "",
				selesai_pekerjaan: "",
				keterangan: "",
				ppn: 11
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
				pic_pengadaan: "",
				jenis_anggaran: "",
				tahun_anggaran: "",
				bidang: "",
				sub_bidang: "",
				deskripsi_pekerjaan: "",
				metode_pengadaan: "",
				penyedia: "",
				no_pr: "",
				nilai_pr: 0,
				nilai_pr_ppn: 0,
				nilai_hps: 0,
				tgl_masuk_dokumen: "",
				no_ba: '',
				no_loi: '',
				tanggal_loi:'',
				//tgl_kirim_dokumen: "",
				durasi_pembuatan_po: '',
				status_keterlambatan: "",
				status_pengadaan: "",
				no_kontrak: "",
				tgl_kontrak: "",
				nilai_kontrak: 0,
				nilai_kontrak_ppn: 0,
				saving: 0,
				mulai_pekerjaan: "",
				warning_date: "",
				selesai_pekerjaan: "",
				keterangan: "",
				ppn: ""
			},
			searchByList: [
				{ by: "metode_pengadaan", name: "Metode Pengadaan" },
				{ by: "status_pengadaan", name: "Status Pengadaan" },
				{ by: "jenis_anggaran", name: "Jenis Anggaran" },
				{ by: "bidang", name: "Bidang" },
				{ by: "pic_pengadaan", name: "PIC Pengadaan" },
				{ by: "sub_bidang", name: "Sub Bidang" },
				{ by: "tahun_anggaran", name: "Tahun Anggaran" },
				{ by: "deskripsi_pekerjaan", name: "Deskripsi Pekerjaan" },
				{ by: "penyedia", name: "Penyedia" },
				{ by: "no_pr", name: "Nomor PR" },
				{ by: "no_ba", name: "Nomor BA" },
				{ by: "no_loi", name: "Nomor LOI" },
				{ by: "no_kontrak", name: "Nomor Kontrak" },
				{ by: "keterangan", name: "Keterangan" },
			],
			listPPN: [
				{ id: 1, value: 10, label: "10%" },
				{ id: 2, value: 11, label: "11%" }
			],
			listBAE: [],
			baSelected: "",
			loiSelected: [],
			listLOI: [],
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
			// 		this.form.nilai_pr_ppn = 0
			// 	}

			// 	if (this.dialogChangePO == true) {
			// 		this.selectedEditPO.nilai_pr_ppn = 0
			// 	}
			// }
			// else{
				this.changeNilaiPR()
			// }
		},
		value2(){
			// if (this.value2 == false) {
			// 	if (this.dialogAddPo == true) {
			// 		this.form.nilai_kontrak_ppn = 0
			// 	}

			// 	if (this.dialogChangePO == true) {
			// 		this.selectedEditPO.nilai_kontrak_ppn = 0
			// 	}
			// }
			// else{
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
		},
		email(){
			if(this.form.penyedia != ""){
				console.log("Penyedia",this.penyedia)
			}
		}
	},
	methods: {
		handleSelect(item) {
			this.form.no_loi = ''
			this.selectedEditPO.no_loi = ''
			clearTimeout(this.timeout);
			setTimeout(() => {
				this.$refs.noLoi.$el.getElementsByTagName('input')[0].focus()
			}, 300);
		},
		handleSelect2(item) {
			if (this.dialogChangePO) {
				this.selectedEditPO.deskripsi_pekerjaan = item.deskripsi_pekerjaan || ''
				if (item.bidang) {
					let findBidang = this.bidang.find(el => el.bidang == item.bidang)
					this.selectedEditPO.bidang = findBidang ? findBidang.id : item.bidang
				}
				this.selectedEditPO.bidang = item.bidang || ''
				this.selectedEditPO.nilai_pr = item.estimasi_harga || 0
				this.selectedEditPO.nilai_pr_ppn = item.estimasi_harga_ppn || 0
				if (item.estimasi_harga_ppn) {
					this.value1 = true
				}
				else{
					this.value1 = false
				}
				this.selectedEditPO.penyedia = item.penyedia || ''
				this.selectedEditPO.no_ba = item.no_ba || ''
				this.selectedEditPO.no_loi = item.no_loi || ''
				this.selectedEditPO.durasi_pembuatan_po = item.durasi || 0
				this.selectedEditPO.mulai_pekerjaan = item.mulai_pekerjaan || ''
				this.selectedEditPO.selesai_pekerjaan = item.selesai_pekerjaan || ''
				this.selectedEditPO.no_pr = item.no_pr || ''
				this.selectedEditPO.no_kontrak = item.no_kontrak || ''
				this.selectedEditPO.status_pengadaan = item.status_pengadaan || ''
				this.selectedEditPO.ppn = item.ppn || 11
			}

			else {
				this.form.deskripsi_pekerjaan = item.deskripsi_pekerjaan || ''
				if (item.bidang) {
					let findBidang = this.bidang.find(el => el.bidang == item.bidang)
					this.form.bidang = findBidang ? findBidang.id : item.bidang
				}
				// this.form.bidang = item.bidang || ''
				this.form.nilai_pr = item.estimasi_harga || 0
				this.form.nilai_pr_ppn = item.estimasi_harga_ppn || 0
				if (item.estimasi_harga_ppn) {
					this.value1 = true
				}
				else{
					this.value1 = false
				}
				this.form.penyedia = item.penyedia || ''
				this.form.no_ba = item.no_ba || ''
				this.form.no_loi = item.no_loi || ''
				this.form.durasi_pembuatan_po = item.durasi || 0
				this.form.mulai_pekerjaan = item.mulai_pekerjaan || ''
				this.form.selesai_pekerjaan = item.selesai_pekerjaan || ''
				this.form.no_pr = item.no_pr || ''
				this.form.no_kontrak = item.no_kontrak || ''
				this.form.status_pengadaan = item.status_pengadaan || ''
				this.form.ppn = item.ppn || 11
			}
		},
		async querySearch(queryString, cb) {
			// console.log(queryString);
			if (queryString.trim() != '') {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					if (queryString.trim().length >= 1) {
					  await this.getBAE(queryString.trim(), false, 'no_ba').then( res => {
						   let links = res
						   let results = queryString ? links.filter(this.createFilter(queryString)) : links;
							// call callback function to return suggestions
							cb(results);
					  })
					 
					}
				}, 500);
			}
			
		},
		async querySearch2(queryString, cb) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(async () => {
					await this.getBAE(queryString.trim(), false, 'no_loi').then( res => {
						let links = res
						let results = queryString ? links.filter(this.createFilter(queryString)) : links;
						// call callback function to return suggestions
						cb(results);
					})
				}, 500);
			
		},
		createFilter(queryString) {
			return (link) => {
			return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		async autogetloi(){
			if(this.form.no_ba == this.listBAE.find(v => v.baNumber)){
				// console.log("ba number",this.listBAE.find(v => v.baNumber))
				// this.form.no_loi == this.listBAE.find(v => v.loiNumber)
				// console.log("loi number",this.form.no_loi)

				await this.getBAE('',false,'no_loi')
			}
		},
		async getBAE(query = '', download = false, filter = '') {
			let param = {
					perPage: this.limit,
					query: query,
					filter: filter,
					download: download,
					page: this.currentPage,
					total: this.total,
					startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
                	   endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
				}
		
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

			if (filter == 'no_loi' || filter == 'no_bi') {
				param = {
					query: query,
					filter: filter
				}

				if (filter == 'no_loi') {
					param.no_ba = this.form.no_ba
				}
			}

			// this.loadingPo = true
			let apiOptions = {
				method: 'get',
				url: 'procurement/bae',
				params: param,
				timeout: 10 * 1000
			}

	return new Promise(async (resolve, reject) => {
			await api(apiOptions).then(result => {
				if(result.data.ec == 200){
					// console.log('result bae', result)
					this.bae = result.data.data.rows
					this.bae = this.bae.map(el=> {
						// console.log("el in bae",el);
						// this.listBAE.push({baNumber: el.no_ba, loiNumber: el.no_loi})
						// this.listLOI.push({baNumber: el.no_ba, loiNumber: el.no_loi})
						//this.baSelected = el.no_ba
						// if(this.form.no_ba == el.no_ba){
						 ///	this.loiSelected = el.no_loi
						 	//console.log("no loi",loiSelected)
						// }
						el.estimasi_harga = el.estimasi_harga || 0
						el.estimasi_harga_ppn = el.estimasi_harga_ppn || 0
						let val = {...el}
						val.value = filter == 'no_ba' ? el.no_ba: el.no_loi
						return val
					})

					// this.listBAE = _.uniqBy(this.listBAE, 'baNumber')
					// this.total = result.data.data.count
					// this.checkdate = moment().format('MM/DD/YYYY')
					// console.log('hahaha',this.checkdate)
					this.loadingPo = false
					resolve(this.bae)
        		}
				else{
					resolve([])
				}
					
				}).catch(error => {
					// console.log(error);
					this.loadingPo = false
					this.loadingDownload = false
					resolve([])
				})
			})
			// this.clearForm()
		},
		getEmail(){
			// console.log("Penyedia nya",this.penyedia)
			if(this.form.penyedia != ""){
				this.form.email = this.form.penyedia
				// console.log("Penyedia pilihan",this.form.penyedia)
				// console.log("Email penyedia",this.form.email)
			}
			// this.penyedia.forEach(element => {
			// 	console.log("value dari form penyedia",this.form.penyedia)

			// });
		},
		inRole(val, val2) {
			if(this.allowedRole.replace(/\s/g, '').includes(val) || this.allowedRole.replace(/\s/g, '').includes(val2)) {
				return true;
			} else {
				return false;
			}
		},
		doSearchPO(ev) {
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
				this.form.nilai_pr_ppn = (this.form.ppn / 100 * parseInt(this.form.nilai_pr)) + parseInt(this.form.nilai_pr)
			}
			if(parseInt(this.selectedEditPO.nilai_pr) != 0 && this.selectedEditPO.nilai_pr && this.value1 == true){
				this.selectedEditPO.nilai_pr_ppn = (this.form.ppn / 100 * parseInt(this.selectedEditPO.nilai_pr)) + parseInt(this.selectedEditPO.nilai_pr)
			}
			// else {
			// 	this.form.nilai_pr_ppn = 0
			// 	this.selectedEditPO.nilai_pr_ppn = 0
			// }
		},
		changeNilaiKontrak(){
			this.form.nilai_kontrak_ppn = this.form.nilai_kontrak
			this.selectedEditPO.nilai_kontrak_ppn = this.selectedEditPO.nilai_kontrak

			if(parseInt(this.form.nilai_kontrak) != 0 && this.form.nilai_kontrak != '' && this.value2 == true){
				this.form.nilai_kontrak_ppn = (this.form.ppn / 100 * parseInt(this.form.nilai_kontrak)) + parseInt(this.form.nilai_kontrak)
			}
			if(parseInt(this.selectedEditPO.nilai_kontrak) != 0 && this.selectedEditPO.nilai_kontrak && this.value2 == true){
				this.selectedEditPO.nilai_kontrak_ppn = (this.form.ppn / 100 * parseInt(this.selectedEditPO.nilai_kontrak)) + parseInt(this.selectedEditPO.nilai_kontrak)
			}
			// else {
			// 	this.form.nilai_kontrak_ppn = 0
			// 	this.selectedEditPO.nilai_kontrak_ppn = 0
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
			this.form.selesai_pekerjaan = moment(this.form.mulai_pekerjaan).add(this.form.durasi_pembuatan_po,'days').subtract(1, 'days')
			this.selectedEditPO.selesai_pekerjaan = moment(this.selectedEditPO.mulai_pekerjaan).add(this.selectedEditPO.durasi_pembuatan_po,'days').subtract(1, 'days')
			// console.log('form selesai',this.form.selesai_pekerjaan)
		},

		doShowDialogEdit(key){
			// console.log('key edit',key);
			this.dialogChangePO = true;
			let valKey = {...key}
			// valKey.warning_date = valKey.warning_date ? new Date(valKey.warning_date):''
			valKey.tgl_masuk_dokumen = valKey.tgl_masuk_dokumen ? new Date(valKey.tgl_masuk_dokumen):''
			valKey.tanggal_loi = valKey.tanggal_loi ? new Date(valKey.tanggal_loi):''
			valKey.warning_date = valKey.warning_date ? new Date(valKey.warning_date):''
			valKey.mulai_pekerjaan = new Date(valKey.mulai_pekerjaan)
			valKey.nilai_pr = this.convertToAngka(valKey.nilai_pr)
			valKey.nilai_pr_ppn = this.convertToAngka(valKey.nilai_pr_ppn)
			valKey.nilai_kontrak = this.convertToAngka(valKey.nilai_kontrak)
			valKey.nilai_kontrak_ppn = this.convertToAngka(valKey.nilai_kontrak_ppn)
			valKey.nilai_hps = this.convertToAngka(valKey.nilai_hps)
			valKey.saving = this.convertToAngka(valKey.saving)

			this.selectedEditPO = valKey

			if (this.selectedEditPO.nilai_pr_ppn > this.selectedEditPO.nilai_pr) {
				this.value1 = true
			}

			if (this.selectedEditPO.nilai_kontrak_ppn > this.selectedEditPO.nilai_kontrak) {
				this.value2 = true
			}
			// console.log(this.selectedEditPO);
			// this.selectedStatusToEdit = this.po[key].status_pengadaan
			// console.log('selected status edit',this.selectedStatusToEdit);
		},

		tableRowClassName({row, rowIndex}) {
			// console.log('row',this.formatDate(row.selesai_pekerjaan));
			// console.log('row index',rowIndex)
			let date1 = row.selesai_pekerjaan ? new Date(moment(row.selesai_pekerjaan).format("MM/DD/YYYY")): null;
			let date2 = new Date(moment().format("MM/DD/YYYY"));
			let date3 = row.warning_date ? new Date(moment(row.warning_date).format("MM/DD/YYYY")): null;
			
			// To calculate the time difference of two dates
			let difference1 = date1 && date2 ? date1.getTime() - date2.getTime(): 1000 * 3600 * 24;
			let difference2 = date1 && date3 ? date1.getTime() - date3.getTime(): 0;
			let Difference_In_Days1 = difference1 / (1000 * 3600 * 24);
			let Difference_In_Days2 = difference2 / (1000 * 3600 * 24);

			if (Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 > 0) {
				return 'warning-row';
				
			} else if(Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 == 0 && row.status_pengadaan != 'TERKONTRAK' || Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 == 0 && row.status_pengadaan != 'CLOSED' || Difference_In_Days1 <= Difference_In_Days2 && Difference_In_Days1 == 0 && row.status_pengadaan != 'CLOSE'){
				return 'danger-row';
			}
			else if(row.status_pengadaan == 'TERKONTRAK' || row.status_pengadaan != 'CLOSED' || row.status_pengadaan != 'CLOSE' && row.keterangan == 'Selesai'){
				return 'default-row';
			}
			else {
				return '';
			}
		},
		dateParam(){
			return moment().format("YYYY")
		},
		formatDate(str, format) {
			if (!str) {
				return '-'
			}
			return moment(str).format(format || "DD-MM-YYYY");
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
			this.loadingPo = true
			let chart = this.$route.params.chart
			let status = this.$route.params.status
			let jenis_anggaran = this.$route.params.jenis_anggaran
			let tahun = this.$route.params.tahun

			console.log(chart, status, jenis_anggaran, tahun);

			let options = {
				method: 'get',
				url: 'procurement/po',
				params: {
					perPage: perPage,
					page: page,
					status: status||null,
					jenis_anggaran: jenis_anggaran||null,
					tahun: tahun||"null",
					startDate: this.date1 ? moment(this.date1[0]).format("YYYY-MM-DD"):"",
                    endDate: this.date1 ? moment(this.date1[1]).format("YYYY-MM-DD"):""
				}
			}

			switch (chart) {
				case 'chart-1':
					options.params.chart = 'PR_MASUK'
					break;
				case 'chart-2':
					options.params.chart = 'STATUS_PENGADAAN'
					break;
				case 'chart-3':
					options.params.chart = 'NILAI_PENGADAAN'
					break;
				default:
					options.params.chart = null
					break;
			}
		
			await api(options).then(result => {
				console.log('result po', result)
				this.po = result.data.data.rows
				this.po.forEach(el=> {
						el.nilai_pr = this.convertToRupiah(el.nilai_pr||0)
						el.nilai_pr_ppn = this.convertToRupiah(el.nilai_pr_ppn||0)
						el.nilai_kontrak = this.convertToRupiah(el.nilai_kontrak||0)
						el.nilai_kontrak_ppn = this.convertToRupiah(el.nilai_kontrak_ppn||0)
						el.nilai_hps = this.convertToRupiah(el.nilai_hps||0)
						el.saving = this.convertToRupiah(el.saving||0)
					})
				this.total = result.data.data.count
				this.checkdate = moment().format('MM/DD/YYYY')
				// console.log('hahaha',this.checkdate)
				this.loadingPo = false
			}).catch(error => {
				// console.log(error);
				this.loadingPo = false
			})
			this.loadingPo = false
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
		async paginatePO(page) {
			// console.log('page', page)
			this.currentPage = page
				if (this.searchPO != '') {
				this.getPO(this.searchPO, false, this.searchBy);
			}
			else {
				this.getPO();
			}
		},
		addPO() {
			this.loadingAddPo = true
			api({
				method: 'post',
				url: 'procurement/po',
				data: {
					pic_pengadaan: this.form.pic_pengadaan,
					jenis_anggaran: this.form.jenis_anggaran,
					tahun_anggaran: this.form.tahun_anggaran,
					bidang: this.form.bidang,
					sub_bidang: this.form.sub_bidang,
					deskripsi_pekerjaan: this.form.deskripsi_pekerjaan,
					metode_pengadaan: this.form.metode_pengadaan,
					penyedia: this.form.penyedia,
					email_vendor: this.form.email,
					no_pr: this.form.no_pr,
					nilai_pr: this.form.nilai_pr,
					nilai_pr_ppn: this.form.nilai_pr_ppn,
					tgl_masuk_dokumen: this.form.tgl_masuk_dokumen,
					no_ba: this.form.no_ba,
					no_loi: this.form.no_loi,
					tanggal_loi: this.form.tanggal_loi,
					nilai_hps: this.form.nilai_hps,
					durasi_pembuatan_po: this.form.durasi_pembuatan_po,
					status_keterlambatan: this.form.status_keterlambatan,
					status_pengadaan: this.form.status_pengadaan,
					no_kontrak: this.form.no_kontrak,
					tgl_kontrak: this.form.tgl_kontrak,
					nilai_kontrak: this.form.nilai_kontrak,
					nilai_kontrak_ppn: this.form.nilai_kontrak_ppn,
					saving: this.form.saving,
					mulai_pekerjaan: this.form.mulai_pekerjaan,
					warning_date: this.form.warning_date,
					selesai_pekerjaan: this.form.selesai_pekerjaan,
					keterangan: this.form.keterangan,
					ppn: this.form.ppn
				}
			}).then(result => {
				// console.log('result po', result)
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data PO berhasil ditambahkan", "success")
					this.dialogAddPo = false
					this.loadingAddPo = false
					this.getPO()
					this.clearForm()
				} else {
					this.$message.error(result.data.message == 'invalid_value' ? 'Lengkapi kolom yang tersedia' : 'Terjadi kesalahan');
				}
				this.loadingPo = false
				this.loadingAddPo = false
			}).catch(error => {
				// console.log(error);
				this.loadingPo = false
				this.loadingAddPo = false
			})
			this.loadingPo = false
		},

		updatePO() {
			this.loadingUpdatePo = true
			api({
				method: 'patch',
				url: 'procurement/po/'+this.selectedEditPO.id,
				data: {
					pic_pengadaan: this.selectedEditPO.pic_pengadaan,
					jenis_anggaran: this.selectedEditPO.jenis_anggaran,
					tahun_anggaran: this.selectedEditPO.tahun_anggaran,
					bidang: this.selectedEditPO.bidang,
					sub_bidang: this.selectedEditPO.sub_bidang,
					deskripsi_pekerjaan: this.selectedEditPO.deskripsi_pekerjaan,
					metode_pengadaan: this.selectedEditPO.metode_pengadaan,
					penyedia: this.selectedEditPO.penyedia,
					no_pr: this.selectedEditPO.no_pr,
					nilai_pr: this.selectedEditPO.nilai_pr,
					nilai_pr_ppn: this.selectedEditPO.nilai_pr_ppn,
					tgl_masuk_dokumen: this.selectedEditPO.tgl_masuk_dokumen,
					no_ba: this.selectedEditPO.no_ba,
					no_loi: this.selectedEditPO.no_loi,
					tanggal_loi: this.selectedEditPO.tanggal_loi,
					nilai_hps: this.selectedEditPO.nilai_hps,
					durasi_pembuatan_po: this.selectedEditPO.durasi_pembuatan_po,
					status_keterlambatan: this.selectedEditPO.status_keterlambatan,
					status_pengadaan: this.selectedEditPO.status_pengadaan,
					no_kontrak: this.selectedEditPO.no_kontrak,
					tgl_kontrak: this.selectedEditPO.tgl_kontrak,
					nilai_kontrak: this.selectedEditPO.nilai_kontrak,
					nilai_kontrak_ppn: this.selectedEditPO.nilai_kontrak_ppn,
					saving: this.selectedEditPO.saving,
					mulai_pekerjaan: this.selectedEditPO.mulai_pekerjaan,
					warning_date: this.selectedEditPO.warning_date,
					selesai_pekerjaan: this.selectedEditPO.selesai_pekerjaan,
					keterangan: this.selectedEditPO.keterangan,
					ppn: this.selectedEditPO.ppn
				}
			}).then(result => {
				// console.log('result update', result)
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data PO berhasil di update", "success")
					this.dialogChangePO = false
					this.loadingUpdatePo = false
					this.getPO()
				} else {
					this.$message.error(this.$t('error_text'));
				}
				this.loadingUpdatePo = false
			}).catch(error => {
				console.log(error);
				this.loadingUpdatePo = false
			})
			this.loadingUpdatePo = false
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
			// console.log('id hapus',id)
			this.$confirm('Anda yakin akan menghapus data ini?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingDelete = true
				api({
					method: 'delete',
					url: 'procurement/po/'+id
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
			// console.log('id selesai',row)
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
					this.$message.error({
						showClose: false,
						message: 'Data gagal ditandai sebagai selesai',
						type: "error"
					});
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
			this.form.pic_pengadaan= ""
			this.form.jenis_anggaran= ""
			this.form.tahun_anggaran= ""
			this.form.bidang= ""
			this.form.sub_bidang= ""
			this.form.deskripsi_pekerjaan= ""
			this.form.metode_pengadaan= ""
			this.form.penyedia= ""
			this.form.no_pr= ""
			this.form.nilai_pr= 0
			this.form.nilai_pr_ppn= 0
			this.form.nilai_hps= 0
			this.form.tgl_masuk_dokumen= ""
			this.form.no_ba= ''
			this.form.no_loi=''
			this.form.tanggal_loi=''
			//tgl_kirim_dokumen: ""
			this.form.durasi_pembuatan_po= ''
			this.form.status_keterlambatan= ""
			this.form.status_pengadaan= ""
			this.form.no_kontrak= ""
			this.form.tgl_kontrak= ""
			this.form.nilai_kontrak= 0
			this.form.nilai_kontrak_ppn= 0
			this.form.saving= 0
			this.form.mulai_pekerjaan= ""
			this.form.warning_date= ""
			this.form.selesai_pekerjaan= ""
			this.form.keterangan=""
			this.$refs.currInput.clearValue()
			this.value1 = false
			this.value2 = false
		},
		clearFormEdit(){
			this.selectedEditPO.pic_pengadaan= ""
			this.selectedEditPO.jenis_anggaran= ""
			this.selectedEditPO.tahun_anggaran= ""
			this.selectedEditPO.bidang= ""
			this.selectedEditPO.sub_bidang= ""
			this.selectedEditPO.deskripsi_pekerjaan= ""
			this.selectedEditPO.metode_pengadaan= ""
			this.selectedEditPO.penyedia= ""
			this.selectedEditPO.no_pr= ""
			this.selectedEditPO.nilai_pr= 0
			this.selectedEditPO.nilai_pr_ppn= 0
			this.selectedEditPO.nilai_hps= 0
			this.selectedEditPO.tgl_masuk_dokumen= ""
			this.selectedEditPO.no_ba= ''
			this.selectedEditPO.no_loi=''
			this.selectedEditPO.tanggal_loi=''
			//tgl_kirim_dokumen: ""
			this.selectedEditPO.durasi_pembuatan_po= ''
			this.selectedEditPO.status_keterlambatan= ""
			this.selectedEditPO.status_pengadaan= ""
			this.selectedEditPO.no_kontrak= ""
			this.selectedEditPO.tgl_kontrak= ""
			this.selectedEditPO.nilai_kontrak= 0
			this.selectedEditPO.nilai_kontrak_ppn= 0
			this.selectedEditPO.saving= 0
			this.selectedEditPO.mulai_pekerjaan= ""
			this.selectedEditPO.warning_date= ""
			this.selectedEditPO.selesai_pekerjaan= ""
			this.selectedEditPO.keterangan=""
			// this.$refs.currInput.clearValue()
			this.value1 = false
			this.value2 = false
		}
	},
	async mounted() {
		// console.log(document.getElementById("po-main"));
		this.params_chart = this.$route.params.chart
		this.params_status = this.$route.params.status
		this.params_jenis_anggaran = this.$route.params.jenis_anggaran
		this.params_tahun = this.$route.params.tahun

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
	},
	async created(){
		await this.getPO()
		await this.getJenisAnggaran()
		await this.getBidang()
		await this.getSubBidang()
		await this.getJenisPengadaan()
		await this.getPenyedia()
		await this.getStatusKeterlambatan()
		await this.getStatusPengadaan()
	}
}
</script>

<style>
.el-autocomplete {
	display: block;
}
.el-table .warning-row {
  background: #E6A23C;
  color: #ffffff;
}

.el-table .danger-row {
  background: #F56C6C;
  color: #ffffff;
}

.el-table .default-row {
  background: #ffffff;
}

.el-table .success-row {
  background: #67C23A;
}

.el-table .current-row {
	color: #1e1e1e;
}

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
