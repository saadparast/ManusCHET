'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface AIPersona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  style: string;
}

interface AIPersonaSelectorProps {
  personas: AIPersona[];
  onSelect: (persona: AIPersona) => void;
  selectedPersonaId?: string;
}

export const AIPersonaSelector: React.FC<AIPersonaSelectorProps> = ({
  personas,
  onSelect,
  selectedPersonaId,
}) => {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select an AI Persona</h3>
        <p className="text-gray-600">
          Choose an AI persona to debate with. Each persona has a unique perspective and debating style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className={`cursor-pointer transition-all ${
              selectedPersonaId === persona.id
                ? 'ring-2 ring-primary-500 shadow-md'
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelect(persona)}
            onMouseEnter={() => setHoveredPersona(persona.id)}
            onMouseLeave={() => setHoveredPersona(null)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar
                  size="md"
                  name={persona.name}
                  src={persona.avatar}
                />
                <div>
                  <CardTitle className="text-base">{persona.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {persona.style}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{persona.description}</p>
              
              {(hoveredPersona === persona.id || selectedPersonaId === persona.id) && (
                <Button
                  className="w-full mt-4"
                  variant={selectedPersonaId === persona.id ? "default" : "outline"}
                  onClick={() => onSelect(persona)}
                >
                  {selectedPersonaId === persona.id ? "Selected" : "Select"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
