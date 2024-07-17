import { Component, NgZone, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { combineLatest, filter, Observable, Subscription, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { sortStateSignal, SortDirective, SortByDirective, type SortState, SortService } from 'app/shared/sort';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { FormsModule } from '@angular/forms';
import { SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { ICauHinhMauHopDong } from '../cau-hinh-mau-hop-dong.model';
import { EntityArrayResponseType, CauHinhMauHopDongService } from '../service/cau-hinh-mau-hop-dong.service';
import { CauHinhMauHopDongDeleteDialogComponent } from '../delete/cau-hinh-mau-hop-dong-delete-dialog.component';

@Component({
  standalone: true,
  selector: 'jhi-cau-hinh-mau-hop-dong',
  templateUrl: './cau-hinh-mau-hop-dong.component.html',
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
export class CauHinhMauHopDongComponent implements OnInit {
  subscription: Subscription | null = null;
  cauHinhMauHopDongs?: ICauHinhMauHopDong[];
  isLoading = false;

  sortState = sortStateSignal({});

  public router = inject(Router);
  protected cauHinhMauHopDongService = inject(CauHinhMauHopDongService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (_index: number, item: ICauHinhMauHopDong): number => this.cauHinhMauHopDongService.getCauHinhMauHopDongIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => this.load()),
      )
      .subscribe();
  }

  delete(cauHinhMauHopDong: ICauHinhMauHopDong): void {
    const modalRef = this.modalService.open(CauHinhMauHopDongDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cauHinhMauHopDong = cauHinhMauHopDong;
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
    this.cauHinhMauHopDongs = this.refineData(dataFromBody);
  }

  protected refineData(data: ICauHinhMauHopDong[]): ICauHinhMauHopDong[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: ICauHinhMauHopDong[] | null): ICauHinhMauHopDong[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject: any = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.cauHinhMauHopDongService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
