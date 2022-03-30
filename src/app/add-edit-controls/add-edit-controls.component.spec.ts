import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditControlsComponent } from './add-edit-controls.component';

describe('AddEditControlsComponent', () => {
  let component: AddEditControlsComponent;
  let fixture: ComponentFixture<AddEditControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
