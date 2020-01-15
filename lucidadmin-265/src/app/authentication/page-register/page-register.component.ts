import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {
    loginForm: FormGroup;
    public email: String;
    public password: String;
    public first: String;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthentificationService) { }

    ngOnInit() {
    }
    

    onSubmit(formulaire: NgForm) {
        console.log(this.email);
        console.log(this.password);
        console.log(this.first);
        this.authenticationService.register(this.email.toString(), this.password.toString(), this.first.toString())
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });

        this.router.navigate(['/authentication/page-login']);
    }

}
