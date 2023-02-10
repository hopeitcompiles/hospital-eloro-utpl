import { useContext } from "react";
import { MdGrid4X4 as GridOption } from "react-icons/md";
import { RiListCheck2 as ListOption } from "react-icons/ri";

import cardStyle from "./css/ListMode.module.css";
import { ListContext, ThemeContext } from "../../../imports";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const ListModeChanger = ({ left }) => {
  const { theme } = useContext(ThemeContext);
  const { list, setList } = useContext(ListContext);

  return (
    <div className={cardStyle.option_container}>
      <div>
        {left ? (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip id="button-tooltip-2">
                {left.title ? left.title : ""}
              </Tooltip>
            }
          >
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
          </OverlayTrigger>
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
