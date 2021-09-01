import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes  } from "@angular/router";
import { HomeComponent } from './components/home.components';
// import user

import { UserEditComponent } from "./components/user-edit.components";
// import artista
import { ArtistListComponent } from "./components/artist-list.components";
import { ArtistAddComponent } from './components/artitst-add.components';
const appRoutes:Routes =[
    {path:'', component: HomeComponent},
    {path:'artistas/:page', component: ArtistListComponent},
    {path:'crear-artista', component: ArtistAddComponent},
    {path:'mis-datos', component: UserEditComponent},
    {path:'**', component: HomeComponent,}
]; 

export const appRoutingProviders: any[]=[]; 
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

