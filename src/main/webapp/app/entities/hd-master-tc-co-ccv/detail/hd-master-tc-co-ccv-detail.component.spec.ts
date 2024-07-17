import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { HdMasterTcCoCcvDetailComponent } from './hd-master-tc-co-ccv-detail.component';

describe('HdMasterTcCoCcv Management Detail Component', () => {
  let comp: HdMasterTcCoCcvDetailComponent;
  let fixture: ComponentFixture<HdMasterTcCoCcvDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdMasterTcCoCcvDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HdMasterTcCoCcvDetailComponent,
              resolve: { hdMasterTcCoCcv: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HdMasterTcCoCcvDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdMasterTcCoCcvDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hdMasterTcCoCcv on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HdMasterTcCoCcvDetailComponent);

      // THEN
      expect(instance.hdMasterTcCoCcv()).toEqual(expect.objectContaining({ id: 123 }));
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
