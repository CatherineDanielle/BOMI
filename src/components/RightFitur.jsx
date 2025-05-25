import React from "react";

export default function RightFitur() {
    return (
        <div className="bg-[#f4edd5] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center mb-6 flex items-center justify-center gap-3">
            <h2 className="text-3xl font-bold text-[#4f6137]">Fitur - Fitur</h2>
            <img src="/path/to/logo-bomi.png" alt="BOMI Logo" className="w-16 h-16" />
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#8fb66c]">Smart BMI Calculator</h3>
                <p className="text-[#4f6137] mb-4">
                    Menghitung Body Mass Index (BMI) Anda dengan mudah hanya dengan memasukkan jenis kelamin, berat badan, tinggi badan, dan usia. Sistem akan menghitung BMI Anda menggunakan rumus standar dan menampilkan hasil berupa kategori BMI (kurus, normal, overweight, obesitas) serta memberikan informasi terkait status berat badan Anda.
                </p>
                <button className="mt-4 px-4 py-2 bg-[#8fb66c] text-white font-semibold rounded-full hover:bg-[#729854]">Click to calculate your BMI!</button>
            </div>
        <div className="flex-1 bg-[#d9a46f] text-center rounded-lg p-6 text-black font-semibold">
          gambar
        </div>
      </div>
    </div>
    );
}