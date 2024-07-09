import { useState } from "react";
import styles from "./AddNoteModal.module.scss";
interface IAddNoteModalProps {
  date: Date;
  onSave: (note: string) => void;
  onClose: () => void;
}

export default function AddNoteModal({ date, onSave, onClose }:IAddNoteModalProps) {
  const [note, setNote] = useState("");
  const handleSave = () => {
    onSave(note);
    onClose();
  };
  return (
    <div className={styles.noteModalArea}>
      <form className={styles.noteModalForm}>
        <h3>Add Note for {date.toDateString()}</h3>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <div className={styles.noteModalForm__button_area}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
      </form>
    </div>
  );
}
