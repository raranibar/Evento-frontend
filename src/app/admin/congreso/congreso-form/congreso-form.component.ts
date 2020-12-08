import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-congreso-form',
	templateUrl: './congreso-form.component.html',
	styles: [
	]
})
export class CongresoFormComponent implements OnInit {

	public congressForm: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {

		this.congressForm = this.fb.group({
			nombre: ['', Validators.required],
			email: ['', Validators.required],
			direccion: ['', Validators.required],
			responsable: ['', Validators.required],
			informacion: ['', Validators.required],
		});
	}

	files: File[] = [];
	items: any = [1, 2, 3];

	onSelect(event) {
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}
	addProvider() {
		this.items.push(9);
	}


	saveCongress() {

	}
}
