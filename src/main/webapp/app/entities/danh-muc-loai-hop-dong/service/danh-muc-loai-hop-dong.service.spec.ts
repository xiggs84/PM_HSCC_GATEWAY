import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhMucLoaiHopDong } from '../danh-muc-loai-hop-dong.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-hop-dong.test-samples';

import { DanhMucLoaiHopDongService, RestDanhMucLoaiHopDong } from './danh-muc-loai-hop-dong.service';

const requireRestSample: RestDanhMucLoaiHopDong = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('DanhMucLoaiHopDong Service', () => {
  let service: DanhMucLoaiHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiHopDong | IDanhMucLoaiHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiHopDongService);
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

    it('should create a DanhMucLoaiHopDong', () => {
      const danhMucLoaiHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiHopDong', () => {
      const danhMucLoaiHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiHopDongToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiHopDong to an empty array', () => {
        const danhMucLoaiHopDong: IDanhMucLoaiHopDong = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing([], danhMucLoaiHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiHopDong);
      });

      it('should not add a DanhMucLoaiHopDong to an array that contains it', () => {
        const danhMucLoaiHopDong: IDanhMucLoaiHopDong = sampleWithRequiredData;
        const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [
          {
            ...danhMucLoaiHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing(danhMucLoaiHopDongCollection, danhMucLoaiHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiHopDong to an array that doesn't contain it", () => {
        const danhMucLoaiHopDong: IDanhMucLoaiHopDong = sampleWithRequiredData;
        const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing(danhMucLoaiHopDongCollection, danhMucLoaiHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiHopDong);
      });

      it('should add only unique DanhMucLoaiHopDong to an array', () => {
        const danhMucLoaiHopDongArray: IDanhMucLoaiHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing(danhMucLoaiHopDongCollection, ...danhMucLoaiHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiHopDong: IDanhMucLoaiHopDong = sampleWithRequiredData;
        const danhMucLoaiHopDong2: IDanhMucLoaiHopDong = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing([], danhMucLoaiHopDong, danhMucLoaiHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiHopDong);
        expect(expectedResult).toContain(danhMucLoaiHopDong2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiHopDong: IDanhMucLoaiHopDong = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing([], null, danhMucLoaiHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiHopDong);
      });

      it('should return initial array if no DanhMucLoaiHopDong is added', () => {
        const danhMucLoaiHopDongCollection: IDanhMucLoaiHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiHopDongToCollectionIfMissing(danhMucLoaiHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiHopDongCollection);
      });
    });

    describe('compareDanhMucLoaiHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
