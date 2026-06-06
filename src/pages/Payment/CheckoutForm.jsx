import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

// import useAxios from "../../hook/useAxios";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

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
      axiosSecure
        .post("/create-payment-intent", {
          price: classData.price,
        })
        .then((res) => {
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

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);

      setProcessing(false);

      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",

            email: user?.email || "Unknown",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);

      setProcessing(false);

      return;
    }

    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;

      // Payment Data

      const paymentInfo = {
        transactionId,

        classId: classData._id,

        classTitle: classData.title,

        amount: classData.price,

        studentEmail: user.email,

        studentName: user.displayName,

        paymentDate: new Date(),
      };

      // Enrollment Data

      const enrollmentInfo = {
  classId: classData._id,
  classTitle: classData.title,
  classImage: classData.image,
  price: classData.price,
  teacherEmail: classData.email,
  studentEmail: user.email,
  studentName: user.displayName,
  transactionId,
  enrolledAt: new Date(),
};

      try {
        await axiosSecure.post("/payments", paymentInfo);

        await axiosSecure.post("/enrollments", enrollmentInfo);

        await axiosSecure.patch(`/classes/enroll/${classData._id}`);

        navigate("/dashboard/my-enroll-classes");
      } catch (err) {
        console.log(err);
      }
    }

    setProcessing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-bold mb-4">Pay ${classData.price}</h3>

      <form onSubmit={handleSubmit}>
        <div className="border rounded-lg p-4">
          <CardElement />
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-primary mt-5"
        >
          {processing ? "Processing..." : `Pay $${classData.price}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
