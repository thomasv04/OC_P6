class Plateau {

    constructeur() {
        this.div = null;
        this.nb_cases_x = null;
        //this.taille = null;
    }

    init(div, nb_cases_x) {
        this.div = div;
        this.nb_cases_x = nb_cases_x + 2;
        //this.taille = taille;

        this.creation();
        this.contour_mur();
    }

    creation() {
        for (let i = 1; i < this.nb_cases_x * this.nb_cases_x + 1; i++) {
            let case_creation_id = "case" + i;
            let case_creation = new Carre();
            let random = Math.floor(Math.random() * (4 - 0 + 1)) + 0; // 1 chance sur 4 d'avoir un mur
            case_creation.init(i, 40, 0, i * 10, i * 10, 0, 0, random);
            $(this.div).append('<div class="case case' + i + '"></div>');
            //$(this.div).append('<div class="case case' + i + '">' + case_creation.id + '</div>');
            $('.case').css('width', case_creation.taille);
            $('.case').css('height', case_creation.taille);
            $(this.div).css('width', (case_creation.taille * this.nb_cases_x) + this.nb_cases_x * case_creation.espace * 2);
            $(this.div).css('height', (case_creation.taille * this.nb_cases_x) + this.nb_cases_x * case_creation.espace * 2);
            $('.case').css('border', case_creation.espace + "px solid grey");

            if (random == 1) {
                $('.case' + i).addClass('mur');
            }

            if (random != 1) {
                $('.case' + i).addClass('not_mur');
            }
            //alert((case_creation.taille * case_creation.taille) + this.nb_case_x * case_creation.espace * 2);
        }


        $('.case27').append('<div class="perso1"><img src="img/perso12.png" alt=""></div>');
        $('.case144').append('<div class="perso2"><img src="img/perso5.png" alt=""></div>');
        $('.case27').removeClass('mur').addClass('not_mur');
        $('.case144').removeClass('mur').addClass('not_mur');
        $('.perso1 img').css('height', $('.case1').height() + 'px');
        $('.perso2 img').css('height', $('.case1').height() + 'px');



    }

    contour_mur() {
        for (var j = 1; j < this.nb_cases_x + 1; j++) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
        }

        for (var j = 1; j < this.nb_cases_x * ((this.nb_cases_x) - 1) + 2; j = j + this.nb_cases_x) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
        }

        for (var j = this.nb_cases_x; j < this.nb_cases_x * this.nb_cases_x + 1; j = j + this.nb_cases_x) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
        }

        for (var j = this.nb_cases_x * (this.nb_cases_x - 1) + 1; j < this.nb_cases_x * this.nb_cases_x + 1; j++) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
        }




    }

}
