import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { LichSuGiaoDichService } from '../service/lich-su-giao-dich.service';
import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';
import { LichSuGiaoDichFormService } from './lich-su-giao-dich-form.service';

import { LichSuGiaoDichUpdateComponent } from './lich-su-giao-dich-update.component';

describe('LichSuGiaoDich Management Update Component', () => {
  let comp: LichSuGiaoDichUpdateComponent;
  let fixture: ComponentFixture<LichSuGiaoDichUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let lichSuGiaoDichFormService: LichSuGiaoDichFormService;
  let lichSuGiaoDichService: LichSuGiaoDichService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LichSuGiaoDichUpdateComponent],
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
      .overrideTemplate(LichSuGiaoDichUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LichSuGiaoDichUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    lichSuGiaoDichFormService = TestBed.inject(LichSuGiaoDichFormService);
    lichSuGiaoDichService = TestBed.inject(LichSuGiaoDichService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const lichSuGiaoDich: ILichSuGiaoDich = { id: 456 };

      activatedRoute.data = of({ lichSuGiaoDich });
      comp.ngOnInit();

      expect(comp.lichSuGiaoDich).toEqual(lichSuGiaoDich);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILichSuGiaoDich>>();
      const lichSuGiaoDich = { id: 123 };
      jest.spyOn(lichSuGiaoDichFormService, 'getLichSuGiaoDich').mockReturnValue(lichSuGiaoDich);
      jest.spyOn(lichSuGiaoDichService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lichSuGiaoDich });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lichSuGiaoDich }));
      saveSubject.complete();

      // THEN
      expect(lichSuGiaoDichFormService.getLichSuGiaoDich).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(lichSuGiaoDichService.update).toHaveBeenCalledWith(expect.objectContaining(lichSuGiaoDich));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILichSuGiaoDich>>();
      const lichSuGiaoDich = { id: 123 };
      jest.spyOn(lichSuGiaoDichFormService, 'getLichSuGiaoDich').mockReturnValue({ id: null });
      jest.spyOn(lichSuGiaoDichService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lichSuGiaoDich: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lichSuGiaoDich }));
      saveSubject.complete();

      // THEN
      expect(lichSuGiaoDichFormService.getLichSuGiaoDich).toHaveBeenCalled();
      expect(lichSuGiaoDichService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILichSuGiaoDich>>();
      const lichSuGiaoDich = { id: 123 };
      jest.spyOn(lichSuGiaoDichService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lichSuGiaoDich });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(lichSuGiaoDichService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
