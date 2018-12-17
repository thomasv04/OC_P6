class Plateau {

    constructeur() {
        this.div = null;
        this.nb_cases_x = null;
        this.ecart_perso = null;
        //this.taille = null;
        this.cellules = null;
        this.potions = null;
        this.armes = null;
        this.perso = null;
        this.tour = null;
        this.emetteur = null;
        this.receveur = null;

    }

    init(div, nb_cases_x, ecart_perso) {
        this.div = div;
        this.nb_cases_x = nb_cases_x + 2;

        if (ecart_perso === "max") {
            this.ecart_perso = parseInt((nb_cases_x - 2) / 2);
        } else {
            if (ecart_perso > parseInt((nb_cases_x - 2) / 2)) { //securité pour protection trop grande
                this.ecart_perso = parseInt((nb_cases_x - 2) / 2);

            } else {
                this.ecart_perso = ecart_perso;
            }
        }



        this.tour = 1;




        this.cellules = [];
        this.potions = [];
        this.armes = [];
        this.perso = [];
        this.emetteur = 1;
        this.receveur = 2;


        this.creationCellules();
        this.affichageCellules();
        this.ajoutDecor();
        this.creationMur();
        this.creationPotions();
        this.creationWeapon();
        this.creationPersonnage();
        this.creationPerso2();
        this.creationHUD();


        //this.perso[1].updatePosition(5, 5)

    }

    creationHUD() {
        $('body').append('<div class="HUDP1"></div><div class="HUDP2"></div>');
        $('.HUDP1').append('<div class="image"><img src="img/' + this.perso[1].skin + '" alt="" class="image_perso"><img src="img/wood_sword.png" alt="" class="epee"><img src="img/chest.png" alt="" class="chest"><div class="inventaire"</div></div>');
        $('.HUDP2').append('<div class="image"><img src="img/' + this.perso[2].skin + '" alt="" class="image_perso"><img src="img/wood_sword.png" alt="" class="epee"><img src="img/chest.png" alt="" class="chest"><div class="inventaire"</div></div>');
        $('.HUDP1').append('<div class="information"></div>');
        $('.HUDP2').append('<div class="information"></div>');
        $('.HUDP1 .information').append('<div class="vie">' + this.perso[1].hp + ' ❤️</div>');
        $('.HUDP2 .information').append('<div class="vie">' + this.perso[2].hp + ' ❤️</div>');
        $('.HUDP1 .information').append('<div class="shield">0 🛡️</div>');
        $('.HUDP2 .information').append('<div class="shield">0 🛡️</div>');
        $('.HUDP1 .information').append('<div class="damage">10 ⚔️</div>');
        $('.HUDP2 .information').append('<div class="damage">10 ⚔️</div>');
        $('.inventaire').append('<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>');

        $('.HUDP1 .chest').click(function () {
            $('.HUDP1 .inventaire').toggleClass('inventaire_active');
        })

        $('.HUDP2 .chest').click(function () {
            $('.HUDP2 .inventaire').toggleClass('inventaire_active');
        })
    }

    HUDUpdateArme(P1, skin, deg) {
        $('.HUD' + P1 + ' .image img:nth-child(2)').replaceWith('<img src="img/' + skin + '" alt="" class="epee">');
        $('.HUD' + P1 + ' .information .damage').html(deg + ' ⚔️');
    }
    
    HUDUpdateDegArme(P1,deg){
        $('.HUD' + P1 + ' .information .damage').html(deg + ' ⚔️');
    }

    HUDUpdateVie(perso) {
        $('.HUDP' + perso + ' .vie').html(this.perso[perso].hp + ' ❤️');
    }

    HUDUpdateShield(perso) {
        $('.HUDP' + perso + ' .shield').html(this.perso[perso].shield + ' 🛡️');
    }

    HUDUpdateInventaire(perso) {
        /**let nouvelle_potion_id = $('.HUDP' + perso + ' .inventaire .potion').length + 1;
        $('.HUDP' + perso + ' .inventaire div:nth-child(' + nouvelle_potion_id + ')').html('<img src="img/' + potion.skin + '" alt="">');
        $('.HUDP' + perso + ' .inventaire div:nth-child(' + nouvelle_potion_id + ')').addClass('potion');
        this.perso[perso].inventaire[nouvelle_potion_id - 1] = potion;**/


        let taille_tableau = this.perso[perso].inventaire.length;
        let taille_vide = 9 - taille_tableau;
        $('.HUDP' + perso + ' .inventaire').html("");
        for (var i = 0; i < taille_tableau; i++) {
            let skin = this.perso[perso].inventaire[i].skin;
            $('.HUDP' + perso + ' .inventaire').append('<div class="potion"><img src="img/' + skin + '" alt=""></div>');
        }
        for (var j = 0; j < taille_vide; j++) {
            $('.HUDP' + perso + ' .inventaire').append('<div></div>');
        }

    }

    ajoutPotionInventaire(perso, potion) {
        let nouvelle_potion_id = $('.HUDP' + perso + ' .inventaire .potion').length;
        this.perso[perso].inventaire[nouvelle_potion_id] = potion;
        this.HUDUpdateInventaire(perso);
    }

    creationCellules() {
        for (let i = 0; i < this.nb_cases_x; i++) {
            this.cellules[i] = [];
            for (let j = 0; j < this.nb_cases_x; j++) {
                this.cellules[i][j] = new Cellule();
                this.cellules[i][j].init('' + i + '' + j, i, j, 40);
                //init(id, x, y, taille, occupee, arme, potion
            }
        }
    }

    affichageCellules() {

        for (let i = 0; i < this.cellules.length; i++) {
            for (let j = 0; j < this.cellules[i].length; j++) {
                let nb = (i * this.nb_cases_x) + j + 1;
                var creation_div = document.createElement('div');
                $(this.div).append(creation_div);
                $(this.div + ' div').addClass('case');
                //$('.case:nth-child(' + nb + ')').html(nb);
            }
        }


        $('.case').css('width', this.cellules[1][1].taille);
        $('.case').css('height', this.cellules[1][1].taille);
        $(this.div).css('width', (this.cellules[1][1].taille * this.nb_cases_x));
        $(this.div).css('height', (this.cellules[1][1].taille * this.nb_cases_x) + this.nb_cases_x * this.cellules[1][1].espace * 2);
    }

    ajoutDecor() {
        for (let i = 0; i < this.cellules.length; i++) {
            for (let j = 0; j < this.cellules[i].length; j++) {
                if (this.cellules[i][j].decor == true) {
                    let nb = (i * this.nb_cases_x) + j + 1;
                    let type_decor = parseInt(Math.random() * (6.1 - 1) + 1);
                    $('.case:nth-child(' + nb + ')').addClass('decor');

                    if (type_decor == 1) {
                        if ($('.bones').length < 4) {
                            //bones
                            $('.case:nth-child(' + nb + ')').addClass('bones');
                        }
                    }

                    if (type_decor == 2) {
                        //rat
                        if ($('.rat').length == 0) {
                            $('.case:nth-child(' + nb + ')').addClass('rat');
                        }
                    }

                    if (type_decor == 3) {
                        if ($('.blood').length < 4) {
                            //blood
                            $('.case:nth-child(' + nb + ')').addClass('blood');
                        }
                    }

                    if (type_decor == 4) {
                        if ($('.skull').length < 4) {
                            //skull
                            $('.case:nth-child(' + nb + ')').addClass('skull');
                        }
                    }

                    if (type_decor == 5) {
                        if ($('.crack').length < 4) {
                            //crack
                            $('.case:nth-child(' + nb + ')').addClass('crack');
                        }
                    }

                    if (type_decor == 6) {


                        //gold
                        if ($('.hole').length == 0) {
                            $('.case:nth-child(' + nb + ')').addClass('hole');
                        }
                    }








                }


            }
        }
    }

    creationMur() {
        for (let i = 0; i < this.nb_cases_x; i++) {
            for (let j = 0; j < this.nb_cases_x; j++) {
                let nb = (i * this.nb_cases_x) + j + 1;
                //$('.case:nth-child(' + nb + ')').html(nb);
                if (this.cellules[i][j].mur) {

                    $('.case:nth-child(' + nb + ')').addClass('mur');
                }
            }
        }


    }

    creationPotions() {
        for (let i = 0; i < this.nb_cases_x; i++) {
            this.potions[i] = [];
            for (let j = 0; j < this.nb_cases_x; j++) {
                let nb = (i * this.nb_cases_x) + j + 1;

                if (this.cellules[i][j].potion) {

                    let type_potion = parseInt(Math.random() * (5.5 - 1) + 1);

                    this.potions[i][j] = new Potion();
                    this.potions[i][j].init('' + i + '' + j, type_potion);
                    $('.case:nth-child(' + nb + ')').addClass('potion');
                    $('.case:nth-child(' + nb + ').potion').append('<div class="objet"><div class="HUD_potion">' + this.potions[i][j].effet + '</div><img src="img/' + this.potions[i][j].skin + '" alt=""></div>')
                }



            }
        }
    }

    creationWeapon() {
        for (let i = 0; i < this.nb_cases_x; i++) {
            this.armes[i] = [];
            for (let j = 0; j < this.nb_cases_x; j++) {
                let nb = (i * this.nb_cases_x) + j + 1;

                if (this.cellules[i][j].arme) {

                    if ($('.arme').length < 4) {
                        let type_arme = parseInt(Math.random() * (8.5 - 2) + 2);



                        this.armes[i][j] = new Weapon();
                        this.armes[i][j].init('' + i + '' + j, type_arme);
                        $('.case:nth-child(' + nb + ')').addClass('arme');
                        if(type_arme === 8){
                            $('.case:nth-child(' + nb + ').arme').append('<div class="objet"><div class="HUD_arme">Mystère</div><img src="img/' + this.armes[i][j].skin + '" alt=""></div>')
                        } else {
                            $('.case:nth-child(' + nb + ').arme').append('<div class="objet"><div class="HUD_arme">' + this.armes[i][j].puissance + ' ⚔️</div><img src="img/' + this.armes[i][j].skin + '" alt=""></div>')
                        }
                        

                    }


                }


            }
        }
    }

    creationPersonnage() {
        //init(id,skin) 

        //CREATION PERSO 1
        let total_cases = this.nb_cases_x - 2;
        let Posx = parseInt(Math.random() * (total_cases - 1) + 1);
        let Posy = parseInt(Math.random() * (total_cases - 1) + 1);
        //console.log('Posx ' + Posx);
        //console.log('Posy ' + Posy);
        let nb = (Posx * this.nb_cases_x) + Posy + 1;

        if (this.cellules[Posx][Posy].mur == false) {
            if (this.cellules[Posx][Posy].potion == false) {
                if (this.cellules[Posx][Posy].arme == false) {
                    //console.log("Perso pas dans mur");
                    this.perso[1] = new Personnage();
                    this.perso[1].init(1, "perso4.png", Posx, Posy);
                    this.perso[1].hp = 100;
                    if ($('.perso').length == 0) {
                        $('.case:nth-child(' + nb + ')').addClass('perso');

                        $('.case:nth-child(' + nb + ').perso').append('<div class="perso1"><div class="HUD_player">' + this.perso[1].hp + ' ❤️</div><img src="img/' + this.perso[1].skin + '" alt=""></div>')
                        this.creationProtection();
                        if (this.tour === 1) {
                            this.creationZoneDeplacementP1();
                            $('.perso1 img').addClass('animation_perso');

                        }

                    }

                }

            }

        }

        if (this.cellules[Posx][Posy].mur == true) {
            this.creationPersonnage();
            this.creationPersonnage();
        }
        if (this.cellules[Posx][Posy].potion == true) {
            this.creationPersonnage();
        }
        if (this.cellules[Posx][Posy].arme == true) {
            this.creationPersonnage();
        }



    }

    creationProtection() {
        var i_ecart = this.perso[1].x - this.ecart_perso;
        var j_ecart = this.perso[1].y - this.ecart_perso;
        var fin_i = this.perso[1].x + this.ecart_perso;
        var fin_j = this.perso[1].y + this.ecart_perso;

        //console.log(fin_i);
        //console.log(fin_j);

        if (i_ecart < 0) {
            i_ecart = 0;
        }

        if (j_ecart < 0) {
            j_ecart = 0;
        }

        if (fin_i > this.nb_cases_x) {
            fin_i = this.nb_cases_x;
        }

        if (fin_j >= this.nb_cases_x) {
            fin_j = this.nb_cases_x - 1;
        }

        //console.log(fin_i);
        //console.log(fin_j);

        for (var i = i_ecart; i < fin_i + 1; i++) {
            /**if (i > 0) {
                i = 0;
            }**/
            for (var j = j_ecart; j < fin_j + 1; j++) {


                let nb = (i * this.nb_cases_x) + j + 1;
                $('.case:nth-child(' + nb + ')').addClass('protection');


            }
        }
    }

    creationPerso2() {

        let total_cases = this.nb_cases_x - 2;
        let Posx_p2 = parseInt(Math.random() * (total_cases - 1) + 1);
        let Posy_p2 = parseInt(Math.random() * (total_cases - 1) + 1);
        //console.log('Posx ' + Posx);
        //console.log('Posy ' + Posy);
        let nb = (Posx_p2 * this.nb_cases_x) + Posy_p2 + 1;
        if (!$('.case:nth-child(' + nb + ')').hasClass('protection')) {
            //console.log("oui")
            if (this.cellules[Posx_p2][Posy_p2].mur == false) {
                if (this.cellules[Posx_p2][Posy_p2].potion == false) {
                    if (this.cellules[Posx_p2][Posy_p2].arme == false) {
                        //console.log("Perso pas dans mur");
                        nb = (Posx_p2 * this.nb_cases_x) + Posy_p2 + 1;
                        this.perso[2] = new Personnage();
                        this.perso[2].init(2, "perso10.png", Posx_p2, Posy_p2);
                        this.perso[2].hp = 100;
                        this.perso[2].updatePosition(Posx_p2, Posy_p2);
                        if ($('.perso2').length === 0) {

                            $('.case:nth-child(' + nb + ')').addClass('perso');

                            $('.case:nth-child(' + nb + ').perso').append('<div class="perso2"><div class="HUD_player">' + this.perso[2].hp + ' ❤️</div><img src="img/' + this.perso[2].skin + '" alt=""></div>');

                            $('.protection').removeClass('protection');



                        }

                    }

                }

            }
        }

        if ($('.case:nth-child(' + nb + ')').hasClass('protection')) {
            this.creationPerso2();
        } else if (this.cellules[Posx_p2][Posy_p2].mur == true) {
            this.creationPerso2();
        } else if (this.cellules[Posx_p2][Posy_p2].potion == true) {
            this.creationPerso2();
        } else if (this.cellules[Posx_p2][Posy_p2].arme == true) {
            this.creationPerso2();
        }


    }

    creationZoneDeplacementP1() {
        let PosXJ1 = this.perso[1].x;
        let PosYJ1 = this.perso[1].y;

        /**for (let x = PosXJ1; x < PosXJ1 + this.perso[1].pm; x++) {
            console.log(this.cellules[x][PosYJ1].id);
            $('.case:nth-child(' + this.cellules[x][PosYJ1].id + ')').addClass('up');
        }**/

        for (let x = PosXJ1 + 1; x < PosXJ1 + this.perso[1].pm + 1; x++) {
            let nb = (x * this.nb_cases_x) + PosYJ1 + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP1');
            }

        }

        for (let x = PosXJ1 - 1; x > PosXJ1 - this.perso[1].pm - 1; x--) {
            let nb = (x * this.nb_cases_x) + PosYJ1 + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP1');
            }
        }

        for (let y = PosYJ1 + 1; y < PosYJ1 + this.perso[1].pm + 1; y++) {
            let nb = (PosXJ1 * this.nb_cases_x) + y + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP1');
            }
        }

        for (let y = PosYJ1 - 1; y > PosYJ1 - this.perso[1].pm - 1; y--) {
            let nb = (PosXJ1 * this.nb_cases_x) + y + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP1');
            }

        }
        this.deplacementPerso1();

    }

    creationZoneDeplacementP2() {
        let PosXJ2 = this.perso[2].getX();
        let PosYJ2 = this.perso[2].getY();

        /**for (let x = PosXJ1; x < PosXJ1 + this.perso[1].pm; x++) {
            console.log(this.cellules[x][PosYJ1].id);
            $('.case:nth-child(' + this.cellules[x][PosYJ1].id + ')').addClass('up');
        }**/

        for (let x = PosXJ2 + 1; x < PosXJ2 + this.perso[2].pm + 1; x++) {
            let nb = (x * this.nb_cases_x) + PosYJ2 + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP2');
            }


        }

        for (let x = PosXJ2 - 1; x > PosXJ2 - this.perso[2].pm - 1; x--) {
            let nb = (x * this.nb_cases_x) + PosYJ2 + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP2');
            }
        }

        for (let y = PosYJ2 + 1; y < PosYJ2 + this.perso[2].pm + 1; y++) {
            let nb = (PosXJ2 * this.nb_cases_x) + y + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP2');
            }

        }

        for (let y = PosYJ2 - 1; y > PosYJ2 - this.perso[2].pm - 1; y--) {
            let nb = (PosXJ2 * this.nb_cases_x) + y + 1;
            if ($('.case:nth-child(' + nb + ')').hasClass('mur') || $('.case:nth-child(' + nb + ')').hasClass('perso')) {
                break;
            }
            if (!$('.case:nth-child(' + nb + ')').hasClass('mur')) {
                $('.case:nth-child(' + nb + ')').addClass('deplacement deplacementP2');
            }

        }
        this.deplacementPerso2();


    }

    deplacementPerso1() {

        //alert(nb_case);
        $('.deplacementP1').click(function () {
            if (plateau.tour === 1) {
                if ($(this).hasClass('deplacementP1')) {
                    var nb_case_actuelle = (plateau.perso[1].x * plateau.nb_cases_x) + plateau.perso[1].y + 1;
                    var nb_case = $(this).index() + 1;
                    let nouveauX = parseInt(nb_case / plateau.nb_cases_x);
                    let nouveauY = nb_case - ((plateau.nb_cases_x * nouveauX) + 1);

                    if ($('.case:nth-child(' + nb_case + ')').hasClass('arme') || $('.case:nth-child(' + nb_case + ')').hasClass('potion')) {
                        if ($('.case:nth-child(' + nb_case + ')').hasClass('potion')) {
                            plateau.recupererPotion(nb_case, nouveauX, nouveauY);
                        }
                        if ($('.case:nth-child(' + nb_case + ')').hasClass('arme')) {
                            plateau.recupererArme(nb_case, nouveauX, nouveauY);

                        }

                    }
                    if ($('.case:nth-child(' + nb_case_actuelle + ')').hasClass('arme')) {
                        $('.case:nth-child(' + nb_case_actuelle + ') .objet').css('display', 'block');
                    }
                    let test_perso_colle1 = nb_case + 1;
                    let test_perso_colle2 = nb_case - 1;
                    let test_perso_colle3 = nb_case + plateau.nb_cases_x;
                    let test_perso_colle4 = nb_case - plateau.nb_cases_x;

                    if ($('.case:nth-child(' + test_perso_colle1 + ') div').hasClass("perso2")) {
                        $('.case:nth-child(' + test_perso_colle1 + ')').addClass("perso_colle")
                    } else if ($('.case:nth-child(' + test_perso_colle2 + ') div').hasClass("perso2")) {
                        $('.case:nth-child(' + test_perso_colle2 + ')').addClass("perso_colle")
                    } else if ($('.case:nth-child(' + test_perso_colle3 + ') div').hasClass("perso2")) {
                        $('.case:nth-child(' + test_perso_colle3 + ')').addClass("perso_colle")
                    } else if ($('.case:nth-child(' + test_perso_colle4 + ') div').hasClass("perso2")) {
                        $('.case:nth-child(' + test_perso_colle4 + ')').addClass("perso_colle")
                    }


                    $('.perso1').parent().removeClass("perso");
                    $('.perso1').remove();
                    $('.deplacement').removeClass('deplacementP1');
                    $('.deplacement').removeClass('deplacement');

                    $('.case:nth-child(' + nb_case + ')').addClass('perso').append('<div class="perso1"><div class="HUD_player">' + plateau.perso[1].hp + ' ❤️</div><img src="img/' + plateau.perso[1].skin + '" alt=""></div>');

                    //$('.case:nth-child(' + nb_case + ').perso');


                    plateau.perso[1].updatePosition(nouveauX, nouveauY);
                    if ($('.perso_colle').length == 0) {
                        plateau.creationZoneDeplacementP2();
                        plateau.changementTour();
                        $('.perso1 img').removeClass('animation_perso');
                        $('.perso2 img').addClass('animation_perso');
                    } else {
                        plateau.lancement_combat();
                    }


                }
            }
        })



    }

    deplacementPerso2() {
        //alert(nb_case);
        $('.deplacementP2').click(function () {
            if (plateau.tour === 2) {
                if ($(this).hasClass('deplacementP2')) {
                    var nb_case_actuelle = (plateau.perso[2].x * plateau.nb_cases_x) + plateau.perso[2].y + 1;
                    var nb_case = $(this).index() + 1;
                    let nouveauX = parseInt(nb_case / plateau.nb_cases_x);
                    let nouveauY = nb_case - ((plateau.nb_cases_x * nouveauX) + 1);

                    if ($('.case:nth-child(' + nb_case + ')').hasClass('arme') || $('.case:nth-child(' + nb_case + ')').hasClass('potion')) {
                        if ($('.case:nth-child(' + nb_case + ')').hasClass('potion')) {
                            plateau.recupererPotion(nb_case, nouveauX, nouveauY);

                        }
                        if ($('.case:nth-child(' + nb_case + ')').hasClass('arme')) {
                            plateau.recupererArme(nb_case, nouveauX, nouveauY);
                        }

                    }
                    if ($('.case:nth-child(' + nb_case_actuelle + ')').hasClass('arme')) {
                        $('.case:nth-child(' + nb_case_actuelle + ') .objet').css('display', 'block');
                    }

                    let test_perso_colle1 = nb_case + 1;
                    let test_perso_colle2 = nb_case - 1;
                    let test_perso_colle3 = nb_case + plateau.nb_cases_x;
                    let test_perso_colle4 = nb_case - plateau.nb_cases_x;

                    if ($('.case:nth-child(' + test_perso_colle1 + ') div').hasClass("perso1")) {
                        $('.case:nth-child(' + test_perso_colle1 + ')').addClass("perso_colle")
                    } else if ($('.case:nth-child(' + test_perso_colle2 + ') div').hasClass("perso1")) {
                        $('.case:nth-child(' + test_perso_colle2 + ')').addClass("perso_colle")
                    } else if ($('.case:nth-child(' + test_perso_colle3 + ') div').hasClass("perso1")) {
                        $('.case:nth-child(' + test_perso_colle3 + ')').addClass("perso_colle")
                    } else if ($('.case:nth-child(' + test_perso_colle4 + ') div').hasClass("perso1")) {
                        $('.case:nth-child(' + test_perso_colle4 + ')').addClass("perso_colle")
                    }

                    $('.perso2').parent().removeClass("perso");
                    $('.perso2').remove();
                    $('.deplacementP2').removeClass('deplacement');
                    $('.case').removeClass('deplacementP2');

                    $('.case:nth-child(' + nb_case + ')').addClass('perso');

                    $('.case:nth-child(' + nb_case + ').perso').append('<div class="perso2"><div class="HUD_player">' + plateau.perso[2].hp + ' ❤️</div><img src="img/' + plateau.perso[2].skin + '" alt=""></div>');


                    plateau.perso[2].updatePosition(nouveauX, nouveauY);

                    if ($('.perso_colle').length === 0) {
                        plateau.creationZoneDeplacementP1();
                        plateau.changementTour();
                        $('.perso1 img').addClass('animation_perso');
                        $('.perso2 img').removeClass('animation_perso');
                    } else {
                        plateau.lancement_combat();
                    }

                }

            }
        })


    }

    changementTour() {
        if (this.tour === 1) {
            this.emetteur = 1;
            this.receveur = 2;
            this.tour = 2;
            if (this.perso[1].poison === 1) {
                this.perso[1].hp = this.perso[1].hp - 5;
                this.HUDUpdateVie(1);
            }
        } else if (this.tour === 2) {
            this.emetteur = 2;
            this.receveur = 1;
            this.tour = 1;
            if (this.perso[2].poison === 1) {
                this.perso[2].hp = this.perso[2].hp - 5;
                this.HUDUpdateVie(2);
            }
        }
        
        if(this.perso[1].arme === 8){
            let deg = ((100 - parseInt(this.perso[1].hp))+10)/4;
            this.HUDUpdateDegArme("P1",deg);
            this.perso[1].degat = deg;
            $('.combat_perso1 .degat').html('<p>'+this.perso[1].degat+' ⚔️</p>');
        }
        
        if(this.perso[2].arme === 8){
            let deg = ((100 - parseInt(this.perso[2].hp))+10)/4;
           this.HUDUpdateDegArme("P2",deg);
            this.perso[2].degat = deg;
            $('.combat_perso2 .degat').html('<p>'+this.perso[2].degat+' ⚔️</p>');
        }

        $('.combat_perso1 .info .barre_vie .vie').html('<p>' + this.perso[1].hp + '/100</p>');
        $('.combat_perso1 .info .barre_vie .vie').css('width', this.perso[1].hp + '%');
        $('.combat_perso2 .info .barre_vie .vie').html('<p>' + this.perso[2].hp + '/100</p>');
        $('.combat_perso2 .info .barre_vie .vie').css('width', this.perso[2].hp + '%');
        
        this.gestionMort();


    }

    recupererArme(nb_case, nouveauX, nouveauY) {
        let nouveau_type_arme_perso = this.armes[nouveauX][nouveauY].type;
        if (this.tour === 1) {
            if(this.armes[nouveauX][nouveauY].type === 8){
                
                this.armes[nouveauX][nouveauY].puissance = this.gestionDegatArmeVerte(this.perso[1].hp);
                
            }
            this.HUDUpdateArme("P1", this.armes[nouveauX][nouveauY].skin, this.armes[nouveauX][nouveauY].puissance);
            
            this.perso[1].degat = this.armes[nouveauX][nouveauY].puissance;
            this.armes[nouveauX][nouveauY].updateType(this.perso[1].arme);
        }
        if (this.tour === 2) {
            if(this.armes[nouveauX][nouveauY].type === 8){
                
                this.armes[nouveauX][nouveauY].puissance = this.gestionDegatArmeVerte(this.perso[2].hp);
                
            }
            this.HUDUpdateArme("P2", this.armes[nouveauX][nouveauY].skin, this.armes[nouveauX][nouveauY].puissance);
            
            this.perso[2].degat = this.armes[nouveauX][nouveauY].puissance;
            this.armes[nouveauX][nouveauY].updateType(this.perso[2].arme);
            

        }



        $('.case:nth-child(' + nb_case + ') .objet').remove();
        $('.case:nth-child(' + nb_case + ')').append('<div class="objet"><div class="HUD_arme">' + this.armes[nouveauX][nouveauY].puissance + ' ⚔️</div><img src="img/' + this.armes[nouveauX][nouveauY].skin + '" alt=""></div>');
        $('.case:nth-child(' + nb_case + ') .objet').css('display', 'none');

        if (this.tour === 1) {
            this.perso[1].updateArme(nouveau_type_arme_perso);
        }
        if (this.tour === 2) {
            this.perso[2].updateArme(nouveau_type_arme_perso);
        }


    }

    recupererPotion(nb_case, nouveauX, nouveauY) {
        let type_potion = this.potions[nouveauX][nouveauY].type;
        var nb_perso;
        if (this.tour === 1) {
            nb_perso = 1
        }
        if (this.tour === 2) {
            nb_perso = 2
        }
        if (type_potion === 1) {
            this.perso[nb_perso].pm = this.perso[nb_perso].pm + 2;

        }

        if (type_potion === 2) {
            let vie = this.perso[nb_perso].hp + 20;
            if (vie > 100) {
                vie = 100;
            }
            this.perso[nb_perso].hp = vie;
            this.HUDUpdateVie(nb_perso);

        }

        if (type_potion === 3) {
            if ($('.HUDP' + nb_perso + ' .inventaire .potion').length !== 9) {
                this.ajoutPotionInventaire(nb_perso, this.potions[nouveauX][nouveauY]);
            }
        }

        if (type_potion === 4) {
            this.perso[nb_perso].shield = this.perso[nb_perso].shield + 10;
            this.HUDUpdateShield(nb_perso);

        }

        if (type_potion === 5) {
            if ($('.HUDP' + nb_perso + ' .inventaire .potion').length !== 9) {
                this.ajoutPotionInventaire(nb_perso, this.potions[nouveauX][nouveauY]);
            }

        }
        $('.case:nth-child(' + nb_case + ') .objet').css('display', 'none');
    }

    lancement_combat() {
        $('.perso1').css('opacity', '0');
        $('.perso2').css('opacity', '0');
        $('body').append('<div class="combat"></div>');
        $('.combat').append('<div class="zone_combat"></div>');
        $('.zone_combat').append('<div class="combat_perso1"></div>');
        $('.zone_combat').append('<div class="combat_perso2"></div>');
        $('.combat').css('width', $('.plateau').width() + 10);
        $('.combat').css('height', $('.plateau').height() + 10);
        $('.HUDP1').addClass('opacity_neg');
        $('.HUDP2').addClass('opacity_neg');
        $('.HUDP1 .image .image_perso').clone().appendTo(".combat_perso1");
        $('.HUDP2 .image .image_perso').clone().appendTo(".combat_perso2");
        $('.HUDP1 .image .epee').clone().appendTo(".combat_perso1");
        $('.HUDP2 .image .epee').clone().appendTo(".combat_perso2");
        $('.combat_perso1').append('<div class="info"></div><div class="inventaire_combat"><div class="fermer"><p>X</p></div></div><div class="armure"></div><div class="degat"></div>');
        $('.combat_perso2').append('<div class="info"></div><div class="inventaire_combat"><div class="fermer"><p>X</p></div></div><div class="armure"></div><div class="degat"></div>');
        $('.combat_perso1').addClass('opacity');
        $('.combat_perso2').addClass('opacity');
        $('.info').append('<div class="barre_vie"></div><div class="action"></div>');
        if(this.perso[1].poison === 1){
            $('.combat_perso1 .info .barre_vie').append('<div class="vie poison"><p>' + this.perso[1].hp + '/100</p></div>');
        } else if(this.perso[1].poison === 0){
            $('.combat_perso1 .info .barre_vie').append('<div class="vie"><p>' + this.perso[1].hp + '/100</p></div>');
        }

        if(this.perso[2].poison === 1){
            $('.combat_perso2 .info .barre_vie').append('<div class="vie poison"><p>' + this.perso[2].hp + '/100</p></div>');
        } else if(this.perso[2].poison === 0){
            $('.combat_perso2 .info .barre_vie').append('<div class="vie"><p>' + this.perso[2].hp + '/100</p></div>');
        }


        $('.action').append('<div class="bouton attaque"><p>Attaquer</p></div><div class="bouton defense"><p>Se defendre</p></div><div class="bouton objet_action"><p>Inventaire</p></div><div class="bouton fuite"><p>Fuir</p></div>');
        let vie_perso1 = this.perso[1].hp;
        let vie_perso2 = this.perso[2].hp;
        let armure_perso1 = this.perso[1].shield + ' 🛡️';
        let armure_perso2 = this.perso[2].shield + ' 🛡️';
        let degat_perso1 = $('.HUDP1 .damage').html();
        let degat_perso2 = $('.HUDP2 .damage').html();
        $('.combat_perso1 .info .barre_vie .vie').css('width', vie_perso1 + '%');
        $('.combat_perso2 .info .barre_vie .vie').css('width', vie_perso2 + '%');
        $('.armure').css('width', $('.armure').height() + 'px');
        $('.degat').css('width', $('.degat').height() + 'px');
        $('.combat_perso1 .armure').append('<p>' + armure_perso1 + '</p>');
        $('.combat_perso2 .armure').append('<p>' + armure_perso2 + '</p>');
        $('.combat_perso1 .degat').append('<p>' + degat_perso1 + '</p>');
        $('.combat_perso2 .degat').append('<p>' + degat_perso2 + '</p>');
        $('body').addClass('debut_combat');
        this.remplirInventaireCombat(1);
        this.remplirInventaireCombat(2);
        this.gestionCombat();
    }

    remplirInventaireCombat(perso) {
        let nbPotionInventaire = this.perso[perso].inventaire.length;
        let caseInventaireVide = 9 - nbPotionInventaire;
        $('.combat_perso' + perso + ' .inventaire_combat').append('<div class="fermer"><p>X</p></div>');
        for (var i = 0; i < nbPotionInventaire; i++) {
            var zone_potion = i;
            var potion = this.perso[perso].inventaire[zone_potion];
            var skin_potion = potion.skin;
            $('.combat_perso' + perso + ' .inventaire_combat').append('<div class="potion_combat" id="' + i + '"><img src="img/' + skin_potion + '" id="' + i + '"></img></div>');
        }

        for (var j = 0; j < caseInventaireVide; j++) {
            //$('.combat_perso' + perso + ' .inventaire_combat').append('<div class="vide_combat"></div>')
            //console.log('vide');
        }



        // $('.combat_perso'+perso+' .inventaire_combat')
    }

    gestionCombat() {
        this.gestionMort();
        $('.combat_perso'+this.receveur+' .image_perso').addClass('animation_combat_p'+this.receveur);

        $('.combat_perso1 .attaque').click(function () {
            if(plateau.tour === 1){
                plateau.combatAttaque(1);
                plateau.changementTour();
                $('.combat_perso2 .image_perso').addClass('animation_combat_p2');
                $('.combat_perso1 .image_perso').removeClass('animation_combat_p1');
                $('.combat_perso1 .image_perso').removeClass('animation_degat_p1');
            }
        })

        $('.combat_perso2 .attaque').click(function () {
            if(plateau.tour === 2){
                plateau.combatAttaque(2);
                plateau.changementTour();
                $('.combat_perso1 .image_perso').addClass('animation_combat_p1');
                $('.combat_perso2 .image_perso').removeClass('animation_combat_p2');
                $('.combat_perso2 .image_perso').removeClass('animation_degat_p2');
            }
        })

        $('.combat_perso1 .fuite').click(function () {
            if(plateau.tour === 1){
                plateau.combatFuite();
            }
        })

        $('.combat_perso2 .fuite').click(function () {
            if(plateau.tour === 2){
                plateau.combatFuite();
            }
        })

        $('.combat_perso1 .defense').click(function () {
            if(plateau.tour === 1){
                plateau.perso[1].defense = 1;
                plateau.changementTour();
                $('.combat_perso2 .image_perso').addClass('animation_combat_p2');
                $('.combat_perso1 .image_perso').removeClass('animation_combat_p1');
                $('.combat_perso1 .image_perso').removeClass('animation_degat_p1');
            }

        })

        $('.combat_perso2 .defense').click(function () {
            if(plateau.tour === 2){
                plateau.perso[2].defense = 1;
                plateau.changementTour();
                $('.combat_perso1 .image_perso').addClass('animation_combat_p1');
                $('.combat_perso2 .image_perso').removeClass('animation_combat_p2');
                $('.combat_perso2 .image_perso').removeClass('animation_degat_p2');
            }

        })

        $('.combat_perso1 .objet_action').click(function () {
            if(plateau.tour === 1){
                plateau.gestionInventaireCombat(1);
            }

        })

        $('.combat_perso2 .objet_action').click(function () {
            if(plateau.tour === 2){
                plateau.gestionInventaireCombat(2);
            }

        })
    }

    combatAttaque(perso) {
        let receveur;
        if (perso === 1) {
            receveur = 2;
        }
        if (perso === 2) {
            receveur = 1;
        }
        let type_arme = this.perso[perso].arme;
        let degat;
        let armure;
        if(type_arme === 7){
            this.perso[perso].hp = parseInt( this.perso[perso].hp) + 2;
            if(this.perso[perso].hp >= 100){
                this.perso[perso].hp = 100;
            }
        }


        if (this.perso[receveur].defense === 1) {
            if (this.perso[receveur].shield !== 0) {
                armure = 50 + this.perso[receveur].shield;
                degat = this.perso[perso].degat - (this.perso[perso].degat) * (armure / 100);

            } else if (this.perso[receveur].shield === 0) {
                degat = (this.perso[perso].degat) / 2;
            }
            this.perso[receveur].defense = 0;

        } else if (this.perso[receveur].defense === 0) {
            if (this.perso[receveur].shield !== 0) {
                armure = this.perso[receveur].shield;
                degat = this.perso[perso].degat - (this.perso[perso].degat) * (armure / 100);

            } else if (this.perso[receveur].shield === 0) {
                degat = this.perso[perso].degat;
            }

        }

        let hp_finaux = this.perso[receveur].hp - degat;
        hp_finaux = hp_finaux.toFixed(0);

        if (hp_finaux === 0.0) {
            hp_finaux = 0;
        }

        this.perso[receveur].hp = hp_finaux;
        let vie_perso1 = this.perso[receveur].hp;
        if (this.perso[receveur].hp < 0) {
            this.perso[receveur].hp = 0;
        }

        if (this.perso[receveur].hp === 0.00) {
            this.perso[receveur].hp = 0;
        }
        $('.combat_perso' + receveur + ' .info .barre_vie .vie').html('<p>' + this.perso[receveur].hp + '/100</p>');
        $('.combat_perso' + receveur + ' .info .barre_vie .vie').css('width', vie_perso1 + '%');
        $('.combat_perso' + receveur + ' .image_perso').removeClass('animation_degat_p' + receveur);
        $('.combat_perso' + receveur + ' .image_perso').addClass('animation_degat_p' + receveur);

        this.HUDUpdateVie(perso)
        this.HUDUpdateVie(receveur)

        this.gestionMort()



    }

    combatFuite() {
        $('.perso1').css('opacity', '1');
        $('.perso2').css('opacity', '1');
        $('.HUDP1').removeClass('opacity_neg');
        $('.HUDP2').removeClass('opacity_neg');
        $('body').removeClass('debut_combat');
        $('.combat').remove();
        $('.perso_colle').removeClass("perso_colle");

        this.HUDUpdateVie(1);
        this.HUDUpdateVie(2);
        this.HUDUpdateInventaire(1);
        this.HUDUpdateInventaire(2);

        if (this.tour === 1) {
            plateau.creationZoneDeplacementP1();

        }
        if (this.tour === 2) {
            plateau.creationZoneDeplacementP2();
        }

    }

    gestionMort() {
        let mort = 0;
        if (this.perso[1].hp === 0) {
            mort = 1;
            $('body').append('<div class="mort"><h2>Victoire du joueur 2</h2></div>');
        }
        if (this.perso[2].hp === 0) {
            mort = 1;
            $('body').append('<div class="mort"><h2>Victoire du joueur 1</h2></div>');
        }

        if (mort === 1) {
            $('.combat_perso1').removeClass("opacity").addClass("opacity_neg");
            $('.combat_perso2').removeClass("opacity").addClass("opacity_neg");

            $('.mort').addClass("opacity");


        }
    }

    gestionInventaireCombat(perso) {
        //console.log(plateau.perso[1].inventaire);
        //console.log(plateau.perso[2].inventaire);
        if (perso === 1) {
            var receveur = 2;
        }
        if (perso === 2) {
            var receveur = 1;
        }
        if (plateau.perso[perso].inventaire.length !== 0) {
            $('.combat_perso' + perso + ' .inventaire_combat').css('display', 'flex');
            $('.combat_perso' + perso + ' .inventaire_combat .fermer').click(function () {
                $('.combat_perso' + perso + ' .inventaire_combat').css('display', 'none');
            })
            $('.combat_perso' + perso + ' .inventaire_combat .potion_combat').click(function () {
                let index_potion = $(this).attr("id");
                //console.log('id=' + index_potion)
                //console.log('plateau.perso[' + perso + '].inventaire[' + index_potion + '].type');
                //console.log('type=' + plateau.perso[perso].inventaire[index_potion].type)

                if (index_potion !== -1) {
                    if (plateau.perso[perso].inventaire[index_potion].type === 3) {
                        $('.combat_perso' + receveur + ' .info .barre_vie .vie').addClass('poison');
                        plateau.perso[receveur].poison = 1;
                    }

                    if (plateau.perso[perso].inventaire[index_potion].type === 5) {
                        $('.combat_perso' + perso + ' .info .barre_vie .vie').removeClass('poison');
                        plateau.perso[perso].poison = 0;
                    }

                    plateau.changementTour();

                    plateau.perso[perso].inventaire.splice(index_potion, 1);
                    $('.combat_perso' + perso + ' .inventaire_combat').html("");
                    plateau.remplirInventaireCombat(perso);

                    $('.combat_perso'+receveur+' .image_perso').addClass('animation_combat_p'+receveur);
                    $('.combat_perso'+perso+' .image_perso').removeClass('animation_combat_p'+perso);
                    $('.combat_perso'+perso+' .image_perso').removeClass('animation_degat_p'+perso);

                    $('.combat_perso' + perso + ' .inventaire_combat').css('display', 'none');




                }

            })

        }
    }
    
    gestionDegatArmeVerte(vie_perso){
        let degat_arme = ((100 - parseInt(this.perso[2].hp))+10)/4;
        return degat_arme;
    }


}
