var shadow;

function setup() {
    createCanvas(windowWidth, windowHeight);
}


function draw() {

// shadow='rgba(20,20,20,'+(1-options.Shadow)+')';
shadow ='rgba('+options.Background[0]+','
               +options.Background[1]+','
               +options.Background[2]+','
               +(1-options.Shadow)+')';
background(shadow);

noStroke();
translate(width / 2, height / 2);

for (var k = 0; k < options.Repeate; k++) {
        for (var i = 0; i < options.Points; i++) {
            for (var j = 0; j < options.Points; j++) {

                var ratio = dist(i, j, 0, 0) /options.Emission;
                var angle = sin(millis() / 2000 * options.Speed + ratio * (PI/2));

                var b = (options.Spacing);

                var scale = map(options.Points,5,50,400,1200);
                var r = map(dist(i * b, j * b, 0, 0), 0, scale,options.maxSize, options.minSize);


            if(options.FullScreen == false){
                if (dist(i * b, j * b, 0, 0) > scale) {
                    r = 0;
                }
            }

                var percent = norm(pow(j + i, 1.2), 0, options.Points);

                from = color(options.Color1);
                to = color(options.Color2);
                between = lerpColor(from, to, percent);
       

                var x = i * b * abs((cos(angle))/2 );
                var y = j * b * abs((cos(angle))/2 );

                if(options.Shape  == 'Circle'){
                    fill(between);
                    noStroke();
                    ellipse(x, y, r, r);  
                  }else if(options.Shape == 'Rect'){
                     fill(between);
                     noStroke();
                     rect(x, y, r, r); 
                  }else if(options.Shape == 'Line'){           
                     stroke(between);
                     strokeWeight(r);
                     noFill();
                     line(x, y, x-r, y-r); 
                  }else{
                     fill(between);
                     noStroke();
                    beginShape();
                     vertex(x,y);
                     vertex(x-30,y-30);
                     vertex(x+30,y+30);  
                     endShape(CLOSE);
                  }
            }
        }
        rotate(TWO_PI / int(options.Repeate+0.1));
    }
}
