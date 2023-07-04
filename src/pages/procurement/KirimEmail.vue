<template>
    <div id='kirimemail-main' class="scrollable only-y">
        <div class="page-header">
			<h1>{{ $t("menu.kirimemail") }}</h1>
		</div>
        <el-card>
            <el-table ref="singleTable" :data="email" style="width: 100%">
                <el-table-column fixed prop="created_at" label="CREATED AT" width="180">
					<template slot-scope="props">
						{{ formatDate(props.row.created_at) }}
					</template>
				</el-table-column>
				<el-table-column
					prop="no_ba"
					label="NOMOR BA"
					width="250">
					<template slot-scope="props">
						{{ props.row.no_ba || '-' }}
					</template>
				</el-table-column>
                <el-table-column
					prop="nilai_ba"
					label="NILAI BA"
					width="250">
					<template slot-scope="props">
						{{ props.row.nilai_ba || '-' }}
					</template>
				</el-table-column>
                <el-table-column
					prop="po_number"
					label="PO NUMBER"
					width="250">
					<template slot-scope="props">
						{{ props.row.po_number || '-' }}
					</template>
				</el-table-column>
                <el-table-column
					prop="vendor"
					label="EMAIL VENDOR"
					width="250">
					<template slot-scope="props">
						{{ props.row.vendor || '-' }}
					</template>
				</el-table-column>
                <!-- <el-table-column
					prop="subject"
					label="SUBJECT EMAIL"
					width="250">
					<template slot-scope="props">
						{{ props.row.subject || '-' }}
					</template>
				</el-table-column>
                <el-table-column
					prop="isi_email"
					label="ISI EMAIL"
					width="250">
					<template slot-scope="props">
                        <span v-if="props.row.isi_email==''">-</span>
                        <el-tooltip v-else>
                            <div style="width: 250px;" class="tooltip" slot="content">{{props.row.isi_email}}</div>
                            <p style="font-weight:bold;">{{ props.row.isi_email || '' }}...</p>
                        </el-tooltip>
					</template>
				</el-table-column> -->
                <el-table-column
					fixed="right"
					label="Operations"
					width="300">
					<template slot-scope="scope">
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" size="small" @click="show(scope.row)">
							Lihat
						</el-button>
                        <el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" size="small" type="warning" @click="dialogShowUpd(scope.row)">
							Edit
						</el-button>
						<el-button :disabled="allowedRole == 'user' || allowedRole == 'manajemen' || allowedRole == 'keuangan' ? true: false" type="danger" size="small" @click="deleteMailData(scope.row.id)">
							Hapus
						</el-button>
					</template>
				</el-table-column>
            </el-table>
        </el-card>
        <el-dialog :visible.sync="dialog.show" title="Detail" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form ref="form" :model="showDetail" label-width="150px">
                <el-form-item label="Subject Email">
                    <span v-if="showDetail.subject==null || showDetail.subject==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else type="textarea" v-model="showDetail.subject" readonly></el-input>
                </el-form-item>
                <el-form-item label="Nomor BA">
                    <span v-if="showDetail.no_ba==null || showDetail.no_ba==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else type="textarea" v-model="showDetail.no_ba" readonly></el-input>
                </el-form-item>
                <el-form-item label="PO Number">
                    <span v-if="showDetail.po_number==null || showDetail.po_number==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else type="textarea" v-model="showDetail.po_number" readonly></el-input>
                </el-form-item>
                <el-form-item label="Nama Pekerjaan">
                    <span v-if="showDetail.nama_pekerjaan==null || showDetail.nama_pekerjaan==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else type="textarea" v-model="showDetail.nama_pekerjaan" readonly></el-input>
                </el-form-item>
                <el-form-item label="Nilai BA">
                    <span v-if="showDetail.nilai_ba==null || showDetail.nilai_ba==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else type="textarea" v-model="showDetail.nilai_ba" readonly></el-input>
                </el-form-item>
                <el-form-item label="Email Vendor">
                    <span v-if="showDetail.vendor==null || showDetail.vendor==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else v-model="showDetail.vendor" readonly></el-input>
                </el-form-item>
                <el-form-item label="Isi Email">
                    <span v-if="showDetail.isi_email==null || showDetail.isi_email==''" readonly><el-tag type="danger">Tidak ada</el-tag></span>
                    <el-input v-else type="textarea" v-model="showDetail.isi_email" readonly rows="45" cols="50"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="showDetail.subject==null || showDetail.subject=='' || showDetail.vendor==null || showDetail.vendor==''|| showDetail.isi_email==null || showDetail.isi_email==''" type="primary" disabled>Send Email</el-button>
                    <el-button v-else type="primary" @click="sendMail" :loading="loadingSend">Send Email</el-button>
                    <el-button @click="dialog.show=false">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
		<el-dialog @close="getMailData()" :visible.sync="dialog.edit" :title="'Edit mail : '+selectedEditPO.no_bapp"  :close-on-click-modal="false" :close-on-press-escape="false">
			<el-form :model="selectedEditPO">
				<el-form-item label="Subject" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.subject" auto-complete="off" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="No BA" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.no_ba" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="PO Number" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.po_number" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="Nama Pekerjaan" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nama_pekerjaan" auto-complete="off" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="Nilai BA" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.nilai_ba" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Vendor" :label-width="formLabelWidth">
					<el-input readonly v-model="selectedEditPO.vendor" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item label="Isi Email" :label-width="formLabelWidth">
					<el-input v-model="selectedEditPO.isi_email" auto-complete="off" type="textarea" rows="15" cols="50"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog.edit = false">Cancel</el-button>
				<el-button type="primary" @click="edit" :loading="loadingUpdate">Submit</el-button>
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
import { useCurrencyInput } from 'vue-currency-input'
import CurrencyInput from "../../components/CurrencyInput.vue";

export default {
    name: 'WorkspaceJsonKirimemail',

    data() {
        return {
            allowedRole: store.getters.allowedRole,
            loadingEmail: false,
            loadingDownload: false,
            loadingSend: false,
			loadingUpdate: false,
			loadingDelete: false,
			formLabelWidth: '',
            dialog: {
                show: false,
				edit: false
            },
            email: [ { email: [] } ],
            showDetail: {},
			selectedEditPO: {
				subject: '',
				no_ba: "",
				po_number: "",
				nama_pekerjaan: "",
				nilai_ba: "",
				vendor: "",
				isi_email: ""
			},
        };
    },

    async mounted() {
        await this.getMailData()
    },

    methods: {
        formatDate(str, format) {
			return moment(str).format("DD-MMM-YYYY");
		},
        async getMailData(query = '', download = false, filter = ''){
            this.loadingEmail = true
			let apiOptions = {
				method: 'get',
				url: 'procurement/email',
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
					console.log('result email', result)
					this.email = result.data.data.rows
					// this.bae.forEach(el=> {
					// 	el.estimasi_harga = this.convertToRupiah(el.estimasi_harga) || 0
					// 	el.estimasi_harga_ppn = this.convertToRupiah(el.estimasi_harga_ppn) || 0
					// })
					this.total = result.data.data.count
					// this.checkdate = moment().format('MM/DD/YYYY')
					// console.log('hahaha',this.checkdate)
					this.loadingEmail = false
        		}
        		else if(download == true){
					if(result.headers['content-type'].indexOf('application/json') == -1){
						try {
							const url = window.URL.createObjectURL(new Blob([result.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', 'Report Data Email.xlsx'); //or any other extension
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
				this.loadingEmail = false
				this.loadingDownload = false
			})
			this.loadingEmail = false
        },
		dialogShowUpd(key){
			console.log('key edit',key);
			this.dialog.edit = true;
			// key.estimasi_harga = this.convertToAngka(key.estimasi_harga)
			// key.nilai_pr = this.convertToAngka(key.nilai_pr)
			// key.nilai_kontrak = this.convertToAngka(key.nilai_kontrak)
			this.selectedEditPO = key
		},
        show(row){
            this.dialog.show = true
            this.showDetail = row
        },
        edit(){
			this.loadingUpdate = true
			api({
				method: 'patch',
				url: 'procurement/email/'+this.selectedEditPO.id,
				data: {
					subject: this.selectedEditPO.subject,
					no_ba: this.selectedEditPO.no_ba,
					po_number: this.selectedEditPO.po_number,
					nama_pekerjaan: this.selectedEditPO.nama_pekerjaan,
					nilai_ba: this.selectedEditPO.nilai_ba,
					vendor: this.selectedEditPO.vendor,
					isi_email: this.selectedEditPO.isi_email
				}
			}).then(result => {
				if (result.data.ec == 200) {
					this.$swal(this.$t('success'), "Data email berhasil di update", "success")
					this.dialog.edit = false
					this.loadingUpdate = false
					this.getMailData()
				} else {
					this.$message.error(this.$t('error_text'));
				}
				this.loadingUpdate = false
			}).catch(error => {
				console.log(error);
				this.loadingUpdate = false
			})
			this.loadingUpdate = false
        },
        deleteMailData(id){
			console.log('id hapus',id)
			this.$confirm('Anda yakin akan menghapus data ini?. Lanjutkan?', 'Peringatan', {
				confirmButtonText: 'Hapus',
				cancelButtonText: 'Batal',
				type: 'warning'
			}).then(() => {
				this.loadingDelete = true
				api({
					method: 'delete',
					url: 'procurement/email/'+id
				}).then(result => {
					if(result.data.ec == 200){
						this.$message({
							type: 'success',
							message: 'Data email berhasil di hapus'
						});
						this.getMailData()
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
        sendMail(){
            this.loadingSend = true
            let mailOpt = {
				method: 'post',
				url: 'procurement/email/send',
				data: {
					to: this.showDetail.vendor,
					subject: this.showDetail.subject,
					text: this.showDetail.isi_email
                },
				timeout: 10 * 1000
			}
            api(mailOpt).then(result => {
                console.log(result)
                alert('Email terkirim')
                this.loadingSend = false
                this.dialog.show = false
            }).catch(error => {
                console.log(error)
                alert('Email gagal terkirim')
                this.loadingSend = false
                this.dialog.show = false
            })
        }
    },
};
</script>