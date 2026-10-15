import "./hesapla.css";

// Hesap makineleri yalnız Türkçe sunulur; görünüm kuralları .hk kapsayıcısının içindedir.
// Sitenin diğer sayfaları gibi ana içerik <main> içindedir (sitenin ortak düzeni <main> koymaz).
export default function HesaplaLayout({ children }: { children: React.ReactNode }) {
  return <main className="bg-brand-sand pb-10">{children}</main>;
}
