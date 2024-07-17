import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IUserOnline } from '../user-online.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../user-online.test-samples';

import { UserOnlineService } from './user-online.service';

const requireRestSample: IUserOnline = {
  ...sampleWithRequiredData,
};

describe('UserOnline Service', () => {
  let service: UserOnlineService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserOnline | IUserOnline[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(UserOnlineService);
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

    it('should create a UserOnline', () => {
      const userOnline = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userOnline).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserOnline', () => {
      const userOnline = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userOnline).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserOnline', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserOnline', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserOnline', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUserOnlineToCollectionIfMissing', () => {
      it('should add a UserOnline to an empty array', () => {
        const userOnline: IUserOnline = sampleWithRequiredData;
        expectedResult = service.addUserOnlineToCollectionIfMissing([], userOnline);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userOnline);
      });

      it('should not add a UserOnline to an array that contains it', () => {
        const userOnline: IUserOnline = sampleWithRequiredData;
        const userOnlineCollection: IUserOnline[] = [
          {
            ...userOnline,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserOnlineToCollectionIfMissing(userOnlineCollection, userOnline);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserOnline to an array that doesn't contain it", () => {
        const userOnline: IUserOnline = sampleWithRequiredData;
        const userOnlineCollection: IUserOnline[] = [sampleWithPartialData];
        expectedResult = service.addUserOnlineToCollectionIfMissing(userOnlineCollection, userOnline);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userOnline);
      });

      it('should add only unique UserOnline to an array', () => {
        const userOnlineArray: IUserOnline[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userOnlineCollection: IUserOnline[] = [sampleWithRequiredData];
        expectedResult = service.addUserOnlineToCollectionIfMissing(userOnlineCollection, ...userOnlineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userOnline: IUserOnline = sampleWithRequiredData;
        const userOnline2: IUserOnline = sampleWithPartialData;
        expectedResult = service.addUserOnlineToCollectionIfMissing([], userOnline, userOnline2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userOnline);
        expect(expectedResult).toContain(userOnline2);
      });

      it('should accept null and undefined values', () => {
        const userOnline: IUserOnline = sampleWithRequiredData;
        expectedResult = service.addUserOnlineToCollectionIfMissing([], null, userOnline, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userOnline);
      });

      it('should return initial array if no UserOnline is added', () => {
        const userOnlineCollection: IUserOnline[] = [sampleWithRequiredData];
        expectedResult = service.addUserOnlineToCollectionIfMissing(userOnlineCollection, undefined, null);
        expect(expectedResult).toEqual(userOnlineCollection);
      });
    });

    describe('compareUserOnline', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserOnline(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserOnline(entity1, entity2);
        const compareResult2 = service.compareUserOnline(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserOnline(entity1, entity2);
        const compareResult2 = service.compareUserOnline(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserOnline(entity1, entity2);
        const compareResult2 = service.compareUserOnline(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
