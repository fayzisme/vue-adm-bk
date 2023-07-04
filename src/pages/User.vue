<template>
  <div class="scrollable only-y">
		<div class="page-header">
      <h1>User</h1>
    </div>
    <el-card class="mb-10">
      <el-row>
          <el-col :span="6">
						<el-row>
							<el-col style="display:flex; flex-wrap: wrap;" :span="24">
								<el-input
                style="flex-basis: 200px"
									prefix-icon="el-icon-search"
									:placeholder="`Search`"
									clearable
									@keypress.native="doSearchUser"
									@clear="doSearchUser"
									@keyup.native.delete="doSearchUser"
									v-model="searchUser"
								></el-input>
								<el-select style="flex-basis: 120px" @change="doSearchUser" placeholder="Filter by" v-model="searchBy">
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
									Filter by Date:
								</span>	
							</el-col>
							<el-col :span="16">
								<el-date-picker type="daterange" placeholder="Pick a filter date" v-model="date1"
								range-separator="To"
								start-placeholder="Start date"
								end-placeholder="End date"
								:picker-options="pickerOptions" format="yyyy/MM/dd" style="width: 100%; cursor: pointer;" @change="doSearchUser()"></el-date-picker>
							</el-col>
						</el-row>
          </el-col>
					<el-col :span="2">
							<el-button :loading='loadingDownload' class="animated fadeInRight" type="primary" small @click="download">
                <i class="mdi mdi-download"></i> Download Data
              </el-button>
					</el-col>
			</el-row>
			
		</el-card>
    <el-dialog @closed="cancelAdd('ruleForm')" :visible.sync="userDialog.visible" :title="'User : '+ruleForm.pic_pengadaan" :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :rules="userDialog.type == 'detail' ? null: rules" ref="ruleForm" :model="ruleForm">
		    <!-- <el-form-item label="Tanggal Masuk Dokumen" :label-width="formLabelWidth" prop="tgl_masuk_dokumen">
				<el-date-picker placeholder="Pilih Tanggal" v-model="ruleForm.tgl_masuk_dokumen" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;" :readonly="inputReadOnly"/>
		    </el-form-item> -->
		    <el-form-item v-if="userDialog.type == 'detail'" label="PIC Pengadaan" :label-width="formLabelWidth" prop="pic_pengadaan">
		      <el-input v-model="ruleForm.pic_pengadaan" auto-complete="off" :readonly="inputReadOnly"></el-input>
		    </el-form-item>
				<el-form-item v-if="userDialog.type == 'detail'" label="Jenis Anggaran" :label-width="formLabelWidth" prop="jenis_anggaran">
	        <el-select filterable v-model="ruleForm.jenis_anggaran" style="width:100%" :disabled="inputReadOnly">

	          <el-option  v-for="item in jenisAnggaran" :key="item.id" :label="item.jenis_anggaran" :value="item.jenis_anggaran"></el-option>
	        </el-select>
				</el-form-item>
				<el-form-item v-if="userDialog.type == 'detail'" label="Sub Bidang" :label-width="formLabelWidth" prop="sub_bidang">
	        <el-select filterable v-model="ruleForm.sub_bidang" style="width:100%" :disabled="inputReadOnly">
	            <el-option v-for="item in sub_bidang" :key="item.id" :label="item.sub_bidang" :value="item.sub_bidang"></el-option>
	        </el-select>
				</el-form-item>
        <el-form-item v-if="userDialog.type == 'detail'" label="Bidang" :label-width="formLabelWidth" prop="sub_bidang">
	        <el-input v-model="ruleForm.bidang" auto-complete="off" :readonly="inputReadOnly"></el-input>
				</el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Deskripsi Pekerjaan" :label-width="formLabelWidth" prop="deskripsi_pekerjaan">
		      <el-input type="textarea" v-model="ruleForm.deskripsi_pekerjaan" auto-complete="off" :readonly="inputReadOnly"></el-input>
		    </el-form-item>
				<el-form-item v-if="userDialog.type == 'detail'" label="Penyedia" :label-width="formLabelWidth" prop="penyedia">
	        <el-select filterable v-model="ruleForm.penyedia" style="width:100%" :disabled="inputReadOnly">
          <el-option v-for="item in penyedia" :key="item.id" :label="item.nama" :value="item.nama"></el-option>
	        </el-select>
				</el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Nomor PR" :label-width="formLabelWidth" prop="no_pr">
		      <el-input v-model="ruleForm.no_pr" auto-complete="off" :readonly="inputReadOnly"></el-input>
		    </el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Nilai (Rp)" :label-width="formLabelWidth" prop="nilai_pr">
		      <el-input 
			  	  @keypress.native="numberOnly"
            @keyup.native.delete="numberOnly" 
				  v-model="ruleForm.nilai_pr" auto-complete="off" :readonly="inputReadOnly"></el-input>
		    </el-form-item>
        <el-form-item>
					<div>Pilih Nilai PPN</div>
					<el-select filterable v-model="ruleForm.ppn" style="width:100%">
					<el-option label="Pilih nilai PPN" value=""></el-option>
					<el-option v-for="item in listPPN" :key="item.id" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Nilai (Rp) PPN" :label-width="formLabelWidth" prop="nilai_pr_ppn">
		      <el-input v-model="ruleForm.nilai_pr_ppn" auto-complete="off" readonly></el-input>
		    </el-form-item>
				<el-form-item label="Status Pengadaan" :label-width="formLabelWidth" prop="status_pengadaan">
	        <el-select filterable v-model="ruleForm.status_pengadaan" style="width:100%" :disabled="inputReadOnly">
	          <el-option v-for="item in statusProgress" :key="item.id" :label="item.status" :value="item.status"></el-option>
	        </el-select>
				</el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="No Kontrak" :label-width="formLabelWidth" prop="no_kontrak">
		      <el-input v-model="ruleForm.no_kontrak" auto-complete="off" :readonly="inputReadOnly"></el-input>
		    </el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Nilai Kontrak" :label-width="formLabelWidth" prop="nilai_kontrak">
		      <el-input  @keypress.native="numberOnly"
                  @keyup.native.delete="numberOnly" 
				  v-model="ruleForm.nilai_kontrak" auto-complete="off" :readonly="inputReadOnly"></el-input>
		    </el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Nilai Kontrak PPN" :label-width="formLabelWidth" prop="nilai_kontrak_ppn">
		      <el-input v-model="ruleForm.nilai_kontrak_ppn" auto-complete="off" readonly></el-input>
		    </el-form-item>
        <el-form-item v-if="userDialog.type == 'detail'" label="Tanggal Masuk Dokumen" :label-width="formLabelWidth" prop="tgl_masuk_dokumen">
			  <el-date-picker :readonly="inputReadOnly" placeholder="Pilih Tanggal" v-model="ruleForm.tgl_masuk_dokumen" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
        <!--<el-form-item label="Tanggal Kirim Dokumen" :label-width="formLabelWidth" prop="tgl_kirim_dokumen">
			  <el-date-picker :readonly="inputReadOnly" placeholder="Pilih Tanggal" v-model="ruleForm.tgl_kirim_dokumen" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>-->
		    <el-form-item v-if="userDialog.type == 'detail'" label="Mulai Pekerjaan" :label-width="formLabelWidth" prop="mulai_pekerjaan">
			  <el-date-picker @change="hitungDate" :readonly="inputReadOnly" placeholder="Pilih Tanggal" v-model="ruleForm.mulai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Selesai Pekerjaan" :label-width="formLabelWidth" prop="selesai_pekerjaan">
			  <el-date-picker @change="hitungDate" :readonly="inputReadOnly" placeholder="Pilih Tanggal" v-model="ruleForm.selesai_pekerjaan" format="dd/MM/yyyy" style="width: 100%; cursor: pointer;"/>
		    </el-form-item>
		    <el-form-item v-if="userDialog.type == 'detail'" label="Sisa Durasi Pekerjaan" :label-width="formLabelWidth">
		      <el-input readonly v-model="durasiPekerjaan" auto-complete="off"></el-input>
		    </el-form-item>
        <el-form-item label="Keterangan" :label-width="formLabelWidth">
          <el-input :readonly="inputReadOnly" v-model="ruleForm.keterangan" auto-complete="off" type="textarea"></el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
        <span v-if="userDialog.type == 'detail'">
          <el-button @click="userDialog.visible = false">Close</el-button>
        </span>
        <span v-else>
          <el-button @click="userDialog.visible = false">Cancel</el-button>
		      <el-button type="primary" @click="doSubmitUser(userDialog.type)" :loading="buttonUserDialogLoader">Submit</el-button>
        </span>
		    
		  </span>
		</el-dialog>
    <!--<el-card v-loading="loadingUser" class="mb-10">
			<el-button type="" @click="openDialog({},'add')">
				<i class="mdi mdi-plus"></i> Tambah
			</el-button>
			<el-button type="">
				<i class="mdi mdi-filter"></i> Filter
			</el-button>
		</el-card>-->
		<el-card >
      <el-pagination
          background
          prev-text="Prev"
          next-text="Next"
          layout="prev, pager, next"
          @current-change="paginateUser"
          :current-page="currentPage"
          :page-size="limit"
          :total="totalUser"
          class="mb-5"
        />
			<el-table
        v-loading="loadingUser"
		    :data="user"
		    style="width: 100%"
        >
		    <el-table-column
		      fixed
		      prop="created_at"
		      label="TANGGAL"
		      width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.created_at) }}
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
          prop="status_user"
		      label="Status User"
		      width="150">
          <template slot-scope="props">
            <el-tag v-if="props.row.sisa_durasi_pekerjaan != 0 || props.row.status_user=='deleted'" class="mr-5 ml-5" :type="props.row.status_user=='deleted'?'warning':'success'">
                  <span v-if="props.row.status_user=='deleted'">
                      <el-tooltip placement="top">
                          <div slot="content" class="tooltip" style="font-size: 12px; line-height: 18px; width: 350px;">PO telah dihapus dari Procurement -> PO.
                          </div>
                          <i style="color:red;" class="mdi mdi-brightness-1"></i>
                      </el-tooltip>
                      Deleted
                  </span>
                  <span v-else>
                      <el-tooltip placement="top">
                          <div slot="content">PO sedang berjalan.</div>
                          <i style="color:green;" class="mdi mdi-brightness-1"></i>
                      </el-tooltip>
                      Available
                  </span>
              </el-tag>
              <el-tag v-else-if="props.row.sisa_durasi_pekerjaan == 0 && props.row.status_user!='deleted' && props.row.mulai_pekerjaan && props.row.selesai_pekerjaan" class="mr-5 ml-5" type="info">
                  <span>
                      <el-tooltip placement="top">
                          <div slot="content">PO melewati batas sisa durasi pekerjaan.</div>
                          <i style="color:grey;" class="mdi mdi-brightness-1"></i>
                      </el-tooltip>
                      Expired
                  </span>
              </el-tag>
              <el-tag v-else class="mr-5 ml-5" type="info">
                  <span>
                      <el-tooltip placement="top">
                          <div slot="content">undefined</div>
                          <span>-</span>
                      </el-tooltip>
                  </span>
              </el-tag>
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
        <!-- <el-table-column
		      prop="bidang"
		      label="BIDANG"
		      width="150">
		    </el-table-column> -->
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
		      prop="nilai_pr"
		      label="NILAI (Rp)"
		      width="120">
          <template slot-scope="props">
						{{ props.row.nilai_pr }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="nilai_pr_ppn"
		      label="NILAI (Rp) (+PPn)"
		      width="180">
          <template slot-scope="props">
						{{ props.row.nilai_pr_ppn }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="tgl_masuk_dokumen"
		      label="TANGGAL MASUK DOKUMEN"
		      width="220">
					<template slot-scope="props">
						{{ props.row.tgl_masuk_dokumen ? formatDate(props.row.tgl_masuk_dokumen): "-" }}
					</template>
		    </el-table-column>
		    <!-- <el-table-column
		      prop="tgl_kirim_dokumen"
		      label="TANGGAL KIRIM DOKUMEN"
		      width="220">
					<template slot-scope="props">
						{{ formatDate(props.row.tgl_kirim_dokumen) }}
					</template>
		    </el-table-column> -->
		    <el-table-column
		      prop="status_pengadaan"
		      label="STATUS PENGADAAN"
		      width="220">
          <template slot-scope="props">
						{{ props.row.status_pengadaan || "-" }}
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
						{{ props.row.nilai_kontrak }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="nilai_kontrak_ppn"
		      label="NILAI KONTRAK + PPN"
		      width="220">
          <template slot-scope="props">
						{{ props.row.nilai_kontrak }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="mulai_pekerjaan"
		      label="MULAI PEKERJAAN"
		      width="180">
					<template slot-scope="props">
						{{ props.row.mulai_pekerjaan ? formatDate(props.row.mulai_pekerjaan):"-" }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="selesai_pekerjaan"
		      label="SELESAI PEKERJAAN"
		      width="180">
					<template slot-scope="props">
						{{ props.row.selesai_pekerjaan ? formatDate(props.row.selesai_pekerjaan):"-" }}
					</template>
		    </el-table-column>
		    <el-table-column
		      prop="sisa_durasi_pekerjaan"
		      label="Sisa Durasi Pekerjaan"
		      width="200">
		    </el-table-column>
        <el-table-column
		      prop="keterangan"
		      label="Keterangan"
		      width="200">
          <template slot-scope="props">
						{{ props.row.keterangan || "-" }}
					</template>
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="Operations"
		      width="200">
		      <template slot-scope="scope">
		        <el-button @click="openDialog(scope.row,'detail')" type="info" size="small">Detail</el-button>
		        <el-button @click="openDialog(scope.row,'edit')" size="small" :disabled="scope.row.status_user == 'deleted' || !allowedRole.replace(/\s/g, '').includes('superadmin')? true: false">Edit</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
      <el-pagination
          background
          prev-text="Prev"
          next-text="Next"
          layout="prev, pager, next"
          @current-change="paginateUser"
          :current-page="currentPage"
          :page-size="limit"
          :total="totalUser"
          class="mt-10"
        />
		</el-card>
  </div>
</template>


<script>
// import ContactDialog from "@/components/ContactDialog";
import api from "@/networkClient";
import config from "@/config";
import store from "@/store";
import moment from "moment"
import _ from "lodash";
import { format } from 'path';
export default {
  data() {
    return {
      allowedRole: store.getters.allowedRole,
      date1: null,
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
      limit: 30,
      loadingDownload: false,
      user: [],
      totalUser: 0,
      searchUser:'',
      searchByList: [
				{ by: "status_pengadaan", name: "Status Pengadaan" },
				{ by: "jenis_anggaran", name: "Jenis Anggaran" },
				{ by: "sub_bidang", name: "Sub Bidang" },
				{ by: "pic_pengadaan", name: "PIC Pengadaan" }
			],
			searchBy: '',
      loadingUser: false,
      loadingAddUser: false,
      headerName: 'User',
      contactLoader: true,
      currentPage: 1,
      currentPageContact: 1,
      currentPageGroupContact: 1,
      contactsTotal: 0,
      buttonUserDialogLoader: false,
      userDialog: {
        visible: false,
        data: {
          tgl_masuk_dokumen: "",
          pic_pengadaan: "",
          jenis_anggaran: "",
          sub_bidang: "",
          deskripsi_pekerjaan: "",
          penyedia: "",
          no_pr: "",
          nilai_pr: "",
          nilai_pr_ppn: "",
          status_pengadaan: "",
          no_kontrak: "",
          nilai_kontrak: "",
          nilai_kontrak_ppn: "",
          tgl_masuk_dokumen: "",
          tgl_kirim_dokumen: "",
          mulai_pekerjaan: null,
          selesai_pekerjaan: null,
          sisa_durasi_pekerjaan: "",
          keterangan: ""
        },
        type: "detail"
      },
      ruleForm: {
        tgl_masuk_dokumen: "",
        pic_pengadaan: "",
        jenis_anggaran: "",
        sub_bidang: "",
        deskripsi_pekerjaan: "",
        penyedia: "",
        no_pr: "",
        nilai_pr: "",
        nilai_pr_ppn: "",
        status_pengadaan: "",
        no_kontrak: "",
        nilai_kontrak: "",
        nilai_kontrak_ppn: "",
        tgl_masuk_dokumen: "",
        tgl_kirim_dokumen: "",
        mulai_pekerjaan: null,
        selesai_pekerjaan: null,
        sisa_durasi_pekerjaan: "",
        keterangan: "",
        ppn: 11
      },
      listPPN: [
				{ id: 1, value: 10, label: "10%" },
				{ id: 2, value: 11, label: "11%" }
			],
      loadingPenyedia: false,
      loadingStatusPengadaan: false,
      loadingJenisAnggaran: false,
      loadingSubBidang: false,
      sub_bidang: [],
      bidang:[],
      jenisAnggaran: [],
      penyedia: [],
      statusProgress: [],
      rules: {
         tgl_masuk_dokumen: [{required: true, message: 'Please input a field',  }],
          pic_pengadaan:  [
            {required: true, message: 'Please input a field', }
          ],
          jenis_anggaran: [{ required: true, message: 'Please input a field', }],
          sub_bidang: [{ required: true, message: 'Please input a field', }],
          deskripsi_pekerjaan: [
            {required: true, message: 'Please input a field', }
          ],
          penyedia: [{ required: true, message: 'Please input a field', }],
          no_pr: [
            {required: true, message: 'Please input a field', }
          ],
          nilai_pr: [
            {required: true, message: 'Please input a field', }
          ],
          status_pengadaan: [{ required: true, message: 'Please input a field', }],
          no_kontrak: [
            {required: true, message: 'Please input a field', }
          ],
          nilai_kontrak: [
            {required: true, message: 'Please input a field', }
          ],
          tgl_masuk_dokumen: [{ required: true, message: 'Please input a field', }],
          tgl_kirim_dokumen: [{ required: true, message: 'Please input a field', }],
          mulai_pekerjaan: [{ required: true, message: 'Please input a field', }],
          selesai_pekerjaan: [{ required: true, message: 'Please input a field', }],
          keterangan: [{ required: true, message: 'Please input a field', }]
      },
      groupLoader: true,
      searchGroup: "",
      buttonGroupDialogLoader: false,
      buttonAddToGroupDialogLoader: false,
      addToGroupDialog: {
        visible: false,
        data: {},
        type: "detail"
      },
      formLabelWidth: "210px",
      logData: "",
      addType: "single",
      durasiPekerjaan: '',
      btnAddtogroup: false,
      inputReadOnly: false,
      timeout: null
    };
  },
  methods: {
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
    doSearchUser(ev) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (this.searchUser.length >= 1) {
				this.currentPage = 1;
				this.getUser(this.searchUser, false, this.searchBy);
				} else {
				this.getUser();
				}
			}, 1000);
		},
    paginateUser(page) {
			this.currentPage = page;
			if (this.searchUser != '') {
				this.getUser(this.searchUser, false, this.searchBy);
			}
			else {
				this.getUser();
			}
		},
    download(){
			this.getUser(this.searchUser,true, this.searchBy)
		},
    hitungDate(){
      this.differenceDate(this.ruleForm.selesai_pekerjaan,this.ruleForm.mulai_pekerjaan)
    },
    difference(date1, date2) {  
		  return date1.getDate() - date2.getDate()
		},
    differenceDate(date1, date2){
      if (date1 && date2) {
        let day1 = new Date(moment(date1).format('MM/DD/YYYY'));
        let day2 = new Date(moment(date2).format('MM/DD/YYYY'));
        let timeDifference = this.difference(day1,day2)
        this.durasiPekerjaan = timeDifference + ' hari'
      }
      else {
        this.durasiPekerjaan = 0
      }
      
    },
    formatDate(str, format) {
      if (str) {
        return moment(str).format("DD-MM-YYYY");
      }
      else {
        return '-'
      }
    },
    async getUser(query='',download = false, filter=''){
      if (filter == 'sub_bidang') {
				if (query != '' && typeof query != "undefined") {
					const regex = new RegExp(`${query.toLowerCase()}.*`);
					let queryBidang = this.sub_bidang.filter(el => regex.test(el.sub_bidang.toLowerCase()))
					// console.log('queryBidang', queryBidang);
					if (queryBidang.length > 0) {
						query = queryBidang[0].id
					}
					else{
						this.$message.error('Nama Sub Bidang Tidak Ditemukan');
						return
					}
				}
			}
			this.loadingUser = true
      let apiOptions = {
        method: 'get',
				url: 'user',
				params: {
					// perPage: perPage,
          query: query,
          filter: filter,
          download: download,
					page: this.currentPage,
          total: this.totalUser,
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
          this.user = result.data.data.rows

          this.user.forEach(el=> {
						el.nilai_pr = this.convertToRupiah(el.nilai_pr|| 0)
						el.nilai_pr_ppn = this.convertToRupiah(el.nilai_pr_ppn || 0)
						el.nilai_kontrak = this.convertToRupiah(el.nilai_kontrak || 0)
						el.nilai_kontrak_ppn = this.convertToRupiah(el.nilai_kontrak_ppn || 0)
						// el.nilai_hps = this.convertToRupiah(el.nilai_hps||0)
						// el.saving = this.convertToRupiah(el.saving)
					})
          this.totalUser = result.data.data.count
          this.loadingUser = false
        }
        else if(download == true){
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([result.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report User.xlsx'); //or any other extension
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
				console.log(error);
				this.loadingUser = false
        this.loadingDownload = false
			})
			this.loadingUser = false
		},
    cancelAdd(formName) {
      this.userDialog.visible = false;
      this.resetForm(formName);
      this.getUser()
    },

    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    
    numberOnly(e) {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.changeNilaiPR()
			this.changeNilaiKontrak()
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
		changeNilaiPR(){
			if(parseInt(this.ruleForm.nilai_pr) != 0 && this.ruleForm.nilai_pr.trim() != ''){
				this.ruleForm.nilai_pr_ppn = (this.ruleForm.ppn / 100 * parseInt(this.ruleForm.nilai_pr)) + parseInt(this.ruleForm.nilai_pr)
			}
			else {
				this.ruleForm.nilai_pr_ppn = 0
			}
		},
		changeNilaiKontrak(){
			if(parseInt(this.ruleForm.nilai_kontrak) != 0 && this.ruleForm.nilai_kontrak.trim() != ''){
				this.ruleForm.nilai_kontrak_ppn = (this.ruleForm.ppn / 100 * parseInt(this.ruleForm.nilai_kontrak)) + parseInt(this.ruleForm.nilai_kontrak)
			}
			else {
				this.ruleForm.nilai_kontrak_ppn = 0
			}
		},
    paste(event) {
      event.preventDefault();
      var totalCharacterCount = window.event.clipboardData.getData("Text"); // || window.clipboardData.getData('Text');
      var strValidChars = "+0123456789";
      var strChar;
      var FilteredChars = "";
      for (var i = 0; i < totalCharacterCount.length; i++) {
        strChar = totalCharacterCount.charAt(i);
        if (strValidChars.indexOf(strChar) != -1) {
          FilteredChars = FilteredChars + strChar;
        }
      }
      // this.ruleForm.phone_number = FilteredChars;
    },
    openDialog(data, type) {
      if (_.isEmpty(data)) {
        this.ruleForm = {
          tgl_masuk_dokumen: "",
          pic_pengadaan: "",
          jenis_anggaran: "",
          sub_bidang: "",
          deskripsi_pekerjaan: "",
          penyedia: "",
          no_pr: "",
          nilai_pr: "",
          nilai_pr_ppn: "",
          status_pengadaan: "",
          no_kontrak: "",
          nilai_kontrak: "",
          nilai_kontrak_ppn: "",
          tgl_masuk_dokumen: "",
          tgl_kirim_dokumen: "",
          mulai_pekerjaan: null,
          selesai_pekerjaan: null,
          sisa_durasi_pekerjaan: "",
          keterangan: ""
        }
      }

      data.nilai_pr = this.convertToAngka(data.nilai_pr)
			data.nilai_pr_ppn = this.convertToAngka(data.nilai_pr_ppn)
			data.nilai_kontrak = this.convertToAngka(data.nilai_kontrak)
			data.nilai_kontrak_ppn = this.convertToAngka(data.nilai_kontrak_ppn)
      this.ruleForm = data
      this.durasiPekerjaan = this.ruleForm.sisa_durasi_pekerjaan

      if (type == 'edit') {
        this.hitungDate()
      }

      if (type == "remove") {
        this.doRemoveContact();
      } 
      else {
        this.userDialog.visible = true;
        this.userDialog.type = type;
        this.inputReadOnly = false

        switch (this.userDialog.type) {
          case 'detail':
            this.inputReadOnly = true
            break;
        }
      }
    },
    doSubmitUser(type) {
      this.buttonUserDialogLoader = true;
      if (type == "edit") {
        this.userDialog.type = 'edit'
      } else if (type == "add") {
        this.userDialog.type = 'add'
      }
      this.doAddUser();
    },
    doAddUser() {
        this.$refs["ruleForm"].validate(async valid => {
          // console.log("valid: ",valid)
          if (valid) {
            this.userDialog.data = this.ruleForm
            // this.userDialog.data.sisa_durasi_pekerjaan = this.durasiPekerjaan
            let url = 'user'
            if (this.userDialog.type = 'edit') {
              url += '/update'
            }

            api({
              method: "post",
              url: url,
              data: this.userDialog.data
            })
              .then(result => {
                this.buttonUserDialogLoader = false;
                this.userDialog.visible = false;
                if (result.data.ec == 200) {
                  this.$swal({
                    title: this.$t("success"),
                    text: "",
                    type: "success"
                  }).then(ok => {
                    this.getUser()
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
              })
              .catch(error => {
                this.buttonUserDialogLoader = false;
                this.userDialog.visible = false;
                this.$swal(this.$t("error"), this.$t("error_text"), "error");
              });
          } 
          else {
            this.buttonUserDialogLoader = false;
          }
        });
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
    // async loadContact() {
    //   if (this.groupId != 0) {
    //     await this.loadContactByGroup();
    //   } else {
    //     await this.loadContactAll();
    //   }
    // },

    // async nextContact(page) {
    //   // console.log("page", page, this.groupId)
    //   if (this.searchContact != "") {
    //     this.currentPageContact = page;
    //     this.currentPage = this.currentPageContact;
    //     this.doGetSearchContact(this.searchContact);
    //   } else {
    //     if (this.groupId != 0) {
    //       this.currentPageGroupContact = page;
    //       this.currentPage = this.currentPageGroupContact;
    //       this.loadContactByGroup(page);
    //     } else {
    //       this.currentPageContact = page;
    //       this.currentPage = this.currentPageContact;
    //       this.loadContactAll(page);
    //     }
    //   }
    // },
    // doSearchContact(ev) {
    //   clearTimeout(this.timeout);
    //   this.timeout = setTimeout(() => {
    //     if (this.searchContact.length >= 3) {
    //       this.currentPageContact = this.currentPageGroupContact = this.currentPage = 1;
    //       this.doGetSearchContact(this.searchContact);
    //     } else {
    //       this.loadContactAll();
    //     }
    //   }, 1000);
    // },
    // async doGetSearchContact(query = "", page = 1) {
    //   this.contactLoader = true;
    //   await api({
    //     method: "get",
    //     url: "phonebook/search",
    //     params: {
    //       page: this.currentPage,
    //       query: query,
    //       group_id: this.groupId != 0 ? this.groupId : ""
    //     }
    //   })
    //     .then(result => {
    //       this.list = result.data.data.contact;
    //       this.contactsTotal = result.data.data.rows;
    //       this.contactLoader = false;
    //     })
    //     .catch(error => {
    //       console.error("Failed : " + error);
    //       this.contactLoader = false;
    //     });
    // },
    
    
  },
  watch:{
    totalUser(){
     if (this.totalUser > 10000) {
			 let elBtn = document.getElementsByClassName("btn-next")
			 for (let index = 0; index < elBtn.length; index++) {
				 elBtn[index].disabled = true
				 
			 }
			}
    }
  },
  computed: {
    
   
  },
  async mounted() {
    await this.getUser()
    await this.getPenyedia()
    await this.getSubBidang()
    await this.getJenisAnggaran()
    await this.getStatusPengadaan()
    // this.loadContact();
    // this.loadGroup();
  },
  components: {
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables";

.full-button {
  width: 100%;
}

.page-header {
  margin-bottom: 20px;
}

h2 {
  float: left;
}

.add-group,
.add-contact {
  float: right;
}

.search-contact {
  float: right;
  width: 200px;
}

.search-group {
  width: 100%;
}

.contact-list,
.group-list {
  width: 100%;
}

.contact-list {
  // height: 650px;
  height: auto;
}

.group-item,
.contact-item {
  &:hover,
  &.active {
    background-color: #dddddd;
    border-radius: 5px;
  }
}

.group-item {
  cursor: pointer;
}

.contact {
  margin: 10px 0;
  padding: 5px;
  box-sizing: border-box;
  // cursor: pointer;
  transition: all 0.5s 0.25s;

  .avatar {
    width: 60px;
    transition: all 0.5s 0.25s;

    img,
    span {
      box-sizing: border-box;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      transition: all 0.5s 0.25s;
      font-size: 20px;
      padding-top: 12px;
      text-align: center;
      text-transform: uppercase;
    }
  }
}

.el-card__body {
  overflow-y: scroll;
}

.menu {
  font-size: 18px;
}
@media screen and (max-width: 450px) {
  .avatar {
    display: none;
  }
}
</style>
