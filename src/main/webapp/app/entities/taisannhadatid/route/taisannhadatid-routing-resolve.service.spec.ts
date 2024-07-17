import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ITaisannhadatid } from '../taisannhadatid.model';
import { TaisannhadatidService } from '../service/taisannhadatid.service';

import taisannhadatidResolve from './taisannhadatid-routing-resolve.service';

describe('Taisannhadatid routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: TaisannhadatidService;
  let resultTaisannhadatid: ITaisannhadatid | null | undefined;

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
    service = TestBed.inject(TaisannhadatidService);
    resultTaisannhadatid = undefined;
  });

  describe('resolve', () => {
    it('should return ITaisannhadatid returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taisannhadatidResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaisannhadatid = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaisannhadatid).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        taisannhadatidResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaisannhadatid = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTaisannhadatid).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITaisannhadatid>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        taisannhadatidResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultTaisannhadatid = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultTaisannhadatid).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
