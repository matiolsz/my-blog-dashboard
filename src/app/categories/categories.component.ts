import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {

  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }
    this.categoriesService.saveData(categoryData);
  }
}