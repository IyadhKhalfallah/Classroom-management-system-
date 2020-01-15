import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { WebCamComponentComponent } from './web-cam-component/web-cam-component.component';

export const routes: Routes = [
    { path: '', redirectTo:'admin', pathMatch: 'full'},
    { path: 'webcam', component: WebCamComponentComponent},
    { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule) },
    { path: 'authentication', loadChildren: () => import('app/authentication/authentication.module').then(m => m.AuthenticationModule) }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });