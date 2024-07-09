import styles from "./SearchBar.module.scss";
import icon_search from "../../assets/icons/icon_search.png";
import { useContext } from "react";
import { ContextSerchBar } from "../../context/SearchBarContext";

export default function SearchBar() {
  const contextSerchBar = useContext(ContextSerchBar);
  const handlerChangeInput = (event: any) => {
    contextSerchBar.setSearch(event.target.value);
  };

  console.log(contextSerchBar.search);
  return (
    <div className={styles.searchBar}>
      <img src={icon_search} alt="icon search" />
      <input
        type="text"
        placeholder="Search here..."
        onChange={handlerChangeInput}
        value={contextSerchBar.search}
      />
    </div>
  );
}
