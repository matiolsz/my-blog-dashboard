import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastrService: ToastrService) { }

  saveData(categoryData: any) {

    this.afs.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef);
      this.toastrService.success('Category added successfully')
    })
      .catch(err => { console.log(err) });
  }

  loadData(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data}
          
        })
      })
    )
  }

  updateData(id: any, updatedData: any){
    this.afs.collection('categories').doc(id).update(updatedData).then(docRef => {
      this.toastrService.success('Data updated successfully');
    })
  }

  deleteData(id:any){
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      this.toastrService.info('Data removed');
    })
  }
}
