import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucQuocGiaService } from '../service/danh-muc-quoc-gia.service';
import { IDanhMucQuocGia } from '../danh-muc-quoc-gia.model';
import { DanhMucQuocGiaFormService } from './danh-muc-quoc-gia-form.service';

import { DanhMucQuocGiaUpdateComponent } from './danh-muc-quoc-gia-update.component';

describe('DanhMucQuocGia Management Update Component', () => {
  let comp: DanhMucQuocGiaUpdateComponent;
  let fixture: ComponentFixture<DanhMucQuocGiaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucQuocGiaFormService: DanhMucQuocGiaFormService;
  let danhMucQuocGiaService: DanhMucQuocGiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucQuocGiaUpdateComponent],
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
      .overrideTemplate(DanhMucQuocGiaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucQuocGiaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucQuocGiaFormService = TestBed.inject(DanhMucQuocGiaFormService);
    danhMucQuocGiaService = TestBed.inject(DanhMucQuocGiaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucQuocGia: IDanhMucQuocGia = { id: 456 };

      activatedRoute.data = of({ danhMucQuocGia });
      comp.ngOnInit();

      expect(comp.danhMucQuocGia).toEqual(danhMucQuocGia);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucQuocGia>>();
      const danhMucQuocGia = { id: 123 };
      jest.spyOn(danhMucQuocGiaFormService, 'getDanhMucQuocGia').mockReturnValue(danhMucQuocGia);
      jest.spyOn(danhMucQuocGiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucQuocGia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucQuocGia }));
      saveSubject.complete();

      // THEN
      expect(danhMucQuocGiaFormService.getDanhMucQuocGia).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucQuocGiaService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucQuocGia));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucQuocGia>>();
      const danhMucQuocGia = { id: 123 };
      jest.spyOn(danhMucQuocGiaFormService, 'getDanhMucQuocGia').mockReturnValue({ id: null });
      jest.spyOn(danhMucQuocGiaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucQuocGia: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucQuocGia }));
      saveSubject.complete();

      // THEN
      expect(danhMucQuocGiaFormService.getDanhMucQuocGia).toHaveBeenCalled();
      expect(danhMucQuocGiaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucQuocGia>>();
      const danhMucQuocGia = { id: 123 };
      jest.spyOn(danhMucQuocGiaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucQuocGia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucQuocGiaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
