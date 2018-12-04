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

        this.creationCellules();
        this.affichageCellules();
        this.ajoutDecor();
        this.creationMur();
        this.creationPotions();
        this.creationWeapon();
        this.creationPersonnage();
        this.creationPerso2();


        //this.perso[1].updatePosition(5, 5)

    }

    creationCellules() {
        for (let i = 0; i < this.nb_cases_x; i++) {
            this.cellules[i] = [];
            for (let j = 0; j < this.nb_cases_x; j++) {
                this.cellules[i][j] = new Cellule();
                this.cellules[i][j].init('' + i + '' + j, i, j, 40);
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
                    //console.log(type_decor);
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
        let k = 1;
        for (let i = 0; i < this.nb_cases_x; i++) {

            for (let j = 0; j < this.nb_cases_x; j++) {
                let nb = (i * this.nb_cases_x) + j + 1;

                if (this.cellules[i][j].potion) {

                    let type_potion = parseInt(Math.random() * (5.1 - 1) + 1);

                    this.potions[k] = new Potion();
                    this.potions[k].init(k, type_potion);
                    $('.case:nth-child(' + nb + ')').addClass('potion');
                    $('.case:nth-child(' + nb + ').potion').append('<div class="objet"><div class="HUD_potion">' + this.potions[k].effet + '</div><img src="img/' + this.potions[k].skin + '" alt=""></div>')
                    k++;
                }



            }
        }
    }

    creationWeapon() {
        let l = 1;
        for (let i = 0; i < this.nb_cases_x; i++) {

            for (let j = 0; j < this.nb_cases_x; j++) {
                let nb = (i * this.nb_cases_x) + j + 1;

                if (this.cellules[i][j].arme) {

                    if (l < 5) {
                        let type_arme = parseInt(Math.random() * (8.1 - 1) + 1);

                        this.armes[l] = new Weapon();
                        this.armes[l].init(l, type_arme);
                        $('.case:nth-child(' + nb + ')').addClass('arme');
                        $('.case:nth-child(' + nb + ').arme').append('<div class="objet"><div class="HUD_arme">' + this.armes[l].puissance + ' ⚔️</div><img src="img/' + this.armes[l].skin + '" alt=""></div>')

                        l++;
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
                    this.perso[1].init(1, "perso8.png", Posx, Posy);
                    if ($('.perso').length == 0) {
                        $('.case:nth-child(' + nb + ')').addClass('perso');

                        $('.case:nth-child(' + nb + ').perso').append('<div class="perso1"><div class="HUD_player">' + this.perso[1].hp + ' ❤️</div><img src="img/' + this.perso[1].skin + '" alt=""></div>')
                        this.creationProtection();
                        if (this.tour === 1) {
                            this.creationZoneDeplacementP1();

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
        let Posx = parseInt(Math.random() * (total_cases - 1) + 1);
        let Posy = parseInt(Math.random() * (total_cases - 1) + 1);
        //console.log('Posx ' + Posx);
        //console.log('Posy ' + Posy);
        let nb = (Posx * this.nb_cases_x) + Posy + 1;
        if (!$('.case:nth-child(' + nb + ')').hasClass('protection')) {
            //console.log("oui")
            if (this.cellules[Posx][Posy].mur == false) {
                if (this.cellules[Posx][Posy].potion == false) {
                    if (this.cellules[Posx][Posy].arme == false) {
                        //console.log("Perso pas dans mur");
                        this.perso[2] = new Personnage();
                        this.perso[2].init(2, "perso6.png", Posx, Posy);
                        if ($('.perso2').length == 0) {
                            $('.case:nth-child(' + nb + ')').addClass('perso');

                            $('.case:nth-child(' + nb + ').perso').append('<div class="perso2"><div class="HUD_player">' + this.perso[2].hp + ' ❤️</div><img src="img/' + this.perso[2].skin + '" alt=""></div>');

                            $('.protection').removeClass('protection');
                            if (this.tour === 2) {
                                this.creationZoneDeplacementP2();

                            }

                        }

                    }

                }

            }
        }

        if ($('.case:nth-child(' + nb + ')').hasClass('protection')) {
            this.creationPerso2();
        }


        if (this.cellules[Posx][Posy].mur == true) {
            this.creationPerso2();
        }
        if (this.cellules[Posx][Posy].potion == true) {
            this.creationPerso2();
        }
        if (this.cellules[Posx][Posy].arme == true) {
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
        let PosXJ2 = this.perso[2].x;
        let PosYJ2 = this.perso[2].y;

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
        $('.deplacementP2').css('pointer-events', 'none');
        $('.deplacementP1').css('pointer-events', 'auto');


        //alert(nb_case);
        $('.deplacementP1').click(function () {
            if (plateau.tour === 1) {
                var nb_case = $(this).index() + 1;
                $('.perso1').parent().removeClass("perso");
                $('.perso1').remove();
                $('.deplacementP1').removeClass('deplacement');
                $('.case').removeClass('deplacementP1');


                $('.case:nth-child(' + nb_case + ')').addClass('perso').append('<div class="perso1"><div class="HUD_player">' + plateau.perso[1].hp + ' ❤️</div><img src="img/' + plateau.perso[1].skin + '" alt=""></div>');

                //$('.case:nth-child(' + nb_case + ').perso');

                let nouveauX = parseInt(nb_case / plateau.nb_cases_x);
                let nouveauY = nb_case - ((plateau.nb_cases_x * nouveauX) + 1);

                plateau.perso[1].updatePosition(nouveauX, nouveauY);

                plateau.tour = 2;
                plateau.creationZoneDeplacementP2();
            }
        })



    }

    deplacementPerso2() {
        //alert(nb_case);
        $('.deplacementP1').css('pointer-events', 'none');
        $('.deplacementP2').css('pointer-events', 'auto');

        $('.deplacementP2').click(function () {
            if (plateau.tour === 2) {
                var nb_case = $(this).index() + 1;
                $('.perso2').parent().removeClass("perso");
                $('.perso2').remove();
                $('.deplacementP2').removeClass('deplacement');
                $('.case').removeClass('deplacementP2');


                $('.case:nth-child(' + nb_case + ')').addClass('perso');

                $('.case:nth-child(' + nb_case + ').perso').append('<div class="perso2"><div class="HUD_player">' + plateau.perso[2].hp + ' ❤️</div><img src="img/' + plateau.perso[2].skin + '" alt=""></div>');

                let nouveauX = parseInt(nb_case / plateau.nb_cases_x);
                let nouveauY = nb_case - ((plateau.nb_cases_x * nouveauX) + 1);

                plateau.perso[2].updatePosition(nouveauX, nouveauY);

                plateau.tour = 1;
                plateau.creationZoneDeplacementP1();



            }
        })


    }


}
