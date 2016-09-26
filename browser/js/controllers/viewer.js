app.controller('ViewerCtrl', function($scope, $stateParams, $state) {
    $scope.url = $stateParams.url;
    $scope.matrix = $stateParams.matrix;

    console.log('running');


    //SHAKE LOGIC:
    // create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);

    //shake event callback
    function shakeEventDidOccur() {
        myShakeEvent.stop();
        $state.go('home');
    }


    //PHOTOSPHERE LOGIC:
    // window.addEventListener('load', function() {
    var container, camera, scene, renderer, controls, geometry, mesh;
    var animate = function() {
        window.requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera); //find here for draw. trail array, foreach(canvas.render)
    };
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    controls = new THREE.DeviceOrientationControls(camera);
    scene = new THREE.Scene();
    var geometry = new THREE.SphereGeometry(500, 16, 8);
    geometry.scale(-1, 1, 1);
    var map = new THREE.TextureLoader().load($scope.url);
    var material = new THREE.MeshBasicMaterial({
        map: map
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // //create cube
    // var geometry = new THREE.BoxGeometry(.2, .2, .2);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    // var cube = new THREE.Mesh(geometry, material);
    // cube.position.set(1,1,1);
    // scene.add(cube);

    // var geometry = new THREE.BoxGeometry(.2, .2, .2);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // cube.position.set(1,1,0);
    // scene.add(cube);

    // var geometry = new THREE.BoxGeometry(.2, .2, .2);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    // var cube = new THREE.Mesh(geometry, material);
    // cube.position.set(1,0,1);
    // scene.add(cube);

    // var geometry = new THREE.BoxGeometry(.2, .2, .2);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0,1,1);
    // scene.add(cube);

    camera.position.z = 3;
    var x = 0;
    console.log('viewer 54 ', controls.deviceOrientation);
    var render = function() {
        requestAnimationFrame(render);
        // console.log(x++)

        // cube.rotation.x += 0.1;
        // cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };
    //want a matrix?
    if ($scope.matrix) {
        var geometry = new THREE.BoxGeometry(100, 100, 100, 4, 4, 4);
        var material = new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.BackSide, wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
    animate();
    // }, false);

    //add boxes
    // setInterval(function() {
    //     var L = controls.deviceOrientation;
    //     var geometry = new THREE.BoxGeometry(.2, .2, .2);
    //     var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    //     var cube = new THREE.Mesh(geometry, material);
    //     cube.position.set(L.alpha, L.beta, L.gamma);
    //     scene.add(cube);
    // }, 1000);


    //creating line. NEED TO CONVERT A/B/G ANGLES TO SPHERICAL COORDS
    //...or, using touch events, debug linedraw
    // var MAX_POINTS = 500;

    // // geometry
    // var geometry = new THREE.BufferGeometry();

    // // attributes
    // var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
    // geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

    // // draw range
    // drawCount = 0; 
    // geometry.setDrawRange( 0, drawCount );

    // // material
    // var material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );

    // // line
    // line = new THREE.Line( geometry,  material );
    // scene.add( line );

    // // add points
    // var can = document.getElementsByTagName('canvas')[0];
    // can.addEventListener('click', addPoint, false);
    // can.addEventListener('touch', addPoint, false);

    // var points = line.geometry.attributes.position.array;
    // function addPoint(e){
    //     points[drawCount++] = e.clientX;
    //     points[drawCount++] = e.clientX;
    //     points[drawCount++] = e.clientX;
    //     line.geometry.attributes.position.needsUpdate = true;
    //     line.geometry.setDrawRange( 0, drawCount );
    //     // console.log(points);
    //     console.log(points, drawCount);
    // }


    //draw lines with webgl
    // var can = document.getElementsByTagName('canvas')[0];
    // can.addEventListener('click', drawLine, false);


    // var coords = [];

    // function drawLine(e) {
    //     e.preventDefault();
    //     // var el = document.getElementsByTagName("canvas")[0];
    //     var gl = can.getContext("webgl");

    //     // console.log(e);
    //     var xPos = e.clientX;
    //     var yPos = e.clientY;
    //     console.log(xPos,yPos, coords, gl);
    //     coords.push(xPos);
    //     coords.push(yPos);
    //     // coords.push(0);

    //     var lineBuffer = gl.createBuffer();

    //     gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);


    //     if (coords.length>3) {
    //         console.log(lineBuffer);
    //         gl.drawArrays(gl.LINE_STRIP, 0, coords.length);
    //     }

    // }



    //add cubes
    var can = document.getElementsByTagName('canvas')[0];
    can.addEventListener('click', touched, false);
    can.addEventListener('touch', touched, false);
    var pos = 1;

    function touched() {

        function colorForTouch() {
            var r = Math.floor(Math.random() * 16);
            var g = Math.floor(Math.random() * 16);
            var b = Math.floor(Math.random() * 16);
            r = r.toString(16); // make it a hex digit
            g = g.toString(16); // make it a hex digit
            b = b.toString(16); // make it a hex digit
            var color = "#" + r + g + b;
            return color;
        }
        var col = colorForTouch();
        // var geometry = new THREE.BoxGeometry(.4, .4, .4);
        var material = new THREE.SpriteMaterial({ map: map, color: col });
        var sprite = new THREE.Sprite(material);
        sprite.position.set(-5 + pos++, pos++, pos++);
        scene.add(sprite);
    }

});
