import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  permalink: string = '';
  imgSrc: string | null | undefined | ArrayBuffer =
    './assets/imgPlaceholder.jpg';
  selectedImg: any;

  categories: Array<any> | undefined;

  postForm: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
    this.categoriesService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChange(event: Event) {
    const title = (event.target as HTMLInputElement).value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview(event: any) {
    const reader = new FileReader();

    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }
}
