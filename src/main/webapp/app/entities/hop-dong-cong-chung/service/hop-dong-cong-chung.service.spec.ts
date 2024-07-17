import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IHopDongCongChung } from '../hop-dong-cong-chung.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../hop-dong-cong-chung.test-samples';

import { HopDongCongChungService, RestHopDongCongChung } from './hop-dong-cong-chung.service';

const requireRestSample: RestHopDongCongChung = {
  ...sampleWithRequiredData,
  ngayLapHd: sampleWithRequiredData.ngayLapHd?.format(DATE_FORMAT),
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
  ngayHen: sampleWithRequiredData.ngayHen?.format(DATE_FORMAT),
  ngayKyHd: sampleWithRequiredData.ngayKyHd?.format(DATE_FORMAT),
  ngayRutTrich: sampleWithRequiredData.ngayRutTrich?.format(DATE_FORMAT),
  ngayThaoTacRutTrich: sampleWithRequiredData.ngayThaoTacRutTrich?.format(DATE_FORMAT),
};

describe('HopDongCongChung Service', () => {
  let service: HopDongCongChungService;
  let httpMock: HttpTestingController;
  let expectedResult: IHopDongCongChung | IHopDongCongChung[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(HopDongCongChungService);
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

    it('should create a HopDongCongChung', () => {
      const hopDongCongChung = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(hopDongCongChung).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HopDongCongChung', () => {
      const hopDongCongChung = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(hopDongCongChung).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HopDongCongChung', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HopDongCongChung', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HopDongCongChung', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHopDongCongChungToCollectionIfMissing', () => {
      it('should add a HopDongCongChung to an empty array', () => {
        const hopDongCongChung: IHopDongCongChung = sampleWithRequiredData;
        expectedResult = service.addHopDongCongChungToCollectionIfMissing([], hopDongCongChung);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hopDongCongChung);
      });

      it('should not add a HopDongCongChung to an array that contains it', () => {
        const hopDongCongChung: IHopDongCongChung = sampleWithRequiredData;
        const hopDongCongChungCollection: IHopDongCongChung[] = [
          {
            ...hopDongCongChung,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHopDongCongChungToCollectionIfMissing(hopDongCongChungCollection, hopDongCongChung);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HopDongCongChung to an array that doesn't contain it", () => {
        const hopDongCongChung: IHopDongCongChung = sampleWithRequiredData;
        const hopDongCongChungCollection: IHopDongCongChung[] = [sampleWithPartialData];
        expectedResult = service.addHopDongCongChungToCollectionIfMissing(hopDongCongChungCollection, hopDongCongChung);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hopDongCongChung);
      });

      it('should add only unique HopDongCongChung to an array', () => {
        const hopDongCongChungArray: IHopDongCongChung[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const hopDongCongChungCollection: IHopDongCongChung[] = [sampleWithRequiredData];
        expectedResult = service.addHopDongCongChungToCollectionIfMissing(hopDongCongChungCollection, ...hopDongCongChungArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hopDongCongChung: IHopDongCongChung = sampleWithRequiredData;
        const hopDongCongChung2: IHopDongCongChung = sampleWithPartialData;
        expectedResult = service.addHopDongCongChungToCollectionIfMissing([], hopDongCongChung, hopDongCongChung2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hopDongCongChung);
        expect(expectedResult).toContain(hopDongCongChung2);
      });

      it('should accept null and undefined values', () => {
        const hopDongCongChung: IHopDongCongChung = sampleWithRequiredData;
        expectedResult = service.addHopDongCongChungToCollectionIfMissing([], null, hopDongCongChung, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hopDongCongChung);
      });

      it('should return initial array if no HopDongCongChung is added', () => {
        const hopDongCongChungCollection: IHopDongCongChung[] = [sampleWithRequiredData];
        expectedResult = service.addHopDongCongChungToCollectionIfMissing(hopDongCongChungCollection, undefined, null);
        expect(expectedResult).toEqual(hopDongCongChungCollection);
      });
    });

    describe('compareHopDongCongChung', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHopDongCongChung(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHopDongCongChung(entity1, entity2);
        const compareResult2 = service.compareHopDongCongChung(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHopDongCongChung(entity1, entity2);
        const compareResult2 = service.compareHopDongCongChung(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHopDongCongChung(entity1, entity2);
        const compareResult2 = service.compareHopDongCongChung(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
