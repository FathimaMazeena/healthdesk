import { Component, OnInit, signal } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patients',
  imports: [],
  templateUrl: './patients.html',
  styleUrl: './patients.css'
})
export class Patients implements OnInit {

  patients = signal<Patient[]>([]);

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    console.log('Patients component initialized');
    this.loadPatients();
  }

  loadPatients(): void {
    console.log('Loading patients...');

    this.patientService.getPatients().subscribe({
      next: (data) => {
        console.log('Patients received:', data);

        this.patients.set(data);

        console.log('Patients after assignment:', this.patients());
      },

      error: (error) => {
        console.error('Error loading patients:', error);
      }
    });
  }
}