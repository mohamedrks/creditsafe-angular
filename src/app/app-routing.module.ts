import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryWeatherComponent } from './country-weather/country-weather.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: CountryWeatherComponent },
  { path: 'weather', component: CountryWeatherComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
