var Enemy = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.state = Enemy.STATE.normal;
  },

  setDifficulty: function() {
    if (currentDifficulty === DIFFICULTY.easy) {
      this.speed -= 5;// magic number
    }
  },

  changePosition: function() {
    this.y -= this.speed;
    this.changeXPosition();
  },

  rePosition: function() {
    this.respawn();
    this.setPos();
  },

  hit: function(focusObject) {
    if (focusObject instanceof Player)
      return this.hitBetweenPlayerAndThisEnemy(focusObject);
    else
      return this.hitBetweenBulletAndThisEnemy(focusObject);
  },

  hitBetweenPlayerAndThisEnemy: function(player) {
    if (checkPlayerEnemyCollision(player, this))
      return true;
    else
      return false;
  },

  hitBetweenBulletAndThisEnemy: function(bullet) {
    if (checkBulletEnemyCollision(bullet, this))
      return true;
    else
      return false;
  },

  gotHit: function() {
    this.hp -= 1;
    if (this.hp <= 0)
      this.gotDestroyed();
  },

  gotDestroyed: function() {
    playEffect(res.enemyExploded_wav);
    this.state = Enemy.STATE.destroyed;
    this.setVisible(false);
  },

  respawn: function() {
    this.setVisible(true);
    this.state = Enemy.STATE.normal;
    this.hp = this.originalHP;
  },

  getScore: function() {
    return this.score;
  },

  createAnimation: function() {
    var animation = new cc.Animation.create();
    this.addImagesToAnimation(animation);
    animation.setDelayPerUnit(0.1);
    this.animation = cc.Animate.create(animation);
  },

  addImagesToAnimation: function(animation) {
    animation.addSpriteFrameWithFile(res.barrier1_1_png);
    animation.addSpriteFrameWithFile(res.barrier1_2_png);
    animation.addSpriteFrameWithFile(res.barrier1_3_png);
    animation.addSpriteFrameWithFile(res.barrier1_2_png);
    animation.addSpriteFrameWithFile(res.barrier1_1_png);
  },
});
Enemy.STATE = {
  normal: 1,
  destroyed: 2
};
