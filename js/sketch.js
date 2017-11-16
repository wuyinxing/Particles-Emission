<!-- Hello, This is a simple particles emision tool that can generate different shapes through the controls.
 I hope you like this tool,have fuuuuuun:)-->


<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Particles Emission</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">

 <!--网页标题左侧显示-->
<link rel="icon" href="image/1.ico" type="image/x-icon">
<!--收藏夹显示图标-->
<link rel="shortcut icon" href="image/1.ico" type="image/x-icon">

<script type="text/javascript" src="js/dat.gui.min.js"></script>
<script type="text/javascript" src="js/p5.min.js"></script>
<script type="text/javascript" src="js/gif.js"></script>
<script type="text/javascript" src="js/p5.dom.min.js"></script>


<input id="img-path" type="file" />

<style type="text/css">
  *{
    margin:0;
    padding:0;
  }

#credits {
  font-size: 12px;
  position: absolute;
  bottom: 15px;
  right: 15px;
  opacity: 0.8;
  color: #939393;
  max-width: 70%;
  text-align: right;
}

#img-path {
    display: none;
}
.progress-box{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.progress-bar{
  height: 3px;
  width: 0%;
  background-color: #e61d5f;
}
.save-gif-tip{
  display: none;
  margin-bottom: 5px;
  text-align: center;
  font-size: 16px;
  color: white;
}
</style>
</head>
<body>

<div id="credits"> Created by  <a href = "https://weibo.com/psaiaevegas/profile?rightmod=1&wvr=6&mod=personnumber" target="_blank" style="color: #939393;">Yasai</a>  |  <a href = "http://yasaisai.tumblr.com/archive" target="_blank" style="color: #939393;"> Tumblr Arhive </a> </div>
<div class="progress-box">
  <p class="save-gif-tip">(｀・ω・´) Gif is saving , wait a moment </p>
  <p class="progress-bar"></p>
</div>
<script type="text/javascript">

var type;
var options ={  
  // Background : [20,20,20],
  Color1 : [170,185,31],
  Color2 : [0,151,136],
  Shadow : 0.5,
  Speed : 3,
  Spacing : 70,
  Points : 15,
  Repeate : 4,
  Emission : 10,
  maxSize : 20,
  minSize:0,
  FullScreen : false,
  Rotate: false,
  Shape : 'Circle',
  Text : "★",
  Image_DataURL :'',
  'Upload ICON': function(){
        // you need to create an input element in HTML, explained later

        var input = document.getElementById('img-path');
        input.addEventListener('change', function() {
            var file = input.files[0];
            r = new FileReader();
            r.onload = function (){
             gui['Image_DataURL'] = r.result;
             p5LoadImage(r.result);
             type='image';
             draw();
            }
            r.readAsDataURL(file);

            //gui['Image_DataURL'] = file.name;
            //update all controllers

            for (var i in gui.__controllers) {
                gui.__controllers[i].updateDisplay();
            }
        });
        input.click();
  },

  Random: function () { 
          options.Color1 = [random(0,255),random(0,255),random(0,255)];
          options.Color2 = [options.Color1[0]+100,options.Color1[1]+100,options.Color1[2]+100];    
          options.Speed = random(1,5);
          options.Spacing = random(30,100);
          options.Shadow = random(0,0,6);
          options.Points = random(5,20);
          options.Repeate = random(4,15);
          options.Emission = random(1,10);
          options.maxSize = random(1,20);
          options.minSize = random(1,5);         
          options.FullScreen = random(true,false);
          options.Shape = random( ['Circle', 'Rect','Line','Diamond','Text'] );
        },

  isPNG: false,
  
  Save : function(){
    saveFrames("Particles-Emission", "png", 1, 1);
  },
  SaveGif : function(){
    createGif();
  }
}


//upload icon
var GuiConfig = function() {
    this['Image Path'] = 'graphic.png';  // default image path
    this['Upload Image'] = function() {
    };
};



var text, gui, config;
window.onload = function() {
  gui = new dat.GUI();

  //folder1
  var folder1 = gui.addFolder('Controls');

  // var bgcolorControl = folder1.addColor(options, 'Background');
  // bgcolorControl.onChange(draw);

  var color1Control = folder1.addColor(options, 'Color1');
  color1Control.onChange(draw);

  var color2Control = folder1.addColor(options, 'Color2');
  color2Control.onChange(draw);

  var alphaControl = folder1.add(options, 'Shadow',0,0.8);
  alphaControl.onChange(draw);

  var speedControl = folder1.add(options, 'Speed',1,10);
  speedControl.onChange(draw);

  var SpacingControl  = folder1.add(options, 'Spacing',0,200);
  SpacingControl.onChange(draw);

  var PointsControl = folder1.add(options, 'Points',5,50);
  PointsControl.onChange(draw);

  var EmissionControl = folder1.add(options, 'Emission',1,20);
  EmissionControl.onChange(draw);

  var maxSizeControl = folder1.add(options, 'maxSize',1,100);
  maxSizeControl.onChange(draw);

  var minSizeControl = folder1.add(options, 'minSize',0,100);
  minSizeControl.onChange(draw);

  var RepeateControl = folder1.add(options, 'Repeate',4,30);
  RepeateControl .onChange(draw);

  var FullScreenControl = folder1.add(options, 'FullScreen');
  FullScreenControl.onChange(draw);

  var RotateControl = folder1.add(options, 'Rotate');
  RotateControl.onChange(draw);

  var RandomControl = folder1.add(options, 'Random');

  //folder2
  var folder2 = gui.addFolder('Shape');

  var shapeControl = folder2.add(options, 'Shape', ['Circle', 'Rectangle','Line','Diamond'] );

  
  shapeControl.onChange(function(){
    if(options.Shape == 'Circle'){
      type = 'Circle';  
      draw();

    }
    else if(options.Shape == 'Rectangle'){
      type = 'Rectangle';  
      draw();      
    }
    else if(options.Shape == 'Line'){
      type = 'Line';    
      draw();      
    }
    else if(options.Shape == 'Diamond'){
      type = 'Diamond';  
      draw();
    }
  });


  var textControl = folder2.add(options, 'Text'); 
  textControl.onChange(function(){
    type='text';
    draw();
  });

  var UploadImg = folder2.add(options, 'Upload ICON');



  //folder3
  var folder3 = gui.addFolder('Save');
  var isPNGControl = folder3.add(options, 'isPNG');
  isPNGControl.onChange(draw);

  var SaveControl = folder3.add(options, 'Save');
  var SaveControl = folder3.add(options, 'SaveGif');


  folder1.open();
  // folder2.open();
  // folder3.open();
};

var gif = new GIF({
  workers: 2,
  quality: 10,
  workerScript:'js/gif.worker.js'
});

var canvas = document.getElementById('defaultCanvas0'),
  t, needFrames = 28, startFrame=0, delay=80,
  progressBar = document.querySelector('.progress-bar'),
  progressTip = document.querySelector('.save-gif-tip');

function createGif(){

  t = setInterval(addFrame,50); 
}


function addFrame(){
  gif.addFrame(canvas,{delay:delay});



  startFrame++;
  progressBar.style.width = 100*(startFrame/needFrames)+'%';
  if(startFrame>=needFrames){
    finishGif();
  }
}

function finishGif(){
  clearInterval(t);
  progressTip.style.display='block';
  gif.on('finished', function(blob) {
    //window.open(URL.createObjectURL(blob));
    var anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download ='1.gif';
    progressTip.style.display='none';
    progressBar.style.width =0;
    anchor.click();
  });

  gif.render();
}


</script>

<script type="text/javascript" src="js/sketch.js"></script>
</body>

</html>

