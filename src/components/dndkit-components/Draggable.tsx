import * as React from 'react';
import {useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });

  const style = {
    transform: CSS.Transform.toString({
      x: props.elementPosition.x + (transform ? transform.x : 0),
      y: props.elementPosition.y + (transform ? transform.y : 0),
      scaleX: 1,
      scaleY: 1,
    }),
  };
  
  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}