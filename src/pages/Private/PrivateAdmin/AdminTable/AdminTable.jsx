import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTable } from "../../../../features/table/tableSlice";
import { toast } from "react-toastify";
import { BackButton } from "../../../../components/shared/BackButton";
import BigTitle from "../../../../components/shared/BigTitle/BigTitle";
import Table from "../../../../components/table/Table";

function AdminTable() {
  const { table, isLoading, isError, message } = useSelector(
    (state) => state.table
  );

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTable(params.id));
  }, [dispatch, isError, message, params.id]);

  console.log(table.data);

  if (isLoading || !table.data) {
    return <h1>Chargement...</h1>;
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>;
  }

  return (
  
  <>
  <BackButton url={'/private/produits'} />
  <BigTitle title={table.data.name} />
  
  <Table columns={table.data.columns} rows={table.data.lines}/>
  
  </>
  
  );
}

export default AdminTable;
