
import React from 'react';
import { AppItem, CollectionConfig } from '../../types';
import { Carousel } from '../Carousel';
import { AppCard } from '../AppCard';

interface HomeCarouselProps {
  collection: CollectionConfig;
  apps: AppItem[];
  onAppClick: (id: string) => void;
  onAction: (e: React.MouseEvent, app: AppItem) => void;
  onSeeAll: (id: string) => void;
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({ collection, apps, onAppClick, onAction, onSeeAll }) => {
  return (
    <Carousel 
        title={collection.title} 
        seeAllLink={`/collection/${collection.id}`}
        onSeeAll={() => onSeeAll(collection.id)}
    >
      {apps.map((app) => (
          <div key={app.id} className="w-[320px] snap-center shrink-0 h-full">
              <AppCard 
                  app={app} 
                  onClick={onAppClick}
                  onAction={onAction}
              />
          </div>
      ))}
    </Carousel>
  );
};
