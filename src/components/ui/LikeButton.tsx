import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get or create session ID
  const getSessionId = () => {
    let sessionId = localStorage.getItem('portfolio_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('portfolio_session_id', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    // Check if user already liked
    const sessionId = getSessionId();
    const hasLiked = localStorage.getItem(`portfolio_liked_${sessionId}`);
    if (hasLiked === 'true') {
      setLiked(true);
    }
  }, []);

  const handleLike = async () => {
    if (liked) {
      toast.info('You already liked this portfolio!');
      return;
    }

    setIsAnimating(true);
    const sessionId = getSessionId();

    try {
      const { error } = await supabase
        .from('portfolio_likes')
        .insert({ session_id: sessionId });

      if (error) throw error;

      setLiked(true);
      localStorage.setItem(`portfolio_liked_${sessionId}`, 'true');
      toast.success('Thanks for the love! 💜');
    } catch (error) {
      console.error('Error liking:', error);
      toast.error('Failed to record like');
    } finally {
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full glass border border-border/50 
        transition-all duration-300 hover:scale-110 hover:border-pink-500/50 group
        ${liked ? 'bg-pink-500/20' : 'hover:bg-pink-500/10'}
        ${isAnimating ? 'animate-like-pop' : ''}`}
      aria-label="Like this portfolio"
    >
      <Heart
        className={`w-6 h-6 transition-all duration-300
          ${liked ? 'fill-pink-500 text-pink-500' : 'text-muted-foreground group-hover:text-pink-500'}`}
      />
      
      {/* Floating hearts animation on click */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="absolute w-4 h-4 fill-pink-500 text-pink-500 animate-float-heart"
              style={{
                left: '50%',
                top: '50%',
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${i * 60}deg)`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
};

export default LikeButton;
