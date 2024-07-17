import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { MigrationsService } from '../service/migrations.service';
import { IMigrations } from '../migrations.model';
import { MigrationsFormService } from './migrations-form.service';

import { MigrationsUpdateComponent } from './migrations-update.component';

describe('Migrations Management Update Component', () => {
  let comp: MigrationsUpdateComponent;
  let fixture: ComponentFixture<MigrationsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let migrationsFormService: MigrationsFormService;
  let migrationsService: MigrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MigrationsUpdateComponent],
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
      .overrideTemplate(MigrationsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MigrationsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    migrationsFormService = TestBed.inject(MigrationsFormService);
    migrationsService = TestBed.inject(MigrationsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const migrations: IMigrations = { id: 456 };

      activatedRoute.data = of({ migrations });
      comp.ngOnInit();

      expect(comp.migrations).toEqual(migrations);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMigrations>>();
      const migrations = { id: 123 };
      jest.spyOn(migrationsFormService, 'getMigrations').mockReturnValue(migrations);
      jest.spyOn(migrationsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ migrations });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: migrations }));
      saveSubject.complete();

      // THEN
      expect(migrationsFormService.getMigrations).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(migrationsService.update).toHaveBeenCalledWith(expect.objectContaining(migrations));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMigrations>>();
      const migrations = { id: 123 };
      jest.spyOn(migrationsFormService, 'getMigrations').mockReturnValue({ id: null });
      jest.spyOn(migrationsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ migrations: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: migrations }));
      saveSubject.complete();

      // THEN
      expect(migrationsFormService.getMigrations).toHaveBeenCalled();
      expect(migrationsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMigrations>>();
      const migrations = { id: 123 };
      jest.spyOn(migrationsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ migrations });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(migrationsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
