# language: fr
Fonctionnalité: Connexion

  @excluded
  Scénario: Connexion réussie
    Étant donné que l'utilisateur se trouve sur la page de connexion
    Lorsque l'utilisateur saisit un nom d'utilisateur et un mot de passe valides
    Et clique sur le bouton "Login"
    Alors l'utilisateur devrait être connecté
    Et devrait être redirigé vers le tableau de bord
