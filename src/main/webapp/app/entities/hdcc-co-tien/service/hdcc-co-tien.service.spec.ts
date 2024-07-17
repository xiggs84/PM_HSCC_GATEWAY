import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IHdccCoTien } from '../hdcc-co-tien.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../hdcc-co-tien.test-samples';

import { HdccCoTienService } from './hdcc-co-tien.service';

const requireRestSample: IHdccCoTien = {
  ...sampleWithRequiredData,
};

describe('HdccCoTien Service', () => {
  let service: HdccCoTienService;
  let httpMock: HttpTestingController;
  let expectedResult: IHdccCoTien | IHdccCoTien[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(HdccCoTienService);
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

    it('should create a HdccCoTien', () => {
      const hdccCoTien = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(hdccCoTien).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HdccCoTien', () => {
      const hdccCoTien = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(hdccCoTien).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HdccCoTien', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HdccCoTien', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HdccCoTien', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHdccCoTienToCollectionIfMissing', () => {
      it('should add a HdccCoTien to an empty array', () => {
        const hdccCoTien: IHdccCoTien = sampleWithRequiredData;
        expectedResult = service.addHdccCoTienToCollectionIfMissing([], hdccCoTien);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdccCoTien);
      });

      it('should not add a HdccCoTien to an array that contains it', () => {
        const hdccCoTien: IHdccCoTien = sampleWithRequiredData;
        const hdccCoTienCollection: IHdccCoTien[] = [
          {
            ...hdccCoTien,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHdccCoTienToCollectionIfMissing(hdccCoTienCollection, hdccCoTien);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HdccCoTien to an array that doesn't contain it", () => {
        const hdccCoTien: IHdccCoTien = sampleWithRequiredData;
        const hdccCoTienCollection: IHdccCoTien[] = [sampleWithPartialData];
        expectedResult = service.addHdccCoTienToCollectionIfMissing(hdccCoTienCollection, hdccCoTien);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdccCoTien);
      });

      it('should add only unique HdccCoTien to an array', () => {
        const hdccCoTienArray: IHdccCoTien[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const hdccCoTienCollection: IHdccCoTien[] = [sampleWithRequiredData];
        expectedResult = service.addHdccCoTienToCollectionIfMissing(hdccCoTienCollection, ...hdccCoTienArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hdccCoTien: IHdccCoTien = sampleWithRequiredData;
        const hdccCoTien2: IHdccCoTien = sampleWithPartialData;
        expectedResult = service.addHdccCoTienToCollectionIfMissing([], hdccCoTien, hdccCoTien2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdccCoTien);
        expect(expectedResult).toContain(hdccCoTien2);
      });

      it('should accept null and undefined values', () => {
        const hdccCoTien: IHdccCoTien = sampleWithRequiredData;
        expectedResult = service.addHdccCoTienToCollectionIfMissing([], null, hdccCoTien, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdccCoTien);
      });

      it('should return initial array if no HdccCoTien is added', () => {
        const hdccCoTienCollection: IHdccCoTien[] = [sampleWithRequiredData];
        expectedResult = service.addHdccCoTienToCollectionIfMissing(hdccCoTienCollection, undefined, null);
        expect(expectedResult).toEqual(hdccCoTienCollection);
      });
    });

    describe('compareHdccCoTien', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHdccCoTien(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHdccCoTien(entity1, entity2);
        const compareResult2 = service.compareHdccCoTien(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHdccCoTien(entity1, entity2);
        const compareResult2 = service.compareHdccCoTien(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHdccCoTien(entity1, entity2);
        const compareResult2 = service.compareHdccCoTien(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
