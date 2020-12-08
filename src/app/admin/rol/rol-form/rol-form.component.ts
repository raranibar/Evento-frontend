import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styles: [
  ]
})
export class RolFormComponent implements OnInit {

	public categoryForm: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {

		this.categoryForm = this.fb.group({
			nombre: ['', Validators.required],
			descripcion: ['', Validators.required],
		});
	}

	saveRole(){}

}
