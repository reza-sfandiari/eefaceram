import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './main/error/not-found/not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './main/layout/layout.component';
import { UserComponent } from './main/components/user/user.component';

export const routes: Routes = [

    // , canActivate: [authGuard]
    { path: '', component:  LayoutComponent , canActivate: [authGuard]},
    { path: 'users', component:  UserComponent , canActivate: [authGuard]},

    { path: 'home', component:  LayoutComponent , canActivate: [authGuard]},
   
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module')
          .then(mod => mod.AuthModule)
      },
      {path: '**', component: NotFoundComponent},
      
];
