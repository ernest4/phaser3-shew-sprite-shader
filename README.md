# phaser3-shew-sprite-shader

Pahser3 does not expose a ready way to skew sprites. This shader achieves the effect and is used to fake sprite shadows.
You can see in action in [here](https://www.youtube.com/watch?v=6lqLOkfuFOs&ab_channel=OutlierStudio)

[![VIDEO](https://img.youtube.com/vi/6lqLOkfuFOs/0.jpg)](https://www.youtube.com/watch?v=6lqLOkfuFOs&ab_channel=OutlierStudio)

The shader itself just provides the skew, to fake shadows you'll need to something like this:

```javascript
export default class Test extends Phaser.Scene {
  create() {
    this.renderer.pipelines.add("skewQuad", new SkewQuadPipeline(this.game));

    // NOTE: there's perf penalty to using containers. So in your own implementation might be better to manually track
    // position of shadow sprite perhaps?
    let spriteContainer = this.add.container(0, 0);

    let sprite = this.add.sprite(0, 0, "yourSpriteKey");

    let spriteShadow = this.add.sprite(0, 0, "yourSpriteKey"); // shadow is made from the same sprite that casts it
    let scaleY = 0.4;
    spriteShadow.y = spriteShadow.y + (spriteShadow.height * (1 - scaleY)) / 2;
    spriteShadow.scaleY = scaleY;
    spriteShadow.tint = 0x000000;
    spriteShadow.alpha = 0.5;
    spriteShadow.setPipeline("skewQuad");
    spriteShadow.pipeline.set1f("inHorizontalSkew", 0.2); // set the desired left/right skew factor
    
    // NOTE: add order important!! depth sorting does not work within container, so items are drawn
    // in order they are added. Thus shadow needs to be added first.
    // HOWEVER: you can use container methods like bringToTop(child), bringToBack(child)... etc.
    // to move container children depth after they have been added too.
    spriteContainer.add(spriteShadow);
    spriteContainer.add(sprite);
  }
};

```
