### Diagramme 1

```plantuml
@startuml
left to right direction
actor "Visitor" as v
actor "Registered User" as u
actor "Admin" as a
u <-- a
rectangle Application {
  usecase "Register" as R
  usecase "Connect" as C
  usecase "Create a Group" as CG
  usecase "Add user in one of my groups" as AU
  usecase "Delete user in one of my groups" as DU
  usecase "Update password" as UP
  usecase "Delete a Group" as DG
  usecase "Change role" as CR
  usecase "Delete a user" as DAU
  usecase "Disconnect" as D
}
a --> DG
a --> CR
a --> DAU
v --> R
u --> C
u --> AU
u --> DU
u --> UP
u --> CG
u --> D
@enduml
```

### Diagramme 2

```plantuml
@startsalt
<style>
button {
  TextAlignement right
}
</style>
{
{^Se Connecter
{Email | "Email"}
{Mot de passe | "****      "}
[OK ]
}
{^"Pas encore de compte Enregistrez vous"
{Nom | "Nom "}
{Email | "Email"}
{Mot de passe | "****      "}
{Confirmer votre Mot de passe | "****      "}
[OK ]
}
}
@endsalt
```

### Diagramme 3

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header { Utilisateur | Alice@aol.fr | [Se déconnecter] }
{
{^
Changer votre mot de passe | "Nouveau mot de passe" | [Modifier]
}
{
{^Mes groupes
**Ceux dont je suis membre**
* Ensimag
* Grenoble INP
* Club gaming
----
**Ceux que j'administre**
* Club Gaming
* Running
"<i>nom du nouveau groupe" 
 [Créer]
}
}
}
@endsalt
```

### Diagramme 4

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header { Utilisateur | Alice@aol.fr | [Se déconnecter] }
{
{^
Changer votre mot de passe | "Nouveau mot de passe" | [Modifier]
}
{
{^Mes groupes
**Ceux dont je suis membre**
* Ensimag
* Grenoble INP
* Club gaming
----
**Ceux que j'administre**
* <b>Club Gaming
* Running
"<i>nom du nouveau groupe" 
 [Créer]
}|
{^"Administration <b>"Club Gaming""
{
Ajouter un membre
^Steve@gmail.com^ | [Ajouter ]
----|----
**Liste des membres**
----|----
Jihad@gmail.fr | [Supprimer ]
steve@gmail.com | [Supprimer ]
john@gmail.com | [Supprimer ]
mathieu@gmail.fr | [Supprimer ]
}
}
}
}
@endsalt
```

### Diagramme 5

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header { Utilisateur | Alice@aol.fr | [Se déconnecter] }
{
{^
Changer votre mot de passe | "Nouveau mot de passe" | [Modifier]
}
{
{^Mes groupes
**Ceux dont je suis membre**
* Ensimag
* Grenoble INP
* <b>Club gaming
----
**Ceux que j'administre**
* Club Gaming
* Running
"<i>nom du nouveau groupe" 
 [Créer]
}|
{^"Discussion sur le groupe <b>Club Gaming"
{SI
  [Salut , ca va? ] | Charlie
  [Super, et toi?] | Asimov
  [On se fait un truc] | Asimov
  [Une idée? ] | Charlie
  . | [Hello, oui]
  ----|----
}
{+ "Une partie de LOL après?" | [Envoyer ] }
}
}
}
@endsalt
```

### Diagramme 6

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header { Administrateur | Admin@admin.fr | [Se déconnecter] }
{
{^
Changer votre mot de passe | "Nouveau mot de passe" | [Modifier]
}
{
{^Mes groupes
**Ceux dont je suis membre**
* Ensimag
* Grenoble INP
* Club gaming
----
**Ceux que j'administre**
* Club Gaming
* Running
"<i>nom du nouveau groupe" 
 [Créer]
}
}
{^
Administration de l'Appli
----|----
  {
    {^Changer le role
    {
      ^Steve@gmail.com^
      () Adminstrateur | (X) Utilisateur
      [Editer ]
    }
    } |
    {^Supprimer un utilisateur
    {
      ^Steve@gmail.com    ^
      .
      [Supprimer ]
    }
    } |
    {^Supprimer un groupe
    {
      ^Groupe a        ^
      .
      [Supprimer ]
    }
    }
  }
}
}
@endsalt
```

### Diagramme 7

```plantuml
@startsalt
<style>
header {
  TextAlignement right
  BackGroundColor gray
  FontColor white
}
</style>
header { Utilisateur | Alice@aol.fr | [Se déconnecter] }
{
  {}
}
@endsalt
```

### Diagramme 8

```plantuml
class User{
  name
  email
  passhash
  isAdmin : boolean
}

class Message{
  content
}

class Group{
  name
}

User "1" -- "n" Message : posts
Group "1" -- "n" Message : contains

User "n" -- "n"  Group : is member 
User "1" -- "n"  Group : create and own
```