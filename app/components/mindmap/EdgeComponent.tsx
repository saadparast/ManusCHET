'use client';

import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';
import { Tooltip } from '../ui/Tooltip';

interface CustomEdgeProps extends EdgeProps {
  connectionType?: 'related' | 'contradiction' | 'extension' | 'ai_suggested' | 'category';
  strength?: number;
}

export const EdgeComponent: React.FC<CustomEdgeProps> = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  connectionType = 'related',
  strength = 1.0,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Define styles based on connection type
  const getEdgeStyles = () => {
    const baseStyle = { strokeWidth: 2 };
    
    switch (connectionType) {
      case 'related':
        return { ...baseStyle, stroke: '#6868ff' }; // Primary color
      case 'contradiction':
        return { ...baseStyle, stroke: '#ef4444', strokeDasharray: '5,5' }; // Red with dashed line
      case 'extension':
        return { ...baseStyle, stroke: '#10b981' }; // Green
      case 'ai_suggested':
        return { ...baseStyle, stroke: '#8b5cf6', strokeDasharray: '3,3' }; // Purple with dotted line
      case 'category':
        return { ...baseStyle, stroke: '#f59e0b' }; // Amber
      default:
        return { ...baseStyle, stroke: '#6868ff' };
    }
  };

  // Adjust line thickness based on connection strength
  const getStrokeWidth = () => {
    return 1 + strength;
  };

  // Get tooltip content based on connection type
  const getTooltipContent = () => {
    switch (connectionType) {
      case 'related':
        return 'Related Connection';
      case 'contradiction':
        return 'Contradiction';
      case 'extension':
        return 'Extension of Idea';
      case 'ai_suggested':
        return 'AI Suggested Connection';
      case 'category':
        return 'Same Category';
      default:
        return 'Connection';
    }
  };

  const edgeStyles = {
    ...getEdgeStyles(),
    strokeWidth: getStrokeWidth(),
    ...style,
  };

  return (
    <>
      <path
        id={id}
        style={edgeStyles}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <Tooltip content={`${getTooltipContent()} (Strength: ${Math.round(strength * 100)}%)`}>
        <foreignObject
          width={80}
          height={40}
          x={labelX - 40}
          y={labelY - 20}
          className="react-flow__edge-label cursor-pointer"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: edgeStyles.stroke }} />
          </div>
        </foreignObject>
      </Tooltip>
    </>
  );
};
