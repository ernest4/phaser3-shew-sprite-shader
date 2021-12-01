class SkewQuad extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
  constructor(game: Phaser.Game) {
    let config = {
      game,
      renderer: game.renderer,
      vertShader: `
      precision mediump float;

      uniform mat4 uProjectionMatrix;

      attribute vec2 inPosition;
      attribute vec2 inTexCoord;
      attribute float inTexId;
      attribute float inTintEffect;
      attribute vec4 inTint;

      uniform float inHorizontalSkew;

      varying vec2 outTexCoord;
      varying float outTintEffect;
      varying vec4 outTint;

      void main ()
      {
          // tweaked source from: node_modules/phaser/src/renderer/webgl/shaders/src/Single.vert

          float h = inHorizontalSkew;

          // curve fitted function: https://www.dcode.fr/function-equation-finder
          // f(h) = 0.00428571 - (0.212619 * h)= correction

          mat4 skew = mat4(1.0,   h, 0.0, 0.00428571 - (0.212619 * h),  // 1. column
                           0.0, 1.0, 0.0, 0.0,  // 2. column
                           0.0, 0.0, 1.0, 0.0,  // 3. column
                           0.0, 0.0, 0.0, 1.0); // 4. column

          gl_Position = uProjectionMatrix * vec4(inPosition, 1.0, 1.0) * skew;

          outTexCoord = inTexCoord;
          outTint = inTint;
          outTintEffect = inTintEffect;
      }
      `,
    };
    super(config);
  }
}

export default SkewQuad;

// class GrayscalePipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
//   constructor(game: Phaser.Game) {
//     let config = {
//       game,
//       renderer: game.renderer,
//       fragShader: `
//       precision mediump float;
//       uniform sampler2D uMainSampler;
//       varying vec2 outTexCoord;
//       void main(void) {
//       vec4 color = texture2D(uMainSampler, outTexCoord);
//       float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
//       gl_FragColor = vec4(vec3(gray), 1.0);
//       }`,
//     };
//     super(config);
//   }
// }
