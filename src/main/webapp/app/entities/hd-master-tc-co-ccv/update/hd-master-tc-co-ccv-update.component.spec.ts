import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { HdMasterTcCoCcvService } from '../service/hd-master-tc-co-ccv.service';
import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';
import { HdMasterTcCoCcvFormService } from './hd-master-tc-co-ccv-form.service';

import { HdMasterTcCoCcvUpdateComponent } from './hd-master-tc-co-ccv-update.component';

describe('HdMasterTcCoCcv Management Update Component', () => {
  let comp: HdMasterTcCoCcvUpdateComponent;
  let fixture: ComponentFixture<HdMasterTcCoCcvUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hdMasterTcCoCcvFormService: HdMasterTcCoCcvFormService;
  let hdMasterTcCoCcvService: HdMasterTcCoCcvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HdMasterTcCoCcvUpdateComponent],
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
      .overrideTemplate(HdMasterTcCoCcvUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HdMasterTcCoCcvUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hdMasterTcCoCcvFormService = TestBed.inject(HdMasterTcCoCcvFormService);
    hdMasterTcCoCcvService = TestBed.inject(HdMasterTcCoCcvService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const hdMasterTcCoCcv: IHdMasterTcCoCcv = { id: 456 };

      activatedRoute.data = of({ hdMasterTcCoCcv });
      comp.ngOnInit();

      expect(comp.hdMasterTcCoCcv).toEqual(hdMasterTcCoCcv);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdMasterTcCoCcv>>();
      const hdMasterTcCoCcv = { id: 123 };
      jest.spyOn(hdMasterTcCoCcvFormService, 'getHdMasterTcCoCcv').mockReturnValue(hdMasterTcCoCcv);
      jest.spyOn(hdMasterTcCoCcvService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdMasterTcCoCcv });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdMasterTcCoCcv }));
      saveSubject.complete();

      // THEN
      expect(hdMasterTcCoCcvFormService.getHdMasterTcCoCcv).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hdMasterTcCoCcvService.update).toHaveBeenCalledWith(expect.objectContaining(hdMasterTcCoCcv));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdMasterTcCoCcv>>();
      const hdMasterTcCoCcv = { id: 123 };
      jest.spyOn(hdMasterTcCoCcvFormService, 'getHdMasterTcCoCcv').mockReturnValue({ id: null });
      jest.spyOn(hdMasterTcCoCcvService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdMasterTcCoCcv: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hdMasterTcCoCcv }));
      saveSubject.complete();

      // THEN
      expect(hdMasterTcCoCcvFormService.getHdMasterTcCoCcv).toHaveBeenCalled();
      expect(hdMasterTcCoCcvService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHdMasterTcCoCcv>>();
      const hdMasterTcCoCcv = { id: 123 };
      jest.spyOn(hdMasterTcCoCcvService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hdMasterTcCoCcv });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hdMasterTcCoCcvService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
