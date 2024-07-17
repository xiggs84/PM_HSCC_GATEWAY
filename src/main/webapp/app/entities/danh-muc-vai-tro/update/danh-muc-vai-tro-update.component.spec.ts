import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucVaiTroService } from '../service/danh-muc-vai-tro.service';
import { IDanhMucVaiTro } from '../danh-muc-vai-tro.model';
import { DanhMucVaiTroFormService } from './danh-muc-vai-tro-form.service';

import { DanhMucVaiTroUpdateComponent } from './danh-muc-vai-tro-update.component';

describe('DanhMucVaiTro Management Update Component', () => {
  let comp: DanhMucVaiTroUpdateComponent;
  let fixture: ComponentFixture<DanhMucVaiTroUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucVaiTroFormService: DanhMucVaiTroFormService;
  let danhMucVaiTroService: DanhMucVaiTroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucVaiTroUpdateComponent],
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
      .overrideTemplate(DanhMucVaiTroUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucVaiTroUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucVaiTroFormService = TestBed.inject(DanhMucVaiTroFormService);
    danhMucVaiTroService = TestBed.inject(DanhMucVaiTroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucVaiTro: IDanhMucVaiTro = { id: 456 };

      activatedRoute.data = of({ danhMucVaiTro });
      comp.ngOnInit();

      expect(comp.danhMucVaiTro).toEqual(danhMucVaiTro);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucVaiTro>>();
      const danhMucVaiTro = { id: 123 };
      jest.spyOn(danhMucVaiTroFormService, 'getDanhMucVaiTro').mockReturnValue(danhMucVaiTro);
      jest.spyOn(danhMucVaiTroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucVaiTro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucVaiTro }));
      saveSubject.complete();

      // THEN
      expect(danhMucVaiTroFormService.getDanhMucVaiTro).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucVaiTroService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucVaiTro));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucVaiTro>>();
      const danhMucVaiTro = { id: 123 };
      jest.spyOn(danhMucVaiTroFormService, 'getDanhMucVaiTro').mockReturnValue({ id: null });
      jest.spyOn(danhMucVaiTroService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucVaiTro: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucVaiTro }));
      saveSubject.complete();

      // THEN
      expect(danhMucVaiTroFormService.getDanhMucVaiTro).toHaveBeenCalled();
      expect(danhMucVaiTroService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucVaiTro>>();
      const danhMucVaiTro = { id: 123 };
      jest.spyOn(danhMucVaiTroService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucVaiTro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucVaiTroService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
