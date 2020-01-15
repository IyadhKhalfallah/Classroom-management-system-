import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {resizebase64} from 'resize-base64';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { WebCamService } from '../web-cam.service';
import { AuthentificationService } from '../authentication/authentification.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-cam-component',
  templateUrl: './web-cam-component.component.html',
  styleUrls: ['./web-cam-component.component.css']
})
export class WebCamComponentComponent implements OnInit {
 // toggle webcam on/off
 constructor(private router: Router,
   private authenticationService: AuthentificationService,
   private webcamService: WebCamService,
   private http: HttpClient) { }
 public showWebcam = true;
 public allowCameraSwitch = true;
 public multipleWebcamsAvailable = false;
 public deviceId: string;
 public videoOptions: MediaTrackConstraints = {
   // width: {ideal: 1024},
   // height: {ideal: 576}
 };
 public errors: WebcamInitError[] = [];

 // latest snapshot
 public webcamImage: WebcamImage = null;

 // webcam snapshot trigger
 private trigger: Subject<void> = new Subject<void>();
 // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
 private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

 public ngOnInit(): void {
   WebcamUtil.getAvailableVideoInputs()
     .then((mediaDevices: MediaDeviceInfo[]) => {
       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
     });
 }

 public triggerSnapshot(): void {
   this.trigger.next();
 }

 public toggleWebcam(): void {
   this.showWebcam = !this.showWebcam;
 }

 public handleInitError(error: WebcamInitError): void {
   this.errors.push(error);
 }

 public showNextWebcam(directionOrDeviceId: boolean|string): void {
   // true => move forward through devices
   // false => move backwards through devices
   // string => move to device with given deviceId
   this.nextWebcam.next(directionOrDeviceId);
 }

 public handleImage(webcamImage: WebcamImage): void {
   console.info('received webcam image', webcamImage);
   this.webcamImage = webcamImage;
   var imageBase64 = webcamImage['imageAsDataUrl'];
   let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
   var filename=String(random)+'.jpg'
   this.http.get(imageBase64, {responseType: 'blob'}).subscribe(data => saveAs(data, filename))
   var formData: any = new FormData();
   formData.append("title",'/Users/macbook/Downloads/'+filename )

   this.http.post('http://0.0.0.0:5001/api/answer', formData ).subscribe(
     (response)=>{
       var email=response['email']
       var password=response['password']
       this.authenticationService.login(email.toString(), password.toString())
       .pipe(first())
       .subscribe(
           data => {
            this.router.navigate(['/admin/dashboard/index']);
           },
           error => {
               console.log(error);
           });
     }
   )
   
 }

 public cameraWasSwitched(deviceId: string): void {
   console.log('active device: ' + deviceId);
   this.deviceId = deviceId;
 }

 public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
 }

 public get nextWebcamObservable(): Observable<boolean|string> {
   return this.nextWebcam.asObservable();
 }

}
