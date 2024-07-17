import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucTuVietTat } from '../danh-muc-tu-viet-tat.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-tu-viet-tat.test-samples';

import { DanhMucTuVietTatService, RestDanhMucTuVietTat } from './danh-muc-tu-viet-tat.service';

const requireRestSample: RestDanhMucTuVietTat = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.toJSON(),
};

describe('DanhMucTuVietTat Service', () => {
  let service: DanhMucTuVietTatService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucTuVietTat | IDanhMucTuVietTat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucTuVietTatService);
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

    it('should create a DanhMucTuVietTat', () => {
      const danhMucTuVietTat = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucTuVietTat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucTuVietTat', () => {
      const danhMucTuVietTat = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucTuVietTat).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucTuVietTat', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucTuVietTat', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucTuVietTat', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucTuVietTatToCollectionIfMissing', () => {
      it('should add a DanhMucTuVietTat to an empty array', () => {
        const danhMucTuVietTat: IDanhMucTuVietTat = sampleWithRequiredData;
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing([], danhMucTuVietTat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTuVietTat);
      });

      it('should not add a DanhMucTuVietTat to an array that contains it', () => {
        const danhMucTuVietTat: IDanhMucTuVietTat = sampleWithRequiredData;
        const danhMucTuVietTatCollection: IDanhMucTuVietTat[] = [
          {
            ...danhMucTuVietTat,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing(danhMucTuVietTatCollection, danhMucTuVietTat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucTuVietTat to an array that doesn't contain it", () => {
        const danhMucTuVietTat: IDanhMucTuVietTat = sampleWithRequiredData;
        const danhMucTuVietTatCollection: IDanhMucTuVietTat[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing(danhMucTuVietTatCollection, danhMucTuVietTat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTuVietTat);
      });

      it('should add only unique DanhMucTuVietTat to an array', () => {
        const danhMucTuVietTatArray: IDanhMucTuVietTat[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucTuVietTatCollection: IDanhMucTuVietTat[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing(danhMucTuVietTatCollection, ...danhMucTuVietTatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucTuVietTat: IDanhMucTuVietTat = sampleWithRequiredData;
        const danhMucTuVietTat2: IDanhMucTuVietTat = sampleWithPartialData;
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing([], danhMucTuVietTat, danhMucTuVietTat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucTuVietTat);
        expect(expectedResult).toContain(danhMucTuVietTat2);
      });

      it('should accept null and undefined values', () => {
        const danhMucTuVietTat: IDanhMucTuVietTat = sampleWithRequiredData;
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing([], null, danhMucTuVietTat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucTuVietTat);
      });

      it('should return initial array if no DanhMucTuVietTat is added', () => {
        const danhMucTuVietTatCollection: IDanhMucTuVietTat[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucTuVietTatToCollectionIfMissing(danhMucTuVietTatCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucTuVietTatCollection);
      });
    });

    describe('compareDanhMucTuVietTat', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucTuVietTat(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucTuVietTat(entity1, entity2);
        const compareResult2 = service.compareDanhMucTuVietTat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucTuVietTat(entity1, entity2);
        const compareResult2 = service.compareDanhMucTuVietTat(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucTuVietTat(entity1, entity2);
        const compareResult2 = service.compareDanhMucTuVietTat(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
