(window.webpackJsonp=window.webpackJsonp||[]).push([["dashboard"],{"0f26":function(t,a,e){},"7d56":function(t,a,e){"use strict";var n=e("0f26");e.n(n).a},ab16:function(t,a,e){"use strict";var n=e("d356");e.n(n).a},d356:function(t,a,e){},e44b:function(t,a,e){t.exports=e.p+"img/no_data@3x.c9f2b0ef.png"},ec95:function(t,a,n){"use strict";n.r(a);var e,o,r,i,s,l,u,c,d=(n("f7518"),n("6762"),n("2fdb"),n("28a5"),n("96cf"),n("c973")),g=n.n(d),h=(n("a481"),n("9523")),p=n.n(h),m=n("db49"),f=n("271f"),b=n("c1df"),y=n.n(b),d=n("2ef0"),S=n.n(d),h=n("f858"),b=n("b204"),d=n("8521"),d=n.n(d),v=n("c0d6"),b=(n("2b0e"),{name:"Dashboard",directives:{echarts:h.a},components:{ChartOne:b.a,ChartTwo:b.a,ChartThree:b.a,ChartLabel:d.a},data:function(){var e=this,n=this,t={timeout:null,yearSelect:{year:null},transaksi_pengadaan:[],pbjstatus:[],pbjOnestatus:[],trx_status:[],searchByList:[{by:"jenis_pengadaan",name:"Jenis Pengadaan"},{by:"bidang",name:"Bidang"},{by:"pic_pengadaan",name:"PIC Pengadaan"}],dialogDetailChartStatus:!1,loadingDownload:!1,data:{loadingTransaction:!1,labels:[],datasets:[{label:"Data PR MASUK",data:[],backgroundColor:["#8984d8","#83cb9d","#42afe3","#ed6c63","#97cd76"]}]},dataStatus:{loadingTransaction:!1,labels:[],datasets:[{label:"Data",data:[],backgroundColor:["#8984d8","#83cb9d","#42afe3","#ed6c63","#97cd76"]}]},options:{scales:{y:{beginAtZero:!0}},segmentShowStroke:!1,responsive:!0,legend:{onClick:function(t){},position:"bottom"},title:{display:!0,text:"DATA PR MASUK"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#ffff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}},hover:{onHover:function(t,a){document.getElementsByClassName("chartjs")[0].style.cursor=a[0]?"pointer":"default"}},onClick:function(t,a){t=t.path[0].getAttribute("id");"chart-1"==t&&e.detailChart(t,a[0]._index)}},optionsStatusTerkontrak:{segmentShowStroke:!1,responsive:!0,legend:{onClick:function(t){},position:"bottom"},title:{display:!0,text:"RATIO BERDASARKAN NILAI PENGADAAN"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#ffff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}},hover:{onHover:function(t,a){document.getElementsByClassName("chartjs")[2].style.cursor=a[0]?"pointer":"default"}},onClick:function(t,a){t=t.path[0].getAttribute("id");"chart-3"==t&&n.detailChart(t,a[0]._index)}},asyncComponent:"peity",monthOfTheSelected:"",dialogDetailOutbound:!1,loadingUniqueOutboundDetail:!1,user:v.a.getters.userID,startDate:"",endDate:"",jenisAnggaran:[],fillSearch:{searchBy:"",query:""},fillJenisAnggaran:{jenis_anggaran:""},outbondDetail:[],resized:!1,config:m.a,loadingWA:!0};return p()(t,"timeout",null),p()(t,"loading",{ticket:!0,overview:!0,mostTemplate:!0,uniqueUser:!0,uniqueOutbound:!1}),p()(t,"showAlertMessage",!1),p()(t,"showAlertError",!1),p()(t,"loadingTable",!0),p()(t,"isLoading",!0),p()(t,"totalWA",0),p()(t,"totalBill",0),p()(t,"loadingContact",!0),p()(t,"totalContact",0),p()(t,"selectedPhoneNumber",""),p()(t,"companyPhone",""),p()(t,"monthName",y()().format("MMMM")),p()(t,"prevMonth",y()().subtract(1,"months").format("YYYY-MM")),p()(t,"currentMonth",y()().format("YYYY-MM")),p()(t,"prevMonthTicket","".concat(y()().subtract(1,"months").format("YYYY-MM"),"-01 00:00:00")),p()(t,"currentMonthTicket","".concat(y()().format("YYYY-MM"),"-01 00:00:00")),p()(t,"ticketPrevMonth",{open:0,process:0,close:0}),p()(t,"ticketCurrMonth",{open:0,process:0,close:0}),p()(t,"thisMonth",{tanggal:[0],textTotal:[0],image:{total:[0]},hsm:{total:[0]},document:{total:[0]},audio:{total:[0]},outbond:{total:[0]}}),p()(t,"previousMonth",{tanggal:[0],textTotal:[0],image:{total:[0]},hsm:{total:[0]},document:{total:[0]},audio:{total:[0]},outbond:{total:[0]}}),p()(t,"chartOptionNotification",{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Total Notification Previous Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Total Notification This Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]}),p()(t,"chartOptionOutbond",{areaColor:"#FFF",grid:{show:!1,left:"20px",right:"50px",bottom:"20px",top:"20px",containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},legend:{show:!1,data:["line","bar"],textStyle:{color:"#ccc"}},xAxis:[{type:"category",boundaryGap:!1,data:[0],axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],yAxis:[{type:"value",splitLine:{show:!1},axisLine:{lineStyle:{color:"rgba(255,255,255,0.5)"}}}],series:[{name:"Total Outbond Previous Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#fff"},itemStyle:{color:"#fff",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]},{name:"Total Outbond This Month",type:"line",smooth:!0,showAllSymbol:!0,symbol:"emptyCircle",symbolSize:10,lineStyle:{color:"#f98643"},itemStyle:{color:"#f98643",borderColor:"#5f8fdf",borderWidth:3},areaStyle:{color:"rgba(255,255,255,0.2)"},animationDuration:2800,animationEasing:"cubicInOut",data:[0]}]}),p()(t,"donutHsmData",{labels:[],datasets:[{data:[],backgroundColor:["#4aa0f1","#249393","#bb4c3f","#ed6c63","#97cd76","#ff8a65","#964af1","#5d4037","#00796b","#827717","#7986cb","#7f8c8d"]}]}),p()(t,"donutHsmDataStatus",{labels:[],datasets:[{data:[],backgroundColor:["#4aa0f1","#249393","#bb4c3f","#ed6c63","#97cd76","#ff8a65","#964af1","#5d4037","#00796b","#827717","#7986cb","#7f8c8d"]}]}),p()(t,"donutHsmOptions",{segmentShowStroke:!1,responsive:!0,legend:{position:"bottom"},title:{display:!0,text:"RATIO BERDASARKAN STATUS PENGADAAN"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#ffff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}}}),p()(t,"donutHsmOptionsStatus",{segmentShowStroke:!1,responsive:!0,legend:{onClick:function(t){},position:"bottom"},title:{display:!0,text:"RATIO BERDASARKAN STATUS PENGADAAN"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#ffff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}},hover:{onHover:function(t,a){document.getElementsByClassName("chartjs")[1].style.cursor=a[0]?"pointer":"default"}},onClick:function(t,a){t=t.path[0].getAttribute("id");"chart-2"==t&&n.detailChart(t,a[0]._index)}}),p()(t,"barHsmOptions",{segmentShowStroke:!1,responsive:!0,legend:{position:"left"},title:{display:!0,text:"TODAY"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#ffff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}}}),p()(t,"donutDataTopHsm",{labels:[],data:[],type:"bars"}),p()(t,"donutDataTopStatus",{labels:[],data:[],type:"pie"}),p()(t,"donutUniqueData",{labels:[],datasets:[{data:[],backgroundColor:["#4aa0f1","#249393","#bb4c3f","#ed6c63","#97cd76","#ff8a65","#964af1","#5d4037","#00796b","#827717","#7986cb"]}]}),p()(t,"donutUniqueOptions",{segmentShowStroke:!1,responsive:!0,legend:{position:"left",orient:"vertical",x:"left"},title:{display:!0,text:"Total Unique User"},animation:{animateScale:!0,animateRotate:!0},plugins:{labels:{render:"value",fontSize:12,fontColor:"#fff",fontStyle:"normal",fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"default"}}}),t},computed:{smallWidget:function(){return 970<=this.dashboardWidth&&this.dashboardWidth<=1412&&1200<=this.windowWidth}},methods:{download:function(){this.getAllTransaction(!0)},detailChart:function(t,a){var e=this.data.labels[a];switch(t){case"chart-2":e=this.donutHsmDataStatus.labels[a];break;case"chart-3":e=this.dataStatus.labels[a]}this.$router.replace({name:"po-detail",params:{chart:t,status:e,jenis_anggaran:this.fillJenisAnggaran.jenis_anggaran||null,tahun:this.yearSelect.year}})},pickYear:(c=g()(regeneratorRuntime.mark(function t(){var a=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:clearTimeout(this.timeout),this.timeout=setTimeout(g()(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.getTransaction();case 2:return t.next=4,a.getStatus();case 4:return t.next=6,a.getStatusTrx();case 6:case"end":return t.stop()}},t,this)})),800);case 2:case"end":return t.stop()}},t,this)})),function(){return c.apply(this,arguments)}),convertToRupiah:function(t){for(var a="",e=t.toString().split("").reverse().join(""),n=0;n<e.length;n++)n%3==0&&(a+=e.substr(n,3)+".");return"Rp. "+a.split("",a.length-1).reverse().join("")},convertToAngka:function(t){return t.includes("Rp. ")?parseInt(t.replace(/,.*|[^0-9]/g,""),10):t},getTransaction:(u=g()(regeneratorRuntime.mark(function t(){var a,r=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.data.loadingTransaction=!0,a={method:"get",url:"transaksi/metode_pengadaan",params:{year:this.yearSelect.year?y()(this.yearSelect.year).format("YYYY-MM-DD"):"",jenis_anggaran:""!=this.fillJenisAnggaran.jenis_anggaran?this.fillJenisAnggaran.jenis_anggaran:""},timeout:1e4},t.next=4,Object(f.a)(a).then(function(t){var e,n,o;200==t.data.ec?(r.transaksi_pengadaan=t.data.data.rows,e=[],n=[],o=[],S.a.forEach(r.transaksi_pengadaan,function(t,a){e.push(t.jenis_pengadaan||"?"),n.push(Number(t.total_jumlah_pekerjaan)),o.push("#"+Math.floor(16777215*Math.random()).toString(16)),t.total_nilai_pr=r.convertToRupiah(t.total_nilai_pr||0),t.total_nilai_pr_in_progress=r.convertToRupiah(t.total_nilai_pr_in_progress||0),t.total_nilai_pr_terkontrak=r.convertToRupiah(t.total_nilai_pr_terkontrak||0)}),r.data.labels=e,r.data.datasets[0].data=n,r.data.datasets[0].backgroundColor=o):r.$swal(r.$t("error"),r.$t("helpdesk.".concat(t.data.message)),"error"),r.loadingDownload=!1,setTimeout(function(){r.data.loadingTransaction=!1},800)}).catch(function(t){r.$swal(r.$t("error"),"Data transaksi gagal terambil","error"),r.data.loadingTransaction=!1});case 4:this.renderDoughnutTopTrx(),this.data.loadingTransaction=!1;case 6:case"end":return t.stop()}},t,this)})),function(){return u.apply(this,arguments)}),getAllTransaction:(l=g()(regeneratorRuntime.mark(function t(){var n,a,o=this,e=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=0<e.length&&void 0!==e[0]&&e[0],this.data.loadingTransaction=!0,a={method:"get",url:"transaksi/semua",params:{download:n,year:this.yearSelect.year?y()(this.yearSelect.year).format("YYYY-MM-DD"):"",jenis_anggaran:""!=this.fillJenisAnggaran.jenis_anggaran?this.fillJenisAnggaran.jenis_anggaran:""},timeout:1e4},1==n&&(a.responseType="arraybuffer",this.loadingDownload=!0),t.next=6,Object(f.a)(a).then(function(t){if(200!=t.data.ec&&1==n)if(-1==t.headers["content-type"].indexOf("application/json"))try{var a=window.URL.createObjectURL(new Blob([t.data])),e=document.createElement("a");e.href=a,e.setAttribute("download","Report Data Dashboard.xlsx"),e.click()}catch(t){}else o.$swal(o.$t("error"),o.$t("helpdesk.".concat(t.data.message)),"error");o.loadingDownload=!1,setTimeout(function(){o.data.loadingTransaction=!1},800)}).catch(function(t){o.$swal(o.$t("error"),"Data transaksi gagal terambil","error"),o.data.loadingTransaction=!1});case 6:this.data.loadingTransaction=!1;case 7:case"end":return t.stop()}},t,this)})),function(){return l.apply(this,arguments)}),getStatusTrx:(s=g()(regeneratorRuntime.mark(function t(){var n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.dataStatus.loadingTransaction=!0,t.next=3,Object(f.a)({method:"get",url:"transaksi/iptstatus",params:{year:this.yearSelect.year?y()(this.yearSelect.year).format("YYYY-MM-DD"):"",jenis_anggaran:""!=this.fillJenisAnggaran.jenis_anggaran?this.fillJenisAnggaran.jenis_anggaran:""},timeout:1e4}).then(function(t){n.trx_status=t.data.data.count;var a=[],e=[];S.a.forEach(n.trx_status,function(t){a.push(t.status),e.push(t.count)}),n.dataStatus.labels=a,n.dataStatus.datasets[0].data=e,setTimeout(function(){n.dataStatus.loadingTransaction=!1},500)}).catch(function(t){n.$swal(n.$t("error"),"Data transaksi gagal terambil","error"),n.dataStatus.loadingTransaction=!1});case 3:this.renderDoughnutTopTrxStatus(),this.dataStatus.loadingTransaction=!1;case 5:case"end":return t.stop()}},t,this)})),function(){return s.apply(this,arguments)}),getStatus:(i=g()(regeneratorRuntime.mark(function t(){var o=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.dataStatus.loadingTransaction=!0,t.next=4,Object(f.a)({method:"get",url:"procurement/po/status",params:{year:this.yearSelect.year?y()(this.yearSelect.year).format("YYYY-MM-DD"):"",jenis_anggaran:""!=this.fillJenisAnggaran.jenis_anggaran?this.fillJenisAnggaran.jenis_anggaran:""}}).then(function(t){o.pbjstatus=t.data.data.count;var a=[],e=[],n=[];S.a.forEach(o.pbjstatus,function(t){a.push(t.status_pengadaan),e.push(t.count),n.push("#"+Math.floor(16777215*Math.random()).toString(16))}),o.donutDataTopStatus.labels=a,o.donutDataTopStatus.data=e,o.donutHsmDataStatus.datasets[0].backgroundColor=n,setTimeout(function(){o.dataStatus.loadingTransaction=!1},500)}).catch(function(t){o.$swal(o.$t("error"),"Data status gagal terambil","error"),o.dataStatus.loadingTransaction=!1});case 4:this.renderDoughnutTopStatus(),this.dataStatus.loadingTransaction=!1;case 6:case"end":return t.stop()}},t,this)})),function(){return i.apply(this,arguments)}),getSummaries:function(t){var n=this,a=t.columns,o=t.data,r=[];return a.forEach(function(a,t){var e;0!==t?(e=o.map(function(t){return Number(n.convertToAngka(t[a.property]))})).every(function(t){return isNaN(t)})?r[t]="N/A":(r[t]=e.reduce(function(t,a){var e=Number(a);return isNaN(e)?t:t+a},0),0<t&&t%2==0&&(r[t]=n.convertToRupiah(r[t]))):r[t]="TOTAL KONTRAK PENGADAAN"}),r},dialogDetail:function(){this.dialogDetailOutbound=!0},renderTrxChart:(r=g()(regeneratorRuntime.mark(function t(){var a,e,n=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:a=0<n.length&&void 0!==n[0]?n[0]:[],e=1<n.length&&void 0!==n[1]?n[1]:[],setTimeout(function(){var t=document.getElementById("dataChart");new Chart(t,{type:"bar",data:{labels:a,datasets:[{label:"# of Trx(s)",data:e,backgroundColor:"rgba(31, 200, 219, 0.2)",borderWidth:1}]},options:{scales:{yAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"},ticks:{precision:0,beginAtZero:!0}}],xAxes:[{gridLines:{color:"rgba(0, 0, 0, 0)"}}]}}})},50);case 3:case"end":return t.stop()}},t,this)})),function(){return r.apply(this,arguments)}),renderChart:function(){var t=Object.assign({},this.chartOptionNotification),a=Object.assign({},this.chartOptionOutbond);t.xAxis[0].data=this.thisMonth.tanggal,t.series[0].data=this.previousMonth.hsm.total,t.series[1].data=this.thisMonth.hsm.total,a.xAxis[0].data=this.thisMonth.tanggal,a.series[0].data=this.previousMonth.outbond.total,a.series[1].data=this.thisMonth.outbond.total,this.chartOptionNotification=t,this.chartOptionOutbond=a,this.isLoading=!1},renderDoughnutTopHsm:function(){var t=Object.assign({},this.donutHsmData);t.labels=this.donutDataTopHsm.labels,t.datasets[0].data=this.donutDataTopHsm.data,this.donutHsmData=t,this.donutDataTopHsm.type="doughnut",this.isLoading=!1},renderDoughnutTopTrx:function(){this.isLoading=!1},renderDoughnutTopTrxStatus:function(){var t=Object.assign({},this.donutHsmData);t.labels=this.donutDataTopHsm.labels,t.datasets[0].data=this.donutDataTopHsm.data,this.donutHsmData=t,this.donutDataTopHsm.type="doughnut",this.isLoading=!1},renderDoughnutTopStatus:function(){var t=Object.assign({},this.donutHsmDataStatus);t.labels=this.donutDataTopStatus.labels,t.datasets[0].data=this.donutDataTopStatus.data,this.donutHsmDataStatus=t,this.donutDataTopStatus.type="doughnut",this.isLoading=!1},goToUrl:function(t){window.open(t,"_blank").focus()},getJenisAnggaran:(o=g()(regeneratorRuntime.mark(function t(){var a=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(f.a)({method:"get",url:"jenis_anggaran"}).then(function(t){a.jenisAnggaran=t.data.data.rows}).catch(function(t){a.$swal(a.$t("error"),"Data jenis anggaran gagal terambil","error")});case 2:case"end":return t.stop()}},t,this)})),function(){return o.apply(this,arguments)})},created:function(){this.$route.params.jenis_anggaran&&this.$route.params.tahun&&(this.fillJenisAnggaran.jenis_anggaran=this.$route.params.jenis_anggaran,this.yearSelect.year="null"!=this.$route.params.tahun?y()(this.$route.params.tahun).format():null,"null"==this.$route.params.jenis_anggaran&&(this.fillJenisAnggaran.jenis_anggaran=""))},mounted:(e=g()(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.getTransaction();case 2:return t.next=4,this.getStatus();case 4:return t.next=6,this.getStatusTrx();case 6:this.getJenisAnggaran();case 7:case"end":return t.stop()}},t,this)})),function(){return e.apply(this,arguments)})}),d=(n("ab16"),n("7d56"),n("2877")),b=Object(d.a)(b,function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"scrollable only-y"},[e("div",{staticClass:"page-header"},[e("h1",[a._v(a._s(a.$t("menu.dashboard")))])]),a._v(" "),e("el-card",{directives:[{name:"loading",rawName:"v-loading",value:a.data.loadingTransaction,expression:"data.loadingTransaction"}]},[e("el-row",[e("el-col",{attrs:{span:10}},[e("el-button",{staticClass:"mb-20",on:{click:a.pickYear}},[e("i",{staticClass:"el-icon-refresh"}),a._v(" Reload\n\t\t\t\t\t")]),a._v(" "),e("el-button",{staticClass:"animated fadeInRight",attrs:{loading:a.loadingDownload,type:"primary",small:""},on:{click:a.download}},[e("i",{staticClass:"mdi mdi-download"}),a._v(" Download\n\t\t\t\t\t")])],1),a._v(" "),e("el-col",{attrs:{span:6}},[e("el-form",{attrs:{model:a.yearSelect,"label-width":"80px"}},[e("el-form-item",{attrs:{label:"Tahun"}},[e("el-date-picker",{attrs:{type:"year",placeholder:"Pilih tahun"},on:{change:a.pickYear},model:{value:a.yearSelect.year,callback:function(t){a.$set(a.yearSelect,"year",t)},expression:"yearSelect.year"}})],1)],1)],1),a._v(" "),e("el-col",{attrs:{span:8}},[e("el-form",{attrs:{model:a.fillJenisAnggaran,"label-width":"220px"}},[e("el-form-item",{attrs:{label:"Jenis Anggaran"}},[e("el-select",{attrs:{placeholder:"Pilih jenis anggaran"},on:{change:a.pickYear},model:{value:a.fillJenisAnggaran.jenis_anggaran,callback:function(t){a.$set(a.fillJenisAnggaran,"jenis_anggaran",t)},expression:"fillJenisAnggaran.jenis_anggaran"}},[e("el-option",{attrs:{label:"Pilih jenis anggaran",value:""}}),a._v(" "),a._l(a.jenisAnggaran,function(t){return e("el-option",{key:t.id,attrs:{label:t.jenis_anggaran,value:t.jenis_anggaran}})})],2)],1)],1)],1)],1),a._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:a.transaksi_pengadaan,"show-summary":"","summary-method":a.getSummaries,height:"400"}},[e("el-table-column",{attrs:{fixed:"",prop:"jenis_pengadaan",label:"JENIS PENGADAAN",width:"250"},scopedSlots:a._u([{key:"default",fn:function(t){return[a._v("\n\t\t\t\t\t\t"+a._s(t.row.jenis_pengadaan||"-")+"\n\t\t\t\t\t\t")]}}])}),a._v(" "),e("el-table-column",{attrs:{label:"PR MASUK"}},[e("el-table-column",{attrs:{prop:"total_jumlah_pekerjaan",label:"JUMLAH PEKERJAAN",width:"200"}}),a._v(" "),e("el-table-column",{attrs:{prop:"total_nilai_pr",label:"NILAI (Rp)",width:"200"}})],1),a._v(" "),e("el-table-column",{attrs:{label:"IN PROGRESS"}},[e("el-table-column",{attrs:{prop:"total_jumlah_pekerjaan_in_progress",label:"JUMLAH PEKERJAAN",width:"200"}}),a._v(" "),e("el-table-column",{attrs:{prop:"total_nilai_pr_in_progress",label:"NILAI (Rp)",width:"200"}})],1),a._v(" "),e("el-table-column",{attrs:{label:"TERKONTRAK"}},[e("el-table-column",{attrs:{prop:"total_jumlah_pekerjaan_terkontrak",label:"JUMLAH PEKERJAAN",width:"200"}}),a._v(" "),e("el-table-column",{attrs:{prop:"total_nilai_pr_terkontrak",label:"NILAI (Rp)",width:"200"}})],1)],1)],1),a._v(" "),e("el-card",{directives:[{name:"loading",rawName:"v-loading",value:a.data.loadingTransaction,expression:"data.loadingTransaction"}],staticClass:"mt-10"},[0==a.data.loadingTransaction?e("ChartOne",{attrs:{id:"chart-1",type:"bar",data:a.data,options:a.options}}):a._e()],1),a._v(" "),e("el-row",{staticClass:"mt-20",attrs:{gutter:30}},[e("el-col",{attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[e("el-card",{directives:[{name:"loading",rawName:"v-loading",value:a.dataStatus.loadingTransaction,expression:"dataStatus.loadingTransaction"}]},[0<a.donutHsmDataStatus.datasets[0].data.length&&!a.dataStatus.loadingTransaction?e("ChartTwo",{attrs:{id:"chart-2",type:a.donutDataTopStatus.type,data:a.donutHsmDataStatus,options:a.donutHsmOptionsStatus}}):[e("p",{attrs:{align:"center"}},[e("img",{attrs:{src:n("e44b"),width:"250px"}})])]],2)],1),a._v(" "),e("el-col",{attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[e("el-card",{directives:[{name:"loading",rawName:"v-loading",value:a.dataStatus.loadingTransaction,expression:"dataStatus.loadingTransaction"}]},[0<a.dataStatus.datasets[0].data.length&&!a.dataStatus.loadingTransaction?e("ChartThree",{attrs:{id:"chart-3",type:"doughnut",data:a.dataStatus,options:a.optionsStatusTerkontrak}}):[e("p",{attrs:{align:"center"}},[e("img",{attrs:{src:n("e44b"),width:"250px"}})])]],2)],1)],1),a._v(" "),e("el-dialog",{attrs:{title:"Data",visible:a.dialogDetailChartStatus},on:{"update:visible":function(t){a.dialogDetailChartStatus=t}}})],1)},[],!1,null,"d0319ba4",null);a.default=b.exports}}]);