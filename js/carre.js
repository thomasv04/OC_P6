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

    init(id, taille, espace, top, left, occupee, arme, mur) {
        this.id = id;
        this.taille = taille;
        this.espace = espace;
        this.top = top;
        this.left = left;
        this.arme = arme;
        this.occupee = occupee;
        this.mur = mur;

    }

    getterTaille() {
        return this.taille;
    }


}
