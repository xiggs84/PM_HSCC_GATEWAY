import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucHuyen } from 'app/entities/danh-muc-huyen/danh-muc-huyen.model';
import { DanhMucHuyenService } from 'app/entities/danh-muc-huyen/service/danh-muc-huyen.service';
import { DanhMucXaService } from '../service/danh-muc-xa.service';
import { IDanhMucXa } from '../danh-muc-xa.model';
import { DanhMucXaFormService } from './danh-muc-xa-form.service';

import { DanhMucXaUpdateComponent } from './danh-muc-xa-update.component';

describe('DanhMucXa Management Update Component', () => {
  let comp: DanhMucXaUpdateComponent;
  let fixture: ComponentFixture<DanhMucXaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucXaFormService: DanhMucXaFormService;
  let danhMucXaService: DanhMucXaService;
  let danhMucHuyenService: DanhMucHuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucXaUpdateComponent],
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
      .overrideTemplate(DanhMucXaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucXaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucXaFormService = TestBed.inject(DanhMucXaFormService);
    danhMucXaService = TestBed.inject(DanhMucXaService);
    danhMucHuyenService = TestBed.inject(DanhMucHuyenService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucHuyen query and add missing value', () => {
      const danhMucXa: IDanhMucXa = { id: 456 };
      const maHuyen: IDanhMucHuyen = { id: 9824 };
      danhMucXa.maHuyen = maHuyen;

      const danhMucHuyenCollection: IDanhMucHuyen[] = [{ id: 2661 }];
      jest.spyOn(danhMucHuyenService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucHuyenCollection })));
      const additionalDanhMucHuyens = [maHuyen];
      const expectedCollection: IDanhMucHuyen[] = [...additionalDanhMucHuyens, ...danhMucHuyenCollection];
      jest.spyOn(danhMucHuyenService, 'addDanhMucHuyenToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      expect(danhMucHuyenService.query).toHaveBeenCalled();
      expect(danhMucHuyenService.addDanhMucHuyenToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucHuyenCollection,
        ...additionalDanhMucHuyens.map(expect.objectContaining),
      );
      expect(comp.danhMucHuyensSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhMucXa: IDanhMucXa = { id: 456 };
      const maHuyen: IDanhMucHuyen = { id: 21541 };
      danhMucXa.maHuyen = maHuyen;

      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      expect(comp.danhMucHuyensSharedCollection).toContain(maHuyen);
      expect(comp.danhMucXa).toEqual(danhMucXa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucXa>>();
      const danhMucXa = { id: 123 };
      jest.spyOn(danhMucXaFormService, 'getDanhMucXa').mockReturnValue(danhMucXa);
      jest.spyOn(danhMucXaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucXa }));
      saveSubject.complete();

      // THEN
      expect(danhMucXaFormService.getDanhMucXa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucXaService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucXa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucXa>>();
      const danhMucXa = { id: 123 };
      jest.spyOn(danhMucXaFormService, 'getDanhMucXa').mockReturnValue({ id: null });
      jest.spyOn(danhMucXaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucXa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucXa }));
      saveSubject.complete();

      // THEN
      expect(danhMucXaFormService.getDanhMucXa).toHaveBeenCalled();
      expect(danhMucXaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucXa>>();
      const danhMucXa = { id: 123 };
      jest.spyOn(danhMucXaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucXa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucXaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucHuyen', () => {
      it('Should forward to danhMucHuyenService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucHuyenService, 'compareDanhMucHuyen');
        comp.compareDanhMucHuyen(entity, entity2);
        expect(danhMucHuyenService.compareDanhMucHuyen).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
