import { Component, NgZone, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, Subscription, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { sortStateSignal, SortDirective, SortByDirective, type SortState, SortService } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { ICauHinhHoaDonDienTu } from '../cau-hinh-hoa-don-dien-tu.model';
import { EntityArrayResponseType, CauHinhHoaDonDienTuService } from '../service/cau-hinh-hoa-don-dien-tu.service';
import { CauHinhHoaDonDienTuDeleteDialogComponent } from '../delete/cau-hinh-hoa-don-dien-tu-delete-dialog.component';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-hoa-don-dien-tu',
  templateUrl: './cau-hinh-hoa-don-dien-tu.component.html',
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
  ],
})
export class CauHinhHoaDonDienTuComponent implements OnInit {
  subscription: Subscription | null = null;
  cauHinhHoaDonDienTus?: ICauHinhHoaDonDienTu[];
  isLoading = false;

  sortState = sortStateSignal({});

  public router = inject(Router);
  protected cauHinhHoaDonDienTuService = inject(CauHinhHoaDonDienTuService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (_index: number, item: ICauHinhHoaDonDienTu): number => this.cauHinhHoaDonDienTuService.getCauHinhHoaDonDienTuIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => this.load()),
      )
      .subscribe();
  }

  delete(cauHinhHoaDonDienTu: ICauHinhHoaDonDienTu): void {
    const modalRef = this.modalService.open(CauHinhHoaDonDienTuDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cauHinhHoaDonDienTu = cauHinhHoaDonDienTu;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.cauHinhHoaDonDienTus = this.refineData(dataFromBody);
  }

  protected refineData(data: ICauHinhHoaDonDienTu[]): ICauHinhHoaDonDienTu[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: ICauHinhHoaDonDienTu[] | null): ICauHinhHoaDonDienTu[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.cauHinhHoaDonDienTuService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.ngZone.run(() => {
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParamsObj,
      });
    });
  }
}
