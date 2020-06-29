import { DateConverterService } from './services/dateConverter.service';
import { PhonePipe } from './pipes/telefone.pipe';
import { NotificationService } from './notification/notification.service';
import { CpfPipe } from './pipes/cpf.pipe';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    declarations: [
        CpfPipe,
        PhonePipe
    ],
    imports: [
    ],
    exports: [
        CpfPipe,
        PhonePipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                NotificationService,
                DateConverterService
            ]
        }
    }
}