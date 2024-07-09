import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { enUS } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';
import './Event.css';
import styles from './Event.module.scss';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageArea from '../../components/PageArea/PageArea';
import AddNoteModal from '../../components/AddNoteModal/AddNoteModal';
import { ContextEvent } from '../../context/EventContext';
import StatisticCard from '../../components/StatisticCard/StatisticCard';
import icon_totalEvents from "../../assets/icons/icon_totalEvents.png";

export default function Event() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
  const contextEvents = useContext(ContextEvent);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(enUS.code, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
  }, []);

  const onChange = (date: Date) => {
    setDate(date);
    setSelectedDate(date);
  };

  const handleAddNote = (note: string) => {
    if (selectedDate) {
      contextEvents.addNote(selectedDate, note);
    }
  };

  const renderEvents = (date: Date) => {
    const dateString = date.toDateString();
    return (
      contextEvents.events[dateString] &&
      contextEvents.events[dateString].map((event, index) => (
        <li key={index} className={styles.noteList}>
          <p>{event}</p>
        </li>
      ))
    );
  };

  return (
    <PageArea>
      <PageHeader title="Events">
        <div className={styles.current_date}>
          <h4>Today is </h4>
          <span>{currentDate}</span>
        </div>
        <StatisticCard
          image={icon_totalEvents}
          people={"Total Events"}
          peopleStat={contextEvents.getTotalNotesCount()}
        />
      </PageHeader>

      <div className={styles.event_area}>
        <Calendar
          onClickDay={onChange}
          value={date}
          locale={enUS.code}
          className="my-calendar"
          tileContent={({ date }) => (
            <>
              {renderEvents(date) && <div className="events"></div>}
            </>
          )}
        />
        <div className={styles.events_area_info}>
          <h3>Events on {date.toDateString()}:</h3>
          {selectedDate && (
            <div>
              <button onClick={() => setIsModalOpen(true)}>Add Note</button>
            </div>
          )}
          <ul>{renderEvents(date)}</ul>
        </div>
        {isModalOpen && selectedDate && (
          <AddNoteModal
            date={selectedDate}
            onSave={handleAddNote}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </PageArea>
  );
}
