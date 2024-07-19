
export function contentValidationEmailHtml(validationCode: string, url : string): string {
    return `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h1 style="color: #336699;">Appli Jury</h1>
        <p style="text-align: left;">
          Votre code de validation est <strong>${validationCode}</strong>.
        </p>
        <p style="text-align: left;">
          Vous pouvez trouver un texte qui correspond bien au code de validation de l'inscription.
        </p>
        <a href="${url}">clique ici pour aller a la page validation</a>
      </div>
    `;
  }
  