import { FactoryProvider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

// The HTTP interceptor service
import { InterceptorService } from '../http/interceptor.service';
import { Router } from '@angular/router';

/**
 *
 */
export function interceptedBackendFactory(notificationService: NotificationsService, router: Router) {
    return new InterceptorService(notificationService, router);
}

/**
 *
 */
export const  INTERCEPTED_BACKEND_PROVIDER: FactoryProvider = {
    provide: HTTP_INTERCEPTORS,
    useFactory: interceptedBackendFactory,
    multi: true,
    deps: [NotificationsService, Router]
};
