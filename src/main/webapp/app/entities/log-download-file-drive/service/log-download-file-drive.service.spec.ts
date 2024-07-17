import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILogDownloadFileDrive } from '../log-download-file-drive.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../log-download-file-drive.test-samples';

import { LogDownloadFileDriveService, RestLogDownloadFileDrive } from './log-download-file-drive.service';

const requireRestSample: RestLogDownloadFileDrive = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('LogDownloadFileDrive Service', () => {
  let service: LogDownloadFileDriveService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogDownloadFileDrive | ILogDownloadFileDrive[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogDownloadFileDriveService);
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

    it('should create a LogDownloadFileDrive', () => {
      const logDownloadFileDrive = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logDownloadFileDrive).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogDownloadFileDrive', () => {
      const logDownloadFileDrive = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logDownloadFileDrive).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogDownloadFileDrive', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogDownloadFileDrive', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogDownloadFileDrive', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogDownloadFileDriveToCollectionIfMissing', () => {
      it('should add a LogDownloadFileDrive to an empty array', () => {
        const logDownloadFileDrive: ILogDownloadFileDrive = sampleWithRequiredData;
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing([], logDownloadFileDrive);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logDownloadFileDrive);
      });

      it('should not add a LogDownloadFileDrive to an array that contains it', () => {
        const logDownloadFileDrive: ILogDownloadFileDrive = sampleWithRequiredData;
        const logDownloadFileDriveCollection: ILogDownloadFileDrive[] = [
          {
            ...logDownloadFileDrive,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing(logDownloadFileDriveCollection, logDownloadFileDrive);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogDownloadFileDrive to an array that doesn't contain it", () => {
        const logDownloadFileDrive: ILogDownloadFileDrive = sampleWithRequiredData;
        const logDownloadFileDriveCollection: ILogDownloadFileDrive[] = [sampleWithPartialData];
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing(logDownloadFileDriveCollection, logDownloadFileDrive);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logDownloadFileDrive);
      });

      it('should add only unique LogDownloadFileDrive to an array', () => {
        const logDownloadFileDriveArray: ILogDownloadFileDrive[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logDownloadFileDriveCollection: ILogDownloadFileDrive[] = [sampleWithRequiredData];
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing(logDownloadFileDriveCollection, ...logDownloadFileDriveArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logDownloadFileDrive: ILogDownloadFileDrive = sampleWithRequiredData;
        const logDownloadFileDrive2: ILogDownloadFileDrive = sampleWithPartialData;
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing([], logDownloadFileDrive, logDownloadFileDrive2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logDownloadFileDrive);
        expect(expectedResult).toContain(logDownloadFileDrive2);
      });

      it('should accept null and undefined values', () => {
        const logDownloadFileDrive: ILogDownloadFileDrive = sampleWithRequiredData;
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing([], null, logDownloadFileDrive, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logDownloadFileDrive);
      });

      it('should return initial array if no LogDownloadFileDrive is added', () => {
        const logDownloadFileDriveCollection: ILogDownloadFileDrive[] = [sampleWithRequiredData];
        expectedResult = service.addLogDownloadFileDriveToCollectionIfMissing(logDownloadFileDriveCollection, undefined, null);
        expect(expectedResult).toEqual(logDownloadFileDriveCollection);
      });
    });

    describe('compareLogDownloadFileDrive', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogDownloadFileDrive(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogDownloadFileDrive(entity1, entity2);
        const compareResult2 = service.compareLogDownloadFileDrive(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogDownloadFileDrive(entity1, entity2);
        const compareResult2 = service.compareLogDownloadFileDrive(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogDownloadFileDrive(entity1, entity2);
        const compareResult2 = service.compareLogDownloadFileDrive(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
