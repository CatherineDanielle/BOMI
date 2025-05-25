import React from 'react'
import logo from '/logo.svg';

export default function Fitur () {
  return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h2 className="text-center text-3xl font-bold text-olive-700 mb-12">Fitur - Fitur</h2>
      
      {/* Smart BMI Calculator Section */}
      <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-olive-500 mb-3">Smart BMI Calculator</h3>
          <p className="text-gray-700 mb-4">
            Menghitung Body Mass Index (BMI) Anda dengan mudah. Cukup masukkan informasi tentang tinggi badan, berat badan, hingga usia. Sistem akan menghitung BMI Anda menggunakan rumus standar dan memberitahu hasil berupa kategori BMI (kurus, normal, overweight, obesitas) serta memberikan informasi terkait status berat badan Anda.
          </p>
          <button className="bg-olive-500 text-white px-4 py-2 rounded-full text-sm hover:bg-olive-600 transition-colors">
            Click to calculate your BMI!
          </button>
        </div>
        <div className="md:w-1/2 bg-orange-200 h-48 w-full rounded-lg">
          {/* This is placeholder for image */}
        </div>
      </div>

      {/* BMI & Progress Tracker Section */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-16 gap-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-olive-500 mb-3">BMI & Progress Tracker</h3>
          <p className="text-gray-700 mb-4">
            Memungkinkan Anda untuk melihat riwayat BMI dan berat badan serta perkembangannya setiap waktu. Dengan grafik, grafik, dan fitur lain pendukung Anda memantau perubahan diet, waktu ke waktu dan melihat perkembangan kesehatan secara objektif.
          </p>
          <button className="bg-olive-500 text-white px-4 py-2 rounded-full text-sm hover:bg-olive-600 transition-colors">
            Mulai Lacak Sekarang
          </button>
        </div>
        <div className="md:w-1/2 bg-orange-200 h-48 w-full rounded-lg">
          {/* This is placeholder for image */}
        </div>
      </div>

      {/* Body Composition Estimation Section */}
      <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-olive-500 mb-3">Body Composition Estimation</h3>
          <p className="text-gray-700 mb-4">
            Menghitung Body Mass Index (BMI) Anda dengan mudah. Namun dengan menggunakan input lainnya, kami dapat memberikan Anda perkiraan komposisi tubuh dengan menghitung BMI Anda menggunakan rumus standar dan memberikan hasil berupa kategori BMI (kurus, normal, overweight, obesitas) serta memberikan informasi terkait status berat badan Anda.
          </p>
          <button className="bg-olive-500 text-white px-4 py-2 rounded-full text-sm hover:bg-olive-600 transition-colors">
            Estimate your Body Composition
          </button>
        </div>
        <div className="md:w-1/2 bg-orange-200 h-48 w-full rounded-lg">
          {/* This is placeholder for image */}
        </div>
      </div>

      {/* Compare with Health Standard Section */}
      <div className="flex flex-col md:flex-row-reverse items-center mb-16 gap-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-olive-500 mb-3">Compare with Health Standard</h3>
          <p className="text-gray-700 mb-4">
            Sebuah fitur yang memungkinkan untuk membandingkan hasil Anda dengan standar kesehatan tubuh yang ideal. Anda dapat mengetahui apakah persentase lemak tubuh Anda masih efek Anda sudah sesuai standar atau perlu ditingkatkan.
          </p>
          <button className="bg-olive-500 text-white px-4 py-2 rounded-full text-sm hover:bg-olive-600 transition-colors">
            Cek Perbandingan Tubuh Anda
          </button>
        </div>
        <div className="md:w-1/2 bg-orange-200 h-48 w-full rounded-lg">
          {/* This is placeholder for image */}
        </div>
      </div>

      {/* Second Smart BMI Calculator Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-olive-500 mb-3">Smart BMI Calculator</h3>
          <p className="text-gray-700 mb-4">
            Menghitung Body Mass Index (BMI) Anda dengan mudah. Cukup masukkan informasi tentang tinggi badan, berat badan, hingga usia. Sistem akan menghitung BMI Anda menggunakan rumus standar dan memberitahu hasil berupa kategori BMI (kurus, normal, overweight, obesitas) serta memberikan informasi terkait status berat badan Anda.
          </p>
          <button className="bg-olive-500 text-white px-4 py-2 rounded-full text-sm hover:bg-olive-600 transition-colors">
            Click to calculate your BMI!
          </button>
        </div>
        <div className="md:w-1/2 bg-orange-200 h-48 w-full rounded-lg">
          {/* This is placeholder for image */}
        </div>
      </div>
    </div>
  )
}

