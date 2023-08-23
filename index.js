//<![CDATA[
"use strict";

window.WebFontConfig = {
  //  'active' means all requested fonts have finished loading
  //  We set a 1 second delay before calling 'createText'.
  //  For some reason if we don't the browser cannot render the text the first time it's created.
  active: function() {
    setTimeout(function() {
      game.state.start("TelaMenu");
    }, 1000);
  },

  //  The Google Fonts we want to load (specify as many as you like in the array)
  google: {
    families: ['Indie+Flower']
  }

};


// https://github.com/photonstorm/phaser/blob/v2.6.2/src/core/Group.js#L2372
Phaser.Group.prototype.getRandomNotExists = function(startIndex, endIndex) {
  var list = this.getAll('exists', false, startIndex, endIndex);
  return this.game.rnd.pick(list);
};

// Essa não é a forma mais "profissional" de fazer, mas é a mais simples :)

// Vamos chamar a variável de game, para ficar igual ao sandbox!
var game = new Phaser.Game(1280, 720, Phaser.AUTO, "divJogo");
//Variaveis sprites


function TelaInicial(game) {

  this.init = function() {

    game.input.maxPointers = 1;

    // Deixar o jogo executando, mesmo se o browser mudar de aba?
    game.stage.disableVisibilityChange = false;

    if (game.device.desktop) {
      // Configurações específicas para desktop

      // Como criamos o CSS acima, não precisamos centralizar via código
      game.scale.pageAlignHorizontally = false;
    } else {
      // Configurações específicas para celulares

      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // Especifica o tamanho mímino e máximo para a área do jogo (de 400x300 até 800x600)
      game.scale.setMinMax(400, 300, 1280, 720);
      game.scale.forceLandscape = true;
      // Como criamos o CSS acima, não precisamos centralizar via código
      game.scale.pageAlignHorizontally = false;
    }

  }

  this.preload = function() {
      
      game.load.crossOrigin = "anonymous";
      game.load.spritesheet('bg', 'images/Caca_cenario.png', 6400, 720);
      game.load.image('colisor', 'images/colisor.png', 1280, 25);
      game.load.spritesheet("player", "images/player.png", 32, 48);
      game.load.spritesheet("player2", "images/sprite.png", 282, 281);
      game.load.image('facebook', "images/Asset_facebook.png");
      game.load.image('netflix', "images/Asset_netflix.png");
      game.load.image('youtube', "images/Asset_youtube.png");
      game.load.image('instagram', "images/Asset_instagram.png");
      game.load.image('whatsapp', "images/Asset_whatsapp.png");
      game.load.image('btnUp', "images/btnUp.png");
      game.load.image('btnDown', "images/btnDown.png");
      
      game.load.audio('jump', 'audios/jump.wav');
      game.load.audio('agachar', 'audios/Slide2.wav');
      game.load.audio('musicaGame', 'audios/musicaGame.mp3')
  }
  
      var background;
      var player;
      var colisor;
  
      var txtDistancia = 0;
      var distancia = 0;
      var loopDist;  
    
      
      var loopLiberacao;
      
      var grupoFacebook;
      var grupoNetflix;
      var grupoInstagram;
      var grupoWhatsApp;
      var grupoYoutube;
    
      var btnDown, btnDownDown = false;
      var btnUp;
    
      // Variáveis pulo
      var jaPulou = false, agachando = false;
      var btnPular;
      var btnAgachar;
      var jumpTimer = 0;
    
      var txtGameOver;
      var txtScore;
      var txtScoreTela;
      var txtHighScore;
      var txtNovoHighScore;
      var txtRestart;
      var txtMenu;
    
      var somPular;
      var somAgachar;
      var musicaGame;
    
      var DistanciaMaior = 0;
    
      var morto = false;
    
  this.create = function() {
      
      game.physics.startSystem(Phaser.Physics.ARCADE);

      
      background = game.add.tileSprite(0, 0, 6400, 720, 'bg');
      
      player = game.add.sprite(50,300, "player2");
      game.physics.arcade.enable(player);
      player.enableBody = true;
      player.body.gravity.y = 1550;
      player.body.collideWorldBounds = true;
      player.animations.add("correr", [1,2,3,4,5,6], 12, true);
      player.animations.add("pular", [7,8,9], 12, false);
      player.animations.add("agachar", [0], 12, true);
      player.animations.add("morrer", [10,11], 12, false);
      player.animations.play("correr");
      player.scale.setTo(0.8);
      player.body.setSize(110,281,63,0);
      
      colisor = game.add.sprite(0,620, 'colisor');
      game.physics.enable(colisor, Phaser.Physics.ARCADE);
      colisor.body.enable = true;
      colisor.body.collideWorldBounds = true;
      colisor.body.immovable = true;
      colisor.body.gravity.y = 0;
      colisor.alpha = 0 ;     
      
      grupoFacebook = game.add.group();
      grupoFacebook.enableBody = true;
      grupoFacebook.createMultiple(5, 'facebook');
      game.physics.arcade.enable(grupoFacebook, true);
      
      grupoNetflix = game.add.group();
      grupoNetflix.enableBody = true;
      grupoNetflix.createMultiple(5, 'netflix');
      game.physics.arcade.enable(grupoNetflix, true);
      
      grupoInstagram = game.add.group();
      grupoInstagram.enableBody = true;
      grupoInstagram.createMultiple(5, 'instagram');
      game.physics.arcade.enable(grupoInstagram, true);
      
      grupoWhatsApp = game.add.group();
      grupoWhatsApp.enableBody = true;
      grupoWhatsApp.createMultiple(5, 'whatsapp');
      game.physics.arcade.enable(grupoWhatsApp, true);
      
      grupoYoutube = game.add.group();
      grupoYoutube.enableBody = true;
      grupoYoutube.createMultiple(5, 'youtube');
      game.physics.arcade.enable(grupoYoutube, true);
      
      btnUp = game.add.sprite(50,480, 'btnUp');
      btnUp.scale.setTo(0.4);
      btnUp.inputEnabled = true;
      btnUp.alpha = 0.8;
      
      btnDown = game.add.sprite(50,600, 'btnDown');
      btnDown.scale.setTo(0.4);
      btnDown.inputEnabled = true;
      btnDown.alpha = 0.8;
      
      txtDistancia = game.add.text(15, 15, 'Score: ', {
          font: '60px KidsZone',
          fill: '#fff',
          fill: "white"
      });
      txtDistancia.stroke = "#000000";
      txtDistancia.strokeThickness = 6;
       

      txtGameOver = game.add.text(game.world.centerX, -50, 'Game Over', {
          font: '110px KidsZone',
          fill: '#fff'
      });
      txtGameOver.anchor.set(0.5);
      txtGameOver.stroke = "#000000";
      txtGameOver.strokeThickness = 6;
      

      txtNovoHighScore = game.add.text(-500, 300, 'Nova distancia maxima!!', {
          font: '50px KidsZone',
          fill: '#fff'
      });
      txtNovoHighScore.anchor.set(0.5);
      txtNovoHighScore.stroke = "#000000";
      txtNovoHighScore.strokeThickness = 6;

      txtScoreTela = game.add.text(-300, 390, 'Distancia: 0', {
          font: '70px KidsZone',
          fill: '#fff'
      });
      txtScoreTela.anchor.set(0.5);
      txtScoreTela.stroke = "#000000";
      txtScoreTela.strokeThickness = 6;       

      txtHighScore = game.add.text(-300, 470, 'Distancia maxima: 0', {
          font: '40px KidsZone',
          fill: '#fff'
      });
      txtHighScore.anchor.set(0.5);
      txtHighScore.stroke = "#000000";
      txtHighScore.strokeThickness = 6;

      txtRestart = game.add.text(window.innerWidth + 400, 550, 'Restart', {
          font: '45px KidsZone',
          fill: '#fff'
      });
      txtRestart.anchor.set(.5);
      txtRestart.inputEnabled = true;
      txtRestart.events.onInputDown.add(retornaGame, this);
      txtRestart.stroke = "#000000";
      txtRestart.strokeThickness = 6;

      txtMenu = game.add.text(window.innerWidth + 400, 600, 'Menu', {
          font: '40px KidsZone',
          fill: '#fff'
      });
      txtMenu.anchor.set(.5);
      txtMenu.inputEnabled = true;
      txtMenu.events.onInputDown.add(backMenu, this);
      txtMenu.stroke = "#000000";
      txtMenu.strokeThickness = 6;
        
      btnPular   = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
      btnAgachar = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      
      btnUp.events.onInputDown.add(pular, this);
      btnDown.events.onInputDown.add(agachar, this);
      btnDown.events.onInputUp.add(pararAgachar, this);
      
      somPular = game.add.audio('jump', 1);
      somAgachar = game.add.audio('agachar', 0.1);
      musicaGame = game.add.audio('musicaGame', 0.1,true);
      
      
      restart();
  }
  
  function pular() {
      if (!morto && !jaPulou && !agachando) {
          player.body.velocity.y = -800;
          player.animations.play("pular");
          jaPulou = true;
          somPular.play();
          player.body.setSize(80,281,63,0);
          
      }
  }
  
  function agachar() {
      btnDownDown = true;
      if (!morto && !jaPulou && !agachando) {
          player.animations.play("agachar");
          agachando = true;
          somAgachar.play();
          player.body.setSize(110,211,63,70);
      }
  }
  
  function pararAgachar() {
      btnDownDown = false;
  }
  
  function backMenu(){     
      game.state.start('TelaMenu');
      musicaGame.stop();
  }
    
  this.render = function() {
      //game.debug.body(player);
      
  }


  this.update = function() {
      
      console.log(player.body.y);
      
      var lista = grupoFacebook.getAll('exists', true);
      for (var i = 0; i < lista.length; i++) {
          if (lista[i].body.y > 300) {
              lista[i].outOfBoundsKill = true;
              lista[i].checkWorldBounds = true;
          }
      }
      
      var lista2 = grupoNetflix.getAll('exists', true);
      for (var i = 0; i < lista2.length; i++) {
          if (lista2[i].body.y > 300) {
              lista2[i].outOfBoundsKill = true;
              lista2[i].checkWorldBounds = true;
          }
      }
      
      var lista3 = grupoInstagram.getAll('exists', true);
      for (var i = 0; i < lista3.length; i++) {
          if (lista3[i].body.y > 300) {
              lista3[i].outOfBoundsKill = true;
              lista3[i].checkWorldBounds = true;
          }
      }
      
      var lista4 = grupoWhatsApp.getAll('exists', true);
      for (var i = 0; i < lista4.length; i++) {
          if (lista4[i].body.y > 300) {
              lista4[i].outOfBoundsKill = true;
              lista4[i].checkWorldBounds = true;
          }
      }
      
      var lista5 = grupoYoutube.getAll('exists', true);
      for (var i = 0; i < lista5.length; i++) {
          if (lista5[i].body.y > 300) {
              lista5[i].outOfBoundsKill = true;
              lista5[i].checkWorldBounds = true;
          }
      }
      
      game.physics.arcade.collide(player, colisor);
      
      if(morto == false){
          game.physics.arcade.overlap(player, [grupoFacebook,grupoNetflix,grupoInstagram,grupoYoutube,grupoWhatsApp], collisionHandler, null, this);

          if (!morto) {
              background.tilePosition.x -= 10;
              if (!jaPulou && !agachando) {
                  if (btnPular.isDown) {
                      player.body.velocity.y = -850;
                      player.animations.play("pular");
                      jaPulou = true;
                      

                  } else if (btnAgachar.isDown){
                      player.animations.play("agachar");
                      agachando = true;
                  }
              } else {
                  if (agachando && !btnAgachar.isDown && !btnDownDown) {
                      player.animations.play("correr");
                      agachando = false;
                      player.body.setSize(110,281,63,0);
                  } else if (jaPulou && player.body.touching.down) {
                      player.animations.play("correr");
                      jaPulou = false;
                      player.body.setSize(110,281,63,0);
                  }
              }
          }
      }
    
  }
  
  function contaDistancia() {
      
      distancia++;
      
      txtDistancia.setText("Score: " + distancia);
      
  }
  
    
  function collisionHandler(player, icone){
      
      morto = true;
      btnUp.kill();
      btnDown.kill();
      txtDistancia.kill();
      musicaGame.stop();
      
      
      player.body.setSize(110,150,63,131);

      player.animations.play("morrer");
      background.tilePosition.x +=0;
      
      
      game.time.events.remove(loopDist);
      game.time.events.remove(libera);
      game.time.events.remove(loopLiberacao);
      
      game.add.tween(txtGameOver).to({ y: 150 }, 500).start();
      game.add.tween(txtScoreTela).to({ x: game.world.centerX }, 500).start();
      game.add.tween(txtHighScore).to({ x: game.world.centerX }, 500).start();
      game.add.tween(txtRestart).to({ x: game.world.centerX }, 500).start();
      game.add.tween(txtMenu).to({ x: game.world.centerX }, 500).start();
      
      txtGameOver.setText("Game Over");
      txtNovoHighScore.setText("Novo recorde!!!");
      txtRestart.setText("Restart");
      txtMenu.setText("Menu");
      txtScoreTela.setText("Distância: " + distancia);
      txtHighScore.setText("Distância Máxima: " + DistanciaMaior);
      
      if (distancia > DistanciaMaior) {
          
          DistanciaMaior = distancia;
          txtHighScore.setText("Distância máxima: " + DistanciaMaior);           
          game.add.tween(txtNovoHighScore).to({ x: game.world.centerX }, 500).start();
      }
      
  }

  function libera() {
      var valor = Math.random();
      if (valor <= 0.2) {
          liberaFacebook();
      } else if(valor > 0.2 && valor <= 0.4) {
          liberaNetflix();
      } else if(valor > 0.4 && valor <= 0.6) {
          liberaInstagram();
      }else if(valor > 0.6 && valor <= 0.8) {
          liberaWhatsApp();
      }else {
          liberaYoutube();
      }
  }  
    
  function liberaFacebook(){
      
      var facebook = grupoFacebook.getRandomNotExists();
      if (!facebook) {
          facebook = grupoFacebook.create(1320,550, 'facebook');
          facebook.outOfBoundsKill = false;
          facebook.checkWorldBounds = false;
      } else {
          facebook.outOfBoundsKill = false;
          facebook.checkWorldBounds = false;
          facebook.reset(1320,550);
      }
          facebook.physicsBodyType = Phaser.Physics.ARCADE;
          facebook.body.enable = true;
          facebook.body.velocity.x = -550;
          facebook.anchor.x = 0.5;
          facebook.anchor.y = 0.5;
          facebook.scale.setTo(0.2);
          facebook.body.setCircle(50,50,80);
  }
    
  function liberaNetflix(){
      
      var netflix = grupoNetflix.getRandomNotExists();
      if (!netflix) {
          netflix = grupoNetflix.create(1320,400, 'netflix');
          netflix.outOfBoundsKill = false;
          netflix.checkWorldBounds = false;
      } else {
          netflix.outOfBoundsKill = false;
          netflix.checkWorldBounds = false;
          netflix.reset(1320,400);
      }
          netflix.physicsBodyType = Phaser.Physics.ARCADE;
          netflix.body.enable = true;
          netflix.body.velocity.x = -550;
          netflix.anchor.x = 0.5;
          netflix.anchor.y = 0.5;
          netflix.scale.setTo(0.2);
          netflix.body.setCircle(50,50,50);
  }
    
  function liberaInstagram(){
      
      var instagram = grupoInstagram.getRandomNotExists();
      if (!instagram) {
          instagram = grupoInstagram.create(1320,550, 'instagram');
          instagram.outOfBoundsKill = false;
          instagram.checkWorldBounds = false;
      } else {
          instagram.outOfBoundsKill = false;
          instagram.checkWorldBounds = false;
          instagram.reset(1320,550);
      }
          instagram.physicsBodyType = Phaser.Physics.ARCADE;
          instagram.body.enable = true;
          instagram.body.velocity.x = -550;
          instagram.anchor.x = 0.5;
          instagram.anchor.y = 0.5;
          instagram.scale.setTo(0.2);
          instagram.body.setCircle(50,50,50);
  }
    
  function liberaWhatsApp(){
      
      var whatsapp = grupoWhatsApp.getRandomNotExists();
      if (!whatsapp) {
          whatsapp = grupoWhatsApp.create(1320,400, 'whatsapp');
          whatsapp.outOfBoundsKill = false;
          whatsapp.checkWorldBounds = false;
      } else {
          whatsapp.outOfBoundsKill = false;
          whatsapp.checkWorldBounds = false;
          whatsapp.reset(1320,550);
      }
          whatsapp.physicsBodyType = Phaser.Physics.ARCADE;
          whatsapp.body.enable = true;
          whatsapp.body.velocity.x = -550;
          whatsapp.anchor.x = 0.5;
          whatsapp.anchor.y = 0.5;
          whatsapp.scale.setTo(0.2);
          whatsapp.body.setCircle(50,50,50);
  }
    
  function liberaYoutube(){
      
      var youtube = grupoYoutube.getRandomNotExists();
      if (!youtube) {
          youtube = grupoYoutube.create(1320,400, 'youtube');
          youtube.outOfBoundsKill = false;
          youtube.checkWorldBounds = false;
      } else {
          youtube.outOfBoundsKill = false;
          youtube.checkWorldBounds = false;
          youtube.reset(1320,400);
      }
          youtube.physicsBodyType = Phaser.Physics.ARCADE;
          youtube.body.enable = true;
          youtube.body.velocity.x = -550;
          youtube.anchor.x = 0.5;
          youtube.anchor.y = 0.5;
          youtube.scale.setTo(0.2);
          youtube.body.setCircle(50,50,50);
  }
    
  function retornaGame(){
      
      game.state.start('TelaInicial');
  }
    
  function restart(){
      morto = false;
      
      musicaGame.play();
      player.revive();
      btnDown.revive();
      btnUp.revive();
      txtDistancia.revive();
      distancia = 0;
      
      loopDist = game.time.events.loop(100, contaDistancia, this);
      loopLiberacao = game.time.events.loop(1100, libera, this);
      
  }

}
    
function TelaMenu(game) {

  this.init = function() {

    game.input.maxPointers = 1;

    // Deixar o jogo executando, mesmo se o browser mudar de aba?
    game.stage.disableVisibilityChange = false;

    if (game.device.desktop) {
      // Configurações específicas para desktop

      // Como criamos o CSS acima, não precisamos centralizar via código
      game.scale.pageAlignHorizontally = false;
    } else {
      // Configurações específicas para celulares

      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // Especifica o tamanho mímino e máximo para a área do jogo (de 400x300 até 800x600)
      game.scale.setMinMax(400, 300, 1280, 720);
      game.scale.forceLandscape = true;
      // Como criamos o CSS acima, não precisamos centralizar via código
      game.scale.pageAlignHorizontally = false;
    }

  }

  this.preload = function() {
      
      game.load.crossOrigin = "anonymous";
      game.load.image('Fundo', 'images/Menu.png',1280,720);

  }
  
  var txtLogo;
  var txtJogar;
  var txtTutorial;
  var txtCreditos;
  
  this.create = function() {
      
      var fundo = game.add.sprite(0,0, 'Fundo');
      
      txtLogo = game.add.text(-200, 340, '', {
          font: '110px KidsZone',
          fill: '#fff'
      });
      txtLogo.anchor.set(0.5);
      txtLogo.stroke = "#000000";
      txtLogo.strokeThickness = 6;
      game.add.tween(txtLogo).to({ x: game.world.centerX }, 500).start();
      
      txtJogar = game.add.text(1480, 440, '', {
          font: '60px KidsZone',
          fill: '#fff'
      });
      txtJogar.anchor.set(0.5);
      txtJogar.stroke = "#000000";
      txtJogar.strokeThickness = 6;
      txtJogar.inputEnabled = true;
      txtJogar.events.onInputDown.add(play, this);
      game.add.tween(txtJogar).to({ x: game.world.centerX }, 500).start();
      
      txtTutorial = game.add.text(-200, 520, '', {
          font: '45px KidsZone',
          fill: '#fff'
      });
      
      txtTutorial.anchor.set(0.5);
      txtTutorial.stroke = "#000000";
      txtTutorial.strokeThickness = 6;
      txtTutorial.inputEnabled = true;
      txtTutorial.events.onInputDown.add(telaTutorial, this);
      game.add.tween(txtTutorial).to({ x: game.world.centerX }, 500).start();
      
      txtCreditos = game.add.text(-200, 600, '', {
          font: '45px KidsZone',
          fill: '#fff'
      });
      
      txtCreditos.anchor.set(0.5);
      txtCreditos.stroke = "#000000";
      txtCreditos.strokeThickness = 6;
      txtCreditos.inputEnabled = true;
      txtCreditos.events.onInputDown.add(telaCreditos, this);
      game.add.tween(txtCreditos).to({ x: game.world.centerX }, 500).start();
      
      
  }
  
  function play(){
      
      game.state.start('TelaInicial');
  }
    
  function telaTutorial(){
      game.state.start('TelaTutorial');
  }
    
  function telaCreditos(){
      game.state.start('TelaCreditos');
  }  
    
  this.update = function() {
      
      txtLogo.setText("TechRun");
      txtJogar.setText("Jogar");
      txtTutorial.setText("Como jogar");
      txtCreditos.setText("Créditos");
      
      }
      
  }
    
function TelaTutorial(game) {

  this.init = function() {

    game.input.maxPointers = 1;

    // Deixar o jogo executando, mesmo se o browser mudar de aba?
    game.stage.disableVisibilityChange = false;

    if (game.device.desktop) {
      // Configurações específicas para desktop

      // Como criamos o CSS acima, não precisamos centralizar via código
      game.scale.pageAlignHorizontally = false;
    } else {
      // Configurações específicas para celulares

      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // Especifica o tamanho mímino e máximo para a área do jogo (de 400x300 até 800x600)
      game.scale.setMinMax(400, 300, 1280, 720);
      game.scale.forceLandscape = true;
      // Como criamos o CSS acima, não precisamos centralizar via código
      game.scale.pageAlignHorizontally = false;
    }

  }

  this.preload = function() {
      
      game.load.crossOrigin = "anonymous";
      game.load.image('Fundo', 'images/imgTuto.jpeg',1280,720);
      game.load.image('btnJogar', 'images/btnJogar.png');

  }
  
  var btnJogar;
    
  this.create = function() {
      
      var fundo = game.add.sprite(0,0, 'Fundo');
      btnJogar = game.add.sprite(900,600, 'btnJogar');
      btnJogar.inputEnabled = true;
      btnJogar.events.onInputDown.add(telaJogar, this);
  }
  
  function telaJogar(){
      game.state.start("TelaInicial");
  }
  
  this.update = function() {
      
      }
      
  }
    
function TelaCreditos(game) {

this.init = function() {

  game.input.maxPointers = 1;

  // Deixar o jogo executando, mesmo se o browser mudar de aba?
  game.stage.disableVisibilityChange = false;

  if (game.device.desktop) {
    // Configurações específicas para desktop

    // Como criamos o CSS acima, não precisamos centralizar via código
    game.scale.pageAlignHorizontally = false;
  } else {
    // Configurações específicas para celulares

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // Especifica o tamanho mímino e máximo para a área do jogo (de 400x300 até 800x600)
    game.scale.setMinMax(400, 300, 1280, 720);
    game.scale.forceLandscape = true;
    // Como criamos o CSS acima, não precisamos centralizar via código
    game.scale.pageAlignHorizontally = false;
  }

}

this.preload = function() {
    
    game.load.crossOrigin = "anonymous";
    game.load.image('Fundo', 'images/telaCreditos.png',1280,720);
    game.load.image('btnVoltar', 'images/btnVoltar.png');

}

var btnVoltar;
  
this.create = function() {
    
    var fundo = game.add.sprite(0,0, 'Fundo');
    
    btnVoltar = game.add.sprite(10,10, 'btnVoltar');
    btnVoltar.inputEnabled = true;
    btnVoltar.events.onInputDown.add(telaMenu, this);
}

function telaMenu(){
    game.state.start("TelaMenu");
}

this.update = function() {
    
    }
    
}

game.state.add("TelaInicial", TelaInicial);
game.state.add("TelaMenu", TelaMenu);
game.state.add("TelaTutorial", TelaTutorial); 
game.state.add("TelaCreditos", TelaCreditos); 