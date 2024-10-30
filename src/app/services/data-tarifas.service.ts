import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataTarifasService {
  tarifas: Tarifa[] = [];
  authService = inject(DataAuthService);

  constructor() {
    this.getTarifas();
  }

  async getTarifas() {
    const res = await fetch(environment.API_URL + 'tarifas', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    if (res.status !== 200) {
      console.log('Error');
    } else {
      this.tarifas = await res.json();
    }
  }

  async actualizarTarifa(idTarifa: string, nuevoValor: number) {
    const body = { idTarifa, nuevoValor };
    const res = await fetch(`${environment.API_URL}cocheras/${idTarifa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(body),
    });

    if (res.status !== 200) {
      console.log('No se pudo actualizar la tarifa');
    } else {
      console.log('Actualizada correctamente');
      await this.loadData();
    }
  }
}
