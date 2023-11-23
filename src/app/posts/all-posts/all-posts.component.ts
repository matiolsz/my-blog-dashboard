import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {

  postArray: Array<any> | undefined;

  constructor(private postsService: PostsService){}

  ngOnInit(){
    this.postsService.loadPosts().subscribe(val => {
    this.postArray = val;
  })
  }

  delete(id: any){
    this.postsService.deletePost(id);
  }

  markAsFeatured(id:any, isFeatured: boolean){
    const isFeaturedUpdate = {
      isFeatured: isFeatured
    }
    this.postsService.markAsFeatured(id, isFeaturedUpdate);
  }
}
