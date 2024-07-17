import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucKeyDanhTuFaq } from '../danh-muc-key-danh-tu-faq.model';
import { DanhMucKeyDanhTuFaqService } from '../service/danh-muc-key-danh-tu-faq.service';

import danhMucKeyDanhTuFaqResolve from './danh-muc-key-danh-tu-faq-routing-resolve.service';

describe('DanhMucKeyDanhTuFaq routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucKeyDanhTuFaqService;
  let resultDanhMucKeyDanhTuFaq: IDanhMucKeyDanhTuFaq | null | undefined;

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
    service = TestBed.inject(DanhMucKeyDanhTuFaqService);
    resultDanhMucKeyDanhTuFaq = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucKeyDanhTuFaq returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucKeyDanhTuFaqResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucKeyDanhTuFaq = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucKeyDanhTuFaq).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucKeyDanhTuFaqResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucKeyDanhTuFaq = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucKeyDanhTuFaq).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucKeyDanhTuFaq>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucKeyDanhTuFaqResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucKeyDanhTuFaq = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucKeyDanhTuFaq).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
