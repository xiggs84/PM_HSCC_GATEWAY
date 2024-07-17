import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILogSearchDsTs } from '../log-search-ds-ts.model';
import { LogSearchDsTsService } from '../service/log-search-ds-ts.service';

import logSearchDsTsResolve from './log-search-ds-ts-routing-resolve.service';

describe('LogSearchDsTs routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LogSearchDsTsService;
  let resultLogSearchDsTs: ILogSearchDsTs | null | undefined;

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
    service = TestBed.inject(LogSearchDsTsService);
    resultLogSearchDsTs = undefined;
  });

  describe('resolve', () => {
    it('should return ILogSearchDsTs returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logSearchDsTsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogSearchDsTs = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogSearchDsTs).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        logSearchDsTsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogSearchDsTs = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLogSearchDsTs).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILogSearchDsTs>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logSearchDsTsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogSearchDsTs = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogSearchDsTs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
