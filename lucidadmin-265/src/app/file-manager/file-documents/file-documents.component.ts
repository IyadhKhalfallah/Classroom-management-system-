import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {FileDocument} from '../../services/filedocument';
import {DocumentsService} from '../../services/documents.service';

@Component({
  selector: 'app-file-documents',
  templateUrl: './file-documents.component.html',
  styleUrls: ['./file-documents.component.css'],
})
export class FileDocumentsComponent implements OnInit {

  public visitorsOptions: EChartOption = {};
  public visitsOptions: EChartOption = {};
  public sidebarVisible = true;

  public fileDocuments: FileDocument[] = [new FileDocument(0, 'al', 'a', 'a', 'a', 'z')];

  constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private documentsService: DocumentsService) {
    this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], '#49c5b6');
    this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], '#f4516c');
  }

  ngOnInit() {
     this.documentsService.getCourses('' , 'All', 'All').subscribe(
         (response) => {(console.log(response)); 
        for(var i=0;i<response['data'].length;i++){
        var d=new FileDocument(response['data'][i]['id_course'],response['data'][i]['name'],response['data'][i]['type'],response['data'][i]['subject'],response['data'][i]['link'],response['data'][i]['user_id'])
        this.fileDocuments.push(d);
      }
        }
     );

  }

  delete(fileDocument: FileDocument){
    console.log('test')
    this.documentsService.deleteCourse(fileDocument).subscribe(
      (response) =>{
        console.log(response)
        this.fileDocuments = this.fileDocuments.filter(item => item.id !== fileDocument.id);
      }
    )

  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

  loadLineChartOptions(data, color) {
    let chartOption: EChartOption;
    const xAxisData: Array<any> = new Array<any>();

    data.forEach(element => {
      xAxisData.push('');
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
