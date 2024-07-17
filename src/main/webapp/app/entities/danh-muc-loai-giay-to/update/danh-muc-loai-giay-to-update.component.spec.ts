import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucLoaiGiayToService } from '../service/danh-muc-loai-giay-to.service';
import { IDanhMucLoaiGiayTo } from '../danh-muc-loai-giay-to.model';
import { DanhMucLoaiGiayToFormService } from './danh-muc-loai-giay-to-form.service';

import { DanhMucLoaiGiayToUpdateComponent } from './danh-muc-loai-giay-to-update.component';

describe('DanhMucLoaiGiayTo Management Update Component', () => {
  let comp: DanhMucLoaiGiayToUpdateComponent;
  let fixture: ComponentFixture<DanhMucLoaiGiayToUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucLoaiGiayToFormService: DanhMucLoaiGiayToFormService;
  let danhMucLoaiGiayToService: DanhMucLoaiGiayToService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucLoaiGiayToUpdateComponent],
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
      .overrideTemplate(DanhMucLoaiGiayToUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucLoaiGiayToUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucLoaiGiayToFormService = TestBed.inject(DanhMucLoaiGiayToFormService);
    danhMucLoaiGiayToService = TestBed.inject(DanhMucLoaiGiayToService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucLoaiGiayTo: IDanhMucLoaiGiayTo = { id: 456 };

      activatedRoute.data = of({ danhMucLoaiGiayTo });
      comp.ngOnInit();

      expect(comp.danhMucLoaiGiayTo).toEqual(danhMucLoaiGiayTo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiGiayTo>>();
      const danhMucLoaiGiayTo = { id: 123 };
      jest.spyOn(danhMucLoaiGiayToFormService, 'getDanhMucLoaiGiayTo').mockReturnValue(danhMucLoaiGiayTo);
      jest.spyOn(danhMucLoaiGiayToService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiGiayTo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiGiayTo }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiGiayToFormService.getDanhMucLoaiGiayTo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucLoaiGiayToService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucLoaiGiayTo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiGiayTo>>();
      const danhMucLoaiGiayTo = { id: 123 };
      jest.spyOn(danhMucLoaiGiayToFormService, 'getDanhMucLoaiGiayTo').mockReturnValue({ id: null });
      jest.spyOn(danhMucLoaiGiayToService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiGiayTo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucLoaiGiayTo }));
      saveSubject.complete();

      // THEN
      expect(danhMucLoaiGiayToFormService.getDanhMucLoaiGiayTo).toHaveBeenCalled();
      expect(danhMucLoaiGiayToService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucLoaiGiayTo>>();
      const danhMucLoaiGiayTo = { id: 123 };
      jest.spyOn(danhMucLoaiGiayToService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucLoaiGiayTo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucLoaiGiayToService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
