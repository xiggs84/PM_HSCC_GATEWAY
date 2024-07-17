import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICauHinhThongTinLoaiTaiSan } from '../cau-hinh-thong-tin-loai-tai-san.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../cau-hinh-thong-tin-loai-tai-san.test-samples';

import { CauHinhThongTinLoaiTaiSanService } from './cau-hinh-thong-tin-loai-tai-san.service';

const requireRestSample: ICauHinhThongTinLoaiTaiSan = {
  ...sampleWithRequiredData,
};

describe('CauHinhThongTinLoaiTaiSan Service', () => {
  let service: CauHinhThongTinLoaiTaiSanService;
  let httpMock: HttpTestingController;
  let expectedResult: ICauHinhThongTinLoaiTaiSan | ICauHinhThongTinLoaiTaiSan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CauHinhThongTinLoaiTaiSanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CauHinhThongTinLoaiTaiSan', () => {
      const cauHinhThongTinLoaiTaiSan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cauHinhThongTinLoaiTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CauHinhThongTinLoaiTaiSan', () => {
      const cauHinhThongTinLoaiTaiSan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cauHinhThongTinLoaiTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CauHinhThongTinLoaiTaiSan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CauHinhThongTinLoaiTaiSan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CauHinhThongTinLoaiTaiSan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCauHinhThongTinLoaiTaiSanToCollectionIfMissing', () => {
      it('should add a CauHinhThongTinLoaiTaiSan to an empty array', () => {
        const cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan = sampleWithRequiredData;
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing([], cauHinhThongTinLoaiTaiSan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhThongTinLoaiTaiSan);
      });

      it('should not add a CauHinhThongTinLoaiTaiSan to an array that contains it', () => {
        const cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan = sampleWithRequiredData;
        const cauHinhThongTinLoaiTaiSanCollection: ICauHinhThongTinLoaiTaiSan[] = [
          {
            ...cauHinhThongTinLoaiTaiSan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing(
          cauHinhThongTinLoaiTaiSanCollection,
          cauHinhThongTinLoaiTaiSan,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CauHinhThongTinLoaiTaiSan to an array that doesn't contain it", () => {
        const cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan = sampleWithRequiredData;
        const cauHinhThongTinLoaiTaiSanCollection: ICauHinhThongTinLoaiTaiSan[] = [sampleWithPartialData];
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing(
          cauHinhThongTinLoaiTaiSanCollection,
          cauHinhThongTinLoaiTaiSan,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhThongTinLoaiTaiSan);
      });

      it('should add only unique CauHinhThongTinLoaiTaiSan to an array', () => {
        const cauHinhThongTinLoaiTaiSanArray: ICauHinhThongTinLoaiTaiSan[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const cauHinhThongTinLoaiTaiSanCollection: ICauHinhThongTinLoaiTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing(
          cauHinhThongTinLoaiTaiSanCollection,
          ...cauHinhThongTinLoaiTaiSanArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan = sampleWithRequiredData;
        const cauHinhThongTinLoaiTaiSan2: ICauHinhThongTinLoaiTaiSan = sampleWithPartialData;
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing(
          [],
          cauHinhThongTinLoaiTaiSan,
          cauHinhThongTinLoaiTaiSan2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhThongTinLoaiTaiSan);
        expect(expectedResult).toContain(cauHinhThongTinLoaiTaiSan2);
      });

      it('should accept null and undefined values', () => {
        const cauHinhThongTinLoaiTaiSan: ICauHinhThongTinLoaiTaiSan = sampleWithRequiredData;
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing([], null, cauHinhThongTinLoaiTaiSan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhThongTinLoaiTaiSan);
      });

      it('should return initial array if no CauHinhThongTinLoaiTaiSan is added', () => {
        const cauHinhThongTinLoaiTaiSanCollection: ICauHinhThongTinLoaiTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhThongTinLoaiTaiSanToCollectionIfMissing(cauHinhThongTinLoaiTaiSanCollection, undefined, null);
        expect(expectedResult).toEqual(cauHinhThongTinLoaiTaiSanCollection);
      });
    });

    describe('compareCauHinhThongTinLoaiTaiSan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCauHinhThongTinLoaiTaiSan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCauHinhThongTinLoaiTaiSan(entity1, entity2);
        const compareResult2 = service.compareCauHinhThongTinLoaiTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCauHinhThongTinLoaiTaiSan(entity1, entity2);
        const compareResult2 = service.compareCauHinhThongTinLoaiTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCauHinhThongTinLoaiTaiSan(entity1, entity2);
        const compareResult2 = service.compareCauHinhThongTinLoaiTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
