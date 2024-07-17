import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { CauHinhHopDongService } from '../service/cau-hinh-hop-dong.service';
import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';
import { CauHinhHopDongFormService } from './cau-hinh-hop-dong-form.service';

import { CauHinhHopDongUpdateComponent } from './cau-hinh-hop-dong-update.component';

describe('CauHinhHopDong Management Update Component', () => {
  let comp: CauHinhHopDongUpdateComponent;
  let fixture: ComponentFixture<CauHinhHopDongUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cauHinhHopDongFormService: CauHinhHopDongFormService;
  let cauHinhHopDongService: CauHinhHopDongService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CauHinhHopDongUpdateComponent],
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
      .overrideTemplate(CauHinhHopDongUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CauHinhHopDongUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cauHinhHopDongFormService = TestBed.inject(CauHinhHopDongFormService);
    cauHinhHopDongService = TestBed.inject(CauHinhHopDongService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cauHinhHopDong: ICauHinhHopDong = { id: 456 };

      activatedRoute.data = of({ cauHinhHopDong });
      comp.ngOnInit();

      expect(comp.cauHinhHopDong).toEqual(cauHinhHopDong);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhHopDong>>();
      const cauHinhHopDong = { id: 123 };
      jest.spyOn(cauHinhHopDongFormService, 'getCauHinhHopDong').mockReturnValue(cauHinhHopDong);
      jest.spyOn(cauHinhHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhHopDong }));
      saveSubject.complete();

      // THEN
      expect(cauHinhHopDongFormService.getCauHinhHopDong).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(cauHinhHopDongService.update).toHaveBeenCalledWith(expect.objectContaining(cauHinhHopDong));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhHopDong>>();
      const cauHinhHopDong = { id: 123 };
      jest.spyOn(cauHinhHopDongFormService, 'getCauHinhHopDong').mockReturnValue({ id: null });
      jest.spyOn(cauHinhHopDongService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhHopDong: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cauHinhHopDong }));
      saveSubject.complete();

      // THEN
      expect(cauHinhHopDongFormService.getCauHinhHopDong).toHaveBeenCalled();
      expect(cauHinhHopDongService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICauHinhHopDong>>();
      const cauHinhHopDong = { id: 123 };
      jest.spyOn(cauHinhHopDongService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cauHinhHopDong });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cauHinhHopDongService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
