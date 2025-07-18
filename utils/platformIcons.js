// Platform detection and icon mapping utility

export const getPlatformInfo = (url, linktext = "") => {
  if (!url && !linktext) return { platform: 'other', icon: '🔗', name: 'Link' };
  
  const urlLower = (url || "").toLowerCase();
  const linktextLower = (linktext || "").toLowerCase();
  
  // Collab by name
  if (linktextLower.includes('collab') || linktextLower.includes('collaborate')) {
    return {
      platform: 'collab',
      icon: (
        '🤝'
      ),
      name: 'Collab',
    };
  }
  
  // Portfolio by name
  if (linktextLower.includes('portfolio')) {
    return { platform: 'portfolio', icon: '🗂️', name: 'Portfolio' };
  }
  
  // Social Media Platforms
  if (urlLower.includes('instagram.com') || urlLower.includes('instagram')) {
    return { platform: 'instagram', icon: '📷', name: 'Instagram' };
  }
  
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) {
    return { platform: 'twitter', icon: '🐦', name: 'Twitter' };
  }
  
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.com')) {
    return { platform: 'facebook', icon: '📘', name: 'Facebook' };
  }
  
  if (urlLower.includes('linkedin.com')) {
    return { platform: 'linkedin', icon: '💼', name: 'LinkedIn' };
  }
  
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return { platform: 'youtube', icon: '📺', name: 'YouTube' };
  }
  
  if (urlLower.includes('tiktok.com')) {
    return { platform: 'tiktok', icon: '🎵', name: 'TikTok' };
  }
  
  if (urlLower.includes('github.com')) {
    return { platform: 'github', icon: '💻', name: 'GitHub' };
  }
  
  if (urlLower.includes('discord.com') || urlLower.includes('discord.gg')) {
    return { platform: 'discord', icon: '🎮', name: 'Discord' };
  }
  
  if (urlLower.includes('twitch.tv')) {
    return { platform: 'twitch', icon: '🎮', name: 'Twitch' };
  }
  
  if (urlLower.includes('snapchat.com')) {
    return { platform: 'snapchat', icon: '👻', name: 'Snapchat' };
  }
  
  if (urlLower.includes('reddit.com')) {
    return { platform: 'reddit', icon: '🤖', name: 'Reddit' };
  }
  
  if (urlLower.includes('pinterest.com')) {
    return { platform: 'pinterest', icon: '📌', name: 'Pinterest' };
  }
  
  if (urlLower.includes('whatsapp.com')) {
    return { platform: 'whatsapp', icon: '💬', name: 'WhatsApp' };
  }
  
  if (urlLower.includes('telegram.org') || urlLower.includes('t.me')) {
    return { platform: 'telegram', icon: '✈️', name: 'Telegram' };
  }
  
  if (urlLower.includes('spotify.com')) {
    return { platform: 'spotify', icon: '🎵', name: 'Spotify' };
  }
  
  if (urlLower.includes('apple.com') || urlLower.includes('itunes.apple.com')) {
    return { platform: 'apple', icon: '🍎', name: 'Apple' };
  }
  
  if (urlLower.includes('google.com') || urlLower.includes('play.google.com')) {
    return { platform: 'google', icon: '🔍', name: 'Google' };
  }
  
  if (urlLower.includes('amazon.com') || urlLower.includes('amzn.to')) {
    return { platform: 'amazon', icon: '📦', name: 'Amazon' };
  }
  
  if (urlLower.includes('paypal.com')) {
    return { platform: 'paypal', icon: '💰', name: 'PayPal' };
  }
  
  if (urlLower.includes('patreon.com')) {
    return { platform: 'patreon', icon: '💝', name: 'Patreon' };
  }
  
  if (urlLower.includes('buymeacoffee.com')||urlLower.includes('tip-for-my-sip')) {
    return { platform: 'buymeacoffee', icon: '☕', name: 'Buy Me a Coffee' };
  }
  
  if (urlLower.includes('ko-fi.com')||urlLower.includes('tip-for-my-sip')) {
    return { platform: 'kofi', icon: '☕', name: 'Ko-fi' };
  }
  
  // Default for other links
  return { platform: 'other', icon: '🔗', name: 'Link' };
};

// Get platform color for styling
export const getPlatformColor = (platform) => {
  const colors = {
    instagram: 'from-pink-500 to-purple-600',
    twitter: 'from-blue-400 to-blue-600',
    facebook: 'from-blue-600 to-blue-800',
    linkedin: 'from-blue-700 to-blue-900',
    youtube: 'from-red-500 to-red-700',
    tiktok: 'from-pink-400 to-purple-500',
    github: 'from-gray-700 to-gray-900',
    discord: 'from-indigo-500 to-purple-600',
    twitch: 'from-purple-500 to-purple-700',
    snapchat: 'from-yellow-400 to-yellow-600',
    reddit: 'from-orange-500 to-red-600',
    pinterest: 'from-red-500 to-red-700',
    whatsapp: 'from-green-500 to-green-700',
    telegram: 'from-blue-400 to-blue-600',
    spotify: 'from-green-500 to-green-700',
    apple: 'from-gray-600 to-gray-800',
    google: 'from-blue-500 to-blue-700',
    amazon: 'from-orange-500 to-orange-700',
    paypal: 'from-blue-500 to-blue-700',
    patreon: 'from-orange-500 to-orange-700',
    buymeacoffee: 'from-orange-400 to-orange-600',
    kofi: 'from-orange-400 to-orange-600',
    portfolio: 'from-teal-500 to-teal-700',
    other: 'from-gray-500 to-gray-700'
  };
  
  return colors[platform] || colors.other;
}; 