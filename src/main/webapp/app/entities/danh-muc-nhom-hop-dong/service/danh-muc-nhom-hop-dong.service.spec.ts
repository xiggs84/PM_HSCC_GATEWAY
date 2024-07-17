import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucNhomHopDong } from '../danh-muc-nhom-hop-dong.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-nhom-hop-dong.test-samples';

import { DanhMucNhomHopDongService } from './danh-muc-nhom-hop-dong.service';

const requireRestSample: IDanhMucNhomHopDong = {
  ...sampleWithRequiredData,
};

describe('DanhMucNhomHopDong Service', () => {
  let service: DanhMucNhomHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucNhomHopDong | IDanhMucNhomHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucNhomHopDongService);
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

    it('should create a DanhMucNhomHopDong', () => {
      const danhMucNhomHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucNhomHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucNhomHopDong', () => {
      const danhMucNhomHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucNhomHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucNhomHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucNhomHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucNhomHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucNhomHopDongToCollectionIfMissing', () => {
      it('should add a DanhMucNhomHopDong to an empty array', () => {
        const danhMucNhomHopDong: IDanhMucNhomHopDong = sampleWithRequiredData;
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing([], danhMucNhomHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNhomHopDong);
      });

      it('should not add a DanhMucNhomHopDong to an array that contains it', () => {
        const danhMucNhomHopDong: IDanhMucNhomHopDong = sampleWithRequiredData;
        const danhMucNhomHopDongCollection: IDanhMucNhomHopDong[] = [
          {
            ...danhMucNhomHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing(danhMucNhomHopDongCollection, danhMucNhomHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucNhomHopDong to an array that doesn't contain it", () => {
        const danhMucNhomHopDong: IDanhMucNhomHopDong = sampleWithRequiredData;
        const danhMucNhomHopDongCollection: IDanhMucNhomHopDong[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing(danhMucNhomHopDongCollection, danhMucNhomHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNhomHopDong);
      });

      it('should add only unique DanhMucNhomHopDong to an array', () => {
        const danhMucNhomHopDongArray: IDanhMucNhomHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucNhomHopDongCollection: IDanhMucNhomHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing(danhMucNhomHopDongCollection, ...danhMucNhomHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucNhomHopDong: IDanhMucNhomHopDong = sampleWithRequiredData;
        const danhMucNhomHopDong2: IDanhMucNhomHopDong = sampleWithPartialData;
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing([], danhMucNhomHopDong, danhMucNhomHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNhomHopDong);
        expect(expectedResult).toContain(danhMucNhomHopDong2);
      });

      it('should accept null and undefined values', () => {
        const danhMucNhomHopDong: IDanhMucNhomHopDong = sampleWithRequiredData;
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing([], null, danhMucNhomHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNhomHopDong);
      });

      it('should return initial array if no DanhMucNhomHopDong is added', () => {
        const danhMucNhomHopDongCollection: IDanhMucNhomHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNhomHopDongToCollectionIfMissing(danhMucNhomHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucNhomHopDongCollection);
      });
    });

    describe('compareDanhMucNhomHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucNhomHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucNhomHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhMucNhomHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucNhomHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhMucNhomHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucNhomHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhMucNhomHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
