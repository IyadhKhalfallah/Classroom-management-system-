import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {

	// Properties

	@Input() showNotifMenu: boolean = false;
    @Input() showToggleMenu: boolean = false;
    @Input() darkClass:string = "";
	@Output() toggleSettingDropMenuEvent = new EventEmitter();
	@Output() toggleNotificationDropMenuEvent = new EventEmitter();

	constructor(private config: NgbDropdownConfig, private themeService: ThemeService, private router: Router) {
		config.placement = 'bottom-right';
	}

	ngOnInit() {
	}

	toggleSettingDropMenu() {
		this.toggleSettingDropMenuEvent.emit();
	}

	toggleNotificationDropMenu() {
		this.toggleNotificationDropMenuEvent.emit();
	}

	toggleSideMenu(){
		this.themeService.showHideMenu();
	}

	logout(){
		localStorage.removeItem('currentUser');
		this.router.navigate(['/authentication/page-login']);
	}

}
