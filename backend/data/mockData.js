
// Mock Data for Aura Store

const apps = [
    {
        id: 'app-1',
        name: 'Zen Focus',
        tagline: 'Master your productivity',
        description: 'Zen Focus helps you stay in the zone with ambient sounds and a pomodoro timer.',
        category: 'Productivity',
        price: 4.99,
        currency: 'USD',
        rating: 4.8,
        reviewsCount: 1250,
        iconUrl: 'https://tse4.mm.bing.net/th/id/OIP.pJ058T3xK4vWYL7m8Yo74gHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', // Frontend will generate placeholder
        screenshots: ["https://prakashinfotech.com/wp-content/uploads/2024/06/mobile-app-development-img.jpg", "https://www.itformula1.com/wp-content/uploads/custom-mobile-app-development-in-hyderabad.png"],
        developer: 'Mindful Soft',
        size: '45 MB',
        version: '2.1.0',
        ageRating: '4+',
        platforms: ['Web', 'iOS', 'Android'],
        releaseDate: '2023-01-15',
        downloadUrl: '#',
        chartRanking: 1,
        securityVerified: true
    },
    {
        id: 'app-2',
        name: 'Pixel Art Pro',
        tagline: 'Create retro art anywhere',
        description: 'The ultimate tool for pixel art creation with layers and animation support.',
        category: 'Graphics',
        price: 9.99,
        currency: 'USD',
        rating: 4.9,
        reviewsCount: 890,
        iconUrl: '',
        screenshots: [],
        developer: 'Retro Studios',
        size: '120 MB',
        version: '1.5.0',
        ageRating: '9+',
        platforms: ['Web', 'Mac'],
        releaseDate: '2023-03-10',
        chartRanking: 5,
        securityVerified: true
    },
    {
        id: 'app-3',
        name: 'Nebula Notes',
        tagline: 'Notes that sync with the stars',
        description: 'A beautiful markdown editor with cloud sync and encryption.',
        category: 'Productivity',
        price: 0,
        currency: 'USD',
        rating: 4.5,
        reviewsCount: 3400,
        iconUrl: '',
        screenshots: [],
        developer: 'Cosmic Code',
        size: '30 MB',
        version: '3.0.1',
        ageRating: '4+',
        platforms: ['Web', 'Windows', 'Mac'],
        releaseDate: '2022-11-20',
        chartRanking: 12,
        securityVerified: true
    },
    {
        id: 'app-4',
        name: 'Cyber Shield',
        tagline: 'Ultimate device protection',
        description: 'Protect your device from malware and phishing attacks.',
        category: 'Utilities',
        price: 19.99,
        currency: 'USD',
        rating: 4.7,
        reviewsCount: 560,
        iconUrl: '',
        screenshots: [],
        developer: 'SecurCorp',
        size: '85 MB',
        version: '4.2.0',
        ageRating: '12+',
        platforms: ['Windows', 'Mac'],
        releaseDate: '2023-05-01',
        securityVerified: true
    },
    {
        id: 'app-5',
        name: 'FitTrack Elite',
        tagline: 'Your personal fitness coach',
        description: 'Track workouts, nutrition, and sleep with AI-powered insights.',
        category: 'Health',
        price: 0,
        currency: 'USD',
        rating: 4.6,
        reviewsCount: 2100,
        iconUrl: '',
        screenshots: [],
        developer: 'Active Life',
        size: '60 MB',
        version: '2.0.0',
        ageRating: '4+',
        platforms: ['iOS', 'Android'],
        releaseDate: '2023-02-14',
        chartRanking: 3,
        securityVerified: true
    }
];

const collections = [
    {
        id: 'featured',
        title: 'Featured Apps',
        type: 'carousel',
        filter: 'featured=true'
    },
    {
        id: 'top-free',
        title: 'Top Free Apps',
        type: 'list',
        filter: 'price=0'
    },
    {
        id: 'editors-choice',
        title: "Editor's Choice",
        type: 'grid',
        filter: 'rating>=4.8'
    }
];

const spotlight = {
    id: 'spotlight-1',
    collectionId: 'featured',
    title: 'Unleash Creativity',
    subtitle: 'Discover the best tools for digital artists',
    label: 'Featured Collection',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
};

const news = [
    {
        id: 'news-1',
        title: 'Aura Store 2.0 Released',
        excerpt: 'Experience the new design and faster performance.',
        category: 'Update',
        imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
        date: '2023-10-01',
        readTime: '3 min read',
        likes: 120,
        commentsCount: 45
    },
    {
        id: 'news-2',
        title: 'Top 10 Productivity Apps',
        excerpt: 'Boost your workflow with these essential tools.',
        category: 'Editorial',
        imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
        date: '2023-09-25',
        readTime: '5 min read',
        likes: 85,
        commentsCount: 22
    }
];

const footerLinks = [
    {
        id: 'shop',
        title: 'Shop and Learn',
        links: [
            { label: 'Store', url: '/store' },
            { label: 'Mac', url: '/mac' },
            { label: 'iPad', url: '/ipad' },
            { label: 'iPhone', url: '/iphone' }
        ]
    },
    {
        id: 'services',
        title: 'Services',
        links: [
            { label: 'Aura Music', url: '/music' },
            { label: 'Aura TV+', url: '/tv' },
            { label: 'Aura News', url: '/news' }
        ]
    },
    {
        id: 'account',
        title: 'Account',
        links: [
            { label: 'Manage Your ID', url: '/account' },
            { label: 'Aura Store Account', url: '/account/store' },
            { label: 'iCloud.com', url: 'https://www.icloud.com' }
        ]
    },
    {
        id: 'about',
        title: 'About Aura',
        links: [
            { label: 'Newsroom', url: '/newsroom' },
            { label: 'Aura Leadership', url: '/leadership' },
            { label: 'Career Opportunities', url: '/jobs' },
            { label: 'Investors', url: '/investors' }
        ]
    }
];

const staticPages = {
    privacy: {
        id: 'privacy',
        title: 'Privacy Policy',
        lastUpdated: '2023-10-01',
        sections: [
            { heading: 'Introduction', content: 'We value your privacy...' },
            { heading: 'Data Collection', content: 'We collect minimal data...' }
        ]
    },
    terms: {
        id: 'terms',
        title: 'Terms of Use',
        lastUpdated: '2023-01-01',
        sections: [
            { heading: 'Acceptance', content: 'By using this site...' },
            { heading: 'License', content: 'We grant you a limited license...' }
        ]
    },
    sales: {
        id: 'sales',
        title: 'Sales Policy',
        lastUpdated: '2023-05-15',
        sections: [
            { heading: 'Returns', content: 'You have 14 days to return...' }
        ]
    },
    legal: {
        id: 'legal',
        title: 'Legal Information',
        lastUpdated: '2023-01-01',
        sections: [
            { heading: 'Copyright', content: 'All rights reserved...' }
        ]
    },
    sitemap: {
        id: 'sitemap',
        title: 'Sitemap',
        lastUpdated: '2023-11-01',
        sections: [
            { heading: 'Main', content: 'Home, Store, About...' }
        ]
    }
};

module.exports = {
    apps,
    collections,
    spotlight,
    news,
    footerLinks,
    staticPages
};
