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
import DoctorCard from "../components/DoctorCard";
import cardStyle from "../css/UserList.module.css";
import { AiOutlineUserAdd as AddIcon } from "react-icons/ai";
import AddDoctorForm from "../components/AddDoctorForm";
import DeleteDoctor from "../components/DeleteDoctor";

export default function DoctorList() {
  const { sessionUser } = useContext(SessionContext);
  const [doctorList, setDoctorList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [pagePath, setPagePath] = useSearchParams();
  const page_in_path = pagePath.get("page");
  const search_in_path = pagePath.get("search");

  const loadDoctors = async () => {
    setError("");
    setIsLoading(true);
    try {
      const search_param = search_in_path ? search_in_path : "";
      const pagenumber = page_in_path ? page_in_path : 1;
      const response = await getDoctorList(pagenumber, search_param);
      console.log(response);
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
    loadDoctors();
  }, [page_in_path, search_in_path]);

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
          {(adding === true || editing !== null) && (
            <ModalForm
              title={
                editing !== null
                  ? "Editing: " + editing.name
                  : "Adding new doctor"
              }
              setClose={() => {
                setEditing(null);
                setAdding(false);
              }}
            >
              <AddDoctorForm
                editing={editing}
                onCancel={() => {
                  setEditing(null);
                  setAdding(false);
                }}
                onSuccess={() => {
                  loadDoctors();
                  setAdding(false);
                  setEditing(null);
                }}
              />
            </ModalForm>
          )}
          {deleting && (
            <ModalForm title={"Delete"} setClose={() => setDeleting(null)}>
              <DeleteDoctor
                deleting={deleting}
                onDelete={() => {
                  setDeleting(null);
                  loadDoctors();
                }}
                onCancel={() => setDeleting(null)}
              />
            </ModalForm>
          )}
          <div className={cardStyle.container}>
            <ListModeChanger
              left={
                sessionUser?.role?.claims?.includes("doctor:write") && {
                  title: "Add a new doctor",
                  icon: <AddIcon size={30} />,
                  onClick: () => {
                    setAdding(true);
                  },
                }
              }
            />
            {doctorList?.map((element) => (
              <div key={element.id}>
                <DoctorCard
                  doctor={element}
                  editing={setEditing}
                  deleting={setDeleting}
                />
              </div>
            ))}
          </div>
          <Pagination pagination={pagination} />
        </div>
      )}
    </section>
  );
}
