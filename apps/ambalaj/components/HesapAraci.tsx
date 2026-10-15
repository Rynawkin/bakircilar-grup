'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Hesap kodu /public/hesapla altındaki betiklerdedir; sitedeki yerel ön izlemeyle aynı dosyalar.
// Hesap tarayıcıda yapılır: veri kaydı, ağ isteği veya izleme yoktur. WhatsApp yalnız kullanıcı tıklayınca açılır.
type Arac = { hesapla: () => void; ornekDoldur: () => void };
type HesapApi = { baslat: (kok: HTMLElement) => Arac };
const varMi = (ad: string) => Boolean((window as unknown as Record<string, unknown>)[ad]);   // yalnız tarayıcıda çağrılır

export function HesapAraci({ dosya, nesne }: { dosya: string; nesne: string }) {
  const kok = useRef<HTMLDivElement>(null);
  const baslatildi = useRef(false);
  const [ortakHazir, setOrtakHazir] = useState(false);
  const [aracHazir, setAracHazir] = useState(false);
  const [yuklenemedi, setYuklenemedi] = useState(false);

  // Betik hâlâ yüklenirken sayfa yeniden açılırsa next/script onReady'yi hiç ya da erken çağırabilir;
  // bu yüzden "hazır" yalnız betiğin kendi global nesnesi gerçekten varsa sayılır ve ayrıca yoklanır.
  // Araç betiği ortak.js çalıştıktan sonra eklenir. 12 sn içinde başlamazsa açıklama gösterilir.
  useEffect(() => {
    const yokla = window.setInterval(() => {
      if (baslatildi.current) { window.clearInterval(yokla); return; }
      if (varMi('HesapOrtak')) setOrtakHazir(true);
      if (varMi('HesapOrtak') && varMi(nesne)) setAracHazir(true);
    }, 200);
    const sure = window.setTimeout(() => { if (!baslatildi.current) setYuklenemedi(true); }, 12000);
    return () => { window.clearInterval(yokla); window.clearTimeout(sure); };
  }, [nesne]);

  useEffect(() => {
    if (!aracHazir || baslatildi.current || !kok.current) return;
    const api = (window as unknown as Record<string, HesapApi | undefined>)[nesne];
    if (!api || typeof api.baslat !== 'function') return;
    baslatildi.current = true;   // hata olsa da yeniden denenmez; açıklama gösterilir
    try {
      const arac = api.baslat(kok.current);
      setYuklenemedi(false);
      if (window.location.hash === '#ornek') { arac.ornekDoldur(); arac.hesapla(); }   // yerel ön izlemeyle aynı
    } catch {
      setYuklenemedi(true);
    }
  }, [aracHazir, nesne]);

  return (
    <>
      <Script src="/hesapla/ortak.js" strategy="afterInteractive" onReady={() => { if (varMi('HesapOrtak')) setOrtakHazir(true); }} />
      {ortakHazir && (
        <Script src={`/hesapla/${dosya}`} strategy="afterInteractive"
                onReady={() => { if (varMi('HesapOrtak') && varMi(nesne)) setAracHazir(true); }} />
      )}
      <div className="hk" ref={kok} />
      {yuklenemedi && (
        <p className="mx-auto max-w-md px-4 py-6 text-sm" role="alert">Hesap makinesi yüklenemedi. Sayfayı yenileyin.</p>
      )}
      <noscript>
        <p className="mx-auto max-w-md px-4 py-6 text-sm">Bu hesap makinesi için tarayıcınızda JavaScript açık olmalıdır.</p>
      </noscript>
    </>
  );
}
