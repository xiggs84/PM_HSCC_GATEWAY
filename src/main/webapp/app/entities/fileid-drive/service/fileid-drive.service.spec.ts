import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IFileidDrive } from '../fileid-drive.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../fileid-drive.test-samples';

import { FileidDriveService } from './fileid-drive.service';

const requireRestSample: IFileidDrive = {
  ...sampleWithRequiredData,
};

describe('FileidDrive Service', () => {
  let service: FileidDriveService;
  let httpMock: HttpTestingController;
  let expectedResult: IFileidDrive | IFileidDrive[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(FileidDriveService);
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

    it('should create a FileidDrive', () => {
      const fileidDrive = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(fileidDrive).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a FileidDrive', () => {
      const fileidDrive = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(fileidDrive).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a FileidDrive', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of FileidDrive', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a FileidDrive', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addFileidDriveToCollectionIfMissing', () => {
      it('should add a FileidDrive to an empty array', () => {
        const fileidDrive: IFileidDrive = sampleWithRequiredData;
        expectedResult = service.addFileidDriveToCollectionIfMissing([], fileidDrive);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileidDrive);
      });

      it('should not add a FileidDrive to an array that contains it', () => {
        const fileidDrive: IFileidDrive = sampleWithRequiredData;
        const fileidDriveCollection: IFileidDrive[] = [
          {
            ...fileidDrive,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addFileidDriveToCollectionIfMissing(fileidDriveCollection, fileidDrive);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a FileidDrive to an array that doesn't contain it", () => {
        const fileidDrive: IFileidDrive = sampleWithRequiredData;
        const fileidDriveCollection: IFileidDrive[] = [sampleWithPartialData];
        expectedResult = service.addFileidDriveToCollectionIfMissing(fileidDriveCollection, fileidDrive);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileidDrive);
      });

      it('should add only unique FileidDrive to an array', () => {
        const fileidDriveArray: IFileidDrive[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const fileidDriveCollection: IFileidDrive[] = [sampleWithRequiredData];
        expectedResult = service.addFileidDriveToCollectionIfMissing(fileidDriveCollection, ...fileidDriveArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const fileidDrive: IFileidDrive = sampleWithRequiredData;
        const fileidDrive2: IFileidDrive = sampleWithPartialData;
        expectedResult = service.addFileidDriveToCollectionIfMissing([], fileidDrive, fileidDrive2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(fileidDrive);
        expect(expectedResult).toContain(fileidDrive2);
      });

      it('should accept null and undefined values', () => {
        const fileidDrive: IFileidDrive = sampleWithRequiredData;
        expectedResult = service.addFileidDriveToCollectionIfMissing([], null, fileidDrive, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(fileidDrive);
      });

      it('should return initial array if no FileidDrive is added', () => {
        const fileidDriveCollection: IFileidDrive[] = [sampleWithRequiredData];
        expectedResult = service.addFileidDriveToCollectionIfMissing(fileidDriveCollection, undefined, null);
        expect(expectedResult).toEqual(fileidDriveCollection);
      });
    });

    describe('compareFileidDrive', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareFileidDrive(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareFileidDrive(entity1, entity2);
        const compareResult2 = service.compareFileidDrive(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareFileidDrive(entity1, entity2);
        const compareResult2 = service.compareFileidDrive(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareFileidDrive(entity1, entity2);
        const compareResult2 = service.compareFileidDrive(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
