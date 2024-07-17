import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IDanhMucDonVi } from 'app/entities/danh-muc-don-vi/danh-muc-don-vi.model';
import { DanhMucDonViService } from 'app/entities/danh-muc-don-vi/service/danh-muc-don-vi.service';
import { CanBoQuyenService } from '../service/can-bo-quyen.service';
import { ICanBoQuyen } from '../can-bo-quyen.model';
import { CanBoQuyenFormService } from './can-bo-quyen-form.service';

import { CanBoQuyenUpdateComponent } from './can-bo-quyen-update.component';

describe('CanBoQuyen Management Update Component', () => {
  let comp: CanBoQuyenUpdateComponent;
  let fixture: ComponentFixture<CanBoQuyenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let canBoQuyenFormService: CanBoQuyenFormService;
  let canBoQuyenService: CanBoQuyenService;
  let danhMucDonViService: DanhMucDonViService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanBoQuyenUpdateComponent],
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
      .overrideTemplate(CanBoQuyenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CanBoQuyenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    canBoQuyenFormService = TestBed.inject(CanBoQuyenFormService);
    canBoQuyenService = TestBed.inject(CanBoQuyenService);
    danhMucDonViService = TestBed.inject(DanhMucDonViService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DanhMucDonVi query and add missing value', () => {
      const canBoQuyen: ICanBoQuyen = { id: 456 };
      const idDonVi: IDanhMucDonVi = { id: 31588 };
      canBoQuyen.idDonVi = idDonVi;

      const danhMucDonViCollection: IDanhMucDonVi[] = [{ id: 15534 }];
      jest.spyOn(danhMucDonViService, 'query').mockReturnValue(of(new HttpResponse({ body: danhMucDonViCollection })));
      const additionalDanhMucDonVis = [idDonVi];
      const expectedCollection: IDanhMucDonVi[] = [...additionalDanhMucDonVis, ...danhMucDonViCollection];
      jest.spyOn(danhMucDonViService, 'addDanhMucDonViToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      expect(danhMucDonViService.query).toHaveBeenCalled();
      expect(danhMucDonViService.addDanhMucDonViToCollectionIfMissing).toHaveBeenCalledWith(
        danhMucDonViCollection,
        ...additionalDanhMucDonVis.map(expect.objectContaining),
      );
      expect(comp.danhMucDonVisSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const canBoQuyen: ICanBoQuyen = { id: 456 };
      const idDonVi: IDanhMucDonVi = { id: 5000 };
      canBoQuyen.idDonVi = idDonVi;

      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      expect(comp.danhMucDonVisSharedCollection).toContain(idDonVi);
      expect(comp.canBoQuyen).toEqual(canBoQuyen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanBoQuyen>>();
      const canBoQuyen = { id: 123 };
      jest.spyOn(canBoQuyenFormService, 'getCanBoQuyen').mockReturnValue(canBoQuyen);
      jest.spyOn(canBoQuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: canBoQuyen }));
      saveSubject.complete();

      // THEN
      expect(canBoQuyenFormService.getCanBoQuyen).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(canBoQuyenService.update).toHaveBeenCalledWith(expect.objectContaining(canBoQuyen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanBoQuyen>>();
      const canBoQuyen = { id: 123 };
      jest.spyOn(canBoQuyenFormService, 'getCanBoQuyen').mockReturnValue({ id: null });
      jest.spyOn(canBoQuyenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canBoQuyen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: canBoQuyen }));
      saveSubject.complete();

      // THEN
      expect(canBoQuyenFormService.getCanBoQuyen).toHaveBeenCalled();
      expect(canBoQuyenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICanBoQuyen>>();
      const canBoQuyen = { id: 123 };
      jest.spyOn(canBoQuyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ canBoQuyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(canBoQuyenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDanhMucDonVi', () => {
      it('Should forward to danhMucDonViService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(danhMucDonViService, 'compareDanhMucDonVi');
        comp.compareDanhMucDonVi(entity, entity2);
        expect(danhMucDonViService.compareDanhMucDonVi).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
