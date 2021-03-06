import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {Grade} from "../../services/grade";
import {GradesService} from "../../services/grades.service";

@Component({
	selector: 'app-blog-list',
	templateUrl: './blog-list.component.html',
	styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

	public grades: Grade[] = [new Grade("trikialaa","Artificial Intelligence", 16.25, 19, 11.25)];

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private gradesService: GradesService) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
	}

	ngOnInit() {
		 this.gradesService.getGrades().subscribe(
			 (response) => {(console.log(response['data']));
				for(var i=0;i<response['data'].length;i++){
					var g=new Grade(response['data'][i]['users_id'],response['data'][i]['subject_id'],response['data'][i]['ds'],response['data'][i]['tp'],response['data'][i]['exam']);
					this.grades.push(g)
				}
			},
			 (error)=> {console.log(error);}
		 );
		console.log('Done here!')
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
