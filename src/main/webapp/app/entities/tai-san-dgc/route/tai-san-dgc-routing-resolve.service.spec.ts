import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITaiSanDgc } from '../tai-san-dgc.model';
import { TaiSanDgcService } from '../service/tai-san-dgc.service';

import taiSanDgcResolve from './tai-san-dgc-routing-resolve.service';

describe('TaiSanDgc routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TaiSanDgcService;
  let resultTaiSanDgc: ITaiSanDgc | null | undefined;

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
    service = TestBed.inject(TaiSanDgcService);
    resultTaiSanDgc = undefined;
  });

  describe('resolve', () => {
    it('should return ITaiSanDgc returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanDgcResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSanDgc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaiSanDgc).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanDgcResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSanDgc = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTaiSanDgc).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITaiSanDgc>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taiSanDgcResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaiSanDgc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaiSanDgc).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
