import { getFleetAdminPayments, updateUserType } from "@/Api/adminService";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  // Fetch Admin Payments
  const fetchAdmins = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await getFleetAdminPayments(pageNum, limit);
      if (res?.data) {
        setPayments(res.data.payments);
        setTotalPages(res.data.totalPages);
      } else {
        setPayments([]);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(page);
  }, [page]);

  const handleAccept = async(userId) => {
    await updateUserType(userId)
    fetchAdmins(page)
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <div className="flex justify-between items-center mb-4 self-end">
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="font-semibold">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      </div>

      {loading ? (
        <p className="text-center">Loading payments...</p>
      ) : payments.length === 0 ? (
        <p className="text-center">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md dark:bg-gray-900">
            <thead>
              <tr className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white">
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Amount (₹)</th>
                <th className="px-4 py-2 border">Payment ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="text-center border dark:text-white"
                >
                  <td className="px-4 py-2 border">
                    {index + 1 + (page - 1) * limit}
                  </td>
                  <td className="px-4 py-2 border">
                    {payment.userId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    {payment.userId?.email || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">{payment.amount}</td>
                  <td className="px-4 py-2 border">
                    {payment.razorpay_payment_id}
                  </td>
                  <td
                    className={`px-4 py-2 border ${
                      payment.status === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {payment.userId?.userType === "DEFAULT" || payment.userId?.userType === "FLEET_PENDING" ? (
                      <Button
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => handleAccept(payment.userId._id)}
                      >
                        Accept
                      </Button>
                    ) : (
                      <Button className="bg-green-600 text-white" disabled>
                        Accepted
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
