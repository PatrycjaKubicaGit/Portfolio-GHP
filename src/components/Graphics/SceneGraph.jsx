import React, { useEffect, useRef, useState } from "react";

const SceneGraph = () => {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  let frameNumber = 0;
  let graphics;
  let world;
  let pixelSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      graphics = canvas.getContext("2d");
      createWorld();
      draw();

      if (running) {
        requestAnimationFrame(frame);
      }
    }
    return () => {
      setRunning(false);
    };
  }, [running]);

  useEffect(() => {
    if (running) {
      requestAnimationFrame(frame);
    }
  }, [running]);

  const frame = () => {
    if (running) {
      updateFrame();
      draw();
      requestAnimationFrame(frame);
    }
  };
  

  const createWorld = () => {
    world = new CompoundObject();

    const createPolygon = (translationX, translationY, scale) => {
      const polygon = new TransformedObject(new SceneGraphNode());
      polygon.setTranslation(translationX, translationY).setScale(scale, scale);
      polygon.object.doDraw = (g) => {
        const katy = 12;
        const X = [];
        const Y = [];
        const alpha = (2 * Math.PI) / katy;
        const wielkosc = 1;
        let phiI = 0;
        for (let i = 0; i < katy; i++) {
          phiI = i * alpha;
          X[i] = wielkosc * Math.cos(phiI);
          Y[i] = wielkosc * Math.sin(phiI);
        }

        g.beginPath();
        g.moveTo(-X[0], -Y[0]);
        for (let i = 1; i < X.length; i++) {
          g.lineTo(-X[i], -Y[i]);
        }
        g.closePath();
        g.stroke();

        g.beginPath();
        for (let i = 0; i < katy; i++) {
          g.moveTo(-X[i], -Y[i]);
          g.lineTo(0, 0);
        }
        g.closePath();
        g.stroke();
      };
      return polygon;
    };
    const createSquare = (translationX, translationY, scale, fillColor) => {
      const square = new TransformedObject(new SceneGraphNode());
      square.setTranslation(translationX, translationY).setScale(scale, scale);
      square.object.doDraw = (g) => {
        g.fillStyle = fillColor; 
        g.beginPath();
        g.rect(-0.5, -10, 1, 10); 
        g.closePath();
        g.fill(); 
        g.stroke();
      };
      return square;
    };

   
    
  
    world.add(createSquare(-2.5, 1.5, 0.3, "blue")); 
world.add(createSquare(2, 0.5, 0.3, "green")); 

world.add(createPolygon(-2.5, 1.5, 0.6)); 
world.add(createPolygon(2, 0.5, 0.6));
    
  };

  const updateFrame = () => {
    frameNumber++;
    world.subobjects.forEach((obj) => {
      if (!(obj instanceof TransformedObject && obj.object instanceof SceneGraphNode && obj.object.doDraw.toString().includes('rect'))) {
        obj.setRotation(frameNumber * 0.75);
      }
    });
  };

  const draw = () => {
    graphics.save();
    graphics.fillStyle = "white";
    graphics.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    graphics.fillStyle = "black";
    applyLimits(graphics, -4, 4, 3, -3, false);
    graphics.lineWidth = pixelSize;
    world.draw(graphics);
    graphics.restore();
  };

  const applyLimits = (g, xleft, xright, ytop, ybottom, preserveAspect) => {
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    if (preserveAspect) {
      const displayAspect = Math.abs(height / width);
      const requestedAspect = Math.abs((ybottom - ytop) / (xright - xleft));
      let excess;
      if (displayAspect > requestedAspect) {
        excess = (ybottom - ytop) * (displayAspect / requestedAspect - 1);
        ybottom += excess / 2;
        ytop -= excess / 2;
      } else if (displayAspect < requestedAspect) {
        excess = (xright - xleft) * (requestedAspect / displayAspect - 1);
        xright += excess / 2;
        xleft -= excess / 2;
      }
    }
    const pixelWidth = Math.abs((xright - xleft) / width);
    const pixelHeight = Math.abs((ybottom - ytop) / height);
    pixelSize = Math.min(pixelWidth, pixelHeight);
    g.scale(width / (xright - xleft), height / (ybottom - ytop));
    g.translate(-xleft, -ytop);
  };

  const handleCheckboxChange = (e) => {
    setRunning(e.target.checked);
  };

  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
      <h3>Prosta animacja wiatraków</h3>
      <p id="message">
        <label>
          <input
            type="checkbox"
            id="animateCheck"
            onChange={handleCheckboxChange}
          />
          <b>Włącz animacje</b>
        </label>
      </p>
      <div style={{ float: "left", border: "2px solid black" }}>
        <canvas ref={canvasRef} width="800" height="600" style={{ display: "block" }} />
      </div>
    </div>
  );
};

class SceneGraphNode {
  constructor() {
    this.fillColor = null;
    this.strokeColor = null;
  }

  doDraw(g) {
    throw "doDraw not implemented in SceneGraphNode";
  }

  draw(g) {
    g.save();
    if (this.fillColor) {
      g.fillStyle = this.fillColor;
    }
    if (this.strokeColor) {
      g.strokeStyle = this.strokeColor;
    }
    this.doDraw(g);
    g.restore();
  }

  setFillColor(color) {
    this.fillColor = color;
    return this;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
    return this;
  }

  setColor(color) {
    this.fillColor = color;
    this.strokeColor = color;
    return this;
  }
}

class CompoundObject extends SceneGraphNode {
  constructor() {
    super();
    this.subobjects = [];
  }

  add(node) {
    this.subobjects.push(node);
    return this;
  }

  doDraw(g) {
    for (let i = 0; i < this.subobjects.length; i++) {
      this.subobjects[i].draw(g);
    }
  }
}

class TransformedObject extends SceneGraphNode {
  constructor(object) {
    super();
    this.object = object;
    this.rotationInDegrees = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  setRotation(angle) {
    this.rotationInDegrees = angle;
    return this;
  }

  setScale(sx, sy) {
    this.scaleX = sx;
    this.scaleY = sy;
    return this;
  }

  setTranslation(dx, dy) {
    this.translateX = dx;
    this.translateY = dy;
    return this;
  }

  doDraw(g) {
    g.save();
    if (this.translateX !== 0 || this.translateY !== 0) {
      g.translate(this.translateX, this.translateY);
    }
    if (this.rotationInDegrees !== 0) {
      g.rotate((this.rotationInDegrees / 180) * Math.PI);
    }
    if (this.scaleX !== 1 || this.scaleY !== 1) {
      g.scale(this.scaleX, this.scaleY);
    }
    this.object.draw(g);
    g.restore();
  }
}

export default SceneGraph;
