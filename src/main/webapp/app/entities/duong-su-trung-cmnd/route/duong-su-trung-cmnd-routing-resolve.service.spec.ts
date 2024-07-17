import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDuongSuTrungCmnd } from '../duong-su-trung-cmnd.model';
import { DuongSuTrungCmndService } from '../service/duong-su-trung-cmnd.service';

import duongSuTrungCmndResolve from './duong-su-trung-cmnd-routing-resolve.service';

describe('DuongSuTrungCmnd routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DuongSuTrungCmndService;
  let resultDuongSuTrungCmnd: IDuongSuTrungCmnd | null | undefined;

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
    service = TestBed.inject(DuongSuTrungCmndService);
    resultDuongSuTrungCmnd = undefined;
  });

  describe('resolve', () => {
    it('should return IDuongSuTrungCmnd returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        duongSuTrungCmndResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDuongSuTrungCmnd = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDuongSuTrungCmnd).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        duongSuTrungCmndResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDuongSuTrungCmnd = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDuongSuTrungCmnd).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDuongSuTrungCmnd>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        duongSuTrungCmndResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDuongSuTrungCmnd = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDuongSuTrungCmnd).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
