import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-login/page-login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { routing } from './authentication.routing';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageLockscreenComponent } from './page-lockscreen/page-lockscreen.component';
import { PageForgotPasswordComponent } from './page-forgot-password/page-forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddonErrorComponent } from './page-forbiddon-error/page-forbiddon-error.component';
import { PageIsErrorComponent } from './page-is-error/page-is-error.component';
import { PageTryLaterComponent } from './page-try-later/page-try-later.component';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';




import { BrowserModule } from '@angular/platform-browser';  
import { HttpClientModule } from '@angular/common/http';  
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';  

export function socialConfigs() {  
	const config = new AuthServiceConfig(  
	  [  
		{  
		  id: FacebookLoginProvider.PROVIDER_ID,  
		  provider: new FacebookLoginProvider('app -id')  
		},  
		{  
		  id: GoogleLoginProvider.PROVIDER_ID,  
		  provider: new GoogleLoginProvider('app-114310346604-efqgihp5jootfhhcigsg01gki31pkcga.apps.googleusercontent.com')  
		}  
	  ]  
	);  
	return config;  
  }  
@NgModule({
	declarations: [PageLoginComponent, AuthenticationComponent, PageRegisterComponent, PageLockscreenComponent, PageForgotPasswordComponent, PageNotFoundComponent, PageForbiddonErrorComponent, PageIsErrorComponent, PageTryLaterComponent],
	imports: [
		CommonModule,
		routing,
		PagesModule,
        RouterModule,
		FormsModule,
		HttpClientModule,

	],

	providers: [  
		AuthService,  
		{  
		  provide: AuthServiceConfig,  
		  useFactory: socialConfigs  
		}  
	  ],  

})
export class AuthenticationModule { }
