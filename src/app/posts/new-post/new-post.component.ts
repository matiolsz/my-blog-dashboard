import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

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

  postForm!: FormGroup;

  post: any;
  postid: any;

  formStatus: string = 'Add New';

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {
      if (val['id']) {
        this.postsService.loadPost(val['id']).subscribe((post) => {
          this.post = post;
          this.postid = val['id'];

          this.postForm = this.fb.group({
            title: [this.post.title],
            permalink: [this.post.permalink],
            excerpt: [this.post.excerpt],
            category: [this.post.category],
            postImg: [''],
            content: [this.post.content],
          });
        });
        this.formStatus = 'Edit';
      } else {
        this.postForm = this.fb.group({
          title: [''],
          permalink: [''],
          excerpt: [''],
          category: [''],
          postImg: [''],
          content: [''],
        });
      }
    });
  }

  ngOnInit() {
    this.categoriesService.loadCategories().subscribe((val) => {
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

  onSubmit() {
    console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);

    const post: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: this.postForm.value.category,
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    if (this.formStatus === 'Add New') {
      this.postsService.savePost(post);
    } else {
      this.postsService.updatePost(this.postid, post);
    }
    this.postForm.reset();
    this.imgSrc = './assets/imgPlaceholder.jpg';
  }
}
