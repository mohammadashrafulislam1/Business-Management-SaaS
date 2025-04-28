import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { endPoint } from "../../forAll/forAll";
import { AuthContext } from "../../Components/AuthProvider";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog'; // to programmatically open the dialog
import 'primereact/resources/themes/saga-blue/theme.css'; // or your chosen theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css';


const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    description: "",
    logo: null,
  });
  const { user } = useContext(AuthContext);

  const toast = useRef(null); // PrimeReact toast ref

  const fetchBusinesses = async () => {
    try {
      const res = await axios.get(`${endPoint}/business`);
      setBusinesses(res.data);
    } catch (err) {
      console.error(err);
      toast.current.show({ severity: "error", summary: "Error", detail: "Failed to fetch businesses", life: 3000 });
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleMakeCurrent = (id) => {
    setCurrentBusinessId(id);
    toast.current.show({ severity: "success", summary: "Success", detail: "Business set as current", life: 3000 });
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: 'Are you sure you want to delete this business?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle', // Ensure correct PrimeIcon class is used
      acceptClassName: 'p-button-danger', // Optional: style the button as danger
      acceptLabel: "Delete",
      rejectLabel: "Cancel",
      accept: async () => {
        try {
          await axios.delete(`${endPoint}/business/${id}`);
          fetchBusinesses();
          toast.current.show({
            severity: "success",
            summary: "Deleted",
            detail: "Business deleted successfully",
            life: 3000
          });
        } catch (err) {
          console.error(err);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete business",
            life: 3000
          });
        }
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelled",
          detail: "You cancelled the deletion",
          life: 3000
        });
      }
    });
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewBusiness((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleAddBusiness = async (e) => {
    e.preventDefault();
    if (!newBusiness.name || !newBusiness.description || !newBusiness.logo) {
      toast.current.show({ severity: "warn", summary: "Warning", detail: "Please fill all fields!", life: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("name", newBusiness.name);
    formData.append("description", newBusiness.description);
    formData.append("logo", newBusiness.logo);
    formData.append("owner", user?._id);
// 👉 Console log FormData entries
for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
    try {
      await axios.post(`${endPoint}/business`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowModal(false);
      setNewBusiness({ name: "", description: "", logo: null });
      fetchBusinesses();
      toast.current.show({ severity: "success", summary: "Added", detail: "Business added successfully!", life: 3000 });
    } catch (err) {
      console.error(err);
      toast.current.show({ severity: "error", summary: "Error", detail: err?.response?.data?.message ? err?.response?.data?.message :
        "Failed to add business", life: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-black w-full text-white p-8">
      {/* PrimeReact Toast */}
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Businesses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          + Add New Business
        </button>
      </div>

      {/* Businesses List */}
      <div className="grid gap-8">
        {businesses.map((business) => (
          <div
            key={business._id}
            className={`border rounded-lg p-6 flex items-center justify-between ${
              currentBusinessId === business._id
                ? "border-green-400 shadow-green-400 shadow-md"
                : "border-gray-700"
            }`}
          >
            <div className="flex items-center gap-6">
              <img
                src={business.logo}
                alt={business.name}
                className="w-24 h-24 object-cover rounded-full border border-white"
              />
              <div>
                <h2 className="text-2xl font-semibold">{business.name}</h2>
                <p className="text-gray-400 mt-2">{business.description}</p>
                {business.owner && (
                  <p className="text-sm text-gray-500 mt-1">
                    Owner: {business.owner.name} ({business.owner.email})
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <button
                onClick={() => handleMakeCurrent(business._id)}
                className={`px-4 py-2 rounded text-sm ${
                  currentBusinessId === business._id
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-white text-black hover:bg-gray-200"
                } transition`}
              >
                {currentBusinessId === business._id ? "Current" : "Make Current"}
              </button>

              <div className="flex gap-2 mt-4">
                <button className="border px-4 py-1 rounded hover:bg-gray-700 text-sm">
                  View
                </button>
                <button className="border px-4 py-1 rounded hover:bg-gray-700 text-sm">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(business._id)}
                  className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Add New Business</h2>
            <form onSubmit={handleAddBusiness} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={newBusiness.name}
                onChange={handleInputChange}
                placeholder="Business Name"
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                value={newBusiness.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 rounded"
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Businesses;
