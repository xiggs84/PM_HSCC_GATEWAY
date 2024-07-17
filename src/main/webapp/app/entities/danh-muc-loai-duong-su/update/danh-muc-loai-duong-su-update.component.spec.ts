import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiDuongSuService } from '../service/danh-muc-loai-duong-su.service';
import { IDanhMucLoaiDuongSu } from '../danh-muc-loai-duong-su.model';
import { DanhMucLoaiDuongSuFormService } from './danh-muc-loai-duong-su-form.service';

import { DanhMucLoaiDuongSuUpdateComponent } from './danh-muc-loai-duong-su-update.component';

describe('DanhMucLoaiDuongSu Management Update Component', () => {
  let comp: DanhMucLoaiDuongSuUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiDuongSuFormService: DanhMucLoaiDuongSuFormService;
  let danhMucLoaiDuongSuService: DanhMucLoaiDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiDuongSuUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiDuongSuFormService = TestBed.inject(DanhMucLoaiDuongSuFormService);
    danhMucLoaiDuongSuService = TestBed.inject(DanhMucLoaiDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiDuongSu: IDanhMucLoaiDuongSu = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiDuongSu });
      comp.ngOnInit();

      expect(comp.danhMucLoaiDuongSu).toEqual(danhMucLoaiDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiDuongSu>>();
      const danhMucLoaiDuongSu = { id: 123 };
      jest.spyOn(danhMucLoaiDuongSuFormService, 'getDanhMucLoaiDuongSu').mockReturnValue(danhMucLoaiDuongSu);
      jest.spyOn(danhMucLoaiDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiDuongSu }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiDuongSuFormService.getDanhMucLoaiDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiDuongSu>>();
      const danhMucLoaiDuongSu = { id: 123 };
      jest.spyOn(danhMucLoaiDuongSuFormService, 'getDanhMucLoaiDuongSu').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiDuongSu }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiDuongSuFormService.getDanhMucLoaiDuongSu).toHaveBeenCalled();
      expect(danhMucLoaiDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiDuongSu>>();
      const danhMucLoaiDuongSu = { id: 123 };
      jest.spyOn(danhMucLoaiDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
