import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../redux/State/tentriestabel";
import TransactionTable from "./TransactionTable"; // 👈 Import your component
//import Editentry from "./Editentries";

const TransactionsTable = () => {
  const dispatch = useDispatch();

  const { transactions, loading, error } = useSelector(
    (state) => state.transaction
  );
  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="pt-25">
      <TransactionTable transactions={transactions || []} />{" "}
    </div>
  );
};

export default TransactionsTable;
