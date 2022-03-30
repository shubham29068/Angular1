import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantData } from './restaurant.model';
import { ApiService } from '../shared/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  submitted: boolean = false;
  formValue!: FormGroup
  restaurantModelObj: RestaurantData = new RestaurantData
  allRestaurantData: any
  showAdd!: boolean
  showbtn!: boolean
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private api: ApiService) { }
  // constructor() { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      service: new FormControl(null, [Validators.required]),
    })
    this.getAllData()
  }
  clickAddRestro() {
    this.formValue.reset();
    this.showAdd = true
    this.showbtn = false
  }
  // subscribe the data 
  addRestaurant() {
    this.restaurantModelObj.name = this.formValue.value.name,
      this.restaurantModelObj.email = this.formValue.value.email,
      this.restaurantModelObj.mobile = this.formValue.value.mobile,
      this.restaurantModelObj.address = this.formValue.value.address,
      this.restaurantModelObj.service = this.formValue.value.service

    this.submitted = true;
    this.api.postRestaurant(this.restaurantModelObj).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Addition Data has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.formValue.reset()
      this.getAllData()
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    )
  }
  title = 'appBootstrap';

  closeResult: string = '';


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // get all data
  getAllData() {
    this.api.getRestaurant({}).subscribe(res => {
      this.allRestaurantData = res;
    })
  }
  // delete data
  deleteRestro(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      this.getAllData()
    })
  }
  onEditRestro(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurantModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);


  }
  updateRestro() {
    this.restaurantModelObj.name = this.formValue.value.name,
      this.restaurantModelObj.email = this.formValue.value.email,
      this.restaurantModelObj.mobile = this.formValue.value.mobile,
      this.restaurantModelObj.address = this.formValue.value.address,
      this.restaurantModelObj.service = this.formValue.value.service


    this.api.updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your updates has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    })

  }
  form() {

    this.formValue = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: ['', [Validators.required, Validators.required]],
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, [Validators.required]),
      service: new FormControl(null, [Validators.required])
    })
  }
}
