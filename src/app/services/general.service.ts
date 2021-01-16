import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  public api = `https://api.tunnexlabcrm.com/api/`

  // public api = `http://kolatcode-001-site1.ctempurl.com/api/`

  // public api = 'http://kolat55-001-site1.gtempurl.com/api/'

  constructor() { }
}
