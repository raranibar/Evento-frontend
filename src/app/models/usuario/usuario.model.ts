import { Persona } from './persona.model';



export class Usuario {

	constructor(
		public id: number,
		public email: string,
		public idCongreso?: number,
		public idRol?: number,
		public persona?: Persona,
		public clave?: string,
		

	) { }
}

