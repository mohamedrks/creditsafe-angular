import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CountryService } from '../services/country/country.service';
import { CapitalDetails } from '../models/capital-details';
import { City } from '../models/city';


@Component({
  selector: 'app-country-weather',
  templateUrl: './country-weather.component.html',
  styleUrls: ['./country-weather.component.scss'],
})
export class CountryWeatherComponent implements OnInit {
  ELEMENT_DATA: City[] = [];

  capitalData?: CapitalDetails;
  dataSource: MatTableDataSource<City>;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  displayedColumns: string[] = [
    'id',
    'name',
    'state',
    'country',
    'touristRating',
    'dateEstablished',
    'estimatedPopulation',
    'weather',
    'currency',
  ];

  constructor(private countryService: CountryService) {
    const dataToDisplay = [...this.ELEMENT_DATA];
    this.dataSource = new MatTableDataSource(dataToDisplay);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.countryService.getAll().subscribe((cityWeatherDetails: City[]) => {
      this.dataSource.data = cityWeatherDetails;
      this.dataSource.paginator = this.paginator;
    });
  }

}
