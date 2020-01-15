import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {NgForm} from "@angular/forms";

@Component({
	selector: 'app-blog-details',
	templateUrl: './blog-details.component.html',
	styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

	private STUDENTS_LIST =[
		'ABROUGUI BAHA EDDINE',
		'ALATRI AYMEN',
		'AYADI MALEK',
		'BEL HADJ HMIDA OUSSEMA',
		'BELAID SAMI',
		'BELGACEM AHMED',
		'BELJA MOHAMED DHAIF',
		'BEN AMEUR YASSINE',
		'BEN CHAABEN MARIEM',
		'BEN DHAFER CHAYMA',
		'BEN FADHEL ICHRAF',
		'BEN SALAH MOHAMED KHALIL',
		'BENZARTI MOHAMED',
		'BOUASKER MEHREZ',
		'BOUCHOUCHA RACHED',
		'BOUDHRAA MOHAMED HELMI',
		'BOUGHZALA AYA',
		'BOUJEH MOHAMED',
		'CHABCHOUB ZEINEB',
		'CHAKER IYADH',
		'CHALGHAF JIHED',
		'CHAMMAKHI HAZEM',
		'CHEBIL HAMZA',
		'CHRIF YOSRA',
		'DAOUES HAMZA',
		'DERBELI YAHYA',
		'DRIDI LINA',
		'EL KAHLA FARES',
		'FARHANI HAZEM',
		'FEKIH MED AZIZ',
		'FENDRI CHADI',
		'GALMAMI OUSSEMA',
		'GHAMMAM ANOUAR',
		'GHARSALLI HELMI',
		'GHIMAJI MOHAMED',
		'HADOUAJ SAMI',
		'HAJJI AHMED AHMED',
		'HAMDI MAZEN',
		'HAMOUDA ALI',
		'HAOUARI RABEB',
		'HAOUARI WEJDEN',
		'JERBI ALAA',
		'JOUINI MED KAREM',
		'KAMOUN OMAR',
		'KAROUI AMINE',
		'KHALFALLAH IYADH',
		'KHAMMASI AYOUB',
		'KHORCHANI INSAF',
		'KOUBAA OLFA',
		'KRICHEN WALIM',
		'KSONTINI EMNA',
		'KSONTINI RYM',
		'LTIFI MED ELYES',
		'MARZOUK MED ALI',
		'MEJRI KHALIL',
		'MEZYEN SKANDER',
		'MOHSNI WASSIM',
		'MOUMNI MAHMOUD',
		'RAIS SALMA',
		'SAIDANI SANA',
		'SALEM SINDA',
		'SLAMA ALI',
		'SOKKAH YOUSSEF',
		'TARHOUNI MARIEM',
		'TAYEB HAYFA',
		'TELIBA ONS',
		'TRIKI ALAA',
		'TURKI KHLIL',
		'ZOUARI MOHAMED'
	];

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
	}

	ngOnInit() {
	}

	onSubmit(formulaire: NgForm){

	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	loadLineChartOptions(data, color) {
		let chartOption: EChartOption;
		let xAxisData: Array<any> = new Array<any>();

		data.forEach(element => {
			xAxisData.push("");
		});

		return chartOption = {
			xAxis: {
				type: 'category',
				show: false,
				data: xAxisData,
				boundaryGap: false,
			},
			yAxis: {
				type: 'value',
				show: false
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params, ticket, callback) {
					return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
				}
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				top: '0%',
				containLabel: false
			},
			series: [{
				data: data,
				type: 'line',
				showSymbol: false,
				symbolSize: 1,
				lineStyle: {
					color: color,
					width: 1
				}
			}]
		};
	}

}
