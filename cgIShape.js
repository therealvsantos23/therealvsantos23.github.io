class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
        // fill in your cube code here.
        let k = 1/subdivisions;

        for(let interval = 0; interval < subdivisions; interval++){
            let coordinateA = interval * k - 0.5;

            let coordinateB = (interval + 1) * k - 0.5;

            for(let second_interval = 0; second_interval < subdivisions; second_interval++){
                let coordinateC = second_interval * k - 0.5;

                let coordinateD = (second_interval + 1) * k - 0.5;

                let X = 0.5;
                addTriangle(-X, coordinateA, coordinateD, -X, coordinateB, coordinateC, -X, coordinateA, coordinateC);
                addTriangle(-X, coordinateB, coordinateD, -X, coordinateB, coordinateC, -X, coordinateA, coordinateD);
            
                addTriangle(X, coordinateB, coordinateC, X, coordinateA, coordinateD, X, coordinateA, coordinateC);
                addTriangle(X, coordinateB, coordinateC, X, coordinateB, coordinateD, X, coordinateA, coordinateD);

                let Y = 0.5;
                addTriangle(coordinateB, -Y, coordinateC, coordinateA, -Y, coordinateD, coordinateA, -Y, coordinateC);
                addTriangle(coordinateB, -Y, coordinateC, coordinateB, -Y, coordinateD, coordinateA, -Y, coordinateD);
            
                addTriangle(coordinateA, Y, coordinateD, coordinateB, Y, coordinateC, coordinateA, Y, coordinateC);
                addTriangle(coordinateB, Y, coordinateD, coordinateB, Y, coordinateC, coordinateA, Y, coordinateD);

                let Z = 0.5;
                addTriangle(coordinateB, coordinateC, -Z, coordinateA, coordinateC, -Z, coordinateA, coordinateD, -Z);
                addTriangle(coordinateB, coordinateC, -Z, coordinateA, coordinateD, -Z, coordinateB, coordinateD, -Z);
            
                addTriangle(coordinateA, coordinateC, Z, coordinateB, coordinateC, Z, coordinateA, coordinateD, Z);
                addTriangle(coordinateA, coordinateD, Z, coordinateB, coordinateC, Z, coordinateB, coordinateD, Z);

            }
        }
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        // fill in your cylinder code here
        let coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF;

        for(let interval = 0; interval < radialdivision; interval++) {

            let PI = 3.14159265358979;

            A = 0.5 * Math.cos(interval * 2 * PI / radialdivision);

            B = 0.5 * Math.cos((interval + 1) * 2 * PI / radialdivision);

            E = 0.5 * Math.sin(interval * 2 * PI / radialdivision);

            F = 0.5 * Math.sin((interval + 1) * 2 * PI / radialdivision);

            coordinateA = A;
            coordinateB = B;
            coordinateE = E;
            coordinateF = F;
            
            let Y = 0.5;
            addTriangle(0, -Y, 0, coordinateA, -Y, coordinateE, coordinateB, -Y, coordinateF);
            addTriangle(coordinateB, Y, coordinateF, coordinateA, Y, coordinateE, 0, Y, 0);
            
            
            for(let second_interval = 0; second_interval < heightdivision; second_interval++) {
                coordinateC = second_interval / heightdivision - 0.5;

                coordinateD = (second_interval + 1) / heightdivision - 0.5;

                addTriangle(coordinateA, coordinateD, coordinateE, coordinateB, coordinateD, coordinateF, coordinateA, coordinateC, coordinateE);
                addTriangle(coordinateB, coordinateD, coordinateF, coordinateB, coordinateC, coordinateF, coordinateA, coordinateC, coordinateE);
                
            }
        }
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
    
        // Fill in your cone code here.
        let coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF;

        for(let interval = 0; interval < radialdivision; interval++) {
            
            let Y = 0.5;
            let PI = 3.14159265358979;

            A = 0.5 * Math.cos(interval * 2 * PI / radialdivision);

            B = 0.5 * Math.cos((interval + 1) * 2 * PI / radialdivision);

            E = 0.5 * Math.sin(interval * 2 * PI / radialdivision);

            F = 0.5 * Math.sin((interval + 1) * 2 * PI / radialdivision);

            coordinateA = A;
            coordinateB = B;
            coordinateE = E;
            coordinateF = F;

            addTriangle(coordinateA, -Y, coordinateE, coordinateB, -Y, coordinateF, 0, -Y, 0);

            coordinateC = -0.5;
            coordinateD = 1 / heightdivision;

            increment_coordinateA = -coordinateA / heightdivision;
            increment_coordinateB = -coordinateB / heightdivision;

            increment_coordinateE = -coordinateE / heightdivision;
            increment_coordinateF = -coordinateF / heightdivision;
            
            for(let second_interval = 0; second_interval < heightdivision - 1; second_interval++) {

                addTriangle(coordinateA, coordinateC, coordinateE, 
                    coordinateA + increment_coordinateA, coordinateC + coordinateD, coordinateE + increment_coordinateE,
                    coordinateB, coordinateC, coordinateF);
                addTriangle(coordinateA + increment_coordinateA, coordinateC + coordinateD, coordinateE + increment_coordinateE,
                    coordinateB + increment_coordinateB, coordinateC + coordinateD, coordinateF + increment_coordinateF,
                    coordinateB, coordinateC, coordinateE );
                
                coordinateA += increment_coordinateA;
            
                coordinateB += increment_coordinateB;
                
                coordinateE += increment_coordinateE;
                
                coordinateF += increment_coordinateF;
                
                coordinateC += coordinateD;
            }

            addTriangle(coordinateA, coordinateC, coordinateE, 0, 0.5, 0, coordinateB, coordinateC, coordinateF);
        }
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here
        let PI = 3.14159265358979;

        let coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF;
        let coordinateG, coordinateH, coordinateI, coordinateJ, coordinateK, coordinateL;

        let Xlatitude = PI / stacks; 
        let Ylongitude = 2 * PI / slices; 

        for(let interval = 0; interval < stacks; interval++) {

            let latitudeAngle = Xlatitude * interval;
            
            for(let second_interval = 0; second_interval < slices; second_interval++) {

                let longitudeAngle = Ylongitude * second_interval;

                A = 0.5 * Math.sin(latitudeAngle) * Math.cos(longitudeAngle);
                B = 0.5 * Math.cos(latitudeAngle);
                C = 0.5 * Math.sin(latitudeAngle) * Math.sin(longitudeAngle);

                D = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.cos(longitudeAngle);
                E = 0.5 * Math.cos(latitudeAngle + Xlatitude);
                F = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.sin(longitudeAngle);

                G = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.cos(longitudeAngle + Ylongitude);
                H = 0.5 * Math.cos(latitudeAngle + Xlatitude);
                I = 0.5 * Math.sin(latitudeAngle + Xlatitude) * Math.sin(longitudeAngle + Ylongitude);

                J = 0.5 * Math.sin(latitudeAngle) * Math.cos(longitudeAngle + Ylongitude);
                K = 0.5 * Math.cos(latitudeAngle);
                L = 0.5 * Math.sin(latitudeAngle) * Math.sin(longitudeAngle + Ylongitude);
                
                coordinateA = A;
                coordinateB = B;
                coordinateC = C;

                coordinateD = D;
                coordinateE = E;
                coordinateF = F;

                coordinateG = G;
                coordinateH = H;
                coordinateI = I;

                coordinateJ = J;
                coordinateK = K;
                coordinateL = L;

                addTriangle(coordinateA, coordinateB, coordinateC, coordinateD, coordinateE, coordinateF, coordinateG, coordinateH, coordinateI);
                addTriangle(coordinateA, coordinateB, coordinateC, coordinateG, coordinateH, coordinateI, coordinateJ, coordinateK, coordinateL);
        
            }
        }
    }
}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

