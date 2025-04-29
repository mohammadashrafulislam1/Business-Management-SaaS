import { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../../forAll/forAll";

const Managers = () => {
  const [managers, setManagers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessProfile: [],
    avatar: null,
  });

  useEffect(() => {
    fetchManagers();
    fetchBusinesses();
  }, []);

  const fetchManagers = async () => {
    try {
      const res = await axios.get(`${endPoint}/users/managers`, {
        params: {
          businessProfiles: ["Business A", "Business B"], // Optional filter
        },
      });
      setManagers(res.data);
    } catch (error) {
      console.error("Error fetching managers", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get(`${endPoint}/business`);
      setBusinesses(res.data);
    } catch (error) {
      console.error("Error fetching businesses", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, options } = e.target;
    if (name === "avatar") {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else if (name === "businessProfile") {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setFormData((prev) => ({ ...prev, businessProfile: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("role", "manager");
      payload.append("avatar", formData.avatar);

      formData.businessProfile.forEach((profile) => {
        payload.append("businessProfile", profile);
      });

      const res = await axios.post(`${endPoint}/user/add`, payload);
      console.log("Manager added:", res.data);
      fetchManagers(); // Refresh list
    } catch (error) {
      console.error("Error adding manager", error.response?.data || error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Managers</h2>

      {loading ? (
        <p>Loading...</p>
      ) : managers.length > 0 ? (
        <ul className="space-y-2 mb-6">
          {managers.map((manager) => (
            <li key={manager._id} className="border p-3 rounded-md">
              <p><strong>Name:</strong> {manager.name}</p>
              <p><strong>Email:</strong> {manager.email}</p>
              <p><strong>Business Profile:</strong> {Array.isArray(manager.businessProfile) ? manager.businessProfile.join(", ") : manager.businessProfile}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No managers found.</p>
      )}

      <h3 className="text-xl font-semibold mb-2 mt-[100px]">Add Manager</h3>
      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="businessProfile"
          multiple
          required
          value={formData.businessProfile}
          onChange={handleChange}
          className="border p-2 w-full h-40"
        >
          {businesses.map((biz) => (
            <option key={biz._id} value={biz.name}>
              {biz.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded "
        >
          Add Manager
        </button>
      </form>
    </div>
  );
};

export default Managers;
