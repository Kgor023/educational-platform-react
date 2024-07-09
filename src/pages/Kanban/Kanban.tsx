import { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import PageArea from "../../components/PageArea/PageArea";
import Timer from "../../components/Timer/Timer";
import styles from "./Kanban.module.scss";

interface IDoingAndCompletedTask {
  name: string;
  time: number;
}

export default function Kanban() {
  const [listToDo, setListToDo] = useState<string[]>([]);
  const [listDoing, setListDoing] = useState<IDoingAndCompletedTask[]>([]);
  const [listDone, setListDone] = useState<IDoingAndCompletedTask[]>([]);
  const [taskValue, setTaskValue] = useState("");

  const handlerAddTask = () => {
    if (taskValue.trim()) {
      setListToDo([...listToDo, taskValue]);
      setTaskValue("");
    }
  };

  const handleCheckboxChange = (task: string, targetList: string) => {
    if (targetList === "todo") {
      if (!listToDo.includes(task)) {
        setListToDo([...listToDo, task]);
      }
      setListDoing(listDoing.filter((doing) => doing.name !== task));
      setListDone(listDone.filter((done) => done.name !== task));
    } else if (targetList === "doing") {
      if (!listDoing.some((doing) => doing.name === task)) {
        setListDoing([...listDoing, { name: task, time: 0 }]);
      }
      setListToDo(listToDo.filter((toDo) => toDo !== task));
      setListDone(listDone.filter((done) => done.name !== task));
    } else if (targetList === "done") {
      if (!listDone.some((done) => done.name === task)) {
        setListDone([...listDone, { name: task, time: 0 }]);
      }
      setListToDo(listToDo.filter((toDo) => toDo !== task));
      setListDoing(listDoing.filter((doing) => doing.name !== task));
    }
  };

  const handleDeleteTask = (task: string, listOfTasks: string) => {
    if (listOfTasks === "todo") {
      setListToDo(listToDo.filter((toDo) => toDo !== task));
    } else if (listOfTasks === "doing") {
      setListDoing(listDoing.filter((doing) => doing.name !== task));
    } else if (listOfTasks === "done") {
      setListDone(listDone.filter((done) => done.name !== task));
    }
  };

  const handleSave = (elapsedTime: number) => {
    const updatedCompletedTasks = listDoing.map((task) => ({
      name: task.name,
      time: elapsedTime,
    }));
    setListDone([...listDone, ...updatedCompletedTasks]);
    setListDoing([]);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <PageArea>
      <PageHeader title="Kanban">
        <div className={styles.task_add_block}>
          <input
            type="text"
            onChange={(event) => {
              setTaskValue(event.target.value);
            }}
            value={taskValue}
          />
          <button onClick={handlerAddTask}>Add Task</button>
        </div>
        <Timer onSave={handleSave} listDoingLength={listDoing.length} />
      </PageHeader>
      <div className={styles.kanban_area}>
        <div className={styles.kanban_blocks_area}>
          <div className={styles.kanban_block}>
            <h3 className={styles.kanban_block_toDo_title}>To Do</h3>
            <div className={styles.kanban_block_list}>
              {listToDo.map((todo, index) => (
                <div key={index} className={styles.kanban_block_list_task}>
                  <p>{todo}</p>
                  <div className={styles.kanban_block_list_checkbox}>
                    <label>
                      <span>To Do</span>
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => handleCheckboxChange(todo, "todo")}
                      />
                    </label>
                    <label>
                      <span>Doing</span>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleCheckboxChange(todo, "doing")}
                      />
                    </label>
                    <label>
                      <span>Done</span>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleCheckboxChange(todo, "done")}
                      />
                    </label>
                    <button onClick={() => handleDeleteTask(todo, "todo")}>
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.kanban_block}>
            <h3 className={styles.kanban_block_doing_title}>Doing</h3>
            <div className={styles.kanban_block_list}>
              {listDoing.map((doing, index) => (
                <div key={index} className={styles.kanban_block_list_task}>
                  <p>{doing.name}</p>
                  <div className={styles.kanban_block_list_checkbox}>
                    <label>
                      <span>To Do</span>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() =>
                          handleCheckboxChange(doing.name, "todo")
                        }
                      />
                    </label>
                    <label>
                      <span>Doing</span>
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() =>
                          handleCheckboxChange(doing.name, "doing")
                        }
                      />
                    </label>
                    <label>
                      <span>Done</span>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() =>
                          handleCheckboxChange(doing.name, "done")
                        }
                      />
                    </label>
                    <button
                      onClick={() => handleDeleteTask(doing.name, "doing")}
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.kanban_block}>
            <h3 className={styles.kanban_block_done_title}>Done</h3>
            <div className={styles.kanban_block_list}>
              {listDone.map((done, index) => (
                <div key={index} className={styles.kanban_block_list_task}>
                  <p>{done.name}</p>
                  <span>{formatTime(done.time)}</span> 
                  <div className={styles.kanban_block_list_checkbox}>
                    <label>
                      <span>To Do</span>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleCheckboxChange(done.name, "todo")}
                      />
                    </label>
                    <label>
                      <span>Doing</span>
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleCheckboxChange(done.name, "doing")}
                      />
                    </label>
                    <label>
                      <span>Done</span>
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => handleCheckboxChange(done.name, "done")}
                      />
                    </label>
                    <button onClick={() => handleDeleteTask(done.name, "done")}>
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageArea>
  );
}
