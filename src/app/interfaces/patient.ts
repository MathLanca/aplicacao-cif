import { Person } from './person';
import { Address } from './address';

export interface Patient {
    therapist: Person;
    note: string;
}
