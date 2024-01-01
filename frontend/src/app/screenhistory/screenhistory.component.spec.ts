import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenhistoryComponent } from './screenhistory.component';

describe('ScreenhistoryComponent', () => {
  let component: ScreenhistoryComponent;
  let fixture: ComponentFixture<ScreenhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScreenhistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreenhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
