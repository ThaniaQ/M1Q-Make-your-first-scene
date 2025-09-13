const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// The bed
const Cgeometry = new THREE.CylinderGeometry( 10, 0, 1, 12, 6 ); 
const Cmaterial = new THREE.MeshBasicMaterial( {color: "#592693" , wireframe: true} ); //looky-like a cobweb
const cylinder = new THREE.Mesh( Cgeometry, Cmaterial );

cylinder.rotation.x = Math.PI / 2; // Make it actually face the 'camera'
scene.add(cylinder);

// The tenant
const heartShape = new THREE.Shape();
heartShape.moveTo(5, 5);
heartShape.bezierCurveTo(5, 5, 4, 0, 0, 0);
heartShape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
heartShape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
heartShape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
heartShape.bezierCurveTo(16, 7, 16, 0, 10, 0);
heartShape.bezierCurveTo(7, 0, 5, 5, 5, 5);

let heartGeometry = new THREE.ShapeGeometry(heartShape, 2);
heartGeometry.center();
const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const heart = new THREE.Mesh(heartGeometry, heartMaterial);

heart.scale.set(0.3, 0.3, 0.2);
heart.position.set(0, 0, 2);
heart.rotation.z = Math.PI; // Make it actually face the 'camera'
scene.add(heart);

// The house
const boxGeometry = new THREE.BoxGeometry(22, 22, 0.1); 
const edges = new THREE.EdgesGeometry(boxGeometry); // removing the diagonal part of the box
const box = new THREE.LineSegments(
    edges,
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
scene.add(box);

// Merge
const group = new THREE.Group();
group.add(cylinder);
group.add(box);
group.add(heart);
scene.add(group);

let clock = new THREE.Clock();
camera.position.z = 25;

function animate() {
    requestAnimationFrame( animate );
    let t = clock.getElapsedTime();
    group.position.y = Math.sin(t) * 2;
    heart.rotation.y += 0.05; // You spin me right round
    renderer.render ( scene, camera );
}

animate();