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
    this.loadData();
  }

  async loadData() {
    await this.getTarifas();
  }

  async getTarifas() {
    const answ = await fetch(environment.API_URL + 'tarifas', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
    });
    if (answ.status !== 200) return;
    const resJson: Tarifa[] = await answ.json();
    this.tarifas = resJson;
  }

  async actualizarTarifa(idTarifa: string, newValor: number) {
    const body = { idTarifa, newValor };
    const answ = await fetch(environment.API_URL + `cocheras/${idTarifa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken'),
      },
      body: JSON.stringify(body),
    });
    if (answ.status !== 200) {
      console.log('Error');
    } else {
      console.log('Tarifa actualizada correctamente');
      await this.loadData();
    }
  }
}
