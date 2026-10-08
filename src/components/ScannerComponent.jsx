import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function ScannerComponent({ onScanSuccess, onScanFailure }) {
  const [scannerReady, setScannerReady] = useState(false);

  useEffect(() => {
    // Only initialize if we're in browser
    if (typeof window !== 'undefined') {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      scanner.render(
        (decodedText) => {
          onScanSuccess(decodedText);
          // scanner.clear(); // Opcional: detener al escanear
        },
        onScanFailure
      );

      return () => {
        scanner.clear().catch(error => console.error("Failed to clear scanner", error));
      };
    }
  }, []);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <div id="reader" style={{ width: '100%' }}></div>
      <p className="text-center text-xs text-gray-500 p-2">Apunta el código de barras o QR de la guía del paquete a la cámara.</p>
    </div>
  );
}
