import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IMenuQuyen } from '../menu-quyen.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../menu-quyen.test-samples';

import { MenuQuyenService } from './menu-quyen.service';

const requireRestSample: IMenuQuyen = {
  ...sampleWithRequiredData,
};

describe('MenuQuyen Service', () => {
  let service: MenuQuyenService;
  let httpMock: HttpTestingController;
  let expectedResult: IMenuQuyen | IMenuQuyen[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(MenuQuyenService);
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

    it('should create a MenuQuyen', () => {
      const menuQuyen = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(menuQuyen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MenuQuyen', () => {
      const menuQuyen = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(menuQuyen).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MenuQuyen', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MenuQuyen', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MenuQuyen', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMenuQuyenToCollectionIfMissing', () => {
      it('should add a MenuQuyen to an empty array', () => {
        const menuQuyen: IMenuQuyen = sampleWithRequiredData;
        expectedResult = service.addMenuQuyenToCollectionIfMissing([], menuQuyen);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menuQuyen);
      });

      it('should not add a MenuQuyen to an array that contains it', () => {
        const menuQuyen: IMenuQuyen = sampleWithRequiredData;
        const menuQuyenCollection: IMenuQuyen[] = [
          {
            ...menuQuyen,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMenuQuyenToCollectionIfMissing(menuQuyenCollection, menuQuyen);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MenuQuyen to an array that doesn't contain it", () => {
        const menuQuyen: IMenuQuyen = sampleWithRequiredData;
        const menuQuyenCollection: IMenuQuyen[] = [sampleWithPartialData];
        expectedResult = service.addMenuQuyenToCollectionIfMissing(menuQuyenCollection, menuQuyen);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menuQuyen);
      });

      it('should add only unique MenuQuyen to an array', () => {
        const menuQuyenArray: IMenuQuyen[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const menuQuyenCollection: IMenuQuyen[] = [sampleWithRequiredData];
        expectedResult = service.addMenuQuyenToCollectionIfMissing(menuQuyenCollection, ...menuQuyenArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const menuQuyen: IMenuQuyen = sampleWithRequiredData;
        const menuQuyen2: IMenuQuyen = sampleWithPartialData;
        expectedResult = service.addMenuQuyenToCollectionIfMissing([], menuQuyen, menuQuyen2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(menuQuyen);
        expect(expectedResult).toContain(menuQuyen2);
      });

      it('should accept null and undefined values', () => {
        const menuQuyen: IMenuQuyen = sampleWithRequiredData;
        expectedResult = service.addMenuQuyenToCollectionIfMissing([], null, menuQuyen, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(menuQuyen);
      });

      it('should return initial array if no MenuQuyen is added', () => {
        const menuQuyenCollection: IMenuQuyen[] = [sampleWithRequiredData];
        expectedResult = service.addMenuQuyenToCollectionIfMissing(menuQuyenCollection, undefined, null);
        expect(expectedResult).toEqual(menuQuyenCollection);
      });
    });

    describe('compareMenuQuyen', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMenuQuyen(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMenuQuyen(entity1, entity2);
        const compareResult2 = service.compareMenuQuyen(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMenuQuyen(entity1, entity2);
        const compareResult2 = service.compareMenuQuyen(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMenuQuyen(entity1, entity2);
        const compareResult2 = service.compareMenuQuyen(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
