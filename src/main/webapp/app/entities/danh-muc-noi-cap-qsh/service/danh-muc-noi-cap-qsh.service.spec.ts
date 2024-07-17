import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDanhMucNoiCapQsh } from '../danh-muc-noi-cap-qsh.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../danh-muc-noi-cap-qsh.test-samples';

import { DanhMucNoiCapQshService } from './danh-muc-noi-cap-qsh.service';

const requireRestSample: IDanhMucNoiCapQsh = {
  ...sampleWithRequiredData,
};

describe('DanhMucNoiCapQsh Service', () => {
  let service: DanhMucNoiCapQshService;
  let httpMock: HttpTestingController;
  let expectedResult: IDanhMucNoiCapQsh | IDanhMucNoiCapQsh[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DanhMucNoiCapQshService);
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

    it('should create a DanhMucNoiCapQsh', () => {
      const danhMucNoiCapQsh = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(danhMucNoiCapQsh).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DanhMucNoiCapQsh', () => {
      const danhMucNoiCapQsh = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(danhMucNoiCapQsh).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DanhMucNoiCapQsh', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DanhMucNoiCapQsh', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DanhMucNoiCapQsh', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDanhMucNoiCapQshToCollectionIfMissing', () => {
      it('should add a DanhMucNoiCapQsh to an empty array', () => {
        const danhMucNoiCapQsh: IDanhMucNoiCapQsh = sampleWithRequiredData;
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing([], danhMucNoiCapQsh);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNoiCapQsh);
      });

      it('should not add a DanhMucNoiCapQsh to an array that contains it', () => {
        const danhMucNoiCapQsh: IDanhMucNoiCapQsh = sampleWithRequiredData;
        const danhMucNoiCapQshCollection: IDanhMucNoiCapQsh[] = [
          {
            ...danhMucNoiCapQsh,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing(danhMucNoiCapQshCollection, danhMucNoiCapQsh);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DanhMucNoiCapQsh to an array that doesn't contain it", () => {
        const danhMucNoiCapQsh: IDanhMucNoiCapQsh = sampleWithRequiredData;
        const danhMucNoiCapQshCollection: IDanhMucNoiCapQsh[] = [sampleWithPartialData];
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing(danhMucNoiCapQshCollection, danhMucNoiCapQsh);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNoiCapQsh);
      });

      it('should add only unique DanhMucNoiCapQsh to an array', () => {
        const danhMucNoiCapQshArray: IDanhMucNoiCapQsh[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const danhMucNoiCapQshCollection: IDanhMucNoiCapQsh[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing(danhMucNoiCapQshCollection, ...danhMucNoiCapQshArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const danhMucNoiCapQsh: IDanhMucNoiCapQsh = sampleWithRequiredData;
        const danhMucNoiCapQsh2: IDanhMucNoiCapQsh = sampleWithPartialData;
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing([], danhMucNoiCapQsh, danhMucNoiCapQsh2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(danhMucNoiCapQsh);
        expect(expectedResult).toContain(danhMucNoiCapQsh2);
      });

      it('should accept null and undefined values', () => {
        const danhMucNoiCapQsh: IDanhMucNoiCapQsh = sampleWithRequiredData;
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing([], null, danhMucNoiCapQsh, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(danhMucNoiCapQsh);
      });

      it('should return initial array if no DanhMucNoiCapQsh is added', () => {
        const danhMucNoiCapQshCollection: IDanhMucNoiCapQsh[] = [sampleWithRequiredData];
        expectedResult = service.addDanhMucNoiCapQshToCollectionIfMissing(danhMucNoiCapQshCollection, undefined, null);
        expect(expectedResult).toEqual(danhMucNoiCapQshCollection);
      });
    });

    describe('compareDanhMucNoiCapQsh', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDanhMucNoiCapQsh(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDanhMucNoiCapQsh(entity1, entity2);
        const compareResult2 = service.compareDanhMucNoiCapQsh(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDanhMucNoiCapQsh(entity1, entity2);
        const compareResult2 = service.compareDanhMucNoiCapQsh(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDanhMucNoiCapQsh(entity1, entity2);
        const compareResult2 = service.compareDanhMucNoiCapQsh(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
