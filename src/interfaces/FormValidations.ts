
export interface FormValidations {
    [key: string]: (value: any) => string | null;
}
