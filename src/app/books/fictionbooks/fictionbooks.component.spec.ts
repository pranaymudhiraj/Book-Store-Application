import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FictionbooksComponent } from './fictionbooks.component';

describe('FictionbooksComponent', () => {
  let component: FictionbooksComponent;
  let fixture: ComponentFixture<FictionbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
        providers: [FictionbooksComponent],
      declarations: [ FictionbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FictionbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
