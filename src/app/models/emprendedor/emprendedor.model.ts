import { Comentario } from './comentario.models';
import { Foto } from './foto.model';
import { Categoria } from '../categoria/categoria.model';



export class Emprendedor {

	constructor(
		public idCategoria: number,
		public idPersona: number,
		public nombreEmprendimiento: string,
		public descripcion: string,
		public latitud: string,
		public longitud: string,
		public ubicacion: string,
		public comentario?: Comentario[],
		public id?: number,
		public image?: Foto[],
		public raiting?: number,
		public estado?: boolean
	) { }

}

