# language: fr
Fonctionnalité: Appareil portatif Trivium

  Contexte:
    Étant donné que l'appareil portatif Trivium est activé
    Et que le casseur du côté rouge est en train de jouer

  Scénario: Annuler la dernière action effectuée
    Étant donné qu'il y a au moin une action enregistrer
    Quand l'utilisateur appuie sur le bouton (4)
    Alors la dernière action effectuée est annulée

  @excluded
  Scénario: Enregistrer les dernières actions
    Quand l'utilisateur appuie sur le bouton (5)
    Alors les dernières actions sont enregistrées

  @excluded
  Scénario: Appuyer sur le bouton "Submit" après la fin d'un round
    Quand l'utilisateur appuie sur le bouton (22) "Submit"
    Alors le round est soumis et augmenter le round si sa valeur est inférieure au nombre de rounds
    

  @excluded
  Scénario: Ajuster l'exécution positivement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (7) "Exécution" pour ajuster le positif
    Alors l'exécution est ajustée positivement pour le danseur actuel

  @excluded
  Scénario: Ajuster la forme positivement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (8) "Forme" pour ajuster le positif
    Alors la forme est ajustée positivement pour le danseur actuel

  @excluded
  Scénario: Ajuster la confiance positivement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (11) "Confiance" pour ajuster le positif
    Alors la confiance est ajustée positivement pour le danseur actuel

  @excluded
  Scénario: Ajuster la spontanéité positivement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (14) "Spontanéité" pour ajuster positivement
    Alors la spontanéité est ajustée positivement pour le danseur actuel

  @excluded
  Scénario: Ajuster l'exécution négativement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (7) "Exécution" pour ajuster le négatif
    Alors l'exécution est ajustée négativement pour le danseur actuel

  @excluded
  Scénario: Ajuster la forme négativement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (8) "Forme" pour ajuster le négatif
    Alors la forme est ajustée négativement pour le danseur actuel

  @excluded
  Scénario: Ajuster la confiance négativement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (11) "Confiance" pour ajuster le négatif
    Alors la confiance est ajustée négativement pour le danseur actuel

  @excluded
  Scénario: Ajuster la spontanéité négativement pour le danseur actuel
    Quand l'utilisateur appuie sur le bouton (14) "Spontanéité" pour ajuster négativement
    Alors la spontanéité est ajustée négativement pour le danseur actuel


  Scénario: Augmenter la performativité
    Quand l'utilisateur augmente la performativité avec la glissière (9) "Performativité"
    Alors la performativité est ajustée positivement

  @excluded
  Scénario: Augmenter la musicalité
    Quand l'utilisateur augmente la musicalité avec la glissière (10) "Musicalité"
    Alors la musicalité est ajustée positivement

  @excluded
  Scénario: Augmenter la personnalité
    Quand l'utilisateur augmente la personnalité avec la glissière (15) "Personnalité"
    Alors la personnalité est ajustée positivement

  @excluded
  Scénario: Augmenter la créativité
    Quand l'utilisateur augmente la créativité avec la glissière (16) "Créativité"
    Alors la créativité est ajustée positivement

  @excluded
  Scénario: Augmenter la variété
    Quand l'utilisateur augmente la variété avec la glissière (20) "Variété"
    Alors la variété est ajustée positivement

  @excluded
  Scénario: Augmenter la technique
    Quand l'utilisateur augmente la technique avec la glissière (21) "Technique"
    Alors la technique est ajustée positivement

  @excluded
  Scénario: Diminuer la performativité
    Quand l'utilisateur diminue la performativité avec la glissière (9) "Performativité"
    Alors la performativité est ajustée négativement

  @excluded
  Scénario: Diminuer la musicalité
    Quand l'utilisateur diminue la musicalité avec la glissière (10) "Musicalité"
    Alors la musicalité est ajustée négativement

  @excluded
  Scénario: Diminuer la personnalité
    Quand l'utilisateur diminue la personnalité avec la glissière (15) "Personnalité"
    Alors la personnalité est ajustée négativement

  @excluded
  Scénario: Diminuer la créativité
    Quand l'utilisateur diminue la créativité avec la glissière (16) "Créativité"
    Alors la créativité est ajustée négativement

  @excluded
  Scénario: Diminuer la variété
    Quand l'utilisateur diminue la variété avec la glissière (20) "Variété"
    Alors la variété est ajustée négativement

  @excluded
  Scénario: Diminuer la technique
    Quand l'utilisateur diminue la technique avec la glissière (21) "Technique"
    Alors la technique est ajustée négativement

  @excluded
  Scénario: Appuyer sur l'un de bouton "Crash"
    Quand l'utilisateur appuie une fois sur le bouton "Crash<Numero>" 
    Alors le décompte "CRASH" est mis à jour à "<Numero>"
    Et il est enregistré comme un glissement
      | Numero |
      |   1    |
      |   2    |
      |   3    |

  @excluded
  Scénario: Avertissement pour mauvais comportement
    Quand le juge appuie sur le bouton (13) "Mauvais comportement" pour un danseur
    Alors un avertissement est compté pour ce danseur
    Et des avertissements cumulés peuvent entraîner une disqualification

  @excluded
  Scénario: Utiliser le bouton (17) "Morsure" pour un danseur
    Quand le juge appuie sur le bouton (17) "Morsure" pour un danseur
    Alors l'action de "Morsure" est enregistrée pour ce danseur

  @excluded
  Scénario: Utiliser le bouton (18) "Repeat" pour un danseur
    Quand le juge appuie sur le bouton (18) "Repeat" pour un danseur
    Alors l'action de "Repeat" est enregistrée pour ce danseur
