import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: 'How can Azo help me?',
      answer:
        'Azo is a DIY automated AI-driven digital marketing platform. You can create lead generation ads for your business using our simple-to-use interface. Publish your ad across multiple platforms online with a single click.',
    },
    {
      question: 'How does the AI work?',
      answer:
        'Azo reaches potential customers for your business through targeted ads. The targeted ads are optimized on a range of parameters, including the client’s industry, user location, user behavior, user profile, ad schedule, etc. Our AI Platform then segregates the leads generated into hot, warm, and cold leads for the client, which helps in refining the go-to-customer strategy.',
    },
    {
      question: 'Can Azo get me leads from other countries or even other non-metro cities in India?',
      answer: 'Yes, you can create campaigns targeting a localized area, including various cities in India/other countries.',
    },
    {
      question: 'What can be the minimum budget required to run an ad?',
      answer: 'Your daily ad budget can be as low as Rs. 200.',
    },
    {
      question: 'How many ad campaigns can I run in a month and how many leads can I expect to generate monthly?',
      answer: 'There is no capping on the number of campaigns. You can practically generate unlimited high-quality leads through the Azo platform.',
    },
    {
      question: 'What platforms can I run my ads on?',
      answer:
        'Azo helps you in generating leads from Facebook and Instagram. We are working on automating Google ad campaigns and shall make Google ads available shortly to our customers.',
    },
    {
      question: 'Why should I leave my current digital marketing agency and select Azo for lead generation?',
      answer:
        "Azo empowers you to independently generate high-quality leads, at 1/10th the price charged by a digital marketing agency. Also, our AI algorithm classifies all incoming leads into distinct categories: 'Hot,' 'Warm,' and 'Cold'. But that's not all. Our comprehensive approach involves initiating a sequence of automated messages on your behalf, effectively introducing your business and its offerings to every lead. This strategic process ensures that leads are well-acquainted with your brand even before your team reaches out for the initial conversation. This also helps in lead nurturing. For instance, if a lead is generated over the weekend and the first point of contact is scheduled for Monday, Azo bridges the gap by establishing a connection on the same weekend, thus priming the lead for a successful engagement. With Azo, your leads are not only generated but also cultivated, resulting in enhanced conversion rates and a seamless lead conversion experience.",
    },
  ];

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className=" bg-blueGray-100 py-16">
  <div className="container  mx-auto px-4">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
    </div>
    <div className="grid gap-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`${
            index % 2 === 0 ? 'bg-white' : 'bg-blueGray-400' // Alternate background colors
          } p-4 rounded-lg shadow-md`}
        >
          <button
            className="w-full text-left text-xl font-semibold focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            {faq.question}
          </button>
          {openIndex === index && (
            <div className="bg-blueGray-100 p-4 mt-4 rounded-lg">
              <p className="text-blueGray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default FAQSection;
