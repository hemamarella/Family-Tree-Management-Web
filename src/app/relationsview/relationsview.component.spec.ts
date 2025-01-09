import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsviewComponent } from './relationsview.component';

describe('RelationsviewComponent', () => {
  let component: RelationsviewComponent;
  let fixture: ComponentFixture<RelationsviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationsviewComponent]
    });
    fixture = TestBed.createComponent(RelationsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
