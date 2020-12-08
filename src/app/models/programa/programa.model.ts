


export class Programa {

	constructor(
		public id: number,
		public fecha: string,
		public hora: string,
		public urlZoom: number,
		public idReunionZoom: string,
		public codigoAccesoZoom?: string,
		public nombreSala?: string,
		public idEjeTematico?: number,
		public nombreEjeTematico?: string,

	) { }

}