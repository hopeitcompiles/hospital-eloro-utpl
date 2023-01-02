import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListModeChanger from "../../../common/components/listmode/ListModeChanger";
import {
  SessionContext,
  Pagination,
  Loading,
  ModalForm,
} from "../../../imports";
import { getDoctorList } from "../../../service/DoctorService";
import handleErrorResponse from "../../../utils/ErrorHttpHandler";
import UserCard from "../components/UserCard";
import cardStyle from "../css/UserList.module.css";
import { AiOutlineUserAdd as AddIcon } from "react-icons/ai";
import { Alert } from "react-bootstrap";

export default function DoctorList() {
  const { sessionUser } = useContext(SessionContext);
  const [doctorList, setDoctorList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [pagePath, setPagePath] = useSearchParams();
  const page_in_path = pagePath.get("page");
  const search_in_path = pagePath.get("search");

  const loadUsers = async () => {
    setError("");
    setIsLoading(true);
    try {
      const search_param = search_in_path ? search_in_path : "";
      const pagenumber = page_in_path ? page_in_path : 1;
      const response = await getDoctorList(pagenumber, search_param);
      const page_info = {
        current: response.number + 1,
        total_pages: response.totalPages,
        total_items: response.totalElements,
        showing: response.numberOfElements,
        last: response.last,
        first: response.first,
      };
      setPagination(page_info);
      setDoctorList(response.content);
    } catch (er) {
      setError(handleErrorResponse(er));
      setDoctorList(null);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (sessionUser) {
      loadUsers();
      return;
    }
    setError("Not authenticated");
    setDoctorList([]);
    setIsLoading(false);
  }, [page_in_path, search_in_path, sessionUser]);

  if (isLoading) {
    return <Loading />;
  }
  if (error !== "") {
    return <h1>{error}</h1>;
  }

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className={cardStyle.container}>
            <ListModeChanger
              left={{
                icon: <AddIcon size={30} />,
                onclick: () => {
                  Alert("Asd");
                },
              }}
            />
            {doctorList?.map((user) => (
              <div key={user.id}>
                <UserCard current_user={user} />
              </div>
            ))}
          </div>
          <Pagination pagination={pagination} />
        </div>
      )}
    </section>
  );
}
