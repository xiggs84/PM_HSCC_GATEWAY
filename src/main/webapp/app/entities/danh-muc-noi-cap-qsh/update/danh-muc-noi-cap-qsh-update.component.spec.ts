import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DanhMucNoiCapQshService } from '../service/danh-muc-noi-cap-qsh.service';
import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';
import { DanhMucNoiCapQshFormService } from './danh-muc-noi-cap-qsh-form.service';

import { DanhMucNoiCapQshUpdateComponent } from './danh-muc-noi-cap-qsh-update.component';

describe('DanhMucNoiCapQsh Management Update Component', () => {
  let comp: DanhMucNoiCapQshUpdateComponent;
  let fixture: ComponentFixture<DanhMucNoiCapQshUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let danhMucNoiCapQshFormService: DanhMucNoiCapQshFormService;
  let danhMucNoiCapQshService: DanhMucNoiCapQshService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DanhMucNoiCapQshUpdateComponent],
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
      .overrideTemplate(DanhMucNoiCapQshUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DanhMucNoiCapQshUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    danhMucNoiCapQshFormService = TestBed.inject(DanhMucNoiCapQshFormService);
    danhMucNoiCapQshService = TestBed.inject(DanhMucNoiCapQshService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const danhMucNoiCapQsh: IDanhMucNoiCapQsh = { id: 456 };

      activatedRoute.data = of({ danhMucNoiCapQsh });
      comp.ngOnInit();

      expect(comp.danhMucNoiCapQsh).toEqual(danhMucNoiCapQsh);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNoiCapQsh>>();
      const danhMucNoiCapQsh = { id: 123 };
      jest.spyOn(danhMucNoiCapQshFormService, 'getDanhMucNoiCapQsh').mockReturnValue(danhMucNoiCapQsh);
      jest.spyOn(danhMucNoiCapQshService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNoiCapQsh });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNoiCapQsh }));
      saveSubject.complete();

      // THEN
      expect(danhMucNoiCapQshFormService.getDanhMucNoiCapQsh).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(danhMucNoiCapQshService.update).toHaveBeenCalledWith(expect.objectContaining(danhMucNoiCapQsh));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNoiCapQsh>>();
      const danhMucNoiCapQsh = { id: 123 };
      jest.spyOn(danhMucNoiCapQshFormService, 'getDanhMucNoiCapQsh').mockReturnValue({ id: null });
      jest.spyOn(danhMucNoiCapQshService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNoiCapQsh: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: danhMucNoiCapQsh }));
      saveSubject.complete();

      // THEN
      expect(danhMucNoiCapQshFormService.getDanhMucNoiCapQsh).toHaveBeenCalled();
      expect(danhMucNoiCapQshService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDanhMucNoiCapQsh>>();
      const danhMucNoiCapQsh = { id: 123 };
      jest.spyOn(danhMucNoiCapQshService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ danhMucNoiCapQsh });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(danhMucNoiCapQshService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
