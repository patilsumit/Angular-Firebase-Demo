import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import {AngularFirestoreDocument} from 'angularfire2/firestore';

@Component({
  selector: 'app-myfirebase',
  templateUrl: './myfirebase.component.html',
  styleUrls: ['./myfirebase.component.css']
})
export class MyfirebaseComponent implements OnInit {

  itemsCollection: AngularFirestoreCollection<Item>;
  itemDocument: AngularFirestoreDocument<Item>;
  items: Observable<Item[]>;

  myCoursename="Default Value sumit";
  myCourseduration="Default value patil";
  courseName = [];
  cName;
  cDuration;
  count=0;
  myId:string;

  
  newCourse: Item ={coursename:"NewCourse",duration:"6 months"};
  updateCourse:Item={coursename:"Arduio UNO",duration:"4 months"};
  

  constructor(public db: AngularFirestore) {
    this.items=this.db.collection('courses').valueChanges();
    this.items.subscribe(items => {
        this.courseName.push(items[1]); 
    });

    console.log(this.courseName);
    this.itemsCollection=this.db.collection('courses');
   }
  
   fbAddCourses()
   {
     console.log("Addition Called");
     this.itemsCollection.add(this.newCourse);
   }

    fbDeleteCourses()
    {
      this.itemDocument=this.db.doc(`courses/9999`);
      this.itemDocument.delete();
    }

    fbUpdateCourse()
    {
      this.itemDocument=this.db.doc(`courses/9999`);
      this.itemDocument.update(this.updateCourse);
    } 

    firebaseAddCourse()
    {
    const documentId=this.db.createId();
    this.itemsCollection.doc(documentId).set({coursename:this.myCoursename,duration:this.myCourseduration});
    }
                      
    myCourseName(a)
    {
      if(this.count==0)
      {
        const documentId=this.db.createId();  
      this.itemsCollection.doc(documentId).set({coursename:this.cName,duration:this.cDuration,id : documentId});  
      }
      else
      {
        this.itemDocument=this.db.doc(`courses/${this.myId}`);
        this.itemDocument.update({
          coursename:this.cName,duration:this.cDuration
        });
        this.count=0;
          a.innerHTML="Add";
      }
      this.cName='';
      this.cDuration=''; 
     
    }
   
    myDeleteNew(deleteItem : Item)
    {
      this.itemDocument=this.db.doc(`courses/${deleteItem.id}`);
      this.itemDocument.delete();
    }

    myEditNew(updateItem,a)
    {
       this.cName=updateItem.coursename;
       this.cDuration=updateItem.duration;
       this.count=1;

       this.myId=updateItem.id;
       a.innerHTML="Update";
    }
  ngOnInit() {
  }

}

interface Item
{
  coursename?: string;
  duration?: string;
  id ?:string;
}