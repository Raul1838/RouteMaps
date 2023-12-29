import {FormField} from "./FormField.ts";
import {FormLink} from "./FormLink.ts";
import {FormState} from "../hooks/useForm.ts";
import {FormValidations} from "./FormValidations.ts";

export interface FormProps {
    formData: { [key: string]: any };
    formFields: FormField[];
    additionalFormLink?: FormLink;
    onSubmit: (formState: FormState) => Promise<void> | void;
    submitButtonLabel: string;
    validations: FormValidations
}
