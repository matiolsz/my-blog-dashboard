import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService, private router: Router) { }

  savePost(postData:any){
    this.afs.collection('posts').add(postData).then(docRef => {
      console.log(docRef);
      this.toastr.success('post added successfully');
    })

    this.router.navigate(['/posts']);

  }

  loadPosts(){
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data}
          
        })
      })
    )
  }

  loadPost(id: any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updatePost(id: any, post: any){
    this.afs.doc(`posts/${id}`).update(post).then(() => {
      this.toastr.success('Data updated successfully');
      this.router.navigate(['/posts'])
    })
  }

  deletePost(id: any){
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Post deleted.');
    })
  }

}
