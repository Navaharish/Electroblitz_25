import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

const EventContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
  text-align: center;
`;

const Description = styled.p`
  color: #aaaaaa;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.1rem;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 25px;
  background: ${props => props.isActive
        ? 'linear-gradient(45deg, #00d4ff, #ff00ff)'
        : 'transparent'};
  color: ${props => props.isActive ? '#ffffff' : '#cccccc'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #00d4ff;
    color: #ffffff;
    transform: translateY(-2px);
  }

  ${props => props.isActive && css`
    animation: ${pulse} 2s ease-in-out infinite;
  `}
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const EventCard = styled.div<{ isSelected: boolean }>`
  background: ${props => props.isSelected
        ? 'linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 255, 0.1))'
        : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${props => props.isSelected
        ? '#00d4ff'
        : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 212, 255, 0.2);
    border-color: #00d4ff;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  ${props => props.isSelected && css`
    animation: ${pulse} 2s ease-in-out infinite;
  `}
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const EventTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const EventIcon = styled.div`
  font-size: 1.5rem;
  opacity: 0.7;
`;

const EventDescription = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const EventDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #aaaaaa;
`;

const EventDuration = styled.span`
  background: rgba(0, 212, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  color: #00d4ff;
`;

const EventDifficulty = styled.span`
  background: rgba(255, 0, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  color: #ff00ff;
`;

const SelectionInfo = styled.div`
  text-align: center;
  color: #aaaaaa;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const MaxEventsWarning = styled.div`
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #ffc107;
  text-align: center;
  font-size: 0.9rem;
`;

interface Event {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    icon: string;
    category: 'tech' | 'non-tech' | 'workshop';
}

interface EventSelectionProps {
    category: 'tech' | 'non-tech' | 'workshop' | '';
    selectedEvents: string[];
    onEventsChange: (events: string[]) => void;
}

const EventSelection: React.FC<EventSelectionProps> = ({
    category,
    selectedEvents,
    onEventsChange
}) => {
    const [activeTab, setActiveTab] = useState<'tech' | 'non-tech' | 'workshop'>('tech');
    const maxEvents = 5;

    const events: Event[] = [
        // Tech Events
        {
            id: 'hackathon',
            title: '24-Hour Hackathon',
            description: 'Build innovative solutions using cutting-edge technologies. Prizes worth ₹50,000!',
            duration: '24 hours',
            difficulty: 'Advanced',
            icon: '💻',
            category: 'tech'
        },
        {
            id: 'coding-contest',
            title: 'Algorithm Coding Contest',
            description: 'Test your problem-solving skills with challenging algorithmic problems.',
            duration: '3 hours',
            difficulty: 'Intermediate',
            icon: '⚡',
            category: 'tech'
        },
        {
            id: 'robotics',
            title: 'Robotics Challenge',
            description: 'Design and build autonomous robots to complete various tasks.',
            duration: '6 hours',
            difficulty: 'Advanced',
            icon: '🤖',
            category: 'tech'
        },
        {
            id: 'ai-ml',
            title: 'AI/ML Competition',
            description: 'Create machine learning models to solve real-world problems.',
            duration: '4 hours',
            difficulty: 'Advanced',
            icon: '🧠',
            category: 'tech'
        },
        {
            id: 'web-dev',
            title: 'Web Development Contest',
            description: 'Build responsive and interactive web applications.',
            duration: '5 hours',
            difficulty: 'Intermediate',
            icon: '🌐',
            category: 'tech'
        },
        {
            id: 'mobile-app',
            title: 'Mobile App Development',
            description: 'Create innovative mobile applications for Android/iOS.',
            duration: '6 hours',
            difficulty: 'Intermediate',
            icon: '📱',
            category: 'tech'
        },

        // Non-Tech Events
        {
            id: 'quiz',
            title: 'Tech Quiz',
            description: 'Test your knowledge of technology, science, and innovation.',
            duration: '2 hours',
            difficulty: 'Beginner',
            icon: '🧠',
            category: 'non-tech'
        },
        {
            id: 'debate',
            title: 'Tech Debate',
            description: 'Debate on controversial topics in technology and society.',
            duration: '1.5 hours',
            difficulty: 'Intermediate',
            icon: '🗣️',
            category: 'non-tech'
        },
        {
            id: 'presentation',
            title: 'Tech Presentation',
            description: 'Present your innovative ideas and projects to the audience.',
            duration: '10 minutes',
            difficulty: 'Beginner',
            icon: '📊',
            category: 'non-tech'
        },
        {
            id: 'treasure-hunt',
            title: 'Tech Treasure Hunt',
            description: 'Solve clues and puzzles to find hidden treasures using technology.',
            duration: '3 hours',
            difficulty: 'Beginner',
            icon: '🔍',
            category: 'non-tech'
        },
        {
            id: 'gaming',
            title: 'Gaming Tournament',
            description: 'Compete in popular games like Valorant, CS:GO, and FIFA.',
            duration: '4 hours',
            difficulty: 'Intermediate',
            icon: '🎮',
            category: 'non-tech'
        },

        // Workshops
        {
            id: 'blockchain',
            title: 'Blockchain Workshop',
            description: 'Learn about blockchain technology and build your first DApp.',
            duration: '6 hours',
            difficulty: 'Intermediate',
            icon: '⛓️',
            category: 'workshop'
        },
        {
            id: 'iot',
            title: 'IoT Development',
            description: 'Build Internet of Things projects with sensors and microcontrollers.',
            duration: '8 hours',
            difficulty: 'Beginner',
            icon: '🌐',
            category: 'workshop'
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity Workshop',
            description: 'Learn ethical hacking and cybersecurity best practices.',
            duration: '6 hours',
            difficulty: 'Intermediate',
            icon: '🔒',
            category: 'workshop'
        },
        {
            id: 'data-science',
            title: 'Data Science Workshop',
            description: 'Analyze data and build predictive models using Python and R.',
            duration: '8 hours',
            difficulty: 'Beginner',
            icon: '📈',
            category: 'workshop'
        },
        {
            id: 'ui-ux',
            title: 'UI/UX Design Workshop',
            description: 'Learn design principles and create beautiful user interfaces.',
            duration: '6 hours',
            difficulty: 'Beginner',
            icon: '🎨',
            category: 'workshop'
        }
    ];

    useEffect(() => {
        if (category && ['tech', 'non-tech', 'workshop'].includes(category)) {
            setActiveTab(category as 'tech' | 'non-tech' | 'workshop');
        }
    }, [category]);

    const filteredEvents = events.filter(event => event.category === activeTab);

    const handleEventToggle = (eventId: string) => {
        if (selectedEvents.includes(eventId)) {
            onEventsChange(selectedEvents.filter(id => id !== eventId));
        } else if (selectedEvents.length < maxEvents) {
            onEventsChange([...selectedEvents, eventId]);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return '#00ff88';
            case 'Intermediate': return '#ffaa00';
            case 'Advanced': return '#ff4444';
            default: return '#aaaaaa';
        }
    };

    return (
        <EventContainer>
            <Title>Select Events</Title>
            <Description>
                Choose the events you want to participate in. You can select up to {maxEvents} events.
            </Description>

            {selectedEvents.length >= maxEvents && (
                <MaxEventsWarning>
                    ⚠️ You have reached the maximum limit of {maxEvents} events.
                    Deselect an event to choose a different one.
                </MaxEventsWarning>
            )}

            <CategoryTabs>
                <TabButton
                    isActive={activeTab === 'tech'}
                    onClick={() => setActiveTab('tech')}
                >
                    Technical Events
                </TabButton>
                <TabButton
                    isActive={activeTab === 'non-tech'}
                    onClick={() => setActiveTab('non-tech')}
                >
                    Non-Technical Events
                </TabButton>
                <TabButton
                    isActive={activeTab === 'workshop'}
                    onClick={() => setActiveTab('workshop')}
                >
                    Workshops
                </TabButton>
            </CategoryTabs>

            <EventsGrid>
                {filteredEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        isSelected={selectedEvents.includes(event.id)}
                        onClick={() => handleEventToggle(event.id)}
                    >
                        <EventHeader>
                            <EventTitle>{event.title}</EventTitle>
                            <EventIcon>{event.icon}</EventIcon>
                        </EventHeader>

                        <EventDescription>{event.description}</EventDescription>

                        <EventDetails>
                            <EventDuration>{event.duration}</EventDuration>
                            <EventDifficulty style={{ color: getDifficultyColor(event.difficulty) }}>
                                {event.difficulty}
                            </EventDifficulty>
                        </EventDetails>
                    </EventCard>
                ))}
            </EventsGrid>

            <SelectionInfo>
                Selected: {selectedEvents.length}/{maxEvents} events
            </SelectionInfo>
        </EventContainer>
    );
};

export default EventSelection;
