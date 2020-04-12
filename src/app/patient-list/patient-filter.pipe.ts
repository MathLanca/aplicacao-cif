import { PipeTransform, Pipe } from '@angular/core';
import { Person } from '../interfaces/person';
import { Patient } from '../interfaces/patient';

@Pipe({
    name: 'patientFilter'
})
export class PatientFilterPipe implements PipeTransform {
    transform(patients: Person[], searchTerm: string): Person[]{
        if (!patients || !searchTerm){
            return patients;
        }

        return patients.filter(patient => 
            patient.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        
    }
}