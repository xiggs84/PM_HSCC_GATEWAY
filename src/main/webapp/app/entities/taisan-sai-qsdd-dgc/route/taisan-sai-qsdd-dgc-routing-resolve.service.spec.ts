import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITaisanSaiQsddDgc } from '../taisan-sai-qsdd-dgc.model';
import { TaisanSaiQsddDgcService } from '../service/taisan-sai-qsdd-dgc.service';

import taisanSaiQsddDgcResolve from './taisan-sai-qsdd-dgc-routing-resolve.service';

describe('TaisanSaiQsddDgc routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TaisanSaiQsddDgcService;
  let resultTaisanSaiQsddDgc: ITaisanSaiQsddDgc | null | undefined;

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
    service = TestBed.inject(TaisanSaiQsddDgcService);
    resultTaisanSaiQsddDgc = undefined;
  });

  describe('resolve', () => {
    it('should return ITaisanSaiQsddDgc returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taisanSaiQsddDgcResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaisanSaiQsddDgc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaisanSaiQsddDgc).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        taisanSaiQsddDgcResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaisanSaiQsddDgc = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTaisanSaiQsddDgc).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITaisanSaiQsddDgc>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taisanSaiQsddDgcResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaisanSaiQsddDgc = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaisanSaiQsddDgc).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
