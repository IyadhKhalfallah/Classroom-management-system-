import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxGalleryModule } from 'ngx-gallery';

import * as $ from 'jquery';
import {DocumentsService} from './services/documents.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GradesService} from "./services/grades.service";
import { WebCamComponentComponent } from './web-cam-component/web-cam-component.component';
import {WebcamModule} from 'ngx-webcam';


@NgModule({
    declarations: [
        AppComponent,
        WebCamComponentComponent
    ],
    imports: [
        BrowserModule,
        routing,
        NgbModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RichTextEditorAllModule,
        FullCalendarModule,
        NgMultiSelectDropDownModule.forRoot(),
        LeafletModule.forRoot(),
        NgxGalleryModule,
        HttpClientModule,
        FormsModule,
        WebcamModule,
        ReactiveFormsModule

    ],
    providers: [DocumentsService, GradesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
