import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhSachDuongSu } from '../danh-sach-duong-su.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-sach-duong-su.test-samples';

import { DanhSachDuongSuService, RestDanhSachDuongSu } from './danh-sach-duong-su.service';

const requireRestSample: RestDanhSachDuongSu = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DanhSachDuongSu Service', () => {
  let service: DanhSachDuongSuService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhSachDuongSu | IDanhSachDuongSu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhSachDuongSuService);
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

    it('should create a DanhSachDuongSu', () => {
      const danhSachDuongSu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhSachDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhSachDuongSu', () => {
      const danhSachDuongSu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhSachDuongSu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhSachDuongSu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhSachDuongSu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhSachDuongSu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhSachDuongSuToCollectionIfMissing', () => {
      it('should add a DanhSachDuongSu to an empty array', () => {
        const danhSachDuongSu: IDanhSachDuongSu = sampleWithRequiredData;
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing([], danhSachDuongSu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachDuongSu);
      });

      it('should not add a DanhSachDuongSu to an array that contains it', () => {
        const danhSachDuongSu: IDanhSachDuongSu = sampleWithRequiredData;
        const danhSachDuongSuCollection: IDanhSachDuongSu[] = [
          {
            ...danhSachDuongSu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing(danhSachDuongSuCollection, danhSachDuongSu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhSachDuongSu to an array that doesn't contain it", () => {
        const danhSachDuongSu: IDanhSachDuongSu = sampleWithRequiredData;
        const danhSachDuongSuCollection: IDanhSachDuongSu[] = [sampleWithPartialData];
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing(danhSachDuongSuCollection, danhSachDuongSu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachDuongSu);
      });

      it('should add only unique DanhSachDuongSu to an array', () => {
        const danhSachDuongSuArray: IDanhSachDuongSu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhSachDuongSuCollection: IDanhSachDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing(danhSachDuongSuCollection, ...danhSachDuongSuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhSachDuongSu: IDanhSachDuongSu = sampleWithRequiredData;
        const danhSachDuongSu2: IDanhSachDuongSu = sampleWithPartialData;
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing([], danhSachDuongSu, danhSachDuongSu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachDuongSu);
        expect(expectedResult).toContain(danhSachDuongSu2);
      });

      it('should accept null and undefined values', () => {
        const danhSachDuongSu: IDanhSachDuongSu = sampleWithRequiredData;
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing([], null, danhSachDuongSu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachDuongSu);
      });

      it('should return initial array if no DanhSachDuongSu is added', () => {
        const danhSachDuongSuCollection: IDanhSachDuongSu[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachDuongSuToCollectionIfMissing(danhSachDuongSuCollection, undefined, null);
        expect(expectedResult).toEqual(danhSachDuongSuCollection);
      });
    });

    describe('compareDanhSachDuongSu', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhSachDuongSu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhSachDuongSu(entity1, entity2);
        const compareResult2 = service.compareDanhSachDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhSachDuongSu(entity1, entity2);
        const compareResult2 = service.compareDanhSachDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhSachDuongSu(entity1, entity2);
        const compareResult2 = service.compareDanhSachDuongSu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
