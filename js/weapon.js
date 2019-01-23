class Weapon {

    constructeur() {
        this.id = null;
        this.name = null;
        this.skin = null;
        this.puissance = null;
        this.effet = null;

    }

    init(id, type) {
        this.id = id;
        this.type = type;


        if (this.type == 1) {
            this.skin = "wood_sword.png";
            this.name = "Wood Sword";
            this.puissance = 10;
            this.effet = null;
        }

        if (this.type == 2) {
            this.skin = "dirty_sword.png";
            this.name = "Dirty Sword";
            this.puissance = 12;
            this.effet = null;
        }

        if (this.type == 3) {
            this.skin = "argent_sword.png";
            this.name = "Argent Sword";
            this.puissance = 14;
            this.effet = null;
        }

        if (this.type == 4) {
            this.skin = "big_sword.png";
            this.name = "Big Sword";
            this.puissance = 16;
            this.effet = null;
        }

        if (this.type == 5) {
            this.skin = "gold_sword.png";
            this.name = "Gold Sword";
            this.puissance = 18;
            this.effet = null;
        }

        if (this.type == 6) {
            this.skin = "legendary_sword.png";
            this.name = "Legendary Sword";
            this.puissance = 20;
            this.effet = null;
        }

        if (this.type == 7) {
            this.skin = "vamp_sword.png";
            this.name = "Vampire Sword";
            this.puissance = 12;
            this.effet = "heal";
        }

        if (this.type == 8) {
            this.skin = "poison_sword.png";
            this.name = "Pain Sword";
            this.effet = "poison";
        }

    }

    updateType(type) {
        this.type = type;
        this.updateStat();
    }

    updateStat() {
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
            this.effet = "poison";
        }
    }

    getSkin(type) {
        if (type == 1) {
            return "wood_sword.png";
        }

        if (type == 2) {
            return "dirty_sword.png";
        }

        if (type == 3) {
            return "argent_sword.png";
        }

        if (type == 4) {
            return "big_sword.png";
        }

        if (type == 5) {
            return "gold_sword.png";
        }

        if (type == 6) {
            return "legendary_sword.png";
        }

        if (type == 7) {
            return "vamp_sword.png";
        }

        if (type == 8) {
            return "poison_sword.png";
        }
    }

    getDegat(type) {
        if (type == 1) {
            return "10";
        }

        if (type == 2) {
            return "12";
        }

        if (type == 3) {
            return "14";
        }

        if (type == 4) {
            return "16";
        }

        if (type == 5) {
            return "18";
        }

        if (type == 6) {
            return "20";
        }

        if (type == 7) {
            return "12";
        }

        if (type == 8) {
            return "12";
        }
    }


}
