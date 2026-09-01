import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { CreditCard, Lock } from "lucide-react";

const CheckoutForm = ({ classData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (classData?.price) {
      axiosSecure.post("/create-payment-intent", { price: classData.price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [classData, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");

    const { error: paymentMethodError } = await stripe.createPaymentMethod({ type: "card", card });
    if (paymentMethodError) { setError(paymentMethodError.message); setProcessing(false); return; }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name: user?.displayName || "Anonymous", email: user?.email || "Unknown" } },
    });

    if (confirmError) { setError(confirmError.message); setProcessing(false); return; }

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      const paymentInfo = { transactionId, classId: classData._id, classTitle: classData.title, amount: classData.price, studentEmail: user.email, studentName: user.displayName, paymentDate: new Date() };
      const enrollmentInfo = { classId: classData._id, classTitle: classData.title, classImage: classData.image, teacherName: classData.name, teacherEmail: classData.email, studentEmail: user.email, studentName: user.displayName, transactionId, enrolledAt: new Date() };

      try {
        await axiosSecure.post("/payments", paymentInfo);
        await axiosSecure.post("/enrollments", enrollmentInfo);
        await axiosSecure.patch(`/classes/enroll/${classData._id}`);
        navigate("/dashboard/my-enroll-classes");
      } catch (err) { /* handled */ }
    }
    setProcessing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-zinc-900">Payment Details</h3>
        <span className="text-xl font-bold text-zinc-900">${classData.price}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Card Information</label>
          <div className="p-3.5 rounded-lg border border-zinc-200 bg-white focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all">
            <CardElement options={{ style: { base: { fontSize: "14px", color: "#18181b", "::placeholder": { color: "#a1a1aa" } } } }} />
          </div>
        </div>

        {error && <p className="text-sm text-red-500 flex items-center gap-1.5 bg-red-50 p-3 rounded-lg">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn-primary w-full text-sm py-2.5 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? (
            "Processing..."
          ) : (
            <><Lock className="w-4 h-4" /> Pay ${classData.price} Securely</>
          )}
        </button>

        <p className="text-xs text-zinc-400 text-center flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Secured by Stripe
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;
