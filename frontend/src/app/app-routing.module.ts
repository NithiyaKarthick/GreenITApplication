import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import {OrderResolver} from "./resolvers/order.resolver";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {data:OrderResolver}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
