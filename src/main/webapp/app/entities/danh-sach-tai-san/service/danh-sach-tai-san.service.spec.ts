import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDanhSachTaiSan } from '../danh-sach-tai-san.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-sach-tai-san.test-samples';

import { DanhSachTaiSanService, RestDanhSachTaiSan } from './danh-sach-tai-san.service';

const requireRestSample: RestDanhSachTaiSan = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayBdNganChan: sampleWithRequiredData.ngayBdNganChan?.format(DATE_FORMAT),
  ngayKtNganChan: sampleWithRequiredData.ngayKtNganChan?.format(DATE_FORMAT),
};

describe('DanhSachTaiSan Service', () => {
  let service: DanhSachTaiSanService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhSachTaiSan | IDanhSachTaiSan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhSachTaiSanService);
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

    it('should create a DanhSachTaiSan', () => {
      const danhSachTaiSan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhSachTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhSachTaiSan', () => {
      const danhSachTaiSan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhSachTaiSan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhSachTaiSan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhSachTaiSan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhSachTaiSan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhSachTaiSanToCollectionIfMissing', () => {
      it('should add a DanhSachTaiSan to an empty array', () => {
        const danhSachTaiSan: IDanhSachTaiSan = sampleWithRequiredData;
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing([], danhSachTaiSan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachTaiSan);
      });

      it('should not add a DanhSachTaiSan to an array that contains it', () => {
        const danhSachTaiSan: IDanhSachTaiSan = sampleWithRequiredData;
        const danhSachTaiSanCollection: IDanhSachTaiSan[] = [
          {
            ...danhSachTaiSan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing(danhSachTaiSanCollection, danhSachTaiSan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhSachTaiSan to an array that doesn't contain it", () => {
        const danhSachTaiSan: IDanhSachTaiSan = sampleWithRequiredData;
        const danhSachTaiSanCollection: IDanhSachTaiSan[] = [sampleWithPartialData];
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing(danhSachTaiSanCollection, danhSachTaiSan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachTaiSan);
      });

      it('should add only unique DanhSachTaiSan to an array', () => {
        const danhSachTaiSanArray: IDanhSachTaiSan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhSachTaiSanCollection: IDanhSachTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing(danhSachTaiSanCollection, ...danhSachTaiSanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhSachTaiSan: IDanhSachTaiSan = sampleWithRequiredData;
        const danhSachTaiSan2: IDanhSachTaiSan = sampleWithPartialData;
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing([], danhSachTaiSan, danhSachTaiSan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhSachTaiSan);
        expect(expectedResult).toContain(danhSachTaiSan2);
      });

      it('should accept null and undefined values', () => {
        const danhSachTaiSan: IDanhSachTaiSan = sampleWithRequiredData;
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing([], null, danhSachTaiSan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhSachTaiSan);
      });

      it('should return initial array if no DanhSachTaiSan is added', () => {
        const danhSachTaiSanCollection: IDanhSachTaiSan[] = [sampleWithRequiredData];
        expectedResult = service.addDanhSachTaiSanToCollectionIfMissing(danhSachTaiSanCollection, undefined, null);
        expect(expectedResult).toEqual(danhSachTaiSanCollection);
      });
    });

    describe('compareDanhSachTaiSan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhSachTaiSan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhSachTaiSan(entity1, entity2);
        const compareResult2 = service.compareDanhSachTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhSachTaiSan(entity1, entity2);
        const compareResult2 = service.compareDanhSachTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhSachTaiSan(entity1, entity2);
        const compareResult2 = service.compareDanhSachTaiSan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
