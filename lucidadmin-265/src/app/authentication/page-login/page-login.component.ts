import { Component, OnInit} from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { Socialusers } from '../socialusers'
import { SocialloginService } from '../sociallogin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm  } from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  loginForm: FormGroup;
  public email: String;
  public password: String;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthentificationService


  ) {

     // redirect to home if already logged in
     if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/admin/dashboard/index']);
     }
   }

   ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


  /*public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log(socialProvider, socialusers);
      console.log(socialusers);
      this.Savesresponse(socialusers);
    });
  }*/
  Savesresponse(socialusers: Socialusers) {
    // this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
    //   debugger;
    //   console.log(res);
    //   this.socialusers=res;
    //   this.response = res.userDetail;
    //   localStorage.setItem('socialusers', JSON.stringify( this.socialusers));
    //   console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
    //   this.router.navigate([`/admin/dashboard/index`]);
    // })
  }


  onSubmit(formulaire: NgForm) {
    this.submitted = true;
    console.log(this.email);
    console.log(this.password);


    // stop here if form is invalid
    /*if (this.loginForm.invalid) {
        return;
    }*/

    this.loading = true;
    
    this.authenticationService.login(this.email.toString(), this.password.toString())
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
    //this.router.navigate(['/admin/dashboard/index']);
  }
}
