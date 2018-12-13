class Potion {

    constructeur() {
        this.id = null;
        this.type = null;
        this.skin = null;
        this.effet = null;
    }

    init(id, type) {
        this.id = id;
        this.type = type;

        if (this.type == 1) {
            this.skin = "speed.png";
            this.effet = "+2 🦶"; //emoji pied

        }
        if (this.type == 2) {
            this.skin = "heal.png";
            this.effet = "+20 ❤️";
        }
        if (this.type == 3) {
            this.skin = "poison.png";
            this.effet = "-5 ❤️/tour";
        }
        if (this.type == 4) {
            this.skin = "shield.png";
            this.effet = "+10 🛡️";
        }
        if (this.type == 5) {
            this.skin = "antidote.png";
            this.effet = "Antidote";
        }



    }

    getSkin(type) {
        if (type == 1) {
            return "speed.png";
        }

        if (type == 2) {
            return "heal.png";
        }

        if (type == 3) {
            return "poison.png";
        }

        if (type == 4) {
            return "shield.png";
        }

        if (type == 5) {
            return "antidote.png";
        }
    }



}
