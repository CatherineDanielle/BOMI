
import React, { useState } from 'react';

const Faq = () => {
  // Sample FAQ data - you can replace with your actual data
  const [faqs, setFaqs] = useState([
    {
      question: 'What is BOMI?',
      answer: 'BOMI is a digital platform that helps users monitor and manage their physical health through features like BMI Calculator, BMI Tracker, Body Composition Estimation, and Health Risk Assessment.',
      isOpen: false
    },
    {
      question: 'What is BMI and why is it important?',
      answer: 'BMI (Body Mass Index) is a number calculated from a person’s weight and height. It is an important indicator to determine whether a person is underweight, normal, overweight, or obese.',
      isOpen: false
    },
    {
      question: 'How do I use the BMI Calculator?',
      answer: 'You simply enter your weight and height, and the calculator will provide your BMI score along with a category interpretation.',
      isOpen: false
    },
    {
      question: 'Is BOMI suitable for all ages?',
      answer: 'BOMI is mainly designed for teens and adults. Children may require a different BMI interpretation, and it is best to consult with a healthcare professional.',
      isOpen: false
    },
    {
      question: 'Can I track my BMI progress over time?',
      answer: 'Yes, BOMI provides a BMI Progress Tracker feature where you can record and visualize your BMI changes over a period of time.',
      isOpen: false
    },
    {
      question: 'What is Body Composition Estimation?',
      answer: 'It is a feature that provides an estimate of your body fat percentage and muscle mass based on your physical data, giving deeper insight into your health.',
      isOpen: false
    },
    {
      question: 'How does Health Risk Assessment work?',
      answer: 'Based on your BMI and other inputs, the platform evaluates potential health risks and gives you a personalized risk level.',
      isOpen: false
    },
    {
      question: 'Is my data stored securely?',
      answer: 'Yes, we prioritize user privacy. All your health data is securely stored and only accessible by you.',
      isOpen: false
    }
  ]);

  // Function to toggle FAQ open/close state
  const toggleFaq = (index) => {
    const updatedFaqs = faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, isOpen: !faq.isOpen };
      }
      return faq;
    });
    setFaqs(updatedFaqs);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="text-3xl font-bold text-olive-700 text-center mb-8">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="rounded-lg overflow-hidden transition-all duration-300 bg-orange-200"
          >
            {!faq.isOpen ? (
              // Collapsed state
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="font-medium text-olive-700">
                  {faq.question}
                </h3>
                <span className="text-2xl">+</span>
              </div>
            ) : (
              // Expanded state
              <>
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer bg-olive-500"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="font-medium text-white">
                    Question: {faq.question}
                  </h3>
                  <span className="text-2xl text-white">-</span>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-olive-700">
                    Answer: {faq.answer}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;