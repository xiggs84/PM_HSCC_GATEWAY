import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICauHinhThongTinDuongSu } from '../cau-hinh-thong-tin-duong-su.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../cau-hinh-thong-tin-duong-su.test-samples';

import { CauHinhThongTinDuongSuService } from './cau-hinh-thong-tin-duong-su.service';

const requireRestSample: ICauHinhThongTinDuongSu = {
  ...sampleWithRequiredData,
};

describe('CauHinhThongTinDuongSu Service', () => {
  let service: CauHinhThongTinDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: ICauHinhThongTinDuongSu | ICauHinhThongTinDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CauHinhThongTinDuongSuService);
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

    it('should create a CauHinhThongTinDuongSu', () => {
      const cauHinhThongTinDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cauHinhThongTinDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CauHinhThongTinDuongSu', () => {
      const cauHinhThongTinDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cauHinhThongTinDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CauHinhThongTinDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CauHinhThongTinDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CauHinhThongTinDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCauHinhThongTinDuongSuToCollectionIfMissing', () => {
      it('should add a CauHinhThongTinDuongSu to an empty array', () => {
        const cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu = sampleWithRequiredData;
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing([], cauHinhThongTinDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhThongTinDuongSu);
      });

      it('should not add a CauHinhThongTinDuongSu to an array that contains it', () => {
        const cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu = sampleWithRequiredData;
        const cauHinhThongTinDuongSuCollection: ICauHinhThongTinDuongSu[] = [
          {
            ...cauHinhThongTinDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing(cauHinhThongTinDuongSuCollection, cauHinhThongTinDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CauHinhThongTinDuongSu to an array that doesn't contain it", () => {
        const cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu = sampleWithRequiredData;
        const cauHinhThongTinDuongSuCollection: ICauHinhThongTinDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing(cauHinhThongTinDuongSuCollection, cauHinhThongTinDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhThongTinDuongSu);
      });

      it('should add only unique CauHinhThongTinDuongSu to an array', () => {
        const cauHinhThongTinDuongSuArray: ICauHinhThongTinDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const cauHinhThongTinDuongSuCollection: ICauHinhThongTinDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing(
          cauHinhThongTinDuongSuCollection,
          ...cauHinhThongTinDuongSuArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu = sampleWithRequiredData;
        const cauHinhThongTinDuongSu2: ICauHinhThongTinDuongSu = sampleWithPartialData;
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing([], cauHinhThongTinDuongSu, cauHinhThongTinDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cauHinhThongTinDuongSu);
        expect(expectedResult).toContain(cauHinhThongTinDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const cauHinhThongTinDuongSu: ICauHinhThongTinDuongSu = sampleWithRequiredData;
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing([], null, cauHinhThongTinDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cauHinhThongTinDuongSu);
      });

      it('should return initial array if no CauHinhThongTinDuongSu is added', () => {
        const cauHinhThongTinDuongSuCollection: ICauHinhThongTinDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addCauHinhThongTinDuongSuToCollectionIfMissing(cauHinhThongTinDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(cauHinhThongTinDuongSuCollection);
      });
    });

    describe('compareCauHinhThongTinDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCauHinhThongTinDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCauHinhThongTinDuongSu(entity1, entity2);
        const compareResult2 = service.compareCauHinhThongTinDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCauHinhThongTinDuongSu(entity1, entity2);
        const compareResult2 = service.compareCauHinhThongTinDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCauHinhThongTinDuongSu(entity1, entity2);
        const compareResult2 = service.compareCauHinhThongTinDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
