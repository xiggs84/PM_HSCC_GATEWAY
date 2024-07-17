import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';

import cauHinhMauHopDongResolve from './cau-hinh-mau-hop-dong-routing-resolve.service';

describe('CauHinhMauHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: CauHinhMauHopDongService;
  let resultCauHinhMauHopDong: ICauHinhMauHopDong | null | undefined;

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
    service = TestBed.inject(CauHinhMauHopDongService);
    resultCauHinhMauHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return ICauHinhMauHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhMauHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhMauHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhMauHopDong).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhMauHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhMauHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCauHinhMauHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICauHinhMauHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhMauHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhMauHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhMauHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
