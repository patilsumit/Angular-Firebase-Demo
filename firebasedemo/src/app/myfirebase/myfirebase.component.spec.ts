import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfirebaseComponent } from './myfirebase.component';

describe('MyfirebaseComponent', () => {
  let component: MyfirebaseComponent;
  let fixture: ComponentFixture<MyfirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
