import React from 'react';

const Features = ({ onNavigate }) => {
  const features = [
    {
      id: 1,
      title: "Smart BMI Calculator",
      description: "This feature allows users to quickly and accurately calculate their Body Mass Index (BMI) based on personal data such as age, gender, weight, and height. The system automatically classifies the results into standard health categories such as underweight, normal, overweight, or obese—providing instant and reliable feedback.",
      imagePosition: "right"
    },
    {
      id: 2,
      title: "BMI & Progress Tracker",
      description: "Track your health journey over time! This feature enables users to save their BMI records and visualize progress through intuitive charts and timelines. It's ideal for anyone committed to improving their fitness or maintaining a healthy lifestyle.",
      imagePosition: "left"
    },
    {
      id: 3,
      title: "Body Composition Estimation",
      description: "Go beyond basic BMI with this smart estimator. Based on your BMI and personal details, the system provides an approximate breakdown of your body composition by covering body fat percentage, muscle mass, bone mass, and other components. It gives a more holistic view of your physical health.",
      imagePosition: "right"
    }
  ];

  const handleNavigate = (route) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      console.log(`Navigate to: ${route}`);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-[#8eb442]">BOMI</span> Features
          </h2>
        </div>

        {/* Features List */}
        <div className="space-y-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                feature.imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-8 lg:gap-12 tex`}
            >
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-justify">
                <h3 className="text-2xl md:text-3xl font-bold text-[#8eb442] mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className='flex justify-center'> 
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  {/* Placeholder for image - Replace with actual image */}
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;