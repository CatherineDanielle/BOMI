import React from 'react';
import Navbar from '../components/Navbar';
import ArticleSection from '../components/ArticleSection';
import Fitur from '../components/Fitur';
import FAQ from '../components/FAQ';
import Testimonial from '../components/Testimonial';
import logo from '/logo.svg'; // Ubah sesuai path logo Anda

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen from-[#F5ECD5] bg-gradient-to-b">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center p-8 gap-6">

        {/* Hero Section */}
        <div className="flex items-start justify-center gap-12 w-full max-w-6xl mx-auto p-4">
          
          {/* Main Content */}
          <div className="flex flex-col text-left text-[#626F47]">
            <h1 className="text-4xl font-bold mb-4">Welcome to BOMI</h1>
            <p className="text-lg leading-relaxed mb-4">
              <strong>BOMI</strong> adalah platform digital yang membantu pengguna memantau, memahami, 
              dan mengelola kesehatan tubuh secara mandiri. Di era modern, banyak orang kurang memperhatikan 
              kondisi kesehatan, terutama terkait berat badan, pola makan, dan komposisi tubuh, tanpa menyadari 
              apakah berat mereka ideal, kurang, atau berlebih sehingga berisiko menimbulkan masalah kesehatan.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              BOMI hadir sebagai solusi untuk meningkatkan kesadaran akan pentingnya menjaga kesehatan tubuh. 
              Dengan teknologi, BOMI menyediakan layanan untuk menghitung BMI, memantau perkembangan BMI, 
              memperkirakan komposisi tubuh, dan menilai risiko kesehatan.
            </p>

            {/* SDG Section */}
            <div className="flex items-center gap-4 mt-6">
              <div className="text-lg">
                Platform ini mendukung tujuan 
                <a href="https://sdgs.un.org/goals/goal3" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                  Sustainable Development Goals (SDGs) ke-3
                </a>: 
                menjamin kehidupan sehat dan kesejahteraan semua orang di segala usia.
              </div>
              <div className="bg-green-600 text-white p-4 rounded-xl flex items-center">
                <span className="text-2xl font-semibold">3</span>
                <span className="ml-2">GOOD HEALTH AND WELL-BEING</span>
              </div>
            </div>
            <div>
              <ArticleSection />
            </div>
            {/* Fitur Section */}
            <div>
              <Fitur />
            </div>
            {/* FAQ Section */}
            <div>
              <FAQ />
            </div>
            {/* Testimonial Section */}
            <div>
              <Testimonial />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
