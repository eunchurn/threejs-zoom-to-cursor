import * as React from "react";

export const Lights = () => {
  const setLookAt = React.useCallback(light => {
    !!light && light.lookAt(0, 0, 0);
  }, []);
  return (
    <>
      <spotLight
        ref={setLookAt}
        intensity={0.3}
        position={[50, 50, 0]}
        castShadow
      />
      <spotLight
        ref={setLookAt}
        intensity={0.5}
        position={[0, 50, 50]}
        castShadow
      />
      <spotLight
        ref={setLookAt}
        intensity={0.7}
        position={[50, 0, 50]}
        castShadow
      />
      <spotLight
        ref={setLookAt}
        intensity={1}
        position={[-50, -50, -50]}
        castShadow
      />
      <ambientLight />
    </>
  );
};
