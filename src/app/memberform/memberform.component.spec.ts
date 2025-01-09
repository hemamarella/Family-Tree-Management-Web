import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberformComponent } from './memberform.component';

describe('MemberformComponent', () => {
  let component: MemberformComponent;
  let fixture: ComponentFixture<MemberformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberformComponent]
    });
    fixture = TestBed.createComponent(MemberformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
