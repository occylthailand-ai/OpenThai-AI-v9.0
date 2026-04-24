'use client';
import { useState } from 'react';

export default function AffiliateHub() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    platform: 'instagram',
    followers: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/affiliate/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ สมัคร Affiliate สำเร็จ!\nทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง');
      setFormData({ name: '', email: '', phone: '', platform: 'instagram', followers: '' });
    } else {
      alert('❌ ' + data.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">OpenThai AI Affiliate Hub</h1>
          <p className="text-2xl">คลิกเดียวเริ่มขาย มีรายได้ทันที</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* โปรแกรมตัวอย่าง */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
            <h3 className="text-2xl font-bold">Instagram Affiliate</h3>
            <p className="text-green-400 font-semibold">Commission 5-30%</p>
            <button className="mt-8 w-full py-4 bg-white text-black rounded-2xl font-semibold">สมัครเลย</button>
          </div>
          {/* สามารถเพิ่มโปรแกรมอื่น ๆ ได้ */}
        </div>

        {/* ฟอร์มสมัคร */}
        <div className="max-w-2xl mx-auto bg-white text-black rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">สมัครเป็น Affiliate ทันที</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              placeholder="ชื่อ-นามสกุล" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-5 rounded-2xl border focus:outline-none focus:border-purple-500" 
              required 
            />
            <input 
              type="email" 
              placeholder="อีเมล" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-5 rounded-2xl border focus:outline-none focus:border-purple-500" 
              required 
            />
            <input 
              type="tel" 
              placeholder="เบอร์โทรศัพท์" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-5 rounded-2xl border focus:outline-none focus:border-purple-500" 
            />

            <select 
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full p-5 rounded-2xl border focus:outline-none focus:border-purple-500"
              required
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
            </select>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xl font-bold rounded-2xl hover:scale-105 transition"
            >
              {loading ? 'กำลังส่งข้อมูล...' : 'สมัคร Affiliate ฟรี คลิกเดียว'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
