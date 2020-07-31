import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public api = `https://api.tunnexlabcrm.com/api/`

  constructor() { }
}
