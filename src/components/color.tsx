import React, { useState } from 'react';
import Github from '@uiw/react-color-github';

export default function Color() {
  const [hex, setHex] = useState("#fff");
  return (
    <>
      <Github
        color={hex}
        style={{
          '--github-background-color': '#d1eff9'
        }}
        onChange={(color) => {
          setHex(color.hex);
        }}
      />
      <div style={{ width: 120, height: 50, backgroundColor: hex }} />
    </>
  );
}