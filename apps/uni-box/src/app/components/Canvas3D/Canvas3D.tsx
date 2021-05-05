import React, { Suspense, useContext } from 'react';
import { Canvas } from 'react-three-fiber';
import { BridgeProvider } from '../../context/bridge-context';
import Square from '../square/square';
import Rounded from '../rounded/Rounded';
import Floor from '../floor/Floor';
import { OrbitControls } from '@react-three/drei';
import { BoxContext } from '../../context/box';
import { UIContext } from '../../context/ui-context';


export const Canvas3D = (props) => {
  const boxContext = useContext(BoxContext);
  const ui = useContext(UIContext);

  return (
    <>
      <div>
      {props.children && props.children}
      </div>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
      >
        <BridgeProvider value={{ ...boxContext }}>
          <Suspense fallback={null}>
            <ambientLight intensity={4} />
            <group>

              {boxContext.box.model === 'SQUARE' ?

                <Square click={ui.makeSnapshot} box={boxContext.box} scale={[1.2, 1.2, 1.2]} position={[0, 0, 0]} />
                :
                <Rounded click={ui.makeSnapshot} box={boxContext.box} scale={[1.2, 1.2, 1.2]} position={[0, 0, 0]} />
              }
              <Floor />
            </group>
            <OrbitControls maxDistance={20} enablePan={false} minPolarAngle={0} maxPolarAngle={1.5}
                           rotation={[0, 1, 2]} />
          </Suspense>
        </BridgeProvider>
      </Canvas>
    </>
  );
};
