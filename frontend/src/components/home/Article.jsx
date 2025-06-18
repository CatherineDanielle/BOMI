import React from "react";

const blogPosts = [
  {
    id: 1,
    date: "Apr 12, 2024",
    category: "Health",
    title: "Why BMI Matters: A Quick Guide to Understanding Your Body Index",
    description:
      "BMI is a simple yet powerful indicator of body health. Learn how to calculate and interpret it to better understand your physical well-being.",
    image:
      "https://www.msiglife.co.id/public-file/webcorporate/webcorporate/article/bahasa/tips-menerapkan-gaya-hidup-sehat.jpeg",
  },
  {
    id: 2,
    date: "May 5, 2024",
    category: "Wellness",
    title: "5 Everyday Habits to Help You Maintain a Healthy Weight",
    description:
      "Simple habits like mindful eating and regular movement can make a huge difference. Discover practical tips to stay on track with your health goals.",
    image:
      "https://www.msiglife.co.id/public-file/webcorporate/webcorporate/article/bahasa/tips-menerapkan-gaya-hidup-sehat.jpeg",
  },
  {
    id: 3,
    date: "Jun 1, 2024",
    category: "Nutrition",
    title: "Understanding Body Composition: More Than Just a Number",
    description:
      "Body fat, muscle mass, and water content — learn what your body is truly made of and how to improve your overall composition.",
    image:
      "https://www.msiglife.co.id/public-file/webcorporate/webcorporate/article/bahasa/tips-menerapkan-gaya-hidup-sehat.jpeg",
  },
  {
    id: 4,
    date: "Jun 10, 2024",
    category: "Fitness",
    title: "The Science Behind Fat Loss: What Actually Works?",
    description:
      "Forget the myths. We explore evidence-based strategies that support sustainable fat loss while keeping your body healthy and strong.",
    image:
      "https://www.msiglife.co.id/public-file/webcorporate/webcorporate/article/bahasa/tips-menerapkan-gaya-hidup-sehat.jpeg",
  },
  {
    id: 5,
    date: "Jun 14, 2024",
    category: "Lifestyle",
    title: "How to Track Your BMI Progress Effectively",
    description:
      "Monitoring your BMI trends can reveal insights about your health journey. Here’s how to set realistic goals and keep yourself motivated.",
    image:
      "https://www.msiglife.co.id/public-file/webcorporate/webcorporate/article/bahasa/tips-menerapkan-gaya-hidup-sehat.jpeg",
  },
  {
    id: 6,
    date: "Jun 17, 2024",
    category: "Health Risk",
    title: "Early Detection: Know Your Health Risk Before It’s Too Late",
    description:
      "Assessing health risks through early indicators like BMI and body composition helps prevent chronic diseases. Take action before symptoms appear.",
    image:
      "https://www.msiglife.co.id/public-file/webcorporate/webcorporate/article/bahasa/tips-menerapkan-gaya-hidup-sehat.jpeg",
  },
];

const handleViewAllClick = () => {
    // Navigate to sleep tips page
    window.location.href = '/articles';
  };

export default function BlogSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Explore our Article!</h2>
      <p className="text-center text-gray-600 mb-10">
        Improve your knowledge about body health!
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <span>{post.date}</span>
                <span className="bg-[#F0BB78] text-gray-700 rounded-full px-3 py-1 text-xs">
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-6">{post.description}</p>
              <div>
                  <a href="#" rel="noopener noreferrer" className="font-semibold">
                    Read more on article
                  </a> 
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
      <button
        onClick={handleViewAllClick}
        className="px-6 py-2 mt-10   rounded-full font-medium border-2 transition-all duration-200 hover:bg-[#F0BB78] hover:text-white"
        style={{
            borderColor: '#F0BB78',
            color: '#626F47'
        }}
        >
        View All 
      </button>
      </div>
    </div>
  );
}
