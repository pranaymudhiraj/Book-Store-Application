import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificbooksComponent } from './scientificbooks.component';

describe('ScientificbooksComponent', () => {
  let component: ScientificbooksComponent;
  let fixture: ComponentFixture<ScientificbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
        providers: [ScientificbooksComponent],
      declarations: [ ScientificbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
