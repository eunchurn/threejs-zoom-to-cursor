import * as React from "react";
import * as THREE from "three";
import { render } from "react-dom";
import { Canvas } from "react-three-fiber";
import { ControlsProvider, Controls, useControl } from "react-three-gui";
import { animated } from "@react-spring/three";
import { EffectComposer, SSAO } from "react-postprocessing";
import { Controls as PointerControls } from "./Controls";
import { RoundedBox, MeshWobbleMaterial } from "@react-three/drei";
import { Lights } from "./Lights";
import { fitAll } from "./fitAll";
import "./styles.css";

const AnimatedRoundedBox = animated(RoundedBox);

function App() {
  const rotationX = useControl("Rotation X", { type: "number", spring: true });
  const ssao = useControl("ssao", { type: "boolean" });
  return (
    <>
      <Canvas
        {...{
          shadowMap: true,
          orthographic: true,
          camera: { position: [50, 50, 50] },
          style: { width: "100vw", height: "100vh", background: "#679ea2" },
          onCreated: fitAll
        }}
      >
        <group name="content">
          <AnimatedRoundedBox
            receiveShadow
            rotation-x={rotationX}
            {...{ args: [1, 1, 1], radius: 0.05, smoothness: 5 }}
          >
            <MeshWobbleMaterial attach="material" color="#528a7b" />
          </AnimatedRoundedBox>
        </group>
        <Lights />
        <PointerControls />

        <React.Suspense fallback={null}>
          <EffectComposer>
            <SSAO active={ssao} />
          </EffectComposer>
        </React.Suspense>
      </Canvas>
      <Controls />
    </>
  );
}

const rootElement = document.getElementById("root");
render(
  <ControlsProvider>
    <App />
  </ControlsProvider>,
  rootElement
);
