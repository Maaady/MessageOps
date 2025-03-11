import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  phone_number: string;
  message: string;
  status: 'pending' | 'sent' | 'failed' | 'scheduled';
  scheduled_for: string | null;
  created_at: string;
  sent_at: string | null;
  error: string | null;
}

class MessageStore {
  private messages: Message[] = [];
  private subscribers: ((messages: Message[]) => void)[] = [];

  addMessage(message: Omit<Message, 'id' | 'created_at'>): Message {
    const newMessage: Message = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      ...message
    };
    this.messages.unshift(newMessage);
    this.notifySubscribers();
    return newMessage;
  }

  addMessages(messages: Omit<Message, 'id' | 'created_at'>[]): Message[] {
    const newMessages = messages.map(message => ({
      id: uuidv4(),
      created_at: new Date().toISOString(),
      ...message
    }));
    this.messages.unshift(...newMessages);
    this.notifySubscribers();
    return newMessages;
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  subscribe(callback: (messages: Message[]) => void) {
    this.subscribers.push(callback);
    callback(this.getMessages());
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notifySubscribers() {
    const messages = this.getMessages();
    this.subscribers.forEach(callback => callback(messages));
  }
}

export const messageStore = new MessageStore();