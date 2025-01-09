import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersChartComponent } from './members-chart.component';

describe('MembersChartComponent', () => {
  let component: MembersChartComponent;
  let fixture: ComponentFixture<MembersChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersChartComponent]
    });
    fixture = TestBed.createComponent(MembersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
