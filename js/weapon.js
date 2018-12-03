class Weapon {

    constructeur() {
        this.id = null;
        this.skin = null;
        this.puissance = null;
        this.effet = null;
    }

    init(id, type) {
        this.id = id;
        this.type = type;


        if (this.type == 1) {
            this.skin = "wood_sword.png";
            this.puissance = 10;
            this.effet = null;
        }

        if (this.type == 2) {
            this.skin = "dirty_sword.png";
            this.puissance = 12;
            this.effet = null;
        }

        if (this.type == 3) {
            this.skin = "argent_sword.png";
            this.puissance = 14;
            this.effet = null;
        }

        if (this.type == 4) {
            this.skin = "big_sword.png";
            this.puissance = 16;
            this.effet = null;
        }

        if (this.type == 5) {
            this.skin = "gold_sword.png";
            this.puissance = 18;
            this.effet = null;
        }

        if (this.type == 6) {
            this.skin = "legendary_sword.png";
            this.puissance = 20;
            this.effet = null;
        }

        if (this.type == 7) {
            this.skin = "vamp_sword.png";
            this.puissance = 12;
            this.effet = "heal";
        }

        if (this.type == 8) {
            this.skin = "poison_sword.png";
            this.puissance = 12;
            this.effet = "poison";
        }

    }


}
