import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { NoiCapGtttService } from '../service/noi-cap-gttt.service';
import { INoiCapGttt } from '../noi-cap-gttt.model';
import { NoiCapGtttFormService } from './noi-cap-gttt-form.service';

import { NoiCapGtttUpdateComponent } from './noi-cap-gttt-update.component';

describe('NoiCapGttt Management Update Component', () => {
  let comp: NoiCapGtttUpdateComponent;
  let fixture: ComponentFixture<NoiCapGtttUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let noiCapGtttFormService: NoiCapGtttFormService;
  let noiCapGtttService: NoiCapGtttService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoiCapGtttUpdateComponent],
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
      .overrideTemplate(NoiCapGtttUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NoiCapGtttUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    noiCapGtttFormService = TestBed.inject(NoiCapGtttFormService);
    noiCapGtttService = TestBed.inject(NoiCapGtttService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const noiCapGttt: INoiCapGttt = { id: 456 };

      activatedRoute.data = of({ noiCapGttt });
      comp.ngOnInit();

      expect(comp.noiCapGttt).toEqual(noiCapGttt);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INoiCapGttt>>();
      const noiCapGttt = { id: 123 };
      jest.spyOn(noiCapGtttFormService, 'getNoiCapGttt').mockReturnValue(noiCapGttt);
      jest.spyOn(noiCapGtttService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ noiCapGttt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: noiCapGttt }));
      saveSubject.complete();

      // THEN
      expect(noiCapGtttFormService.getNoiCapGttt).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(noiCapGtttService.update).toHaveBeenCalledWith(expect.objectContaining(noiCapGttt));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INoiCapGttt>>();
      const noiCapGttt = { id: 123 };
      jest.spyOn(noiCapGtttFormService, 'getNoiCapGttt').mockReturnValue({ id: null });
      jest.spyOn(noiCapGtttService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ noiCapGttt: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: noiCapGttt }));
      saveSubject.complete();

      // THEN
      expect(noiCapGtttFormService.getNoiCapGttt).toHaveBeenCalled();
      expect(noiCapGtttService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INoiCapGttt>>();
      const noiCapGttt = { id: 123 };
      jest.spyOn(noiCapGtttService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ noiCapGttt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(noiCapGtttService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
