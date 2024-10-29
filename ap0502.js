//
// 応用プログラミング 第5回 課題2 (ap0502)
// G384002023 拓殖太郎
//
"use strict"; // 厳格モード

import * as THREE from 'three';

import GUI from 'ili-gui';

// ３Ｄページ作成関数の定義
function init() {
  const controls = {
    fov: 60, // 視野角
    axes: true,
    test: true,
    rotate: false
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    controls.fov, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(1,0,2);
  camera.lookAt(0,0,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x406080 );
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // カメラ制御

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  
  // テクスチャの読み込み

  // 正20面体の作成
  const geometry = new THREE.IcosahedronGeometry();
  const material = new THREE.MeshNormalMaterial();
    
  // UVマッピング
  // 立体の表面の三角形とテクスチャ画像の対応を決める
  //   基準となる数値
  const x0 = 0.0125;
  const y0 = 1.0;
  const dx = 0.089;
  const dy = 0.219;
  const uvs = geometry.getAttribute("uv");
  // uvマップのクリア
  for(let i = 0; i < 120; i++) {
    uvs.array[i] = 0;
  }
  // UVマッピング関数
  function setUvs(f, x, s) {
    f = f * 6;
    switch (s) {
    case 1: // 1段目
      uvs.array[f]   = x0 + dx * x;
      uvs.array[f+1] = y0 - dy; // -dy + 0
      uvs.array[f+2] = x0 + dx * (x + 2);
      uvs.array[f+3] = y0 - dy; // -dy + 0
      uvs.array[f+4] = x0 + dx * (x + 1);
      uvs.array[f+5] = y0;      // -dy + dy;
    break;
    case 2: // 2段目
      uvs.array[f]   = x0;
      uvs.array[f+1] = y0;
      uvs.array[f+2] = x0;
      uvs.array[f+3] = y0;
      uvs.array[f+4] = x0;
      uvs.array[f+5] = y0;
      break;
    case 3: // 3段目
      uvs.array[f]   = x0;
      uvs.array[f+1] = y0;
      uvs.array[f+2] = x0;
      uvs.array[f+3] = y0;
      uvs.array[f+4] = x0;
      uvs.array[f+5] = y0;
      break;
    case 4: // 4段目
      uvs.array[f]   = x0;
      uvs.array[f+1] = y0;
      uvs.array[f+2] = x0;
      uvs.array[f+3] = y0;
      uvs.array[f+4] = x0;
      uvs.array[f+5] = y0;
      break;
    }
  }
  // 関数の適用
  // 最上段
  setUvs( 0, 1, 1); setUvs( 1, 3, 1);
  // 2段目
  
  // 3段目
  
  // 最下段
  
  geometry.setAttribute("uv", uvs, 2);
  
  // 形状と素材をまとめる
  const icosahedron = new THREE.Mesh(geometry, material);
  icosahedron.rotateZ(-Math.PI/6);
  // シーンに追加する．
  scene.add(icosahedron);

  // 光源の作成
  const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 2);
  dirLight1.position.set(3, 6, 8);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xC0C0C0, 2);
  dirLight2.position.set(-3, -6, -8);
  scene.add(dirLight2);

  const ambLight = new THREE.AmbientLight(0x808080, 2);
  scene.add(ambLight);

  // 描画関数の定義
  function render() {
    axes.visible = controls.axes;
    // テクスチャの切り替え

    // 物体の回転
    if (controls.rotate) {
      icosahedron.rotation.y = (icosahedron.rotation.y + 0.01) % (2 * Math.PI);
    }
    // カメラ位置の制御

    // 描画
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // GUIコントローラ
  const gui = new GUI();
  gui.add(controls, "axes");
  gui.add(controls, "test");
  gui.add(controls, "rotate");
  
  // 最初の描画
  render();
}

// 3Dページ作成関数の呼び出し
init();
