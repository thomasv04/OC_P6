class Cellule {

    constructeur() {
        this.id = null;
        this.taille = null;
        this.x = null;
        this.y = null;
        this.occupee = null;
    }

    init(id, x, y, taille, occupee, arme, potion) {
        this.id = id;
        this.x = x;
        this.y = y
        this.taille = taille;
        this.occupee = occupee;
        this.mur = Math.random() < 0.9 ? false : true;
        this.decor = Math.random() < 0.9 ? false : true;

        if (this.x == 0) {
            this.mur = true;
        }
        if (this.x == plateau.nb_cases_x - 1) {
            this.mur = true;
        }
        if (this.y == 0) {
            this.mur = true;
        }
        if (this.y == plateau.nb_cases_x - 1) {
            this.mur = true;
        }

        if (this.mur == false) {
            this.potion = Math.random() < 0.96 ? false : true;

            if (this.potion == false) {
                this.arme = Math.random() < 0.98 ? false : true;
            }

        }


    }

    getTaille() {
        return this.taille;
    }


}
