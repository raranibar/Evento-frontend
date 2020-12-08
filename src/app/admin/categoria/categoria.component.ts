import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria/categoria.model';

@Component({
	selector: 'app-categoria',
	templateUrl: './categoria.component.html',
	styles: [
	]
})
export class CategoriaComponent implements OnInit {

	category: Categoria[] = [];

	constructor(private categoryService: CategoriaService) { }

	ngOnInit(): void {
		this.getCategory();
	}

	getCategory() {
		this.categoryService.getCategory()
			.subscribe(category => {
				this.category = category;
			});
	}

}
