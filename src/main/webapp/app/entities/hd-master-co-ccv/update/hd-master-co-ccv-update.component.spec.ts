import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { HdMasterCoCcvService } from '../service/hd-master-co-ccv.service';
import { IHdMasterCoCcv } from '../hd-master-co-ccv.model';
import { HdMasterCoCcvFormService } from './hd-master-co-ccv-form.service';

import { HdMasterCoCcvUpdateComponent } from './hd-master-co-ccv-update.component';

describe('HdMasterCoCcv Management Update Component', () => {
  let comp: HdMasterCoCcvUpdateComponent;
  let fixture: ComponentFixture<HdMasterCoCcvUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hdMasterCoCcvFormService: HdMasterCoCcvFormService;
  let hdMasterCoCcvService: HdMasterCoCcvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HdMasterCoCcvUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(HdMasterCoCcvUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HdMasterCoCcvUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hdMasterCoCcvFormService = TestBed.inject(HdMasterCoCcvFormService);
    hdMasterCoCcvService = TestBed.inject(HdMasterCoCcvService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const hdMasterCoCcv: IHdMasterCoCcv = { id: 456 };

      activatedRoute.data = of({ hdMasterCoCcv });
      comp.ngOnInit();

      expect(comp.hdMasterCoCcv).toEqual(hdMasterCoCcv);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdMasterCoCcv>>();
      const hdMasterCoCcv = { id: 123 };
      jest.spyOn(hdMasterCoCcvFormService, 'getHdMasterCoCcv').mockReturnValue(hdMasterCoCcv);
      jest.spyOn(hdMasterCoCcvService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdMasterCoCcv });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdMasterCoCcv }));
      saveSubject.complete();

      // THEN
      expect(hdMasterCoCcvFormService.getHdMasterCoCcv).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hdMasterCoCcvService.update).toHaveBeenCalledWith(expect.objectContaining(hdMasterCoCcv));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdMasterCoCcv>>();
      const hdMasterCoCcv = { id: 123 };
      jest.spyOn(hdMasterCoCcvFormService, 'getHdMasterCoCcv').mockReturnValue({ id: null });
      jest.spyOn(hdMasterCoCcvService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdMasterCoCcv: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdMasterCoCcv }));
      saveSubject.complete();

      // THEN
      expect(hdMasterCoCcvFormService.getHdMasterCoCcv).toHaveBeenCalled();
      expect(hdMasterCoCcvService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdMasterCoCcv>>();
      const hdMasterCoCcv = { id: 123 };
      jest.spyOn(hdMasterCoCcvService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdMasterCoCcv });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hdMasterCoCcvService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
