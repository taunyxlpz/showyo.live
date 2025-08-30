'use client';

type Kind = 'photo' | 'video';

export default function CheckoutButtons() {
  const startCheckout = async (kind: Kind) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert('Checkout failed. Check Stripe env vars in Vercel.');
    } catch (e) {
      alert('Network error starting checkout.');
    }
  };

  const btn = {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    background: '#111',
    color: '#fff',
    cursor: 'pointer',
  } as const;

  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
      <button style={btn} onClick={() => startCheckout('photo')}>
        Pay $10 — Photo (10s)
      </button>
      <button style={btn} onClick={() => startCheckout('video')}>
        Pay $20 — Video (10s)
      </button>
    </div>
  );
}
