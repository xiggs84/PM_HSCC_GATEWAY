import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { QuanHeDuongSuService } from '../service/quan-he-duong-su.service';
import { IQuanHeDuongSu } from '../quan-he-duong-su.model';
import { QuanHeDuongSuFormService } from './quan-he-duong-su-form.service';

import { QuanHeDuongSuUpdateComponent } from './quan-he-duong-su-update.component';

describe('QuanHeDuongSu Management Update Component', () => {
  let comp: QuanHeDuongSuUpdateComponent;
  let fixture: ComponentFixture<QuanHeDuongSuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quanHeDuongSuFormService: QuanHeDuongSuFormService;
  let quanHeDuongSuService: QuanHeDuongSuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuanHeDuongSuUpdateComponent],
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
      .overrideTemplate(QuanHeDuongSuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuanHeDuongSuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quanHeDuongSuFormService = TestBed.inject(QuanHeDuongSuFormService);
    quanHeDuongSuService = TestBed.inject(QuanHeDuongSuService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quanHeDuongSu: IQuanHeDuongSu = { id: 456 };

      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      expect(comp.quanHeDuongSu).toEqual(quanHeDuongSu);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeDuongSu>>();
      const quanHeDuongSu = { id: 123 };
      jest.spyOn(quanHeDuongSuFormService, 'getQuanHeDuongSu').mockReturnValue(quanHeDuongSu);
      jest.spyOn(quanHeDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeDuongSu }));
      saveSubject.complete();

      // THEN
      expect(quanHeDuongSuFormService.getQuanHeDuongSu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quanHeDuongSuService.update).toHaveBeenCalledWith(expect.objectContaining(quanHeDuongSu));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeDuongSu>>();
      const quanHeDuongSu = { id: 123 };
      jest.spyOn(quanHeDuongSuFormService, 'getQuanHeDuongSu').mockReturnValue({ id: null });
      jest.spyOn(quanHeDuongSuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeDuongSu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quanHeDuongSu }));
      saveSubject.complete();

      // THEN
      expect(quanHeDuongSuFormService.getQuanHeDuongSu).toHaveBeenCalled();
      expect(quanHeDuongSuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuanHeDuongSu>>();
      const quanHeDuongSu = { id: 123 };
      jest.spyOn(quanHeDuongSuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quanHeDuongSu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quanHeDuongSuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
