import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiDonViService } from '../service/danh-muc-loai-don-vi.service';
import { IDanhMucLoaiDonVi } from '../danh-muc-loai-don-vi.model';
import { DanhMucLoaiDonViFormService } from './danh-muc-loai-don-vi-form.service';

import { DanhMucLoaiDonViUpdateComponent } from './danh-muc-loai-don-vi-update.component';

describe('DanhMucLoaiDonVi Management Update Component', () => {
  let comp: DanhMucLoaiDonViUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiDonViUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiDonViFormService: DanhMucLoaiDonViFormService;
  let danhMucLoaiDonViService: DanhMucLoaiDonViService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiDonViUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiDonViUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiDonViUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiDonViFormService = TestBed.inject(DanhMucLoaiDonViFormService);
    danhMucLoaiDonViService = TestBed.inject(DanhMucLoaiDonViService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiDonVi: IDanhMucLoaiDonVi = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiDonVi });
      comp.ngOnInit();

      expect(comp.danhMucLoaiDonVi).toEqual(danhMucLoaiDonVi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiDonVi>>();
      const danhMucLoaiDonVi = { id: 123 };
      jest.spyOn(danhMucLoaiDonViFormService, 'getDanhMucLoaiDonVi').mockReturnValue(danhMucLoaiDonVi);
      jest.spyOn(danhMucLoaiDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiDonViFormService.getDanhMucLoaiDonVi).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiDonViService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiDonVi));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiDonVi>>();
      const danhMucLoaiDonVi = { id: 123 };
      jest.spyOn(danhMucLoaiDonViFormService, 'getDanhMucLoaiDonVi').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiDonViService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiDonVi: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiDonVi }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiDonViFormService.getDanhMucLoaiDonVi).toHaveBeenCalled();
      expect(danhMucLoaiDonViService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiDonVi>>();
      const danhMucLoaiDonVi = { id: 123 };
      jest.spyOn(danhMucLoaiDonViService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiDonVi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiDonViService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
