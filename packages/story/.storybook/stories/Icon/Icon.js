import React from 'react';
import SvgUri from 'react-native-svg-uri';
import eye_off from '@bboy-app/story/assets/eye_off.svg';
import eye from '@bboy-app/story/assets/eye.svg';
import save from '@bboy-app/story/assets/save.svg';
import back from '@bboy-app/story/assets/back.svg';
import play from '@bboy-app/story/assets/play.svg';
import user from '@bboy-app/story/assets/user.svg';
import minus_square from '@bboy-app/story/assets/minus_square.svg';
import close from '@bboy-app/story/assets/close.svg';

export const svgMap = {
  eye: eye,
  eye_off: eye_off,
  save: save,
  back: back,
  user: user,
  play: play,
  minus_square: minus_square,
  close: close
}

export const MyIcon = ({ name, size = 20, color, strokeWidth = 2 }) => {
  const SvgContent = svgMap[name];
  if (!SvgContent) {
    const SvgContentNew = svgMap['eye'];
    return <SvgContentNew
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
      key={`${name}-${color}`}
    />
  }

  return (
    <SvgContent
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
      key={`${name}-${color}`}
    />
  );
};


