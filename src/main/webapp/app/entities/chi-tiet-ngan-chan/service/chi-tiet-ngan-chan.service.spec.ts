import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IChiTietNganChan } from '../chi-tiet-ngan-chan.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../chi-tiet-ngan-chan.test-samples';

import { ChiTietNganChanService, RestChiTietNganChan } from './chi-tiet-ngan-chan.service';

const requireRestSample: RestChiTietNganChan = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayNganChan: sampleWithRequiredData.ngayNganChan?.format(DATE_FORMAT),
  ngayBdNganChan: sampleWithRequiredData.ngayBdNganChan?.format(DATE_FORMAT),
  ngayKtNganChan: sampleWithRequiredData.ngayKtNganChan?.format(DATE_FORMAT),
  ngayCongVan: sampleWithRequiredData.ngayCongVan?.format(DATE_FORMAT),
};

describe('ChiTietNganChan Service', () => {
  let service: ChiTietNganChanService;
  let httpMock: HttpTestingController;
  let expectedResult: IChiTietNganChan | IChiTietNganChan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ChiTietNganChanService);
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

    it('should create a ChiTietNganChan', () => {
      const chiTietNganChan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(chiTietNganChan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChiTietNganChan', () => {
      const chiTietNganChan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(chiTietNganChan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChiTietNganChan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChiTietNganChan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ChiTietNganChan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addChiTietNganChanToCollectionIfMissing', () => {
      it('should add a ChiTietNganChan to an empty array', () => {
        const chiTietNganChan: IChiTietNganChan = sampleWithRequiredData;
        expectedResult = service.addChiTietNganChanToCollectionIfMissing([], chiTietNganChan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietNganChan);
      });

      it('should not add a ChiTietNganChan to an array that contains it', () => {
        const chiTietNganChan: IChiTietNganChan = sampleWithRequiredData;
        const chiTietNganChanCollection: IChiTietNganChan[] = [
          {
            ...chiTietNganChan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addChiTietNganChanToCollectionIfMissing(chiTietNganChanCollection, chiTietNganChan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChiTietNganChan to an array that doesn't contain it", () => {
        const chiTietNganChan: IChiTietNganChan = sampleWithRequiredData;
        const chiTietNganChanCollection: IChiTietNganChan[] = [sampleWithPartialData];
        expectedResult = service.addChiTietNganChanToCollectionIfMissing(chiTietNganChanCollection, chiTietNganChan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietNganChan);
      });

      it('should add only unique ChiTietNganChan to an array', () => {
        const chiTietNganChanArray: IChiTietNganChan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const chiTietNganChanCollection: IChiTietNganChan[] = [sampleWithRequiredData];
        expectedResult = service.addChiTietNganChanToCollectionIfMissing(chiTietNganChanCollection, ...chiTietNganChanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chiTietNganChan: IChiTietNganChan = sampleWithRequiredData;
        const chiTietNganChan2: IChiTietNganChan = sampleWithPartialData;
        expectedResult = service.addChiTietNganChanToCollectionIfMissing([], chiTietNganChan, chiTietNganChan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietNganChan);
        expect(expectedResult).toContain(chiTietNganChan2);
      });

      it('should accept null and undefined values', () => {
        const chiTietNganChan: IChiTietNganChan = sampleWithRequiredData;
        expectedResult = service.addChiTietNganChanToCollectionIfMissing([], null, chiTietNganChan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietNganChan);
      });

      it('should return initial array if no ChiTietNganChan is added', () => {
        const chiTietNganChanCollection: IChiTietNganChan[] = [sampleWithRequiredData];
        expectedResult = service.addChiTietNganChanToCollectionIfMissing(chiTietNganChanCollection, undefined, null);
        expect(expectedResult).toEqual(chiTietNganChanCollection);
      });
    });

    describe('compareChiTietNganChan', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareChiTietNganChan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareChiTietNganChan(entity1, entity2);
        const compareResult2 = service.compareChiTietNganChan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareChiTietNganChan(entity1, entity2);
        const compareResult2 = service.compareChiTietNganChan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareChiTietNganChan(entity1, entity2);
        const compareResult2 = service.compareChiTietNganChan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
