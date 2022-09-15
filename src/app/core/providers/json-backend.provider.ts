import { FactoryProvider } from '@angular/core';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

// The JSON backend service
import { BackendService } from '../http';

export function jsonBackendFactory(notificationService: NotificationsService) {
    return new BackendService(notificationService);
}


export const  JSON_BACKEND_PROVIDER: FactoryProvider = {
    provide: HTTP_INTERCEPTORS,
    useFactory: jsonBackendFactory,
    multi: true,
    deps: [NotificationsService]
};
