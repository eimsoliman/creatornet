import React from 'react';
import { X, Calendar, Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaDetailsPanelProps {
  media: {
    id: string;
    name: string;
    mediaType: string;
  };
  onClose: () => void;
}

export const MediaDetailsPanel: React.FC<MediaDetailsPanelProps> = ({
  media,
  onClose
}) => {
  // Mock data for demo
  const mockData = {
    description: 'A stunning visual campaign that captures the essence of modern creativity and collaboration.',
    duration: '2:30',
    budget: '$25K',
    date: 'March 2024',
    status: 'Completed',
    collaborators: [
      'Alex Chen - Visual Artist',
      'Maya Rodriguez - Film Director',
      'Jordan Kim - Music Producer'
    ],
    tags: ['Creative', 'Brand Campaign', 'Visual Storytelling', 'Commercial']
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-background/95 backdrop-blur-sm border-l border-primary/20 z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{media.name}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Media Type */}
        <div className="mb-6">
          <p className="text-lg text-primary font-medium">{media.mediaType}</p>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-foreground/5 border border-primary/10">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-bold text-foreground">{mockData.date}</p>
            <p className="text-xs text-muted-foreground">Release Date</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-foreground/5 border border-primary/10">
            <div className="flex items-center justify-center mb-2">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-bold text-foreground">{mockData.budget}</p>
            <p className="text-xs text-muted-foreground">Budget</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{mockData.description}</p>
        </div>

        {/* Status */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Status</h3>
          <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400">
            {mockData.status}
          </span>
        </div>

        {/* Collaborators */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Collaborators</h3>
          <div className="space-y-2">
            {mockData.collaborators.map((collaborator, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5"
              >
                <Users className="h-4 w-4 text-primary" />
                <span className="text-foreground text-sm">{collaborator}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {mockData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};