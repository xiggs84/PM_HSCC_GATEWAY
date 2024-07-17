import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ChiTietNganChanService } from '../service/chi-tiet-ngan-chan.service';
import { IChiTietNganChan } from '../chi-tiet-ngan-chan.model';
import { ChiTietNganChanFormService } from './chi-tiet-ngan-chan-form.service';

import { ChiTietNganChanUpdateComponent } from './chi-tiet-ngan-chan-update.component';

describe('ChiTietNganChan Management Update Component', () => {
  let comp: ChiTietNganChanUpdateComponent;
  let fixture: ComponentFixture<ChiTietNganChanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chiTietNganChanFormService: ChiTietNganChanFormService;
  let chiTietNganChanService: ChiTietNganChanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChiTietNganChanUpdateComponent],
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
      .overrideTemplate(ChiTietNganChanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChiTietNganChanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chiTietNganChanFormService = TestBed.inject(ChiTietNganChanFormService);
    chiTietNganChanService = TestBed.inject(ChiTietNganChanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const chiTietNganChan: IChiTietNganChan = { id: 456 };

      activatedRoute.data = of({ chiTietNganChan });
      comp.ngOnInit();

      expect(comp.chiTietNganChan).toEqual(chiTietNganChan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChiTietNganChan>>();
      const chiTietNganChan = { id: 123 };
      jest.spyOn(chiTietNganChanFormService, 'getChiTietNganChan').mockReturnValue(chiTietNganChan);
      jest.spyOn(chiTietNganChanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietNganChan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chiTietNganChan }));
      saveSubject.complete();

      // THEN
      expect(chiTietNganChanFormService.getChiTietNganChan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(chiTietNganChanService.update).toHaveBeenCalledWith(expect.objectContaining(chiTietNganChan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChiTietNganChan>>();
      const chiTietNganChan = { id: 123 };
      jest.spyOn(chiTietNganChanFormService, 'getChiTietNganChan').mockReturnValue({ id: null });
      jest.spyOn(chiTietNganChanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietNganChan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chiTietNganChan }));
      saveSubject.complete();

      // THEN
      expect(chiTietNganChanFormService.getChiTietNganChan).toHaveBeenCalled();
      expect(chiTietNganChanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IChiTietNganChan>>();
      const chiTietNganChan = { id: 123 };
      jest.spyOn(chiTietNganChanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietNganChan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chiTietNganChanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
