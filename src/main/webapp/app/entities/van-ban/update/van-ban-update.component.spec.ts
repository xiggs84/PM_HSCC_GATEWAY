import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { VanBanService } from '../service/van-ban.service';
import { IVanBan } from '../van-ban.model';
import { VanBanFormService } from './van-ban-form.service';

import { VanBanUpdateComponent } from './van-ban-update.component';

describe('VanBan Management Update Component', () => {
  let comp: VanBanUpdateComponent;
  let fixture: ComponentFixture<VanBanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vanBanFormService: VanBanFormService;
  let vanBanService: VanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VanBanUpdateComponent],
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
      .overrideTemplate(VanBanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VanBanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vanBanFormService = TestBed.inject(VanBanFormService);
    vanBanService = TestBed.inject(VanBanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const vanBan: IVanBan = { id: 456 };

      activatedRoute.data = of({ vanBan });
      comp.ngOnInit();

      expect(comp.vanBan).toEqual(vanBan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVanBan>>();
      const vanBan = { id: 123 };
      jest.spyOn(vanBanFormService, 'getVanBan').mockReturnValue(vanBan);
      jest.spyOn(vanBanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vanBan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vanBan }));
      saveSubject.complete();

      // THEN
      expect(vanBanFormService.getVanBan).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(vanBanService.update).toHaveBeenCalledWith(expect.objectContaining(vanBan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVanBan>>();
      const vanBan = { id: 123 };
      jest.spyOn(vanBanFormService, 'getVanBan').mockReturnValue({ id: null });
      jest.spyOn(vanBanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vanBan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vanBan }));
      saveSubject.complete();

      // THEN
      expect(vanBanFormService.getVanBan).toHaveBeenCalled();
      expect(vanBanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVanBan>>();
      const vanBan = { id: 123 };
      jest.spyOn(vanBanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vanBan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vanBanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
