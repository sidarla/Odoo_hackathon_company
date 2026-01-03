import React, { useState } from 'react';
import styled from 'styled-components';
import {
    PageContainer,
    Card,
    SectionTitle,
    Input,
    SecondaryButton,
    Badge
} from '../components/SharedStyles';

const FeedHeader = styled.div`
    background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);
    padding: 3rem;
    border-radius: 30px;
    margin-bottom: 3rem;
    color: white;
    text-align: center;
`;

const StoriesBar = styled.div`
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding: 1rem 0;
    margin-bottom: 3rem;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
`;

const StoryHighlight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    min-width: 80px;

    &:hover img {
        transform: scale(1.05);
        border-color: var(--primary);
    }
`;

const StoryCircle = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    padding: 3px;
    border: 3px solid var(--secondary);
    transition: all 0.3s ease;

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        transition: all 0.3s ease;
    }
`;

const StoryUser = styled.span`
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--dark);
`;

const FeedLayout = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const PostCard = styled(Card)`
    padding: 2rem;
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const PostImage = styled.div`
    height: 400px;
    background: #f8f9fa url(${props => props.src}) center/cover;
    border-radius: 15px;
    margin: 1.5rem 0;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
`;

const PostActions = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #f0f0f0;
`;

const ActionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 700;
    color: #666;
    transition: all 0.2s;

    &:hover {
        color: var(--primary);
    }
`;

// Immersive Story Viewer Components
const StoryOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.95);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
`;

const StoryWindow = styled.div`
    width: 450px;
    height: 80vh;
    background: #222;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);

    @media (max-width: 500px) {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
    }
`;

const StoryImg = styled.div`
    width: 100%;
    height: 100%;
    background: url(${props => props.src}) center/cover;
`;

const StoryTopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
    color: white;
    z-index: 10;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 20;
    line-height: 1;
`;

const ProgressBar = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 3px;
    background: rgba(255,255,255,0.3);
    border-radius: 10px;
    overflow: hidden;

    &::after {
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        background: white;
        animation: progress 5s linear forwards;
    }

    @keyframes progress {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
`;

const INITIAL_POSTS = [
    {
        id: 1,
        user: 'Elena R.',
        location: 'Santorini, Greece',
        text: 'Just finished the most incredible 5-day trip to Santorini! The sunsets are better than the photos. Highly recommend the sunset cruise from Ammoudi Bay.',
        img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        likes: 124,
        comments: 12,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: 2,
        user: 'Marco V.',
        location: 'Kyoto, Japan',
        text: 'Exploring the hidden temples of Kyoto. Pro tip: Arrive at Fushimi Inari at 6 AM to beat the crowds! The bamboo forest in Arashiyama is magical in the morning light.',
        img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        likes: 89,
        comments: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: 3,
        user: 'Sarah J.',
        location: 'Reykjavik, Iceland',
        text: 'Finally saw the Northern Lights! It was 2 AM and freezing, but absolutely worth it. The dance of colors across the sky is something I will never forget.',
        img: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80',
        likes: 245,
        comments: 18,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
    }
];

const HIGHLIGHTS = [
    { id: 1, user: 'Your Story', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=80', plus: true },
    { id: 2, user: 'Elena R.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80' },
    { id: 3, user: 'Marco V.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80' },
    { id: 4, user: 'Sarah J.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80' },
    { id: 5, user: 'James T.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80' },
    { id: 6, user: 'Lily W.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80' },
    { id: 7, user: 'Chris P.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80' },
];

const Community = () => {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [newPostText, setNewPostText] = useState('');
    const [viewingStory, setViewingStory] = useState(null);

    const handlePost = () => {
        if (!newPostText.trim()) return;

        const newPost = {
            id: Date.now(),
            user: 'You',
            location: 'Near You',
            text: newPostText,
            img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
            likes: 0,
            comments: 0,
            avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=100&q=80'
        };

        setPosts([newPost, ...posts]);
        setNewPostText('');
    };

    return (
        <PageContainer>
            {viewingStory && (
                <StoryOverlay onClick={() => setViewingStory(null)}>
                    <CloseButton onClick={() => setViewingStory(null)}>&times;</CloseButton>
                    <StoryWindow onClick={e => e.stopPropagation()}>
                        <ProgressBar key={viewingStory.id} />
                        <StoryTopBar>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                                <img src={viewingStory.img} alt={viewingStory.user} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontWeight: '700' }}>{viewingStory.user}</span>
                        </StoryTopBar>
                        <StoryImg src={viewingStory.img} />
                    </StoryWindow>
                </StoryOverlay>
            )}

            <FeedHeader>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Travelers Community</h1>
                <p style={{ opacity: 0.9 }}>Share your journeys and discover new horizons</p>
            </FeedHeader>

            <StoriesBar>
                {HIGHLIGHTS.map(h => (
                    <StoryHighlight key={h.id} onClick={() => setViewingStory(h)}>
                        <StoryCircle style={h.plus ? { borderColor: '#eee' } : {}}>
                            <img src={h.img} alt={h.user} />
                        </StoryCircle>
                        <StoryUser>{h.user}</StoryUser>
                    </StoryHighlight>
                ))}
            </StoriesBar>

            <FeedLayout>
                <Card style={{ padding: '1.5rem', background: '#f8fcfb' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Avatar>👤</Avatar>
                        <Input
                            placeholder="Share your latest adventure..."
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                        />
                        <SecondaryButton onClick={handlePost}>Post Story</SecondaryButton>
                    </div>
                </Card>

                <SectionTitle>Recent Stories</SectionTitle>

                {posts.map(post => (
                    <PostCard key={post.id}>
                        <PostHeader>
                            <Avatar>{post.avatar ? <img src={post.avatar} alt={post.user} /> : post.user[0]}</Avatar>
                            <div>
                                <h4 style={{ fontWeight: '800' }}>{post.user}</h4>
                                <p style={{ fontSize: '0.85rem', color: '#888' }}>📍 {post.location}</p>
                            </div>
                        </PostHeader>
                        <p style={{ lineHeight: '1.8', color: '#333', fontSize: '1.05rem' }}>{post.text}</p>
                        <PostImage src={post.img} />
                        <PostActions>
                            <ActionItem>❤️ {post.likes} Likes</ActionItem>
                            <ActionItem>💬 {post.comments} Comments</ActionItem>
                            <ActionItem style={{ marginLeft: 'auto' }}>🔖 Save Trip</ActionItem>
                        </PostActions>
                    </PostCard>
                ))}
            </FeedLayout>
        </PageContainer>
    );
};

export default Community;
