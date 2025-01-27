export class CreateEmailDto {
    to: string;
    subject: string;
    validationCode?: string;
    url?: string;
    competition?: string;
}

