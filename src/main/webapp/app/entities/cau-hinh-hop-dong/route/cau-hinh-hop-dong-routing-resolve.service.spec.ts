import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ICauHinhHopDong } from '../cau-hinh-hop-dong.model';
import { CauHinhHopDongService } from '../service/cau-hinh-hop-dong.service';

import cauHinhHopDongResolve from './cau-hinh-hop-dong-routing-resolve.service';

describe('CauHinhHopDong routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: CauHinhHopDongService;
  let resultCauHinhHopDong: ICauHinhHopDong | null | undefined;

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
    service = TestBed.inject(CauHinhHopDongService);
    resultCauHinhHopDong = undefined;
  });

  describe('resolve', () => {
    it('should return ICauHinhHopDong returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhHopDong).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCauHinhHopDong).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICauHinhHopDong>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        cauHinhHopDongResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultCauHinhHopDong = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultCauHinhHopDong).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
