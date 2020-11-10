import {IonPhaser} from "@ion-phaser/react";
import React from "react";
import Phaser from "phaser";


const PhaserMain = () => {

    let player;
    let playerPlatformsCollider;
    let cursors;
    let coins;
    let score = 0;
    let scoreText;
    let coinLayer;
    let golemsLayer;
    let golemsCollisions;
    let doorLayer;
    let doorCollision;
    let golem1, golem2, golem3, golem4;
    let golem1Velocity = 100;
    let golem2Velocity = 100;
    let golem3Velocity = 100;
    let golem4Velocity = 100;
    let golem1PlatformsCollider;
    let golem2PlatformsCollider;
    let golem3PlatformsCollider;
    let golem4PlatformsCollider;
    let playerGolem1Collider;
    let playerGolem2Collider;
    let playerGolem3Collider;
    let playerGolem4Collider;
    let battleLost = false;
    let lost = false;
    let win = false;
    let resetKey;
    let addScoreKey;
    let gameWinText1;
    let gameLostText;


    const gameState = {
        initialize: true,
        game: {
            width: 960,
            height: 600,
            type: Phaser.AUTO,
            scene: {
                key: "main",
                preload: preload,
                create: create,
                update: update,
            },
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {y: 500},
                    debug: false
                }
            },
        }
    }

    function preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet("adventurer",
            "assets/images/adventurer.png",
            {frameWidth: 64, frameHeight: 88}
        );
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
        this.load.image("coin", "assets/images/coin.png");
        this.load.spritesheet("golem",
            "assets/images/golem.png",
            {frameWidth: 135, frameHeight: 90}
        );

    }

    function create() {
        resetKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R, false);
        addScoreKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P, false);
        //background
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(20, 0.8);
        //map
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage("kenney_simple_platformer", 'tiles');
        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
        map.createStaticLayer("Background", tileset, 0, 200)
        //coin layer
        coinLayer = map.getObjectLayer('Coins')['objects'];
        coins = this.physics.add.staticGroup()
        coinLayer.forEach(object => {
            coins.create(object.x, object.y + 200 - object.height, 'coin').setOrigin(0, 0);
        });
        // golems layer
        golemsLayer = map.getObjectLayer('GolemsCollision')['objects']
        golemsCollisions = this.physics.add.staticGroup()
        golemsLayer.forEach(object => {
            const collision = golemsCollisions.create(object.x, object.y + 200 - object.height, null).setOrigin(0, 0);
            collision.setScale(object.width / 32, object.height / 32)
            collision.setVisible(false)
        });
        //door collision
        doorLayer = map.getObjectLayer('DoorCollision')["objects"];
        doorCollision = this.physics.add.staticGroup();
        doorLayer.forEach(object => {
            const collision = doorCollision.create(object.x, object.y + 200 - object.height, null).setOrigin(0, 0);
            collision.setScale(object.width / 32, object.height / 32)
            collision.setVisible(false)
        })
        // map
        platforms.setCollisionByExclusion(-1, true);
        //cursors
        cursors = this.input.keyboard.createCursorKeys();
        //player
        player = this.physics.add.sprite(200, 300, "adventurer");
        player.body.setSize(player.width - 15)
        //golems
        golem1 = this.physics.add.sprite(750, 480, "golem");
        golem1.body.setSize(player.width - 15, player.height - 10)
        golem2 = this.physics.add.sprite(750 + 17 * 64, 300, "golem");
        golem2.body.setSize(player.width - 15, player.height - 10)
        golem3 = this.physics.add.sprite(750 + 24 * 64, 500, "golem");
        golem3.body.setSize(player.width - 15, player.height - 10)
        golem4 = this.physics.add.sprite(750 + 85 * 64, 500, "golem");
        golem4.body.setSize(player.width - 15, player.height - 10)
        //score text
        scoreText = this.add.text(16, 16, "Score: 0", {fontSize: '32px', color: 'black'});
        scoreText.setScrollFactor(0, 0)
        // restart text
        this.add.text(580, 16, "restart: R", {fontSize: '32px', color: 'black'}).setScrollFactor(0, 0)
        // controls
        this.add.text(16, 600, "arrows - move", {fontSize: '32px', color: 'black'})
        this.add.text(16, 632, "space - attack", {fontSize: '32px', color: 'black'})
        //physics
        playerPlatformsCollider = this.physics.add.collider(player, platforms);
        golem1PlatformsCollider = this.physics.add.collider(golem1, platforms);
        golem2PlatformsCollider = this.physics.add.collider(golem2, platforms);
        golem3PlatformsCollider = this.physics.add.collider(golem3, platforms);
        golem4PlatformsCollider = this.physics.add.collider(golem4, platforms);
        this.physics.add.overlap(player, coins, collectCoin, null, this);
        this.physics.add.overlap(player, doorCollision, winFunction, null, this);
        this.physics.add.collider(golem1, golemsCollisions);
        this.physics.add.collider(golem2, golemsCollisions);
        this.physics.add.collider(golem3, golemsCollisions);
        this.physics.add.collider(golem4, golemsCollisions);
        playerGolem1Collider = this.physics.add.overlap(player, golem1, fight1, null, this);
        playerGolem2Collider = this.physics.add.overlap(player, golem2, fight2, null, this);
        playerGolem3Collider = this.physics.add.overlap(player, golem3, fight3, null, this);
        playerGolem4Collider = this.physics.add.overlap(player, golem4, fight4, null, this);
        this.physics.add.collider(player, doorLayer);

        // lost/win text
        gameWinText1 = this.add.text(400, 150, "You win!", {fontSize: '72px', color: 'black'}).setScrollFactor(0, 0);
        /*TODO ADD SCORE BOARD*/
        /*gameWinText2 = this.add.text(360, 220, "Press: P to add your score to board.", {
            fontSize: '20px',
            color: 'black'
        }).setScrollFactor(0, 0);
        gameWinText2.setVisible(false)*/
        gameLostText = this.add.text(400, 150, "You lost!", {fontSize: '72px', color: 'black'}).setScrollFactor(0, 0);
        gameWinText1.setVisible(false)
        gameLostText.setVisible(false)

        //camera
        this.cameras.main.setBounds(0, 0, backgroundImage.displayWidth, backgroundImage.displayHeight);
        this.cameras.main.startFollow(player);

        //animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('adventurer', {start: 7, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stand',
            frames: [{key: 'adventurer', frame: 6}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('adventurer', {start: 9, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-right',
            frames: [{key: 'adventurer', frame: 3}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-left',
            frames: [{key: 'adventurer', frame: 2}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'attack-right',
            frames: [{key: 'adventurer', frame: 1}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'attack-left',
            frames: [{key: 'adventurer', frame: 0}],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'golem-walk-left',
            frames: this.anims.generateFrameNumbers('golem', {start: 5, end: 16}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'golem-walk-right',
            frames: this.anims.generateFrameNumbers('golem', {start: 17, end: 33}),
            frameRate: 10,
            repeat: -1
        });
        // golems initial velocity
        golem1.setVelocityX(golem1Velocity);
        golem2.setVelocityX(golem2Velocity);
        golem3.setVelocityX(golem3Velocity);
        golem4.setVelocityX(golem4Velocity);

    }

    function update() {

        if (win) {
            gameWinText1.setVisible(true)
            //gameWinText2.setVisible(true)
        }
        if (lost) {
            gameLostText.setVisible(true)
        }
        /*golems move*/
        if (golem1.body.velocity.x < 0) {
            golem1.anims.play("golem-walk-left", true);
        } else if (golem1.body.velocity.x > 0) {
            golem1.anims.play("golem-walk-right", true);
        }
        if (golem2.body.velocity.x < 0) {
            golem2.anims.play("golem-walk-left", true);
        } else if (golem2.body.velocity.x > 0) {
            golem2.anims.play("golem-walk-right", true);
        }
        if (golem3.body.velocity.x < 0) {
            golem3.anims.play("golem-walk-left", true);
        } else if (golem3.body.velocity.x > 0) {
            golem3.anims.play("golem-walk-right", true);
        }
        if (golem4.body.velocity.x < 0) {
            golem4.anims.play("golem-walk-left", true);
        } else if (golem4.body.velocity.x > 0) {
            golem4.anims.play("golem-walk-right", true);
        }

        /*move*/
        if (cursors.left.isDown && !cursors.space.isDown) {
            player.setVelocityX(-160);
            if (player.body.onFloor()) {
                player.anims.play('left', true);
            }
        } else if (cursors.right.isDown && !cursors.space.isDown) {
            player.setVelocityX(160);
            if (player.body.onFloor()) {
                player.anims.play('right', true);
            }
        } else {
            player.setVelocityX(0);
            player.anims.play('stand');
        }
        /*jump*/
        if (cursors.up.isDown && player.body.onFloor()) {
            player.setVelocityY(-330);
            player.anims.play('jump-right', true);
        } else if (!player.body.onFloor()) {
            if (cursors.left.isDown) {
                player.anims.play('jump-left', true);
            } else {
                player.anims.play('jump-right', true);
            }
        }
        /*restart*/
        if (resetKey.isDown) {
            gameWinText1.setVisible(false)
            //gameWinText2.setVisible(false)
            gameLostText.setVisible(false)
            lost = false;
            win = false;
            battleLost = false;
            score = 0;
            this.scene.restart();
        }
        /*add score*/
        if (addScoreKey.isDown) {
            /*TODO MOVE TO ADDING SCORE PAGE*/
        }
        /*action*/
        if (cursors.space.isDown && cursors.left.isDown ) {
            player.anims.play('attack-left', true);
        } else if (cursors.space.isDown  ) {
            player.anims.play('attack-right', true);
        }
        /*golem movement*/
        if (golem1.body.blocked.right) {
            golem1Velocity = -golem1Velocity;
            golem1.setVelocityX(golem1Velocity);
        }
        if (golem1.body.blocked.left) {
            golem1Velocity = -golem1Velocity;
            golem1.setVelocityX(golem1Velocity);
        }
        if (golem2.body.blocked.right) {
            golem2Velocity = -golem2Velocity;
            golem2.setVelocityX(golem2Velocity);
        }
        if (golem2.body.blocked.left) {
            golem2Velocity = -golem2Velocity;
            golem2.setVelocityX(golem2Velocity);
        }
        if (golem3.body.blocked.right) {
            golem3Velocity = -golem3Velocity;
            golem3.setVelocityX(golem3Velocity);
        }
        if (golem3.body.blocked.left) {
            golem3Velocity = -golem3Velocity;
            golem3.setVelocityX(golem3Velocity);
        }
        if (golem4.body.blocked.right) {
            golem4Velocity = -golem4Velocity;
            golem4.setVelocityX(golem4Velocity);
        }
        if (golem4.body.blocked.left) {
            golem4Velocity = -golem4Velocity;
            golem4.setVelocityX(golem4Velocity);
        }

        /*player dieing*/
        if (player.y > 800) {
            player.setVelocityX(0);
            golem1.setVelocityX(0);
            golem2.setVelocityX(0);
            golem3.setVelocityX(0);
            golem4.setVelocityX(0);
            lost = true;

        }
        if (player.y < 800) {
            lost = false;
            gameLostText.setVisible(false)
        }
    }

    function collectCoin(player, coin) {
        coin.destroy(coin.x, coin.y);
        score = score + 1;
        scoreText.setText("Score: " + score);
    }

    function winFunction(player) {
        player.setVisible(false);
        this.physics.pause();
        player.setVelocityX(0);
        golem1.setVelocityX(0);
        golem2.setVelocityX(0);
        golem3.setVelocityX(0);
        golem4.setVelocityX(0);
        win = true;
    }

    function fight1() {
        let timer = setTimeout(function () {
            battleLost = true;
        }, 300)
        if (cursors.space.isDown ) {
            clearTimeout(timer);
            playerGolem1Collider.destroy();
            this.physics.world.removeCollider(golem1PlatformsCollider)
            score = score + 1;
            scoreText.setText("Score: " + score);
        }
        if (battleLost && playerGolem1Collider.active) {
            this.physics.world.removeCollider(playerPlatformsCollider);
        }
    }

    function fight2() {
        let timer = setTimeout(function () {
            battleLost = true;
        }, 300)
        if (cursors.space.isDown ) {
            clearTimeout(timer);
            playerGolem2Collider.destroy();
            this.physics.world.removeCollider(golem2PlatformsCollider)
            score = score + 1;
            scoreText.setText("Score: " + score);
        }
        if (battleLost && playerGolem2Collider.active) {
            this.physics.world.removeCollider(playerPlatformsCollider);
        }
    }

    function fight3() {
        let timer = setTimeout(function () {
            battleLost = true;
        }, 300)
        if (cursors.space.isDown ) {
            clearTimeout(timer);
            playerGolem3Collider.destroy();
            this.physics.world.removeCollider(golem3PlatformsCollider)
            score = score + 1;
            scoreText.setText("Score: " + score);
        }
        if (battleLost && playerGolem3Collider.active) {
            this.physics.world.removeCollider(playerPlatformsCollider);
        }
    }

    function fight4() {
        let timer = setTimeout(function () {
            battleLost = true;
        }, 300)
        if (cursors.space.isDown) {
            clearTimeout(timer);
            playerGolem4Collider.destroy();
            this.physics.world.removeCollider(golem4PlatformsCollider)
            score = score + 1;
            scoreText.setText("Score: " + score);
        }
        if (battleLost && playerGolem4Collider.active) {
            this.physics.world.removeCollider(playerPlatformsCollider);
        }
    }

    return (
        <>
            <IonPhaser game={gameState.game} initialize={gameState.initialize}/>
        </>
    );
}
export default PhaserMain;
