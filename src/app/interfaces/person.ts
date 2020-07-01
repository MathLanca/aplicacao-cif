import { Address } from './address';
import { Patient } from './patient';
import { ProfessionalData } from './professionalData';

export interface Person {
    id: string;
    cpf: string;
    login: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
    sex: string;
    telephoneNumber: string;
    address: Address;
    patient: Patient;
    active: Boolean;
    professionalData: ProfessionalData;
}
