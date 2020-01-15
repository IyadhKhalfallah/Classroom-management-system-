import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {NgForm} from "@angular/forms";
import {GradeSubmit} from "../../services/gradesubmit";
import {GradesService} from "../../services/grades.service";

@Component({
	selector: 'app-blog-details',
	templateUrl: './blog-details.component.html',
	styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

	public STUDENTS_LIST =[
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

	public gradeSubject: string = "Artificial Intelligence";
	public gradeType: string = "Lectures";
	public gradeValues: number[] = new Array(this.STUDENTS_LIST.length).fill(0);

	public gradesSubmit: GradeSubmit[] = [];
	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private gradesService: GradesService) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
	}

	ngOnInit() {
		for (let i = 0; i < this.STUDENTS_LIST.length; i += 1) {
			this.gradesSubmit.push(new GradeSubmit(this.STUDENTS_LIST[i] , this.gradeSubject , this.gradeType, 0));
		}
	}

	onSubmit(formulaire: NgForm){
		this.gradesSubmit = [];
		for (let i = 0; i < this.STUDENTS_LIST.length; i += 1) {
			this.gradesSubmit.push(new GradeSubmit(this.STUDENTS_LIST[i] , this.gradeSubject , this.gradeType, this.gradeValues[i]));
		}
		this.gradesService.postGrades(this.gradesSubmit);
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
