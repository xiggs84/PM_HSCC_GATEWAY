import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucCanBoService } from '../service/danh-muc-can-bo.service';
import { IDanhMucCanBo } from '../danh-muc-can-bo.model';
import { DanhMucCanBoFormService } from './danh-muc-can-bo-form.service';

import { DanhMucCanBoUpdateComponent } from './danh-muc-can-bo-update.component';

describe('DanhMucCanBo Management Update Component', () => {
  let comp: DanhMucCanBoUpdateComponent;
  let fixture: ComponentFixture<DanhMucCanBoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucCanBoFormService: DanhMucCanBoFormService;
  let danhMucCanBoService: DanhMucCanBoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucCanBoUpdateComponent],
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
      .overrideTemplate(DanhMucCanBoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucCanBoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucCanBoFormService = TestBed.inject(DanhMucCanBoFormService);
    danhMucCanBoService = TestBed.inject(DanhMucCanBoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucCanBo: IDanhMucCanBo = { id: 456 };

      activatedRoute.data = of({ danhMucCanBo });
      comp.ngOnInit();

      expect(comp.danhMucCanBo).toEqual(danhMucCanBo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucCanBo>>();
      const danhMucCanBo = { id: 123 };
      jest.spyOn(danhMucCanBoFormService, 'getDanhMucCanBo').mockReturnValue(danhMucCanBo);
      jest.spyOn(danhMucCanBoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucCanBo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucCanBo }));
      saveSubject.complete();

      // THEN
      expect(danhMucCanBoFormService.getDanhMucCanBo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucCanBoService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucCanBo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucCanBo>>();
      const danhMucCanBo = { id: 123 };
      jest.spyOn(danhMucCanBoFormService, 'getDanhMucCanBo').mockReturnValue({ id: null });
      jest.spyOn(danhMucCanBoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucCanBo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucCanBo }));
      saveSubject.complete();

      // THEN
      expect(danhMucCanBoFormService.getDanhMucCanBo).toHaveBeenCalled();
      expect(danhMucCanBoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucCanBo>>();
      const danhMucCanBo = { id: 123 };
      jest.spyOn(danhMucCanBoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucCanBo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucCanBoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
