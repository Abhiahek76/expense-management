import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionById } from "../redux/State/tentriestabel";
import TransactionEditForm from "./Editentries";

const EditTransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTransaction, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Fetched transaction from Redux:", selectedTransaction);
  }, [selectedTransaction]);

  const handleCancel = () => {
    navigate("/report");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!selectedTransaction) return <div>Transaction not found.</div>;

  return (
    <TransactionEditForm
      transaction={selectedTransaction}
      onCancel={handleCancel}
    />
  );
};

export default EditTransactionPage;
