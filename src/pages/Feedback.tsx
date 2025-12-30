import { useState } from 'react';
import { Send, MessageSquare, Star } from 'lucide-react';

export function Feedback() {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        rating: 5,
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Feedback submitted:', formData);
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ subject: '', message: '', rating: 5 });
        }, 3000);
    };

    return (
        <div className="feedback-container">
            <div className="glass-panel feedback-card">
                <div className="feedback-header">
                    <div className="icon-wrapper">
                        <MessageSquare size={24} />
                    </div>
                    <h1>Share Your Feedback</h1>
                </div>

                {submitted ? (
                    <div className="success-message animate-fade-in">
                        <div className="success-icon">
                            <Send size={32} />
                        </div>
                        <h3>Thank You!</h3>
                        <p>Your feedback helps us improve our service.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="feedback-form">
                        <div className="form-group">
                            <label>Role</label>
                            <select
                                className="form-input"
                                value="user"
                                onChange={() => { }}
                            >
                                <option value="user">User</option>
                                <option value="driver">Driver</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Rating</label>
                            <div className="rating-group">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                                    >
                                        <Star size={24} fill={formData.rating >= star ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="form-input"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="form-input textarea"
                                placeholder="Tell us more..."
                            />
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">
                            <Send size={20} />
                            Submit Feedback
                        </button>
                    </form>
                )}
            </div>

            <style>{`
                .feedback-container {
                    max-width: 600px;
                    margin: 0 auto;
                }

                .feedback-card {
                    padding: 2rem;
                }

                .feedback-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .icon-wrapper {
                    padding: 0.75rem;
                    background: rgba(59, 130, 246, 0.1);
                    border-radius: var(--radius-lg);
                    color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .feedback-header h1 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    margin-bottom: 0.5rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border-radius: var(--radius-md);
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.2s;
                }

                .form-input:focus {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                }

                .textarea {
                    resize: none;
                    font-family: inherit;
                }

                .rating-group {
                    display: flex;
                    gap: 0.5rem;
                }

                .star-btn {
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    color: var(--text-muted);
                    transition: all 0.2s;
                }

                .star-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                .star-btn.active {
                    color: #facc15; /* Yellow-400 */
                }

                .submit-btn {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    font-size: 1rem;
                }

                .success-message {
                    text-align: center;
                    padding: 3rem 0;
                }

                .success-icon {
                    width: 4rem;
                    height: 4rem;
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--success);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                }

                .success-message h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .success-message p {
                    color: var(--text-secondary);
                }
            `}</style>
        </div>
    );
}
