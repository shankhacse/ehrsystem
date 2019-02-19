import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule, MatSidenavModule, MatListModule ,MatMenuModule , MatNativeDateModule ,MatSortModule , MatPaginatorModule, MatButtonToggleModule, DateAdapter, MatChipsModule, MatProgressBarModule, MatTooltipModule, MatSnackBarModule   } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatBadgeModule } from '@angular/material/badge';
import { DateFormat } from '../date-format';








@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule
    
    
  ],
  declarations: [],
  
  exports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatTableModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    { 
      provide: DateAdapter,
      useClass: DateFormat 
    }
    
]
 
  
})
export class AppMaterialModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
    //dateAdapter.setLocale('en-us'); // MM/DD/YYYY
    //dateAdapter.setLocale('nl'); // DD-MM-YYYY
  }
 }
