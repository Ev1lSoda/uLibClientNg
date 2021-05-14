import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  public findSmtVar: string;
  public tableData: any[];
  public curDB = 'Student';
  public data = {
    Student: [],
    Professor: [],
    Worker: [],
    Book: [],
    BookAuthor: [],
    BookPublisher: [],
    StudentCard: [],
    ProfessorCard: [],
  };
  public indexOfCurLine = -1;
  public form: any;
  public dataStructureForT: any;
  public dataStructureForI: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.post('url', {data})
    this.getAll();
    this.dataStructureForT = Object.keys(this.data.Student[0]);
    this.dataStructureForI = Object.keys(this.data.Student[0]);
    this.watchDataStructure();
    this.tableData = [...this.data[this.curDB]];
  }

  onFindSmt(): void {
    this.tableData = [...this.data[this.curDB]];
    for (let i = 0; i < this.tableData.length; i++) {
      let flag = true;
      for (let tableRow in this.tableData[i]) {
        let forTest = `${this.tableData[i][tableRow]}`;
        if (forTest.includes(this.findSmtVar)) {
          flag = false;
        }
      }
      let cde: any;
      if (flag) {
        cde = this.tableData.splice(i, 1);
      }
    }
  }

  getData(indexOfTableLine: number) {
    this.form = { ...this.data[this.curDB][indexOfTableLine] };
    this.indexOfCurLine = indexOfTableLine;
  }

  choseOne(current: string): void {
    this.formClear();
    this.curDB = current;
    this.dataStructureForT = Object.keys(this.data[current][0]);
    this.dataStructureForI = Object.keys(this.data[current][0]);
    console.log('this.dataStructureForI: ', this.dataStructureForI);
    this.watchDataStructure();
    this.tableData = this.data[this.curDB];
  }

  watchDataStructure(): void {
    for (let i = 0; i < this.dataStructureForT.length; i++) {
      if (this.dataStructureForT[i] === 'id') {
        this.dataStructureForT.splice(i--, 1);
      }
    }
    for (let i = 0; i < this.dataStructureForI.length; i++) {
      if (
        this.dataStructureForI[i] === 'id' ||
        this.dataStructureForI[i] === 'auth_name' ||
        this.dataStructureForI[i] === 'pub_name' ||
        this.dataStructureForI[i] === 'title' ||
        this.dataStructureForI[i] === 'borrowed' ||
        this.dataStructureForI[i] === 'name'
      ) {
        this.dataStructureForI.splice(i--, 1);
      }
    }
    console.log('this.dataStructureForI: ', this.dataStructureForI);
  }

  chkBtnDisabled(): Boolean {
    return this.indexOfCurLine != -1 ? false : true;
  }
  formClear(): void {
    this.form = {};
    this.indexOfCurLine = -1;
  }

  onUpdate() {
    this.http
      .post(`http://localhost:4488/api/upd${this.curDB}`, {
        id: this.data[this.curDB][this.indexOfCurLine].id,
        ...this.form,
      })
      .subscribe((data) => {
        console.log('create answer: ', data);
        this.getAll();
        this.tableData = [...this.data[this.curDB]];
      });
  }
  onDelete() {
    this.http
      .post(`http://localhost:4488/api/del${this.curDB}`, {
        id: this.data[this.curDB][this.indexOfCurLine].id,
      })
      .subscribe((data) => {
        console.log('create answer: ', data);
        this.getAll();
        this.tableData = [...this.data[this.curDB]];
      });
    this.formClear();
  }
  onCreate() {
    this.http
      .post(`http://localhost:4488/api/add${this.curDB}`, this.form)
      .subscribe((data) => {
        console.log('create answer: ', data);
        this.getAll();
      });
    this.formClear();
  }

  getAll(): void {
    this.getStudents();
    this.getProfessors();
    this.getWorkers();
    this.getBooks();
    this.getBookAuthors();
    this.getBookPublishers();
    this.getStudentCards();
    this.getProfessorCards();
    setTimeout(() => {
      this.tableData = [...this.data[this.curDB]];
      this.findSmtVar = null;
    }, 333);
  }

  getStudents(): void {
    this.http
      .get<any>('http://localhost:4488/api/students')
      .subscribe((data) => {
        this.data.Student = data.list;
      });
  }
  getProfessors(): void {
    this.http
      .get<any>('http://localhost:4488/api/professors')
      .subscribe((data) => {
        this.data.Professor = data.list;
      });
  }
  getWorkers(): void {
    this.http
      .get<any>('http://localhost:4488/api/workers')
      .subscribe((data) => {
        this.data.Worker = data.list;
      });
  }
  getBooks(): void {
    this.http.get<any>('http://localhost:4488/api/books').subscribe((data) => {
      this.data.Book = data.list;
    });
  }
  getBookAuthors(): void {
    this.http
      .get<any>('http://localhost:4488/api/bookAuthors')
      .subscribe((data) => {
        this.data.BookAuthor = data.list;
      });
  }
  getBookPublishers(): void {
    this.http
      .get<any>('http://localhost:4488/api/bookPublishers')
      .subscribe((data) => {
        this.data.BookPublisher = data.list;
      });
  }
  getStudentCards(): void {
    this.http
      .get<any>('http://localhost:4488/api/studentCards')
      .subscribe((data) => {
        this.data.StudentCard = data.list;
      });
  }
  getProfessorCards(): void {
    this.http
      .get<any>('http://localhost:4488/api/professorCards')
      .subscribe((data) => {
        this.data.ProfessorCard = data.list;
      });
  }
}
