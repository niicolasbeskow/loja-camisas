import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'B.SKW | Streetwear Premium';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://loja-camisas-two.vercel.app/files/BSKW_logos_PNG/BSKW_monograma_cor-branco-ambar.png"
          style={{ width: '350px', height: '350px', objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}