class Carre {

    constructeur() {
        this.id = null;
        this.taille = null;
        this.espace = null;
        this.top = null;
        this.left = null;
        this.occupee = null;
        this.arme = null;
        this.mur = null;
    }

    init(id, taille, espace, posX, posY, occupee, arme, mur, heal, speed, poison, shield, antidote) {
        this.id = id;
        this.taille = taille;
        this.espace = espace;
        this.posX = posX;
        this.posY = posY;
        this.arme = arme;
        this.occupee = occupee;
        this.mur = mur;

    }

    getterTaille() {
        return this.taille;
    }


}
