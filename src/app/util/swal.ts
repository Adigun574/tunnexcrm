import Swal from 'sweetalert2';
import { ToastService } from '../services/toast.service';

export class ToastFunc {
  constructor(public toastService: ToastService) {}
  showSuccess(message) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 10000,
      autohide: true,
      headertext: 'Success!!'
    });
  }

  showError(message) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 10000,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

  swalDelete() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  }

  swalSuccess(msg) {
   return Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1500
    });
  }

  swalError(msg) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
    });
  }
}
