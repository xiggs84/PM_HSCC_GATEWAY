import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IDanhMucKeyDongTuFaq } from '../danh-muc-key-dong-tu-faq.model';
import { DanhMucKeyDongTuFaqService } from '../service/danh-muc-key-dong-tu-faq.service';

import danhMucKeyDongTuFaqResolve from './danh-muc-key-dong-tu-faq-routing-resolve.service';

describe('DanhMucKeyDongTuFaq routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: DanhMucKeyDongTuFaqService;
  let resultDanhMucKeyDongTuFaq: IDanhMucKeyDongTuFaq | null | undefined;

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
    service = TestBed.inject(DanhMucKeyDongTuFaqService);
    resultDanhMucKeyDongTuFaq = undefined;
  });

  describe('resolve', () => {
    it('should return IDanhMucKeyDongTuFaq returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucKeyDongTuFaqResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucKeyDongTuFaq = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucKeyDongTuFaq).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucKeyDongTuFaqResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucKeyDongTuFaq = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDanhMucKeyDongTuFaq).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDanhMucKeyDongTuFaq>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        danhMucKeyDongTuFaqResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultDanhMucKeyDongTuFaq = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultDanhMucKeyDongTuFaq).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
