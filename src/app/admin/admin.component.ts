import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CountryService } from '../services/country/country.service';
import { City } from '../models/city';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'state',
    'country',
    'touristRating',
    'dateEstablished',
    'estimatedPopulation',
    'weather',
    'currency',
    'id',
  ];
  ELEMENT_DATA: City[] = [];

  dataSource: MatTableDataSource<City>;
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  animal: string | undefined;
  name: string | undefined;
  newElement: City | undefined;

  constructor(
    public dialog: MatDialog,
    private countryService: CountryService
  ) {
    const dataToDisplay = [...this.ELEMENT_DATA];
    this.dataSource = new MatTableDataSource(dataToDisplay);
  }

  openDialog(element: City): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '650px',
      data: {
        id: element.id,
        name: element.name,
        country: element.country,
        state: element.state,
        touristRating: element.touristRating,
        dateEstablished: element.dateEstablished,
        estimatedPopulation: element.estimatedPopulation,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const updatedCity: City = {
        id: result.id,
        name: result.name,
        state: result.state,
        country: result.country,
        touristRating: Number(result.touristRating),
        dateEstablished: Number(result.dateEstablished),
        estimatedPopulation: Number(result.estimatedPopulation),
      };
      this.updateCity(updatedCity);
    });
  }

  openAddCityDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCity, {
      width: '650px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      const newCreatedCity: City = {
        id: 0,
        name: result.name,
        state: result.state,
        country: result.country,
        touristRating: Number(result.touristRating),
        dateEstablished: Number(result.dateEstablished),
        estimatedPopulation: Number(result.estimatedPopulation),
      };
      this.addNewCity(newCreatedCity);
    });
  }

  ngOnInit(): void {
    this.countryService.getAll().subscribe((cityInformation: City[]) => {
      this.dataSource.data = cityInformation;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNewCity(city: City): void {
    this.countryService.addCity(city).subscribe(
      (data) => {
        this.countryService.getCityInfo(data.id).subscribe(
          (datainfo) => {
            this.dataSource.data.push(datainfo);
            this.dataSource.data = this.dataSource.data;
          },
          (errinfo) => {
            console.log(errinfo);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCity(city: City): void {
    this.countryService.update(city.id, city).subscribe(
      (data) => {
        this.countryService.getCityInfo(data.id).subscribe(
          (datainfo) => {
            const indexOfObject = this.dataSource.data.findIndex((object) => {
              return object.id === datainfo.id;
            });
            if (indexOfObject !== -1) {
              this.dataSource.data.splice(indexOfObject, 1);
            }

            this.dataSource.data.push(datainfo);
            this.dataSource.data = this.dataSource.data;
          },
          (errinfo) => {
            console.log(errinfo);
          }
        );

        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeData(id: number) {
    this.countryService.delete(id).subscribe(
      (data) => {
        const indexOfObject = this.dataSource.data.findIndex((object) => {
          return object.id === id;
        });
        if (indexOfObject !== -1) {
          this.dataSource.data.splice(indexOfObject, 1);
        }
        this.dataSource.data = this.dataSource.data;

        console.log(id + 'got deleted ');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ['./admin.component.scss'],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: City
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-add-city',
  templateUrl: './dialog-add-city.html',
  styleUrls: ['./admin.component.scss'],
})
export class DialogAddCity {
  constructor(
    public dialogRef: MatDialogRef<DialogAddCity>,
    @Inject(MAT_DIALOG_DATA) public data: City
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
