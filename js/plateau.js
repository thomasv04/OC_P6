class Plateau {

    constructeur() {
        this.div = null;
        this.nb_cases_x = null;
        //this.taille = null;
    }

    init(div, nb_cases_x, taux_apparition_mur) {
        this.div = div;
        this.nb_cases_x = nb_cases_x + 2;
        //this.taille = taille;
        this.taux_apparition_mur = taux_apparition_mur;

        this.creation();
        this.contour_mur();
    }

    creation() {
        for (let i = 1; i < this.nb_cases_x * this.nb_cases_x + 1; i++) {
            let case_creation_id = "case" + i;
            let case_creation = new Carre();
            let random = Math.floor(Math.random() * (this.taux_apparition_mur - 0 + 1)) + 0; // 1 chance sur taux_apparition_mur d'avoir un mur
            let random_objet = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
            case_creation.init(i, 40, 0, i * 10, i * 10, 0, 0, random, random_objet, random_objet, random_objet, random_objet); //id, taille, espace, top, left, occupee, arme, mur, heal, speed, poison, shield
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

                if (random_objet == 1) {
                    $('.case' + i).addClass('shield');
                }

                if (random_objet == 2) {
                    $('.case' + i).addClass('heal');
                }

                if (random_objet == 3) {
                    $('.case' + i).addClass('poison');
                }

                if (random_objet == 4) {
                    $('.case' + i).addClass('speed');
                }
            }



            //alert((case_creation.taille * case_creation.taille) + this.nb_case_x * case_creation.espace * 2);
        }
        $('.shield').append('<div class="objet"><img src="img/shield.png" alt=""></div>');
        $('.heal').append('<div class="objet"><img src="img/heal.png" alt=""></div>');
        $('.poison').append('<div class="objet"><img src="img/poison.png" alt=""></div>');
        $('.speed').append('<div class="objet"><img src="img/speed.png" alt=""></div>');

        $('.case27').append('<div class="perso1"><img src="img/perso12.png" alt=""></div>');
        $('.case144').append('<div class="perso2"><img src="img/perso5.png" alt=""></div>');
        $('.plateau').append('<div class="HUD_perso1"><img src="img/perso12.png" alt=""></div>');
        $('.plateau').append('<div class="HUD_perso2"><img src="img/perso5.png" alt=""></div>');
        $('.case27').removeClass('mur').addClass('not_mur');
        $('.case144').removeClass('mur').addClass('not_mur');
        $('.perso1 img').css('height', $('.case1').height() + 'px');
        $('.perso2 img').css('height', $('.case1').height() + 'px');
        $('.objet').css('height', $('.case1').height() + 'px');



    }

    contour_mur() {
        for (var j = 1; j < this.nb_cases_x + 1; j++) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
        }

        for (var j = 1; j < this.nb_cases_x * ((this.nb_cases_x) - 1) + 2; j = j + this.nb_cases_x) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
        }

        for (var j = this.nb_cases_x; j < this.nb_cases_x * this.nb_cases_x + 1; j = j + this.nb_cases_x) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
        }

        for (var j = this.nb_cases_x * (this.nb_cases_x - 1) + 1; j < this.nb_cases_x * this.nb_cases_x + 1; j++) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
        }




    }

}
