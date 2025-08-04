import React from 'react';
import { X, Instagram, Twitter, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreatorDetailsPanelProps {
  creator: {
    id: string;
    name: string;
    specialty: string;
  };
  onClose: () => void;
}

export const CreatorDetailsPanel: React.FC<CreatorDetailsPanelProps> = ({
  creator,
  onClose
}) => {
  // Mock data for demo
  const mockData = {
    socials: {
      instagram: '@' + creator.name.toLowerCase().replace(' ', ''),
      twitter: '@' + creator.name.toLowerCase().replace(' ', '')
    },
    skills: ['Photography', 'Video Editing', 'Color Grading', 'Storytelling'],
    projects: 47,
    followers: '125K',
    exampleWorks: [
      'Sunset Dreams Campaign',
      'Urban Stories Series',
      'Brand X Commercial'
    ]
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-background/95 backdrop-blur-sm border-l border-primary/20 z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{creator.name}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Specialty */}
        <div className="mb-6">
          <p className="text-lg text-primary font-medium">{creator.specialty}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-foreground/5 border border-primary/10">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{mockData.projects}</p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-foreground/5 border border-primary/10">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{mockData.followers}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
        </div>

        {/* Socials */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Social Media</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5">
              <Instagram className="h-5 w-5 text-primary" />
              <span className="text-foreground">{mockData.socials.instagram}</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-foreground/5">
              <Twitter className="h-5 w-5 text-primary" />
              <span className="text-foreground">{mockData.socials.twitter}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {mockData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Example Works */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Recent Works</h3>
          <div className="space-y-2">
            {mockData.exampleWorks.map((work, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-foreground/5 border border-primary/10 hover:border-primary/30 transition-colors"
              >
                <p className="text-foreground font-medium">{work}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};