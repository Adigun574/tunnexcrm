import {
  ErrorHandler,
  Injectable,
  Injector,
  ChangeDetectorRef
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
// import { ErrorService } from "./../services/error.service";
// import { NotificationService } from "./../services/notification.service";
// import { LoggingService } from "./../services/logging.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    // prevent it from looping infinitely

    const debugCtx = error["ngDebugContext"];
    const changeDetectorRef =
      debugCtx && debugCtx.injector.get(ChangeDetectorRef);
    if (changeDetectorRef) {
      changeDetectorRef.detach();
    }
    // const errorService = this.injector.get(ErrorService);
    // const notifier = this.injector.get(NotificationService);
    // const logger = this.injector.get(LoggingService);

    const errorService = null;
    const notifier = null;
    const logger = null;

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // it is a server error

      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      notifier.showError(message);
    } else {
      // it is a client error

      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      notifier.showError(message);
    }

    // i want the function to always logg the errors whether it is server or client side
    logger.logError(message, stackTrace);

    console.error(error);
  }
}
