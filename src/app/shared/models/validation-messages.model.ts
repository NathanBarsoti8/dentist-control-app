export interface ValidationMessages {
    type: string;
    message: string;
}

export interface FormValidationMessages {
    generic: Array<ValidationMessages>;
}