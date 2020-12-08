import { Component, OnInit } from '@angular/core';
import { Congreso } from '../../models/congreso/congreso.model';
import { CongresoService } from '../../services/congreso.service';

@Component({
	selector: 'app-congreso',
	templateUrl: './congreso.component.html',
	styles: [
	]
})
export class CongresoComponent implements OnInit {

	constructor(private congressService: CongresoService) { }

	congress: Congreso[] = [];

	ngOnInit(): void {

		this.getCongress();
	}

	getCongress() {
		this.congressService.getCongress()
			.subscribe(congress => {
				this.congress = congress;
			});
	}


}
