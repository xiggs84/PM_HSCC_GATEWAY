import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { DmNoiCapGpdkxService } from '../service/dm-noi-cap-gpdkx.service';
import { IDmNoiCapGpdkx } from '../dm-noi-cap-gpdkx.model';
import { DmNoiCapGpdkxFormService } from './dm-noi-cap-gpdkx-form.service';

import { DmNoiCapGpdkxUpdateComponent } from './dm-noi-cap-gpdkx-update.component';

describe('DmNoiCapGpdkx Management Update Component', () => {
  let comp: DmNoiCapGpdkxUpdateComponent;
  let fixture: ComponentFixture<DmNoiCapGpdkxUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dmNoiCapGpdkxFormService: DmNoiCapGpdkxFormService;
  let dmNoiCapGpdkxService: DmNoiCapGpdkxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DmNoiCapGpdkxUpdateComponent],
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
      .overrideTemplate(DmNoiCapGpdkxUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DmNoiCapGpdkxUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dmNoiCapGpdkxFormService = TestBed.inject(DmNoiCapGpdkxFormService);
    dmNoiCapGpdkxService = TestBed.inject(DmNoiCapGpdkxService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const dmNoiCapGpdkx: IDmNoiCapGpdkx = { id: 456 };

      activatedRoute.data = of({ dmNoiCapGpdkx });
      comp.ngOnInit();

      expect(comp.dmNoiCapGpdkx).toEqual(dmNoiCapGpdkx);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmNoiCapGpdkx>>();
      const dmNoiCapGpdkx = { id: 123 };
      jest.spyOn(dmNoiCapGpdkxFormService, 'getDmNoiCapGpdkx').mockReturnValue(dmNoiCapGpdkx);
      jest.spyOn(dmNoiCapGpdkxService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmNoiCapGpdkx });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmNoiCapGpdkx }));
      saveSubject.complete();

      // THEN
      expect(dmNoiCapGpdkxFormService.getDmNoiCapGpdkx).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dmNoiCapGpdkxService.update).toHaveBeenCalledWith(expect.objectContaining(dmNoiCapGpdkx));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmNoiCapGpdkx>>();
      const dmNoiCapGpdkx = { id: 123 };
      jest.spyOn(dmNoiCapGpdkxFormService, 'getDmNoiCapGpdkx').mockReturnValue({ id: null });
      jest.spyOn(dmNoiCapGpdkxService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmNoiCapGpdkx: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dmNoiCapGpdkx }));
      saveSubject.complete();

      // THEN
      expect(dmNoiCapGpdkxFormService.getDmNoiCapGpdkx).toHaveBeenCalled();
      expect(dmNoiCapGpdkxService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDmNoiCapGpdkx>>();
      const dmNoiCapGpdkx = { id: 123 };
      jest.spyOn(dmNoiCapGpdkxService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dmNoiCapGpdkx });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dmNoiCapGpdkxService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
