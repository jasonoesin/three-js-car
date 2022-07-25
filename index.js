import * as THREE from './three.js/build/three.module.js'
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from './three.js/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './three.js/examples/jsm/geometries/TextGeometry.js'
import {GLTFLoader} from './three.js/examples/jsm/loaders/GLTFLoader.js'


var scene = new THREE.Scene()

const FOV = 45
const ASPECT = window.innerWidth/window.innerHeight
const NEAR = 0.1
const FAR = 1000

var car

var camera = new THREE.PerspectiveCamera(FOV,ASPECT,NEAR,FAR)
camera.position.z = 10
camera.lookAt(11,100,110)
camera.position.set(8,8,-7)

var currentCam = camera




var renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(innerWidth,innerHeight)
renderer.setClearColor(0x000000)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)


var createPlane = () =>
{
    var planeGeometry = new THREE.PlaneGeometry(40,40)
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x525154,
        side: THREE.DoubleSide,
        shininess : 1,
        specular: 0xffffff,
    })
        
    var planeMesh = new THREE.Mesh(planeGeometry,planeMaterial)
    planeMesh.rotation.x = Math.PI/2
    
    return planeMesh
}

var planeMesh = createPlane()
planeMesh.receiveShadow = true
scene.add(planeMesh)


var controls = new OrbitControls(currentCam,renderer.domElement)
controls.enableDamping = true
controls.minPolarAngle = 0.8
controls.maxPolarAngle = 2.4
controls.dampingFactor = 0.07
controls.rotateSpeed = 1



var pointLight = new THREE.PointLight(0x5e0491, 2, 50)
pointLight.position.y = 3
pointLight.position.x = 5
pointLight.position.z = 5
scene.add(pointLight) 

var pointLight1 = new THREE.PointLight(0xA2E1DB, 1, 50)
pointLight1.position.y = 3
pointLight1.position.x = -5
pointLight1.position.z = -5
scene.add(pointLight1)   

var pointLight2 = new THREE.PointLight(0x406cc9, 1, 50)
pointLight2.position.y = 3
pointLight2.position.x = -5
pointLight2.position.z = 5
scene.add(pointLight2)   



pointLight.castShadow = pointLight1.castShadow = pointLight2.castShadow = true

var skyBoxGeometry = new THREE.BoxGeometry(100,100,100)
var textureLoader = new THREE.TextureLoader()
var skyBoxMaterials = [
    new THREE.MeshBasicMaterial({
        map: textureLoader.load('./images/nightsky_rt.png'),
        side: THREE.BackSide
    }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('./images/nightsky_lf.png'),
        side: THREE.BackSide
        
    }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('./images/nightsky_up.png'),
        side: THREE.BackSide
    
    }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('./images/nightsky_dn.png'),
        side: THREE.BackSide
    
    }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('./images/nightsky_ft.png'),
        side: THREE.BackSide
    
    }),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load('./images/nightsky_bk.png'),
        side: THREE.BackSide
    
    })
  ]

var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterials)
skyBox.name = "skybox"
scene.add(skyBox)




var gltfLoader = new GLTFLoader()
gltfLoader.load('./shop/scene.gltf',(object) => {
    var model = object.scene
    model.scale.set(0.025,0.025,0.025)
    model.position.y = 0.1

    model.traverse((child) => {
        if (!child.isMesh ) return;
        var prevMaterial = child.material;
        child.material = new THREE.MeshBasicMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial);
      });

    scene.add(model)
}, undefined, function ( error ) {
	console.error( error );
})


gltfLoader.load('./lamp/scene.gltf',(object) => {
    var model = object.scene
    model.scale.set(0.005,0.005,0.005)
    model.position.y = 2.2
    model.position.z = 2
    model.position.x = -0.4

    model.traverse((child) => {
        if (!child.isMesh ) return;
        var prevMaterial = child.material;
        child.material = new THREE.MeshBasicMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial);
      
      });

    scene.add(model)
    

}, undefined, function ( error ) {
	console.error( error );
})

gltfLoader.load('./street_lamp/scene.gltf',(object) => {
    var model = object.scene
    model.scale.set(0.015,0.015,0.015)
    model.position.y = 1.9
    model.position.x = 5


    model.traverse((child) => {
        if (!child.isMesh ) return;
        var prevMaterial = child.material;
        child.material = new THREE.MeshBasicMaterial();
        THREE.MeshBasicMaterial.prototype.copy.call(child.material, prevMaterial);
        child.layers.enable(1)
      });

    model.layers.enable(1)

    

    scene.add(model)
    

}, undefined, function ( error ) {
	console.error( error );
})



function makeCar(){
    car = new THREE.Group();

    var blWheel = new THREE.Mesh(
        new THREE.SphereGeometry(6),
        new THREE.MeshLambertMaterial({
            color: 0x333333
        })
    )

    blWheel.position.z = 6
    blWheel.position.y = 15
    blWheel.position.x = -18

    var brWheel = new THREE.Mesh(
        new THREE.SphereGeometry(6),
        new THREE.MeshLambertMaterial({
            color: 0x333333
        })
    )

    brWheel.position.z = 6
    brWheel.position.y = -15
    brWheel.position.x = -18

    var flWheel = new THREE.Mesh(
        new THREE.SphereGeometry(6),
        new THREE.MeshLambertMaterial({
            color: 0x333333
        })
    )

    flWheel.position.z = 6
    flWheel.position.y = 15
    flWheel.position.x = 18

    var frWheel = new THREE.Mesh(
        new THREE.SphereGeometry(6),
        new THREE.MeshLambertMaterial({
            color: 0x333333
        })
    )

    frWheel.position.z = 6
    frWheel.position.y = -15
    frWheel.position.x = 18


    var body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60,30,15),
        new THREE.MeshStandardMaterial({
            color: 0xed8f47
        })
        
    )
    body.castShadow = true

    body.position.z = 12

    var upper = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33,24,12),
        new THREE.MeshLambertMaterial({
            color: 0xffffff
        })
    )   

    upper.position.x = -6
    upper.position.z = 25.5


    car.add(blWheel)
    car.add(brWheel)
    car.add(frWheel)
    car.add(flWheel)
    car.add(body)
    car.add(upper)

    car.castShadow = true

    car.scale.set(0.03,0.03,0.03)
    car.position.z = 5
    car.rotation.x = 4.713
    car.rotation.z = 3.1


    return car
}


var car = makeCar()
scene.add(car)




let CAR_SPEED = 0.2

var move = (e) =>
{
    carCam.position.set(car.position.x,car.position.y+0.7,car.position.z)

    switch(e.keyCode)
    {

        case 87:
            if(car.position.x < -18)
                break
            car.position.x -= CAR_SPEED
            car.rotation.z = 3.1
            carCam.rotation.y = 1.5
            break
        case 68:
            if(car.position.z < -18)
                break
            car.position.z -=CAR_SPEED
            car.rotation.z = -4.713
            carCam.rotation.y = 6.2
            console.log(carCam.rotation.y)
            break;
        case 83:
            if(car.position.x > 18)
                break
            car.position.x += CAR_SPEED
            car.rotation.z = 0
            carCam.rotation.y = -1.5 
            break
        case 65:
            if(car.position.z > 18)
                break
            car.position.z += CAR_SPEED
            car.rotation.z = 4.713
            carCam.rotation.y = -3.1 
            break
        case 32:
            if(currentCam == carCam)
                currentCam = camera
            else
                currentCam = carCam
            break
    }
    
}

var onMouseMove = (e) => {
    var mouse = {}
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
}

var onMouseClick = (e) => {
    var intersectedObject = raycaster.intersectObjects(scene.children)

    if(intersectedObject.length > 0){
        //
        spotLight.intensity = (spotLight.intensity == 0) ? 1 : 0
    }
}

window.addEventListener('keydown', move)
window.addEventListener('mousemove', onMouseMove)
window.addEventListener('mousedown', onMouseClick)


function makeTree()
{
    var tree = new THREE.Group()
    
    var leaf1 = new THREE.Mesh(
        new THREE.ConeGeometry(1,3,64),
        new THREE.MeshStandardMaterial({
            color: 0x256627
        })
    )



    var leaf2 = new THREE.Mesh(
        new THREE.ConeGeometry(1,3,64),
        new THREE.MeshStandardMaterial({
            color: 0x256627,
        })
    )

    var log = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 1, 8 ),
        new THREE.MeshStandardMaterial({
            color: 0x332d14,
        })
    )

    leaf2.castShadow=  true

    log.position.y = -1.5

    leaf1.position.y = 0.5
    leaf2.position.y = 0.8

    tree.add(leaf1)
    tree.add(leaf2)
    tree.add(log)

    tree.position.y = 2

    return tree
}

var tree = makeTree()
var tree2 = makeTree()
var tree3 = makeTree()
var tree4 = makeTree()

tree.position.x = -3
tree.position.z = 5

tree2.position.x = 10
tree2.position.z = -2

tree3.position.x = 7
tree3.position.z = -8

tree4.position.x = -10  
tree4.position.x = -8  


scene.add(tree)
scene.add(tree2)
scene.add(tree3)
scene.add(tree4)



//-----

var raycaster = new THREE.Raycaster()
raycaster.layers.set(1)

var spotLight = new THREE.SpotLight(0xffffff,1,10)
spotLight.position.set(5,4,0)
spotLight.angle = 0.2
spotLight.intensity = 0
spotLight.castShadow = true

var target = new THREE.Object3D()
target.position.set(spotLight.position.x,0,spotLight.position.z)

scene.add(target)

spotLight.target = target

scene.add(spotLight)
//-----


var carCam = new THREE.PerspectiveCamera(FOV,ASPECT,NEAR,FAR)
carCam.rotation.y = 1.5



var render = () =>{
    
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene,currentCam)
}

render()