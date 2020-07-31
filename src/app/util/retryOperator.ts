import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, retryWhen } from "rxjs/operators";

const getErrorMsg = (maxRetry: number) =>
  `Tried to load resource over XHR for ${maxRetry} times without success. Giving up now`;

const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BACKOFF = 10000;

// The first retry happens after one second, the second one after two seconds and the third one after three seconds.

export function retryWithBackoff(
  delayMs: number,
  maxRetry = DEFAULT_MAX_RETRIES,
  backoffMs = DEFAULT_BACKOFF
) {
  let retries = maxRetry;

  return (src: Observable<any>) => {
    return src.pipe(
      retryWhen((errors: Observable<any>) =>
        errors.pipe(
          mergeMap(error => {
            if (retries-- > 0) {
              const backoffTime = delayMs + (maxRetry - retries) * backoffMs;
              return of(error).pipe(delay(backoffTime));
            }
            return Observable.throw(throwError(getErrorMsg(maxRetry)));
          })
        )
      )
    );
  };
}

// import { Observable, of, throwError } from "rxjs";
// import { _throw } from "rxjs/observable/throw";
// import { timer } from "rxjs/observable/timer";
// import { mergeMap, finalize, timer } from "rxjs/operators";

// export const genericRetryStrategy = ({
//   maxRetryAttempts = 3,
//   scalingDuration = 1000,
//   excludedStatusCodes = []
// }: {
//   maxRetryAttempts?: number;
//   scalingDuration?: number;
//   excludedStatusCodes?: number[];
// } = {}) => (attempts: Observable<any>) => {
//   return attempts.pipe(
//     mergeMap((error, i) => {
//       const retryAttempt = i + 1;
//       // if maximum number of retries have been met
//       // or response is a status code we don't wish to retry, throw error
//       if (
//         retryAttempt > maxRetryAttempts ||
//         excludedStatusCodes.find(e => e === error.status)
//       ) {
//         return _throw(error);
//       }
//       console.log(
//         `Attempt ${retryAttempt}: retrying in ${retryAttempt *
//           scalingDuration}ms`
//       );
//       // retry after 1s, 2s, etc...
//       return timer(retryAttempt * scalingDuration);
//     }),
//     finalize(() => console.log("We are done!"))
//   );
// };

/***
 * how to use in a pipe
 *  retryWhen(genericRetryStrategy({
        scalingDuration: 2000,
        excludedStatusCodes: [500]
      }))
 */
