import { createContext, useState } from 'react';

interface IContextEvents {
  events: object;
  addNote: (date: Date, note: string) => void;
  getTotalNotesCount: () => number;
}

export const ContextEvent = createContext<IContextEvents>({
  events: {},
  addNote: () => {},
  getTotalNotesCount: () => 0,
});

export default function EventProvider({ children }) {
  const [events, setEvents] = useState<object>({});

  const addNote = (date: Date, note: string) => {
    const newEvents = { ...events };
    const dateString = date.toDateString();
    if (!newEvents[dateString]) {
      newEvents[dateString] = [];
    }
    newEvents[dateString].push(note);
    setEvents(newEvents);
  };

  const getTotalNotesCount = () => {
    return Object.values(events).reduce((acc, notes) => acc + notes.length, 0);
  };

  return (
    <ContextEvent.Provider value={{ events, addNote, getTotalNotesCount }}>
      {children}
    </ContextEvent.Provider>
  );
};
