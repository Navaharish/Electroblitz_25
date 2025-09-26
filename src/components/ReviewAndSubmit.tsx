import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FormData } from './RegistrationPage';
import { useRegistrations } from '../contexts/RegistrationContext';

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
    transform: scale(1.05);
  }
`;

const ReviewContainer = styled.div`
  max-width: 700px;
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

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.6s ease-out;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.8rem;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
`;

const EventsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const EventTag = styled.div`
  background: linear-gradient(45deg, #00d4ff, #ff00ff);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const AdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;


const SubmitButton = styled.button<{ isLoading: boolean }>`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #00d4ff, #ff00ff);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
  animation: ${fadeInUp} 0.6s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 212, 255, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  ${props => props.isLoading && css`
    animation: ${pulse} 1s ease-in-out infinite;
  `}
`;

const SuccessMessage = styled.div`
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #00ff88;
  text-align: center;
  font-weight: 500;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #ff4444;
  text-align: center;
  font-weight: 500;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface ReviewAndSubmitProps {
    formData: FormData;
    onUpdate: (updates: Partial<FormData>) => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ formData, onUpdate }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { addRegistration } = useRegistrations();

    const eventTitles: { [key: string]: string } = {
        'hackathon': '24-Hour Hackathon',
        'coding-contest': 'Algorithm Coding Contest',
        'robotics': 'Robotics Challenge',
        'ai-ml': 'AI/ML Competition',
        'web-dev': 'Web Development Contest',
        'mobile-app': 'Mobile App Development',
        'quiz': 'Tech Quiz',
        'debate': 'Tech Debate',
        'presentation': 'Tech Presentation',
        'treasure-hunt': 'Tech Treasure Hunt',
        'gaming': 'Gaming Tournament',
        'blockchain': 'Blockchain Workshop',
        'iot': 'IoT Development',
        'cybersecurity': 'Cybersecurity Workshop',
        'data-science': 'Data Science Workshop',
        'ui-ux': 'UI/UX Design Workshop'
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Save registration data using context
            addRegistration(formData);
            console.log('Registration saved successfully:', formData);

            setSubmitStatus('success');
        } catch (error) {
            console.error('Registration failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCategoryDisplayName = (category: string) => {
        switch (category) {
            case 'tech': return 'Technical Events';
            case 'non-tech': return 'Non-Technical Events';
            case 'workshop': return 'Workshops';
            default: return category;
        }
    };

    return (
        <ReviewContainer>
            <Title>Review Your Registration</Title>
            <Description>
                Please review your information before submitting. You can go back to make changes if needed.
            </Description>

            {submitStatus === 'success' && (
                <SuccessMessage>
                    ✅ Registration submitted successfully! You will receive a confirmation email shortly.
                </SuccessMessage>
            )}

            {submitStatus === 'error' && (
                <ErrorMessage>
                    ❌ Registration failed. Please try again or contact support.
                </ErrorMessage>
            )}

            <Section>
                <SectionTitle>
                    📋 Category Selection
                </SectionTitle>
                <InfoItem>
                    <InfoLabel>Selected Category</InfoLabel>
                    <InfoValue>{getCategoryDisplayName(formData.category)}</InfoValue>
                </InfoItem>
            </Section>

            <Section>
                <SectionTitle>
                    👤 Personal Information
                </SectionTitle>
                <InfoGrid>
                    <InfoItem>
                        <InfoLabel>First Name</InfoLabel>
                        <InfoValue>{formData.personalInfo.firstName}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Last Name</InfoLabel>
                        <InfoValue>{formData.personalInfo.lastName}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Email</InfoLabel>
                        <InfoValue>{formData.personalInfo.email}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Phone</InfoLabel>
                        <InfoValue>{formData.personalInfo.phone}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>College</InfoLabel>
                        <InfoValue>{formData.personalInfo.college}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Academic Year</InfoLabel>
                        <InfoValue>{formData.personalInfo.year}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Department</InfoLabel>
                        <InfoValue>{formData.personalInfo.department}</InfoValue>
                    </InfoItem>
                </InfoGrid>
            </Section>

            <Section>
                <SectionTitle>
                    🎯 Selected Events ({formData.selectedEvents.length})
                </SectionTitle>
                <EventsList>
                    {formData.selectedEvents.map(eventId => (
                        <EventTag key={eventId}>
                            {eventTitles[eventId] || eventId}
                        </EventTag>
                    ))}
                </EventsList>
            </Section>

            <Section>
                <SectionTitle>
                    ℹ️ Additional Information
                </SectionTitle>
                <AdditionalInfo>
                    <InfoItem>
                        <InfoLabel>Dietary Requirements</InfoLabel>
                        <InfoValue>{formData.additionalInfo.dietaryRequirements || 'None specified'}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Accommodation Required</InfoLabel>
                        <InfoValue>{formData.additionalInfo.accommodation ? 'Yes' : 'No'}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Emergency Contact</InfoLabel>
                        <InfoValue>{formData.additionalInfo.emergencyContact || 'Not provided'}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Emergency Phone</InfoLabel>
                        <InfoValue>{formData.additionalInfo.emergencyPhone || 'Not provided'}</InfoValue>
                    </InfoItem>
                </AdditionalInfo>
            </Section>

            <SubmitButton
                onClick={handleSubmit}
                disabled={isSubmitting}
                isLoading={isSubmitting}
            >
                {isSubmitting && <LoadingSpinner />}
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </SubmitButton>
        </ReviewContainer>
    );
};

export default ReviewAndSubmit;
