import { Emprendedor } from './emprendedor.model';
import { Social } from './social.model';
import { Persona } from '../usuario/persona.model';


export class MainEmprendedor {

	public emprendedor: Emprendedor;
	public persona: Persona;
	public social: Social[];
	public email?: string;

}