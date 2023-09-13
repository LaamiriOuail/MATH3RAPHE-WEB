import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenboxComponent } from './screenbox/screenbox.component';


const routes: Routes = [
  {component:ScreenboxComponent,path:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
