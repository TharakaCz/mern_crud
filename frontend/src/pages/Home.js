import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  });
   async function getData() {
     await axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="p-4">
      <div className="flax justify-between items-center">
        <h1 className="text-3xl my-8">Users List</h1>
        <Link to="/user/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md">Status</th>
              <th className="border border-slate-600 rounded-md">Date</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="h-8">
                <td className="boder border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="boder border-slate-700 rounded-md text-center">
                  {user.first_name + " " + user.last_name}
                </td>
                <td className="boder border-slate-700 rounded-md text-center">
                  {user.email}
                </td>
                <td className="boder border-slate-700 rounded-md text-center">
                  {user.status ? "Active" : "Deactive"}
                </td>
                <td className="boder border-slate-700 rounded-md text-center">
                  {user.createdAt}
                </td>
                <td className="boder border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/user/details/${user._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/user/edit/${user._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/user/delete/${user._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
