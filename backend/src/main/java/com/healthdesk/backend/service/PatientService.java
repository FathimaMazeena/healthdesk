package com.healthdesk.backend.service;

import com.healthdesk.backend.dto.PatientRequest;
import com.healthdesk.backend.entity.Patient;
import com.healthdesk.backend.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }


    public Patient createPatient(PatientRequest request) {

    Patient patient = new Patient();

    patient.setName(request.name());
    patient.setDateOfBirth(request.dateOfBirth());
    patient.setPhone(request.phone());
    patient.setEmail(request.email());

    return patientRepository.save(patient);
}

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}