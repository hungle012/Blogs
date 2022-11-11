import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogFormComponent } from './blog-form/blog-form.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "blogs",
    pathMatch: "full"
  },
  {
    path: "blogs",
    component: HomeComponent
  },
  {
    path: "create-blog",
    component: BlogFormComponent
  },
  {
    path: "edit/:id",
    component: BlogFormComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
