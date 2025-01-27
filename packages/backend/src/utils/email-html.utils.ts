
export function contentValidationEmailHtml(validationCode: string, url: string, comptetion_name: string = ""): string {
    if (validationCode) {
        return `
    <div style="left: 50%;position: relative;transform: translateX(-50%); width: 420px; padding: 20px 0">
        <h1 style="text-align: center;">Email Confirmation Code</h1>
        <p style="text-align: center;line-height: 30px;">Hey, you're almost ready to enjoy the bboy app.
            Simply copy the numbers below to verify your email address.</p>
        <p
            style="left: 50%;position: relative;transform: translateX(-50%);padding: 8px 16px;border: 1px solid black; width: 120px; text-align: center;font-size: 20px; letter-spacing: 1px; background: #dfdfdf;">
            ${validationCode}</p><br/>
        <a href="${url}">Click here to go to the validation page</a>
    </div>
    `;
    }
    return `
    <div style="left: 50%;position: relative;transform: translateX(-50%); width: 420px; padding: 20px 0;">
        <h1 style="text-align: center;">Judge Confirmation</h1>
        <p style="text-align: center;line-height: 30px;">Hello bboy, I invite you to be the judje of a
            ${comptetion_name}
            competition. To confirm, Simply click the the big button below to verify your email address.</p>
        <a
            href="${url}"
            style="left: 50%;position: relative;transform: translateX(-50%);padding: 8px 16px;border: 1px solid black;width: 130px;display: block;text-align: center;">Accept
            invitation</a>
    </div>
    `;
}
