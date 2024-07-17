import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiSoCongChungService } from '../service/danh-muc-loai-so-cong-chung.service';
import { IDanhMucLoaiSoCongChung } from '../danh-muc-loai-so-cong-chung.model';
import { DanhMucLoaiSoCongChungFormService } from './danh-muc-loai-so-cong-chung-form.service';

import { DanhMucLoaiSoCongChungUpdateComponent } from './danh-muc-loai-so-cong-chung-update.component';

describe('DanhMucLoaiSoCongChung Management Update Component', () => {
  let comp: DanhMucLoaiSoCongChungUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiSoCongChungUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiSoCongChungFormService: DanhMucLoaiSoCongChungFormService;
  let danhMucLoaiSoCongChungService: DanhMucLoaiSoCongChungService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiSoCongChungUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiSoCongChungUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiSoCongChungUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiSoCongChungFormService = TestBed.inject(DanhMucLoaiSoCongChungFormService);
    danhMucLoaiSoCongChungService = TestBed.inject(DanhMucLoaiSoCongChungService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiSoCongChung: IDanhMucLoaiSoCongChung = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiSoCongChung });
      comp.ngOnInit();

      expect(comp.danhMucLoaiSoCongChung).toEqual(danhMucLoaiSoCongChung);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiSoCongChung>>();
      const danhMucLoaiSoCongChung = { id: 123 };
      jest.spyOn(danhMucLoaiSoCongChungFormService, 'getDanhMucLoaiSoCongChung').mockReturnValue(danhMucLoaiSoCongChung);
      jest.spyOn(danhMucLoaiSoCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiSoCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiSoCongChung }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiSoCongChungFormService.getDanhMucLoaiSoCongChung).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiSoCongChungService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiSoCongChung));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiSoCongChung>>();
      const danhMucLoaiSoCongChung = { id: 123 };
      jest.spyOn(danhMucLoaiSoCongChungFormService, 'getDanhMucLoaiSoCongChung').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiSoCongChungService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiSoCongChung: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiSoCongChung }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiSoCongChungFormService.getDanhMucLoaiSoCongChung).toHaveBeenCalled();
      expect(danhMucLoaiSoCongChungService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiSoCongChung>>();
      const danhMucLoaiSoCongChung = { id: 123 };
      jest.spyOn(danhMucLoaiSoCongChungService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiSoCongChung });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiSoCongChungService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
