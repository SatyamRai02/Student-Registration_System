import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student-dashboard.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  repeatPass: String= 'none';
  formValue !: FormGroup;
  registerForm: any;

  studentModelobj: StudentModel = new StudentModel();
  studentData !: any;
  constructor( private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      gender: [''],
      pwd: ['']
    })
    this.registerForm = new FormGroup({
      firstname: new FormControl('',
        [Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*')]),
      lastname: new FormControl("",
        [Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*')]),
      email: new FormControl('', [Validators.required,
      Validators.email,
      ]),
      mobile: new FormControl('', [Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(10),
      Validators.maxLength(10),
      ]),
      gender: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      ]),
      rpwd: new FormControl('')
  
    });
    this.getAllStudent();
  }




  postStudentDetails() {
    if(this.registerForm.valid) {
      this.studentModelobj.firstname = this.formValue.value.firstname;
      this.studentModelobj.lastname = this.formValue.value.lastname;
      this.studentModelobj.email = this.formValue.value.email;
      this.studentModelobj.mobile = this.formValue.value.mobile;
      this.studentModelobj.gender = this.formValue.value.gender;
      this.studentModelobj.pwd = this.formValue.value.pwd;
  
      this.api.postStudent(this.studentModelobj)
      .subscribe(res=>{
        console.log(res);
  
        alert("Student Added Successfully");
        this.formValue.reset();
        this.getAllStudent();
      },
      err=>{
        alert("Something Went Wrong")
      })
    } else {
      alert("Invalid Details");
    }


  }

  getAllStudent(){
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData = res;
    })
  }

  deleteStudent(row : any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Student Deleted");
      this.getAllStudent();
    })

  }









  
  


  registerSubmited() {

    if(this.PWD.value== this.RPWD.value){
      console.log(this.registerForm.valid);
      this.repeatPass='none';
      console.log(this.registerForm.value);
      
    }else{
      this.repeatPass = 'inline';
    }
    
  }





  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get RPWD(): FormControl {
    return this.registerForm.get('rpwd') as FormControl;
  }

}
