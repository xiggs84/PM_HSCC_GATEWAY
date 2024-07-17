import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucTinh } from 'app/entities/danh-muc-tinh/danh-muc-tinh.model';
import { DanhMucTinhService } from 'app/entities/danh-muc-tinh/service/danh-muc-tinh.service';
import { DanhMucHuyenService } from '../service/danh-muc-huyen.service';
import { IDanhMucHuyen } from '../danh-muc-huyen.model';
import { DanhMucHuyenFormService } from './danh-muc-huyen-form.service';

import { DanhMucHuyenUpdateComponent } from './danh-muc-huyen-update.component';

describe('DanhMucHuyen Management Update Component', () => {
  let comp: DanhMucHuyenUpdateComponent;
  let fixture: ComponentFixture<DanhMucHuyenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucHuyenFormService: DanhMucHuyenFormService;
  let danhMucHuyenService: DanhMucHuyenService;
  let danhMucTinhService: DanhMucTinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucHuyenUpdateComponent],
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
      .overrideTemplate(DanhMucHuyenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucHuyenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucHuyenFormService = TestBed.inject(DanhMucHuyenFormService);
    danhMucHuyenService = TestBed.inject(DanhMucHuyenService);
    danhMucTinhService = TestBed.inject(DanhMucTinhService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucTinh query and add missing value', () => {
      const danhMucHuyen: IDanhMucHuyen = { id: 456 };
      const maTinh: IDanhMucTinh = { id: 28158 };
      danhMucHuyen.maTinh = maTinh;

      const danhMucTinhCollection: IDanhMucTinh[] = [{ id: 8951 }];
      jest.spyOn(danhMucTinhService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucTinhCollection })));
      const additionalDanhMucTinhs = [maTinh];
      const expectedCollection: IDanhMucTinh[] = [...additionalDanhMucTinhs, ...danhMucTinhCollection];
      jest.spyOn(danhMucTinhService, 'addDanhMucTinhToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      expect(danhMucTinhService.query).toHaveBeenCalled();
      expect(danhMucTinhService.addDanhMucTinhToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucTinhCollection,
        ...additionalDanhMucTinhs.map(expect.objectContaining),
      );
      expect(comp.danhMucTinhsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const danhMucHuyen: IDanhMucHuyen = { id: 456 };
      const maTinh: IDanhMucTinh = { id: 26076 };
      danhMucHuyen.maTinh = maTinh;

      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      expect(comp.danhMucTinhsSharedCollection).toContain(maTinh);
      expect(comp.danhMucHuyen).toEqual(danhMucHuyen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucHuyen>>();
      const danhMucHuyen = { id: 123 };
      jest.spyOn(danhMucHuyenFormService, 'getDanhMucHuyen').mockReturnValue(danhMucHuyen);
      jest.spyOn(danhMucHuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucHuyen }));
      saveSubject.complete();

      // THEN
      expect(danhMucHuyenFormService.getDanhMucHuyen).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucHuyenService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucHuyen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucHuyen>>();
      const danhMucHuyen = { id: 123 };
      jest.spyOn(danhMucHuyenFormService, 'getDanhMucHuyen').mockReturnValue({ id: null });
      jest.spyOn(danhMucHuyenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucHuyen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucHuyen }));
      saveSubject.complete();

      // THEN
      expect(danhMucHuyenFormService.getDanhMucHuyen).toHaveBeenCalled();
      expect(danhMucHuyenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucHuyen>>();
      const danhMucHuyen = { id: 123 };
      jest.spyOn(danhMucHuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucHuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucHuyenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucTinh', () => {
      it('Should forward to danhMucTinhService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucTinhService, 'compareDanhMucTinh');
        comp.compareDanhMucTinh(entity, entity2);
        expect(danhMucTinhService.compareDanhMucTinh).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
