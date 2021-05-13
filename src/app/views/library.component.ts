import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  public curDB = 'students';
  public data = {
    students: [],
    professors: [],
    workers: [],
    books: [],
    bookAuthors: [],
    bookPublishers: [],
    studentCards: [],
    professorCards: [],
  };
  public dataStructure: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.post('url', {data})
    this.getStudents();
    this.getProfessors();
    this.getWorkers();
    this.getBooks();
    this.getBookAuthors();
    this.getBookPublishers();
    this.getStudentCards();
    this.getProfessorCards();
    this.dataStructure = Object.keys(this.data.students[0]);
    this.watchDataStructure();
  }

  getData(indexOf) {}

  choseOne(current: string): void {
    this.curDB = current;
    this.dataStructure = Object.keys(this.data[this.curDB][0]);
    this.watchDataStructure();
  }

  watchDataStructure(): void {
    for (let i = 0; i < this.dataStructure.length; i++) {
      if (
        this.dataStructure[i] === 'id' ||
        this.dataStructure[i] === 'lc_ts_borrowed'
      ) {
        this.dataStructure.splice(i, 1);
      }
    }
  }

  getStudents(): void {
    this.http
      .get<any>('http://localhost:4488/api/students')
      .subscribe((data) => {
        this.data.students = data.list;
      });
  }
  getProfessors(): void {
    this.http
      .get<any>('http://localhost:4488/api/professors')
      .subscribe((data) => {
        this.data.professors = data.list;
      });
  }
  getWorkers(): void {
    this.http
      .get<any>('http://localhost:4488/api/workers')
      .subscribe((data) => {
        this.data.workers = data.list;
      });
  }
  getBooks(): void {
    this.http.get<any>('http://localhost:4488/api/books').subscribe((data) => {
      this.data.books = data.list;
    });
  }
  getBookAuthors(): void {
    this.http
      .get<any>('http://localhost:4488/api/bookAuthors')
      .subscribe((data) => {
        this.data.bookAuthors = data.list;
      });
  }
  getBookPublishers(): void {
    this.http
      .get<any>('http://localhost:4488/api/bookPublishers')
      .subscribe((data) => {
        this.data.bookPublishers = data.list;
      });
  }
  getStudentCards(): void {
    this.http
      .get<any>('http://localhost:4488/api/studentCards')
      .subscribe((data) => {
        this.data.studentCards = data.list;
      });
  }
  getProfessorCards(): void {
    this.http
      .get<any>('http://localhost:4488/api/professorCards')
      .subscribe((data) => {
        this.data.professorCards = data.list;
      });
  }
}
