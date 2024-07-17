import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucTinhService } from '../service/danh-muc-tinh.service';
import { IDanhMucTinh } from '../danh-muc-tinh.model';
import { DanhMucTinhFormService } from './danh-muc-tinh-form.service';

import { DanhMucTinhUpdateComponent } from './danh-muc-tinh-update.component';

describe('DanhMucTinh Management Update Component', () => {
  let comp: DanhMucTinhUpdateComponent;
  let fixture: ComponentFixture<DanhMucTinhUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucTinhFormService: DanhMucTinhFormService;
  let danhMucTinhService: DanhMucTinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucTinhUpdateComponent],
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
      .overrideTemplate(DanhMucTinhUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucTinhUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucTinhFormService = TestBed.inject(DanhMucTinhFormService);
    danhMucTinhService = TestBed.inject(DanhMucTinhService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucTinh: IDanhMucTinh = { id: 456 };

      activatedRoute.data = of({ danhMucTinh });
      comp.ngOnInit();

      expect(comp.danhMucTinh).toEqual(danhMucTinh);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTinh>>();
      const danhMucTinh = { id: 123 };
      jest.spyOn(danhMucTinhFormService, 'getDanhMucTinh').mockReturnValue(danhMucTinh);
      jest.spyOn(danhMucTinhService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTinh });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTinh }));
      saveSubject.complete();

      // THEN
      expect(danhMucTinhFormService.getDanhMucTinh).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucTinhService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucTinh));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTinh>>();
      const danhMucTinh = { id: 123 };
      jest.spyOn(danhMucTinhFormService, 'getDanhMucTinh').mockReturnValue({ id: null });
      jest.spyOn(danhMucTinhService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTinh: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucTinh }));
      saveSubject.complete();

      // THEN
      expect(danhMucTinhFormService.getDanhMucTinh).toHaveBeenCalled();
      expect(danhMucTinhService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucTinh>>();
      const danhMucTinh = { id: 123 };
      jest.spyOn(danhMucTinhService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucTinh });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucTinhService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
