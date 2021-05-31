import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Draggable from 'react-draggable'; // The default

import Resin from './block.png';
import Pave from './pave.png';
import Ground from './ground.png';
import Grass from './grass.png';
import Brick from './brick.png';

import Yellow from './yellow.png';
import CanvasDraw from "react-canvas-draw";

import './App.css'


function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}

export default function App() {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [source, setSource] = useState(null);
  const [showImage, setShowImage] = useState(true);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const texture = canvas.getContext('2d')
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className="App">
      <p>Choose a front facing image of your garden or driveway</p>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>{completedCrop ?
<React.Fragment>
  <span style={{marginRight:'10px',background:'none'}}>Srcoll down to see cropped image</span>
<button onClick={() =>setShowImage(!showImage)}>toggle show main image</button> 
</React.Fragment>
:null}
      { showImage?
      <div style={{maxWidth:'800px'}}>
        { completedCrop?
        <p>
       Choose the area of your property you want to customise
      </p>
:null}


      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      </div>
:null}
        { completedCrop ?
        <p>Image is draggable</p>
:null}
    
      <div>
        
        
    
          <Draggable>
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
        </Draggable>
      </div>

      {/* <p>
        Note that the download below won't work in this sandbox due to the
        iframe missing 'allow-downloads'. It's just for your reference.
      </p> */}
      <p>Draggable Props</p>
      <div className="backg">
      


      <Draggable>
    
      <img className='t' style={{width:'400px',height:'250px'}}  src={Resin} />
      </Draggable>

    

      <Draggable>
      <img className='t' style={{width:'800px',height:'200px'}}  src={Resin} />
      </Draggable>
  <Draggable>
      <img className='t' style={{width:'200px',height:'100px'}}  src={Resin} />
      </Draggable>
      <Draggable>
      <img className='t' style={{width:'400px',height:'250px'}}  src={Pave} />
      </Draggable>


      <Draggable>
      <img className='t' style={{width:'800px',height:'200px'}}  src={Pave} />
      </Draggable>
      
      <Draggable>
      <img className='t' style={{width:'200px',height:'100px'}}  src={Pave} />
      </Draggable>

      <p style={{ background:'none'}}>Natural resin: </p>
      <Draggable>
      <img className='t' style={{width:'400px',height:'250px'}}  src={Ground} />
      </Draggable>
      <Draggable>
      <img className='t' style={{width:'800px',height:'200px'}}  src={Ground} />
      </Draggable>

      
      <Draggable>
      <img className='t' style={{width:'200px',height:'100px'}}  src={Ground} />
      </Draggable>

      <p style={{ background:'none'}}>Artificial grass:</p>
      <Draggable>
      <img className='t' style={{width:'400px',height:'250px'}}  src={Grass} />
      </Draggable>
      <Draggable>
      <img className='t' style={{width:'800px',height:'200px'}}  src={Grass} />
      </Draggable>

      
      <Draggable>
      <img className='t' style={{width:'200px',height:'100px'}}  src={Grass} />
      </Draggable>

      <Draggable>
      <img className='t' style={{width:'400px',height:'250px'}}  src={Yellow} />
      </Draggable>

      
      <Draggable>
      <img className='t' style={{width:'200px',height:'100px'}}  src={Yellow} />
      </Draggable>
      <Draggable>
      <img className='t' style={{width:'800px',height:'200px'}}  src={Yellow} />
      </Draggable>

      <Draggable>
      <img className='t' style={{width:'400px',height:'250px'}}  src={Brick} />
      </Draggable>

      
      <Draggable>
      <img className='t' style={{width:'200px',height:'100px'}}  src={Brick} />
      </Draggable>
    
      
      <Draggable>
      <img style={{width:'100px'}}  src="http://texturelib.com/Textures/brick/pavement/brick_pavement_0004_01_preview.jpg" />
      </Draggable>
    <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}   src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>

      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}   src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}   src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}   src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>

      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}   src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px',zIndex:'999'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'200px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'200px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'200px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>

      <Draggable>
      <img style={{width:'200px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'200px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>

        <Draggable>
      <img style={{width:'150px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'150px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'150px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>

      <Draggable>
      <img style={{width:'150px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'150px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'150px'}}  src="https://cdn.pixabay.com/photo/2012/03/03/23/06/wall-21534_960_720.jpg" />
      </Draggable>  


      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/fence/fence_PNG53.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/fence/fence_PNG53.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/fence/fence_PNG53.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/fence/small/fence_PNG24.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/fence/small/fence_PNG24.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/fence/small/fence_PNG24.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/fence/fence_PNG53.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/fence/fence_PNG53.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://www.freeiconspng.com/uploads/pond-png-10.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://www.freeiconspng.com/uploads/pond-png-10.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://www.freeiconspng.com/uploads/pond-png-2.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'120px'}}  src="https://www.freeiconspng.com/uploads/pond-png-2.png" />
      </Draggable>

        <Draggable>
      <img style={{width:'120px'}}  src="https://www.freeiconspng.com/uploads/pond-png-2.png" />
      </Draggable>
     

      
      
     <Draggable>
      <img style={{width:'100px'}}  src="https://pngimg.com/uploads/bush/bush_PNG7223.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'100px'}}  src="https://pngimg.com/uploads/bush/bush_PNG7223.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'100px'}}  src="https://pngimg.com/uploads/bush/bush_PNG7223.png" />
      </Draggable>

      <Draggable>
      <img style={{width:'100px'}}  src="https://pngimg.com/uploads/bush/bush_PNG7223.png" />
      </Draggable>

      


      <Draggable>
      <img style={{width:'110px'}}  src="https://cdn.pixabay.com/photo/2018/02/11/23/33/pavement-3147099_960_720.jpg" />
      </Draggable>
      <Draggable>
      <img style={{width:'110px'}}  src="https://cdn.pixabay.com/photo/2014/08/21/01/57/shingle-423014_960_720.jpg" />
      </Draggable>
     

      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/bouquet/bouquet_PNG63.png"  />
      </Draggable>
      
      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/bouquet/bouquet_PNG63.png"  />
      </Draggable>

      
      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/bouquet/bouquet_PNG63.png"  />
      </Draggable>


      <Draggable>
      <img style={{width:'100px'}}  src="https://assets.stickpng.com/thumbs/580b585b2edbce24c47b26b8.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>


      <Draggable>
      <img style={{width:'120px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'200px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'200px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'100px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
      <Draggable>
      <img style={{width:'80px'}}  src="https://pngimg.com/uploads/grass/small/grass_PNG4925.png" />
      </Draggable>
   
  
</div>
  
      {/* <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
      >
        Download cropped image
      </button> */}
    </div>
  );
}