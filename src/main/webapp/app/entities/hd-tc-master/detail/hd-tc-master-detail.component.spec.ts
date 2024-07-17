import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { HdTcMasterDetailComponent } from './hd-tc-master-detail.component';

describe('HdTcMaster Management Detail Component', () => {
  let comp: HdTcMasterDetailComponent;
  let fixture: ComponentFixture<HdTcMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdTcMasterDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HdTcMasterDetailComponent,
              resolve: { hdTcMaster: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HdTcMasterDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdTcMasterDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hdTcMaster on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HdTcMasterDetailComponent);

      // THEN
      expect(instance.hdTcMaster()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
