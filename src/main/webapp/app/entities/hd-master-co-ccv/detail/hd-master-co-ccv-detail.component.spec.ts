import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { HdMasterCoCcvDetailComponent } from './hd-master-co-ccv-detail.component';

describe('HdMasterCoCcv Management Detail Component', () => {
  let comp: HdMasterCoCcvDetailComponent;
  let fixture: ComponentFixture<HdMasterCoCcvDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdMasterCoCcvDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HdMasterCoCcvDetailComponent,
              resolve: { hdMasterCoCcv: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HdMasterCoCcvDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HdMasterCoCcvDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hdMasterCoCcv on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HdMasterCoCcvDetailComponent);

      // THEN
      expect(instance.hdMasterCoCcv()).toEqual(expect.objectContaining({ id: 123 }));
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
