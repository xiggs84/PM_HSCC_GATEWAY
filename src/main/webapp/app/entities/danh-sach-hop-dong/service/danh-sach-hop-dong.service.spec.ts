import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhSachHopDong } from '../danh-sach-hop-dong.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-sach-hop-dong.test-samples';

import { DanhSachHopDongService, RestDanhSachHopDong } from './danh-sach-hop-dong.service';

const requireRestSample: RestDanhSachHopDong = {
  ...sampleWithRequiredData,
  ngayLapHd: sampleWithRequiredData.ngayLapHd?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayThaoTacRutTrich: sampleWithRequiredData.ngayThaoTacRutTrich?.format(DATE_FORMAT),
};

describe('DanhSachHopDong Service', () => {
  let service: DanhSachHopDongService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhSachHopDong | IDanhSachHopDong[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhSachHopDongService);
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

    it('should create a DanhSachHopDong', () => {
      const danhSachHopDong = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhSachHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhSachHopDong', () => {
      const danhSachHopDong = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhSachHopDong).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhSachHopDong', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhSachHopDong', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhSachHopDong', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhSachHopDongToCollectionIfMissing', () => {
      it('should add a DanhSachHopDong to an empty array', () => {
        const danhSachHopDong: IDanhSachHopDong = sampleWithRequiredData;
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing([], danhSachHopDong);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachHopDong);
      });

      it('should not add a DanhSachHopDong to an array that contains it', () => {
        const danhSachHopDong: IDanhSachHopDong = sampleWithRequiredData;
        const danhSachHopDongCollection: IDanhSachHopDong[] = [
          {
            ...danhSachHopDong,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing(danhSachHopDongCollection, danhSachHopDong);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhSachHopDong to an array that doesn't contain it", () => {
        const danhSachHopDong: IDanhSachHopDong = sampleWithRequiredData;
        const danhSachHopDongCollection: IDanhSachHopDong[] = [sampleWithPartialData];
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing(danhSachHopDongCollection, danhSachHopDong);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachHopDong);
      });

      it('should add only unique DanhSachHopDong to an array', () => {
        const danhSachHopDongArray: IDanhSachHopDong[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhSachHopDongCollection: IDanhSachHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing(danhSachHopDongCollection, ...danhSachHopDongArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhSachHopDong: IDanhSachHopDong = sampleWithRequiredData;
        const danhSachHopDong2: IDanhSachHopDong = sampleWithPartialData;
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing([], danhSachHopDong, danhSachHopDong2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachHopDong);
        expect(expectedResult).toContain(danhSachHopDong2);
      });

      it('should accept null and undefined values', () => {
        const danhSachHopDong: IDanhSachHopDong = sampleWithRequiredData;
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing([], null, danhSachHopDong, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachHopDong);
      });

      it('should return initial array if no DanhSachHopDong is added', () => {
        const danhSachHopDongCollection: IDanhSachHopDong[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachHopDongToCollectionIfMissing(danhSachHopDongCollection, undefined, null);
        expect(expectedResult).toEqual(danhSachHopDongCollection);
      });
    });

    describe('compareDanhSachHopDong', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhSachHopDong(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhSachHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhSachHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhSachHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhSachHopDong(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhSachHopDong(entity1, entity2);
        const compareResult2 = service.compareDanhSachHopDong(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
