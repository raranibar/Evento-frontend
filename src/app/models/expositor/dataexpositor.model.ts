import { Expositor } from './expositor.model';
import { Persona } from '../usuario/persona.model';
import { FotoExp } from './fotoexp.model';



export class DataExpositor {
	constructor(
		public expositor: Expositor,
		public persona: Persona,
		public foto: FotoExp,
	) { }
}