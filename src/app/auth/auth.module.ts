import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })

  ]
})
export class AuthModule { }
