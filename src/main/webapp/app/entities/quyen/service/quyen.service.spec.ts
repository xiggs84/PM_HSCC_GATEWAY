import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuyen } from '../quyen.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quyen.test-samples';

import { QuyenService } from './quyen.service';

const requireRestSample: IQuyen = {
  ...sampleWithRequiredData,
};

describe('Quyen Service', () => {
  let service: QuyenService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuyen | IQuyen[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuyenService);
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

    it('should create a Quyen', () => {
      const quyen = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quyen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Quyen', () => {
      const quyen = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quyen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Quyen', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Quyen', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Quyen', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuyenToCollectionIfMissing', () => {
      it('should add a Quyen to an empty array', () => {
        const quyen: IQuyen = sampleWithRequiredData;
        expectedResult = service.addQuyenToCollectionIfMissing([], quyen);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quyen);
      });

      it('should not add a Quyen to an array that contains it', () => {
        const quyen: IQuyen = sampleWithRequiredData;
        const quyenCollection: IQuyen[] = [
          {
            ...quyen,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuyenToCollectionIfMissing(quyenCollection, quyen);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Quyen to an array that doesn't contain it", () => {
        const quyen: IQuyen = sampleWithRequiredData;
        const quyenCollection: IQuyen[] = [sampleWithPartialData];
        expectedResult = service.addQuyenToCollectionIfMissing(quyenCollection, quyen);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quyen);
      });

      it('should add only unique Quyen to an array', () => {
        const quyenArray: IQuyen[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quyenCollection: IQuyen[] = [sampleWithRequiredData];
        expectedResult = service.addQuyenToCollectionIfMissing(quyenCollection, ...quyenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quyen: IQuyen = sampleWithRequiredData;
        const quyen2: IQuyen = sampleWithPartialData;
        expectedResult = service.addQuyenToCollectionIfMissing([], quyen, quyen2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quyen);
        expect(expectedResult).toContain(quyen2);
      });

      it('should accept null and undefined values', () => {
        const quyen: IQuyen = sampleWithRequiredData;
        expectedResult = service.addQuyenToCollectionIfMissing([], null, quyen, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quyen);
      });

      it('should return initial array if no Quyen is added', () => {
        const quyenCollection: IQuyen[] = [sampleWithRequiredData];
        expectedResult = service.addQuyenToCollectionIfMissing(quyenCollection, undefined, null);
        expect(expectedResult).toEqual(quyenCollection);
      });
    });

    describe('compareQuyen', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuyen(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuyen(entity1, entity2);
        const compareResult2 = service.compareQuyen(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuyen(entity1, entity2);
        const compareResult2 = service.compareQuyen(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuyen(entity1, entity2);
        const compareResult2 = service.compareQuyen(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
