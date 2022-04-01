import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeMailComponent } from './Components/compose-mail/compose-mail.component';

const routes: Routes = [
  {
    path:'**', component:ComposeMailComponent
  },
  {
    path:'mail', component:ComposeMailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
