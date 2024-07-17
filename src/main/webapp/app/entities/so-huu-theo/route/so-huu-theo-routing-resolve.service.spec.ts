import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ISoHuuTheo } from '../so-huu-theo.model';
import { SoHuuTheoService } from '../service/so-huu-theo.service';

import soHuuTheoResolve from './so-huu-theo-routing-resolve.service';

describe('SoHuuTheo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: SoHuuTheoService;
  let resultSoHuuTheo: ISoHuuTheo | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(SoHuuTheoService);
    resultSoHuuTheo = undefined;
  });

  describe('resolve', () => {
    it('should return ISoHuuTheo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        soHuuTheoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoHuuTheo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultSoHuuTheo).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        soHuuTheoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoHuuTheo = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSoHuuTheo).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ISoHuuTheo>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        soHuuTheoResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultSoHuuTheo = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultSoHuuTheo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
