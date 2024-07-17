import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { QuyenService } from '../service/quyen.service';
import { IQuyen } from '../quyen.model';
import { QuyenFormService } from './quyen-form.service';

import { QuyenUpdateComponent } from './quyen-update.component';

describe('Quyen Management Update Component', () => {
  let comp: QuyenUpdateComponent;
  let fixture: ComponentFixture<QuyenUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quyenFormService: QuyenFormService;
  let quyenService: QuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuyenUpdateComponent],
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
      .overrideTemplate(QuyenUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuyenUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quyenFormService = TestBed.inject(QuyenFormService);
    quyenService = TestBed.inject(QuyenService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quyen: IQuyen = { id: 456 };

      activatedRoute.data = of({ quyen });
      comp.ngOnInit();

      expect(comp.quyen).toEqual(quyen);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuyen>>();
      const quyen = { id: 123 };
      jest.spyOn(quyenFormService, 'getQuyen').mockReturnValue(quyen);
      jest.spyOn(quyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quyen }));
      saveSubject.complete();

      // THEN
      expect(quyenFormService.getQuyen).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quyenService.update).toHaveBeenCalledWith(expect.objectContaining(quyen));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuyen>>();
      const quyen = { id: 123 };
      jest.spyOn(quyenFormService, 'getQuyen').mockReturnValue({ id: null });
      jest.spyOn(quyenService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quyen: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quyen }));
      saveSubject.complete();

      // THEN
      expect(quyenFormService.getQuyen).toHaveBeenCalled();
      expect(quyenService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuyen>>();
      const quyen = { id: 123 };
      jest.spyOn(quyenService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quyen });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quyenService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
