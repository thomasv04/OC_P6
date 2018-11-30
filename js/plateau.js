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
        this.ajoutPerso();
        this.ajoutWeapon();
    }

    creation() {
        let y = -1;
        for (let i = 1; i < this.nb_cases_x * this.nb_cases_x + 1; i++) {
            let case_creation_id = "case" + i;
            let case_creation = new Carre();
            let random = Math.floor(Math.random() * (this.taux_apparition_mur - 0 + 1)) + 0; // 1 chance sur taux_apparition_mur d'avoir un mur
            let random_objet = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

            let x = (i % this.nb_cases_x) - 2;
            let id_case = '' + x + '' + y;



            case_creation.init(id_case, 40, 0, x, y, 0, 0, random, random_objet, random_objet, random_objet, random_objet, random_objet); //id, taille, espace, posX, posY, occupee, arme, mur, heal, speed, poison, shield, antidote

            if (x == 11) {
                y++;
            }

            $(this.div).append('<div class="case case' + i + ' casePos' + id_case + '"></div>');
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

                if (random_objet == 5) {
                    $('.case' + i).addClass('antidote');
                }
                if (random_objet == 6) {
                    if ($(".rat").length != 1) {
                        $('.case' + i).addClass('rat');
                    }

                }
                if (random_objet == 7) {
                    $('.case' + i).addClass('bones');
                }
                if (random_objet == 8) {
                    $('.case' + i).addClass('blood');
                }
                if (random_objet == 9) {
                    $('.case' + i).addClass('skull');
                }
                if (random_objet == 10) {
                    $('.case' + i).addClass('crack');
                }
                if (random_objet == 11) {
                    if ($('.gold').length != 1) {
                        $('.case' + i).addClass('gold');
                    }

                }
                if (random_objet == 12) {
                    if ($('.hole').length != 1) {
                        $('.case' + i).addClass('hole');
                    }

                }
                if (random_objet == 60) {
                    if ($('.weapon').length <= 4) {
                        $('.case' + i).addClass('woodSword');
                        $('.case' + i).addClass('weapon');
                    }
                }
            }



            //alert((case_creation.taille * case_creation.taille) + this.nb_case_x * case_creation.espace * 2);
        }
        $('.shield').append('<div class="objet"><img src="img/shield.png" alt=""></div>');
        $('.heal').append('<div class="objet"><img src="img/heal.png" alt=""></div>');
        $('.poison').append('<div class="objet"><img src="img/poison.png" alt=""></div>');
        $('.speed').append('<div class="objet"><img src="img/speed.png" alt=""></div>');
        $('.antidote').append('<div class="objet"><img src="img/antidote.png" alt=""></div>');
        $('.plateau').append('<div class="HUD_perso1"><img src="img/perso7.png" alt=""></div>');
        $('.plateau').append('<div class="HUD_perso2"><img src="img/perso5.png" alt=""></div>');
        $('.objet').css('height', $('.case1').height() + 'px');



    }

    contour_mur() {
        for (var j = 1; j < this.nb_cases_x + 1; j++) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
            $('.case' + j).removeClass('weapon').html(" ");
            $('.case' + j).removeClass('woodSword').html(" ");
        }

        for (var j = 1; j < this.nb_cases_x * ((this.nb_cases_x) - 1) + 2; j = j + this.nb_cases_x) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
            $('.case' + j).removeClass('weapon').html(" ");
            $('.case' + j).removeClass('woodSword').html(" ");
        }

        for (var j = this.nb_cases_x; j < this.nb_cases_x * this.nb_cases_x + 1; j = j + this.nb_cases_x) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
            $('.case' + j).removeClass('weapon').html(" ");
            $('.case' + j).removeClass('woodSword').html(" ");
        }

        for (var j = this.nb_cases_x * (this.nb_cases_x - 1) + 1; j < this.nb_cases_x * this.nb_cases_x + 1; j++) {
            $('.case' + j).removeClass('not_mur').addClass('mur');
            $('.case' + j).removeClass('shield').html(" ");
            $('.case' + j).removeClass('heal').html(" ");
            $('.case' + j).removeClass('poison').html(" ");
            $('.case' + j).removeClass('speed').html(" ");
            $('.case' + j).removeClass('weapon').html(" ");
            $('.case' + j).removeClass('woodSword').html(" ");
        }




    }

    ajoutPerso() {
        //init(id, hp, shield, pm, skin, arme, position_x, position_y)
        let Perso1 = new Personnage();
        Perso1.init(1, 100, 0, 3, "perso5", 10, 0, 0);

        let Perso2 = new Personnage();
        Perso2.init(2, 100, 0, 3, "perso10", 10, 11, 11);

        let id_case_p1 = '' + Perso1.position_x + '' + Perso1.position_y;
        let id_case_p2 = '' + Perso2.position_x + '' + Perso2.position_y;

        $('.casePos' + id_case_p1).append('<div class="perso1"><img src="img/perso7.png" alt=""></div>');
        $('.casePos' + id_case_p2).append('<div class="perso2"><img src="img/perso5.png" alt=""></div>');
        $('.casePos' + id_case_p1).removeClass('mur').addClass('not_mur');
        $('.casePos' + id_case_p2).removeClass('mur').addClass('not_mur');

        $('.perso1 img').css('height', $('.case1').height() - 10 + 'px');
        $('.perso2 img').css('height', $('.case1').height() - 10 + 'px');


    }

    ajoutWeapon() {
        //init(id, skin, puissance, effet)
        let woodSword = new Weapon();
        woodSword.init(1, "wood_sword.png", 10, 0);

        $('.woodSword').append('<div class="sword"><img src="img/wood_sword.png" alt=""></div>');

    }

}
