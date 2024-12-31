/* 
  !Custom Hook
  * React hooklarına benzer şekilde görev yapan proje
  * ihtiyacına göre kendininiz oluşturduğumuz görevlerini bizim belirlediğimiz hooklardır.
  */

  import { useEffect, useState } from "react";

  export function useLocalStorage<T>(key: string, initialValue: T) {
    // 1.state'i tanımla
    const [value, setValue] = useState(() => {
      // localden değeri alır
      const jsonValue = localStorage.getItem(key);
      // localde eleman yoksa initialValue ile tanımla
      if (jsonValue === null) {
        return initialValue;
      } else {
        // localde eleman varsa localde veriyi state e aktar.
        return JSON.parse(jsonValue);
      }
    });
    // 2.state her değiştiğinde localstorage'ı güncelle
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    // değer ve değeri güncellemek için kullanılan fonksiyonu döndürme
    return [value, setValue] as [T, typeof setValue];
  }