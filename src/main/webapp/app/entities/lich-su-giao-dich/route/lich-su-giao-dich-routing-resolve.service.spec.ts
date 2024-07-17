import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ILichSuGiaoDich } from '../lich-su-giao-dich.model';
import { LichSuGiaoDichService } from '../service/lich-su-giao-dich.service';

import lichSuGiaoDichResolve from './lich-su-giao-dich-routing-resolve.service';

describe('LichSuGiaoDich routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: LichSuGiaoDichService;
  let resultLichSuGiaoDich: ILichSuGiaoDich | null | undefined;

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
    service = TestBed.inject(LichSuGiaoDichService);
    resultLichSuGiaoDich = undefined;
  });

  describe('resolve', () => {
    it('should return ILichSuGiaoDich returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        lichSuGiaoDichResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLichSuGiaoDich = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLichSuGiaoDich).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        lichSuGiaoDichResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLichSuGiaoDich = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLichSuGiaoDich).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ILichSuGiaoDich>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        lichSuGiaoDichResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultLichSuGiaoDich = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultLichSuGiaoDich).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
