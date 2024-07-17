import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucTinhTrangHonNhanService } from '../service/danh-muc-tinh-trang-hon-nhan.service';
import { IDanhMucTinhTrangHonNhan } from '../danh-muc-tinh-trang-hon-nhan.model';
import { DanhMucTinhTrangHonNhanFormService } from './danh-muc-tinh-trang-hon-nhan-form.service';

import { DanhMucTinhTrangHonNhanUpdateComponent } from './danh-muc-tinh-trang-hon-nhan-update.component';

describe('DanhMucTinhTrangHonNhan Management Update Component', () => {
  let comp: DanhMucTinhTrangHonNhanUpdateComponent;
  let fixture: ComponentFixture<DanhMucTinhTrangHonNhanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucTinhTrangHonNhanFormService: DanhMucTinhTrangHonNhanFormService;
  let danhMucTinhTrangHonNhanService: DanhMucTinhTrangHonNhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTinhTrangHonNhanUpdateComponent],
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
      .overrideTemplate(DanhMucTinhTrangHonNhanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucTinhTrangHonNhanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucTinhTrangHonNhanFormService = TestBed.inject(DanhMucTinhTrangHonNhanFormService);
    danhMucTinhTrangHonNhanService = TestBed.inject(DanhMucTinhTrangHonNhanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucTinhTrangHonNhan: IDanhMucTinhTrangHonNhan = { id: 456 };

      activatedRoute.data = of({ danhMucTinhTrangHonNhan });
      comp.ngOnInit();

      expect(comp.danhMucTinhTrangHonNhan).toEqual(danhMucTinhTrangHonNhan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTinhTrangHonNhan>>();
      const danhMucTinhTrangHonNhan = { id: 123 };
      jest.spyOn(danhMucTinhTrangHonNhanFormService, 'getDanhMucTinhTrangHonNhan').mockReturnValue(danhMucTinhTrangHonNhan);
      jest.spyOn(danhMucTinhTrangHonNhanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTinhTrangHonNhan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTinhTrangHonNhan }));
      saveSubject.complete();

      // THEN
      expect(danhMucTinhTrangHonNhanFormService.getDanhMucTinhTrangHonNhan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucTinhTrangHonNhanService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucTinhTrangHonNhan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTinhTrangHonNhan>>();
      const danhMucTinhTrangHonNhan = { id: 123 };
      jest.spyOn(danhMucTinhTrangHonNhanFormService, 'getDanhMucTinhTrangHonNhan').mockReturnValue({ id: null });
      jest.spyOn(danhMucTinhTrangHonNhanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTinhTrangHonNhan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTinhTrangHonNhan }));
      saveSubject.complete();

      // THEN
      expect(danhMucTinhTrangHonNhanFormService.getDanhMucTinhTrangHonNhan).toHaveBeenCalled();
      expect(danhMucTinhTrangHonNhanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTinhTrangHonNhan>>();
      const danhMucTinhTrangHonNhan = { id: 123 };
      jest.spyOn(danhMucTinhTrangHonNhanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTinhTrangHonNhan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucTinhTrangHonNhanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
