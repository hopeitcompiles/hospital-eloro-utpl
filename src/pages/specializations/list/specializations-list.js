import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListModeChanger from "../../../common/components/listmode/ListModeChanger";
import {
  SessionContext,
  Pagination,
  Loading,
  ModalForm,
} from "../../../imports";
import {
  getSpecializationById,
  getSpecializationList,
} from "../../../service/SpecializationService";
import handleErrorResponse from "../../../utils/ErrorHttpHandler";
import SpecializationCard from "../components/SpecializationCard";
import cardStyle from "../css/List.module.css";
import { MdPostAdd as AddIcon } from "react-icons/md";
import AddSpecializationForm from "../components/AddSpecializationForm";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import DeleteSpecialization from "../components/DeleteSpecialization";

export default function SpecializationList() {
  const { sessionUser } = useContext(SessionContext);
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [pagePath, setPagePath] = useSearchParams();
  const page_in_path = pagePath.get("page");
  const search_in_path = pagePath.get("search");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fixOne = async (id) => {
    const response = await getSpecializationById(id);
    return response;
  };
  const loadSpecializations = async () => {
    setError("");
    setIsLoading(true);
    try {
      const search_param = search_in_path ? search_in_path : "";
      const pagenumber = page_in_path ? page_in_path : 1;
      const response = await getSpecializationList(pagenumber, search_param);
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

      setList(response.content);
    } catch (er) {
      setError(handleErrorResponse(er));
      setList(null);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadSpecializations();
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
                  : "Adding new specialization"
              }
              setClose={() => {
                setEditing(null);
                setAdding(false);
              }}
            >
              <AddSpecializationForm
                editing={editing}
                onCancel={() => {
                  setEditing(null);
                  setAdding(false);
                }}
                onSuccess={() => {
                  loadSpecializations();
                  setAdding(false);
                  setEditing(null);
                }}
                listed={list}
              />
            </ModalForm>
          )}
          {deleting && (
            <ModalForm title={"Delete"} setClose={() => setDeleting(null)}>
              <DeleteSpecialization
                deleting={deleting}
                onDelete={() => {
                  setDeleting(null);
                  loadSpecializations();
                }}
                onCancel={() => setDeleting(null)}
              />
            </ModalForm>
          )}
          <div className={cardStyle.container}>
            <ListModeChanger
              left={
                sessionUser?.role?.claims?.includes("specialization:write") && {
                  title: "Add a new specialization",
                  icon: <AddIcon size={30} />,
                  onClick: () => {
                    setAdding(true);
                  },
                }
              }
            />
            {list?.map((element, index) => (
              <div key={element.id ? element.id : -index}>
                <SpecializationCard
                  specialization={element}
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
