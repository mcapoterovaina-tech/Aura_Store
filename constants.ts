import { AppItem, Category, NewsPost, Comment } from './types';

export const MOCK_APPS: AppItem[] = [
  {
    id: '1',
    name: 'Zen Focus',
    tagline: 'Master your productivity',
    description: 'Zen Focus helps you achieve flow state through customizable timers, ambient soundscapes, and distraction blocking features. Designed for professionals who need deep work sessions.',
    category: 'Productivity',
    price: 0,
    rating: 4.8,
    reviewsCount: 1240,
    iconUrl: 'https://picsum.photos/id/106/200/200',
    screenshots: ['https://picsum.photos/id/1/800/600', 'https://picsum.photos/id/2/800/600', 'https://picsum.photos/id/3/800/600'],
    developer: 'Mindful Soft',
    size: '45 MB',
    version: '2.1.0',
    ageRating: '4+'
  },
  {
    id: '2',
    name: 'Pixel Studio Pro',
    tagline: 'Professional photo editing',
    description: 'A desktop-class photo editor on the web. Layers, masking, RAW editing, and AI-powered filters bring your creative vision to life instantly.',
    category: 'Graphics',
    price: 9.99,
    rating: 4.9,
    reviewsCount: 850,
    iconUrl: 'https://picsum.photos/id/237/200/200',
    screenshots: ['https://picsum.photos/id/10/800/600', 'https://picsum.photos/id/11/800/600'],
    developer: 'Creative Labs',
    size: '120 MB',
    version: '1.5.4',
    ageRating: '12+'
  },
  {
    id: '3',
    name: 'Nebula Note',
    tagline: 'Capture thoughts instantly',
    description: 'The fastest way to take notes. Markdown support, bi-directional linking, and instant sync across all your devices.',
    category: 'Productivity',
    price: 4.99,
    rating: 4.7,
    reviewsCount: 3200,
    iconUrl: 'https://picsum.photos/id/104/200/200',
    screenshots: ['https://picsum.photos/id/20/800/600', 'https://picsum.photos/id/21/800/600'],
    developer: 'Stellar Apps',
    size: '30 MB',
    version: '3.0.1',
    ageRating: '4+'
  },
  {
    id: '4',
    name: 'Sky Walker',
    tagline: 'Explore the universe',
    description: 'An interactive 3D map of the known universe. Point your device at the sky to identify stars, planets, and constellations in real-time.',
    category: 'Education',
    price: 0,
    rating: 4.9,
    reviewsCount: 5400,
    iconUrl: 'https://picsum.photos/id/314/200/200',
    screenshots: ['https://picsum.photos/id/30/800/600', 'https://picsum.photos/id/31/800/600'],
    developer: 'Cosmos Inc',
    size: '250 MB',
    version: '4.2',
    ageRating: '4+'
  },
  {
    id: '5',
    name: 'Velocity',
    tagline: 'High-octane racing',
    description: 'Experience console-quality graphics and physics in this intense racing simulator. Compete globally in multiplayer leagues.',
    category: 'Games',
    price: 0,
    rating: 4.5,
    reviewsCount: 15600,
    iconUrl: 'https://picsum.photos/id/111/200/200',
    screenshots: ['https://picsum.photos/id/40/800/600', 'https://picsum.photos/id/41/800/600'],
    developer: 'Redline Games',
    size: '1.2 GB',
    version: '1.0.8',
    ageRating: '9+'
  },
  {
    id: '6',
    name: 'Chef’s Table',
    tagline: 'Gourmet recipes at home',
    description: 'Step-by-step video guides from world-renowned chefs. Master the art of cooking with curated ingredient lists and timers.',
    category: 'Lifestyle',
    price: 0,
    rating: 4.8,
    reviewsCount: 890,
    iconUrl: 'https://picsum.photos/id/225/200/200',
    screenshots: ['https://picsum.photos/id/50/800/600', 'https://picsum.photos/id/51/800/600'],
    developer: 'Culinary Arts',
    size: '85 MB',
    version: '2.2',
    ageRating: '4+'
  },
  {
    id: '7',
    name: 'Space Odyssey',
    tagline: 'Journey to the unknown',
    description: 'Explore procedurally generated galaxies, trade with alien civilizations, and survive the harshness of deep space in this open-world survival game.',
    category: 'Games',
    price: 0,
    rating: 4.7,
    reviewsCount: 3400,
    iconUrl: 'https://picsum.photos/id/112/200/200',
    screenshots: ['https://picsum.photos/id/52/800/600', 'https://picsum.photos/id/53/800/600'],
    developer: 'Stellar Games',
    size: '1.8 GB',
    version: '1.2.0',
    ageRating: '12+'
  }
];

export const CATEGORIES: Category[] = [
  { id: 'prod', name: 'Productivity', image: 'https://picsum.photos/id/1/400/300' },
  { id: 'games', name: 'Games', image: 'https://picsum.photos/id/2/400/300' },
  { id: 'lifestyle', name: 'Lifestyle', image: 'https://picsum.photos/id/3/400/300' },
  { id: 'graphics', name: 'Graphics', image: 'https://picsum.photos/id/4/400/300' },
  { id: 'edu', name: 'Education', image: 'https://picsum.photos/id/5/400/300' },
];

export const MOCK_NEWS: NewsPost[] = [
  {
    id: '1',
    category: 'Event',
    title: 'The Future of Mobile Gaming',
    excerpt: 'Join us for an exclusive look at the next generation of mobile processors and what they mean for gaming on the go.',
    imageUrl: 'https://picsum.photos/id/133/800/600',
    date: 'Today',
    readTime: '4 min read',
    likes: 1205,
    commentsCount: 34
  },
  {
    id: '2',
    category: 'Editors’ Choice',
    title: 'Apps for a Better Sleep',
    excerpt: 'We tested over 50 sleep tracking apps. These are the 5 that actually helped us wake up refreshed.',
    imageUrl: 'https://picsum.photos/id/180/800/600',
    date: 'Yesterday',
    readTime: '6 min read',
    likes: 890,
    commentsCount: 12
  },
  {
    id: '3',
    category: 'Developer Spotlight',
    title: 'Behind the Scenes: Velocity',
    excerpt: 'How a small team of 3 developers built the most realistic racing simulator on the market using our new graphics engine.',
    imageUrl: 'https://picsum.photos/id/200/800/600',
    date: '2 days ago',
    readTime: '8 min read',
    likes: 2300,
    commentsCount: 128
  },
  {
    id: '4',
    category: 'Update',
    title: 'Pixel Studio Pro 2.0',
    excerpt: 'Major update brings AI-powered background removal and support for RAW formats from the latest cameras.',
    imageUrl: 'https://picsum.photos/id/250/800/600',
    date: '4 days ago',
    readTime: '2 min read',
    likes: 540,
    commentsCount: 8
  },
  {
    id: '5',
    category: 'Inspiration',
    title: 'Designing for Accessibility',
    excerpt: 'Why inclusive design is not just a requirement, but a massive opportunity for better user experiences.',
    imageUrl: 'https://picsum.photos/id/319/800/600',
    date: '1 week ago',
    readTime: '5 min read',
    likes: 1420,
    commentsCount: 56
  }
];

export const MOCK_COMMENTS: Comment[] = [
    {
        id: 'c1',
        user: 'Sarah Jenkins',
        avatar: 'https://i.pravatar.cc/150?u=1',
        text: 'This is absolutely game-changing! Can’t wait to see the new update.',
        time: '2h ago'
    },
    {
        id: 'c2',
        user: 'Mike Ross',
        avatar: 'https://i.pravatar.cc/150?u=2',
        text: 'I’ve been using this for a month and it’s incredible.',
        time: '5h ago'
    },
    {
        id: 'c3',
        user: 'Elena Fisher',
        avatar: 'https://i.pravatar.cc/150?u=3',
        text: 'Does anyone know if this supports the older iPad models?',
        time: '1d ago'
    }
];