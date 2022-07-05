import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sourceBooks: any[] = [
    {
      id: 1,
      name: "Design Patterns",
      description: "Book Description",
      image: "design-patterns.jpg",
      category: "Programming",
      price: 99
    },
    {
      id: 2,
      name: "Eloquent Javascript",
      description: "Book Description",
      image: "eloquent-javascript.jpg",
      category: "Programming",
      price: 150
    },
    {
      id: 3,
      name: "Javascript Ninja",
      description: "Book Description",
      image: "javascript-ninja.jpg",
      category: "Programming",
      price: 250
    },
    {
      id: 4,
      name: "Javascript Programming",
      description: "Book Description",
      image: "javascript-programming.jpg",
      category: "Programming",
      price: 50
    },
    {
      id: 5,
      name: "Javascript-The definitive guide",
      description: "Book Description",
      image: "javascript-the-definitive-guide.jpg",
      category: "Programming",
      price: 89
    },
    {
      id: 6,
      name: "Javascript-The good parts",
      description: "Book Description",
      image: "javascript-the-good-parts.jpg",
      category: "Programming",
      price: 70
    },
    {
      id: 7,
      name: "ng-book",
      description: "Book Description",
      image: "ng-book.jpg",
      category: "Programming",
      price: 35
    },
    {
      id: 8,
      name: "ngrx",
      description: "Book Description",
      image: "ngrx.jpg",
      category: "Programming",
      price: 45
    },
    {
      id: 9,
      name: "Object oriented Javascript",
      description: "Book Description",
      image: "object-oriented-javascript.jpg",
      category: "Programming",
      price: 99
    },
    {
      id: 10,
      name: "Rxjs for Angular",
      description: "Book Description",
      image: "rxjs-for-angular.jpg",
      category: "Programming",
      price: 99
    }
  ];

  targetBooks: any[] = [];

  sourceBooksOriginal = [...this.sourceBooks];

  constructor() {
  }

  ngOnInit() {
  }

  onMoveToTarget(event: any) {
    console.log(event);
  }

  onMoveToSource(event: any) {
    console.log(event);
  }

  onReset() {
    this.sourceBooks = [...this.sourceBooksOriginal];
    this.targetBooks = [];
  }
}
