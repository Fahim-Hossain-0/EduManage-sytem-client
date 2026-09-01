import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: classData = {}, isLoading } = useQuery({
    queryKey: ["payment-class", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-classes/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-10 md:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="card-premium p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-100">
          <img src={classData.image} alt={classData.title} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">{classData.title}</h2>
            <p className="text-sm text-zinc-500">by {classData.name}</p>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm classData={classData} />
        </Elements>
      </div>
    </section>
  );
};

export default Payment;
