import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any> | undefined;
  formCategory: string | undefined;
  formStatus: string = 'Add';
  categoryId: any;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {

    this.categoriesService.loadCategories().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
      action: "testing"
    }
    if (this.formStatus == 'Add') {
      this.categoriesService.saveCategory(categoryData);
      formData.reset();
    }
    else if(this.formStatus == 'Edit') {
      this.categoriesService.updateCategory(this.categoryId, categoryData)
      formData.reset();
    this.formStatus = 'Add';

    }

  }

  onEdit(category: any, id: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id:any){
    this.categoriesService.deleteCategory(id);
  }
}
