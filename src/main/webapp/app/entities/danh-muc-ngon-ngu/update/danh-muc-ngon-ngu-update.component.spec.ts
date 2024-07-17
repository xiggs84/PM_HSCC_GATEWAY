import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucNgonNguService } from '../service/danh-muc-ngon-ngu.service';
import { IDanhMucNgonNgu } from '../danh-muc-ngon-ngu.model';
import { DanhMucNgonNguFormService } from './danh-muc-ngon-ngu-form.service';

import { DanhMucNgonNguUpdateComponent } from './danh-muc-ngon-ngu-update.component';

describe('DanhMucNgonNgu Management Update Component', () => {
  let comp: DanhMucNgonNguUpdateComponent;
  let fixture: ComponentFixture<DanhMucNgonNguUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucNgonNguFormService: DanhMucNgonNguFormService;
  let danhMucNgonNguService: DanhMucNgonNguService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNgonNguUpdateComponent],
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
      .overrideTemplate(DanhMucNgonNguUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucNgonNguUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucNgonNguFormService = TestBed.inject(DanhMucNgonNguFormService);
    danhMucNgonNguService = TestBed.inject(DanhMucNgonNguService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucNgonNgu: IDanhMucNgonNgu = { id: 456 };

      activatedRoute.data = of({ danhMucNgonNgu });
      comp.ngOnInit();

      expect(comp.danhMucNgonNgu).toEqual(danhMucNgonNgu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNgonNgu>>();
      const danhMucNgonNgu = { id: 123 };
      jest.spyOn(danhMucNgonNguFormService, 'getDanhMucNgonNgu').mockReturnValue(danhMucNgonNgu);
      jest.spyOn(danhMucNgonNguService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNgonNgu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNgonNgu }));
      saveSubject.complete();

      // THEN
      expect(danhMucNgonNguFormService.getDanhMucNgonNgu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucNgonNguService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucNgonNgu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNgonNgu>>();
      const danhMucNgonNgu = { id: 123 };
      jest.spyOn(danhMucNgonNguFormService, 'getDanhMucNgonNgu').mockReturnValue({ id: null });
      jest.spyOn(danhMucNgonNguService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNgonNgu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNgonNgu }));
      saveSubject.complete();

      // THEN
      expect(danhMucNgonNguFormService.getDanhMucNgonNgu).toHaveBeenCalled();
      expect(danhMucNgonNguService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNgonNgu>>();
      const danhMucNgonNgu = { id: 123 };
      jest.spyOn(danhMucNgonNguService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNgonNgu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucNgonNguService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
