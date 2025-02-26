import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places', 
      'Something went wrong while fetching the available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places', 
      'Something went wrong while fetching your favorite places. Please try again later.'
    )
    .pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        }
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some(p => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put<{userPlaces: Place[]}>('http://localhost:3000/user-places', {
      placeId: place.id
    })
    .pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to store selected place.');
        return throwError(() => new Error('Failed to store selected place.'))
      }),
      // tap({
      //   next: (resData) => {
      //     this.userPlaces.set(resData.userPlaces);
      //   }
      // })
    );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url, {
        //observe: 'response' - the response will be the full http response (headers, body, type, etc.)
        //observe: 'events', - will be triggered for multiple events during the request - response lifecycle
      })
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(errorMessage));
        })
      )
  }
}
