import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	public getEvents(): Observable<any> {
		const dateObj = new Date();
		const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
		let data: any = [
		{
			title: 'Long Event',
			start: yearMonth + '-08',
			end: yearMonth + '-10',
			color: '#dc3545'
		},
		{
			title: 'Click for Google',
			url: 'http://google.com/',
			start: yearMonth + '-28',
			color: '#007bff'
		}];
		return of(data);
	}
}
