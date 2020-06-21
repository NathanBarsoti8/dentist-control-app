import { NotificationService } from './notification/notification.service';
import { CpfPipe } from './pipes/cpf.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    declarations: [
        CpfPipe,
    ],
    imports: [
    ],
    exports: [
        CpfPipe,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                NotificationService
            ]
        }
    }
}