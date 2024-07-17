import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILogThaoTac } from '../log-thao-tac.model';
import { LogThaoTacService } from '../service/log-thao-tac.service';

import logThaoTacResolve from './log-thao-tac-routing-resolve.service';

describe('LogThaoTac routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LogThaoTacService;
  let resultLogThaoTac: ILogThaoTac | null | undefined;

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
    service = TestBed.inject(LogThaoTacService);
    resultLogThaoTac = undefined;
  });

  describe('resolve', () => {
    it('should return ILogThaoTac returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logThaoTacResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogThaoTac = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogThaoTac).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        logThaoTacResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogThaoTac = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLogThaoTac).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILogThaoTac>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        logThaoTacResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLogThaoTac = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLogThaoTac).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
