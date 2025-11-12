"use client";

import { Switch } from "@mui/material";
import CommonButton from "../Button/CommonButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Pricing() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  // ✅ unique IDs + clear plan data
  const cards = [
    {
      id: 1,
      title: "Individual",
      price: "$45",
      discription:
        "Ideal for independent consultants and small businesses seeking dependable contract comparison solutions.",
      planDetails: [
        "Analyse and compare up to 200 contract pages",
        "Smart clause detection and suggestions",
        "Access to AI recommendations",
        "Up to 2 team members",
        "Email support",
      ],
    },
    {
      id: 2,
      title: "Professional",
      price: "$75",
      discription:
        "Perfect for teams and legal professionals who manage multiple contracts daily.",
      planDetails: [
        "Unlimited contract uploads",
        "Detailed clause analysis and comparison",
        "Collaboration with 5 team members",
        "Priority email support",
        "Data export and version tracking",
      ],
    },
    {
      id: 3,
      title: "Enterprise",
      price: "$120",
      discription:
        "Tailored for organizations requiring high-volume document review and enterprise-grade security.",
      planDetails: [
        "Unlimited pages and users",
        "Custom AI training and private models",
        "Dedicated account manager",
        "24/7 priority support",
        "Advanced analytics dashboard",
      ],
    },
  ];

  // ✅ Capitalized component for rendering cards
  function PricingCard({ title, price, discription, planDetails }) {
    return (
      <div className="bg-white p-6 shadow-md rounded-xl w-full sm:w-[320px] md:w-[360px] lg:w-[380px] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#8E5C00] flex flex-col gap-3 pb-5">
          <div className="bg-[#F4EDDD] text-[#8E5C00] border-2 border-[#8E5C00] px-3 py-1 rounded-3xl w-fit text-sm sm:text-base font-medium">
            {title}
          </div>

          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-tertiary">
            {price}
            <span className="text-base text-gray-600 font-normal ml-1">
              /month
            </span>
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-snug">
            {discription}
          </p>

          <CommonButton
            btnText={"Get Plan"}
            isCancelBtn={"true"}
            className="max-w-[160px] text-base mt-2"
          />
        </div>

        {/* Plan Details */}
        <div className="mt-5 flex flex-col gap-3">
          {planDetails.map((item, i) => (
            <p
              key={i}
              className="flex items-start gap-2 text-gray-700 text-sm sm:text-base"
            >
              <CheckCircleIcon color="success" fontSize="small" />
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main
      id="pricing"
      className="px-4 sm:px-8 md:px-12 lg:px-20 py-10 bg-gray-50 flex flex-col items-center min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-5 my-10 text-center">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-tertiary">
          Plans & Pricing
        </p>
        <div className="text-lg sm:text-xl flex items-center gap-3">
          <span>Monthly</span>
          <Switch {...label} />
          <span>Yearly</span>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {cards.map((card) => (
          <PricingCard
            key={card.id}
            title={card.title}
            price={card.price}
            discription={card.discription}
            planDetails={card.planDetails}
          />
        ))}
      </div>
    </main>
  );
}

export default Pricing;
