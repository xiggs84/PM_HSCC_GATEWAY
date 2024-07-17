import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ThuaTachService } from '../service/thua-tach.service';
import { IThuaTach } from '../thua-tach.model';
import { ThuaTachFormService } from './thua-tach-form.service';

import { ThuaTachUpdateComponent } from './thua-tach-update.component';

describe('ThuaTach Management Update Component', () => {
  let comp: ThuaTachUpdateComponent;
  let fixture: ComponentFixture<ThuaTachUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thuaTachFormService: ThuaTachFormService;
  let thuaTachService: ThuaTachService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThuaTachUpdateComponent],
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
      .overrideTemplate(ThuaTachUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThuaTachUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thuaTachFormService = TestBed.inject(ThuaTachFormService);
    thuaTachService = TestBed.inject(ThuaTachService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const thuaTach: IThuaTach = { id: 456 };

      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      expect(comp.thuaTach).toEqual(thuaTach);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThuaTach>>();
      const thuaTach = { id: 123 };
      jest.spyOn(thuaTachFormService, 'getThuaTach').mockReturnValue(thuaTach);
      jest.spyOn(thuaTachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thuaTach }));
      saveSubject.complete();

      // THEN
      expect(thuaTachFormService.getThuaTach).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(thuaTachService.update).toHaveBeenCalledWith(expect.objectContaining(thuaTach));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThuaTach>>();
      const thuaTach = { id: 123 };
      jest.spyOn(thuaTachFormService, 'getThuaTach').mockReturnValue({ id: null });
      jest.spyOn(thuaTachService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuaTach: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thuaTach }));
      saveSubject.complete();

      // THEN
      expect(thuaTachFormService.getThuaTach).toHaveBeenCalled();
      expect(thuaTachService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IThuaTach>>();
      const thuaTach = { id: 123 };
      jest.spyOn(thuaTachService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thuaTach });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thuaTachService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
