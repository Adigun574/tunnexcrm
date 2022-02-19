import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

 // public api = `https://api.tunnexlabcrm.com/api/`

  // public api = `http://kolatcode-001-site1.ctempurl.com/api/`

   public api = 'https://localhost:44363/api/'

  // public api = 'http://sunkan-001-site1.btempurl.com/api/'

  // public api = 'http://161.97.77.250:8080/tunrexcrmapi/api/'

  constructor() { }
}
