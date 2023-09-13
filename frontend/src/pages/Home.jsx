import { React, useEffect, useState } from "react";
import { axios } from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from './../../node_modules/react-icons/md/index.esm';
import Spinner from "../components/Spinner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/users").then((response) => {
        setUsers(response.data.data);
        setLoading(false);
    });
  }, []);
  return (
    <div className="p-4">
        <div className="flax justify-between items-center">
            <h1 className="text-3xl my-8">User List</h1>
            <Link to="/user/create">
                <MdOutlineAddBox className="text-sky-800 text-4xl"/>
            </Link>
        </div>
        {loading ? (
            <Spinner/>
        ) : (
            <table className="w-full border-separate border-spacing-2">
                <thead >
                    <tr>
                        <th className="border border-slate-600 rounded-md">ID</th>
                        <th className="border border-slate-600 rounded-md">Name</th>
                        <th className="border border-slate-600 rounded-md">Email</th>
                        <th className="border border-slate-600 rounded-md">Status</th>
                        <th className="border border-slate-600 rounded-md">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="h-8">
                            <td className="border border-slate-700 rounded-md text-center">
                                {index + 1}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {user.first_name + " " + user.last_name}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {user.email}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {user.status ? "active" : "deactive"}
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
