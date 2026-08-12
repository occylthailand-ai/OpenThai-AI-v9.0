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
  const [message, setMessage] = useState('');
  // PDPA: เก็บชื่อ/อีเมล/เบอร์โทร (ข้อมูลส่วนบุคคล) ต้องได้รับความยินยอมก่อนเสมอ — backend จริง
  // (registerAffiliateCore) ปฏิเสธคำขอที่ consent !== true อยู่แล้ว ฟอร์มนี้จึงต้องขอความยินยอม
  // และส่ง consent ไปด้วย ไม่งั้นทุกใบสมัครจะถูกปฏิเสธ (และเก็บ PII โดยไม่มีฐานทางกฎหมาย)
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setMessage('❌ กรุณายอมรับนโยบายความเป็นส่วนตัว (PDPA) ก่อนสมัคร');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/affiliate/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, consent }),
      });

      // response อาจไม่ใช่ JSON (เช่น 404/หน้า error ของ Next) — กันไม่ให้ res.json() throw
      // แล้วเด้งไป catch เป็น "เกิดข้อผิดพลาด" ลอยๆ ตรวจ res.ok ร่วมด้วยก่อนถือว่าสำเร็จ
      let data: { success?: boolean; message?: string } = {};
      try { data = await res.json(); } catch { /* non-JSON response */ }

      if (res.ok && data.success) {
        setMessage('✅ สมัคร Affiliate สำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง');
        setFormData({ name: '', email: '', phone: '', platform: 'instagram', followers: '' });
        setConsent(false);
      } else {
        setMessage('❌ ' + (data.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'));
      }
    } catch (error) {
      setMessage('❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-600 to-purple-700 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">OpenThai AI Affiliate Hub</h1>
          <p className="text-2xl">คลิกเดียวเริ่มขาย มีรายได้ทันที</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white text-black rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">สมัครเป็น Affiliate ทันที</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" placeholder="ชื่อ-นามสกุล" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-5 rounded-2xl border" required />
            <input type="email" placeholder="อีเมล" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-5 rounded-2xl border" required />
            <input type="tel" placeholder="เบอร์โทรศัพท์" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-5 rounded-2xl border" />
            
            <select value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="w-full p-5 rounded-2xl border" required>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
            </select>

            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" required />
              <span>
                ข้าพเจ้ายินยอมให้ OpenThai AI เก็บและใช้ข้อมูลส่วนบุคคล (ชื่อ อีเมล เบอร์โทร) เพื่อการสมัคร Affiliate
                ตาม{' '}
                <a href="https://www.openthai-ai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  นโยบายความเป็นส่วนตัว (PDPA)
                </a>
              </span>
            </label>

            <button type="submit" disabled={loading || !consent} className="w-full py-6 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xl font-bold rounded-2xl hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {loading ? 'กำลังส่งข้อมูล...' : 'สมัคร Affiliate ฟรี คลิกเดียว'}
            </button>

            {message && <div className="text-center font-medium mt-4 p-4 bg-gray-100 rounded-2xl">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
