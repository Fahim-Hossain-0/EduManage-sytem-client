import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hook/useAxiosSecure";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PK
);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: classData = {},
    isLoading,
  } = useQuery({
    queryKey: ["payment-class", id],
    queryFn: async () => {
      const res =
        await axiosSecure.get(
          `/all-classes/${id}`
        );

      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">
        Complete Payment
      </h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          classData={classData}
        />
      </Elements>
    </div>
  );
};

export default Payment;