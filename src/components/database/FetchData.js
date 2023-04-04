import { db } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

const dbRef = collection(db, "financeData");

export const fetchMonthData = async (start, end) => {
  const q = query(
    dbRef,
    where("date", ">=", Timestamp.fromDate(new Date(start))),
    where("date", "<=", Timestamp.fromDate(new Date(end)))
  );
  const data = await getDocs(q);
  const res = data.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
  }));

  return res;
};

export const fetchFirstYear = async () => {
  const q = query(dbRef, orderBy("date"), limit(1));
  const data = await getDocs(q);

  const res = data.docs.map((doc) => ({
    date: doc.data().date.toDate(),
  }));

  const dt = res[0].date;
  return dt;
};

export const fetchItemData = async (item, dStart, dEnd) => {
  const q = query(
    dbRef,
    where("date", ">=", Timestamp.fromDate(new Date(dStart))),
    where("date", "<=", Timestamp.fromDate(new Date(dEnd))),
    where("item", "==", item)
  );
  const data = await getDocs(q);
  const res = data.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
  }));

  return res;
};
