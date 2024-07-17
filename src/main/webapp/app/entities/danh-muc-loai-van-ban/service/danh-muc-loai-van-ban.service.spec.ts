import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucLoaiVanBan } from '../danh-muc-loai-van-ban.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../danh-muc-loai-van-ban.test-samples';

import { DanhMucLoaiVanBanService } from './danh-muc-loai-van-ban.service';

const requireRestSample: IDanhMucLoaiVanBan = {
  ...sampleWithRequiredData,
};

describe('DanhMucLoaiVanBan Service', () => {
  let service: DanhMucLoaiVanBanService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucLoaiVanBan | IDanhMucLoaiVanBan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucLoaiVanBanService);
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

    it('should create a DanhMucLoaiVanBan', () => {
      const danhMucLoaiVanBan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucLoaiVanBan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucLoaiVanBan', () => {
      const danhMucLoaiVanBan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucLoaiVanBan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucLoaiVanBan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucLoaiVanBan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucLoaiVanBan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucLoaiVanBanToCollectionIfMissing', () => {
      it('should add a DanhMucLoaiVanBan to an empty array', () => {
        const danhMucLoaiVanBan: IDanhMucLoaiVanBan = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing([], danhMucLoaiVanBan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiVanBan);
      });

      it('should not add a DanhMucLoaiVanBan to an array that contains it', () => {
        const danhMucLoaiVanBan: IDanhMucLoaiVanBan = sampleWithRequiredData;
        const danhMucLoaiVanBanCollection: IDanhMucLoaiVanBan[] = [
          {
            ...danhMucLoaiVanBan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing(danhMucLoaiVanBanCollection, danhMucLoaiVanBan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucLoaiVanBan to an array that doesn't contain it", () => {
        const danhMucLoaiVanBan: IDanhMucLoaiVanBan = sampleWithRequiredData;
        const danhMucLoaiVanBanCollection: IDanhMucLoaiVanBan[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing(danhMucLoaiVanBanCollection, danhMucLoaiVanBan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiVanBan);
      });

      it('should add only unique DanhMucLoaiVanBan to an array', () => {
        const danhMucLoaiVanBanArray: IDanhMucLoaiVanBan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucLoaiVanBanCollection: IDanhMucLoaiVanBan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing(danhMucLoaiVanBanCollection, ...danhMucLoaiVanBanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucLoaiVanBan: IDanhMucLoaiVanBan = sampleWithRequiredData;
        const danhMucLoaiVanBan2: IDanhMucLoaiVanBan = sampleWithPartialData;
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing([], danhMucLoaiVanBan, danhMucLoaiVanBan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucLoaiVanBan);
        expect(expectedResult).toContain(danhMucLoaiVanBan2);
      });

      it('should accept null and undefined values', () => {
        const danhMucLoaiVanBan: IDanhMucLoaiVanBan = sampleWithRequiredData;
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing([], null, danhMucLoaiVanBan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucLoaiVanBan);
      });

      it('should return initial array if no DanhMucLoaiVanBan is added', () => {
        const danhMucLoaiVanBanCollection: IDanhMucLoaiVanBan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucLoaiVanBanToCollectionIfMissing(danhMucLoaiVanBanCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucLoaiVanBanCollection);
      });
    });

    describe('compareDanhMucLoaiVanBan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucLoaiVanBan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucLoaiVanBan(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiVanBan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucLoaiVanBan(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiVanBan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucLoaiVanBan(entity1, entity2);
        const compareResult2 = service.compareDanhMucLoaiVanBan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
