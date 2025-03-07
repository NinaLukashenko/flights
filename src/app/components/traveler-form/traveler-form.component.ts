import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { getCitizenships, getDays, getMonths, getYears } from './../../utils/arrays.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-traveler-form',
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    NgFor,
  ],
  templateUrl: './traveler-form.component.html',
  styleUrl: './traveler-form.component.scss',
})
export class TravelerFormComponent implements OnInit {
  fb = new FormBuilder();

  months = getMonths();
  days = getDays();
  years = getYears();
  citizenships = getCitizenships();

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    monthOfBirth: ['', Validators.required],
    dayOfBirth: ['', Validators.required],
    yearOfBirth: ['', Validators.required],
    citizenship: ['', Validators.required],
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getSavedData();
  }

  onFormSubmit() {
    console.log(this.form.value);
  }

  onBackClicked() {
    localStorage.setItem('traveler-form', JSON.stringify(this.form.value));

    this.router.navigateByUrl('/flights');
  }

  private getSavedData() {
    const storedData = localStorage.getItem('traveler-form');

    if (storedData) {
      const savedData = JSON.parse(localStorage.getItem('traveler-form') || '');

      if (savedData) {
        this.form.setValue({
          firstName: savedData.firstName,
          lastName: savedData.lastName,
          gender: savedData.gender,
          monthOfBirth: savedData.monthOfBirth,
          dayOfBirth: savedData.dayOfBirth,
          yearOfBirth: savedData.yearOfBirth,
          citizenship: savedData.citizenship,
        })
      }
    }
  }
}
