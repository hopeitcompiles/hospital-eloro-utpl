import { useContext } from "react";
import { MdGrid4X4 as GridOption } from "react-icons/md";
import { TfiLayoutListThumb as ListOption } from "react-icons/tfi";

import cardStyle from "./css/ListMode.module.css";
import { ListContext, ThemeContext } from "../../../imports";
const ListModeChanger = ({ left }) => {
  const { theme } = useContext(ThemeContext);
  const { list, setList } = useContext(ListContext);

  return (
    <div className={cardStyle.option_container}>
      <div>
        {left ? (
          <div
            className={`${cardStyle.touchable} ${
              theme === "dark" && cardStyle.dark_theme
            }`}
            onClick={() => {
              if (left.onClick) {
                console.log("clicked");
                left.onClick();
              }
            }}
          >
            {left?.icon}
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${cardStyle.option_list} ${
          theme === "dark" && cardStyle.dark_theme
        }`}
        onClick={() => setList(!list)}
      >
        {list ? <GridOption size={30} /> : <ListOption size={30} />}
      </div>
    </div>
  );
};
export default ListModeChanger;
