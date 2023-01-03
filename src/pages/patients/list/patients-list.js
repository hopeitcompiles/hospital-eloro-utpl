import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListModeChanger from "../../../common/components/listmode/ListModeChanger";
import {
  SessionContext,
  Pagination,
  Loading,
  ModalForm,
} from "../../../imports";
import { getPatientList } from "../../../service/PatientService";
import handleErrorResponse from "../../../utils/ErrorHttpHandler";
import PatientCard from "../components/PatientCard";
import cardStyle from "../css/UserList.module.css";
import { AiOutlineUserAdd as AddIcon } from "react-icons/ai";
import AddPatientForm from "../components/AddPatientForm";
import DeletePatient from "../components/DeletePatient";

export default function PatientsList() {
  const { sessionUser } = useContext(SessionContext);
  const [patientList, setPatientList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  const [pagePath, setPagePath] = useSearchParams();
  const page_in_path = pagePath.get("page");
  const search_in_path = pagePath.get("search");

  const loadPatients = async () => {
    setError("");
    setIsLoading(true);
    try {
      const search_param = search_in_path ? search_in_path : "";
      const pagenumber = page_in_path ? page_in_path : 1;
      const response = await getPatientList(pagenumber, search_param);
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
      setPatientList(response.content);
    } catch (er) {
      setError(handleErrorResponse(er));
      setPatientList(null);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (sessionUser) {
      loadPatients();
      return;
    }
    setError("Not authenticated");
    setPatientList([]);
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
          {(adding === true || editing !== null) && (
            <ModalForm
              title={
                editing !== null
                  ? "Editing: " + editing.name
                  : "Adding new patient"
              }
              setClose={() => {
                setEditing(null);
                setAdding(false);
              }}
            >
              <AddPatientForm
                editing={editing}
                onCancel={() => {
                  setEditing(null);
                  setAdding(false);
                }}
                onSuccess={() => {
                  loadPatients();
                  setAdding(false);
                  setEditing(null);
                }}
              />
            </ModalForm>
          )}
          {deleting && (
            <ModalForm title={"Delete"} setClose={() => setDeleting(null)}>
              <DeletePatient
                deleting={deleting}
                onDelete={() => {
                  setDeleting(null);
                  loadPatients();
                }}
                onCancel={() => setDeleting(null)}
              />
            </ModalForm>
          )}
          <div className={cardStyle.container}>
            <ListModeChanger
              left={{
                icon: <AddIcon size={30} />,
                onClick: () => {
                  setAdding(true);
                },
              }}
            />
            {patientList?.map((element) => (
              <div key={element.id}>
                <PatientCard
                  patient={element}
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
