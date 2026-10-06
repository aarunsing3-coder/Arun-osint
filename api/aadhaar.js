// language: JavaScript, file: api/aadhaar.js, target: Vercel
// ARUN AADHAAR INFO API HUB — Backend
// Developer: ARUN | YouTube: akbrother2906
// Teri API ko call karta hai, tera branding lagata hai

const fetch = require('node-fetch');

// ✅ TERI API
const MY_BACKEND_API = 'https://geniushacker-addharapi.vercel.app/api/aadhaar';

// ✅ TERA KEY
const DEFAULT_KEY = 'ARUN-LIFE-PERMAN-218CZ06C';

const BRANDING = {
    api_name: "ARUN AADHAAR INFO API HUB",
    developer: "Arun",
    youtube: "https://www.youtube.com/@akbrother2906",
    youtube_name: "akbrother2906",
    channel: "https://t.me/arunosint",
    telegram: "@arunwave25"
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const aadhaar = req.query.aadhaar;
    if (!aadhaar || aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
        return res.status(400).json({
            status: "error",
            api: BRANDING.api_name,
            message: "Valid 12-digit Aadhaar number required",
            example: `${req.headers.host}/api/aadhaar?key=${DEFAULT_KEY}&aadhaar=123412341234`,
            developer: BRANDING.developer,
            youtube: BRANDING.youtube
        });
    }

    try {
        // ✅ TERI API call — key ke saath
        const url = `${MY_BACKEND_API}?key=${encodeURIComponent(DEFAULT_KEY)}&aadhaar=${encodeURIComponent(aadhaar)}`;

        const response = await fetch(url, {
            method: 'GET',
            timeout: 20000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10)' }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                status: "error",
                api: BRANDING.api_name,
                message: `Backend error: ${response.status}`,
                developer: BRANDING.developer,
                youtube: BRANDING.youtube
            });
        }

        const data = await response.json();

        // Purana branding hatao (agar koi ho)
        const cleaned = { ...data };
        delete cleaned.owner;
        delete cleaned.channel;
        delete cleaned.credit;
        delete cleaned.developer;
        delete cleaned.youtube;
        delete cleaned.telegram;
        delete cleaned.api;

        return res.status(200).json({
            status: "success",
            api: BRANDING.api_name,
            query: { aadhaar: aadhaar },
            data: cleaned,
            developer: BRANDING.developer,
            youtube: BRANDING.youtube,
            youtube_name: BRANDING.youtube_name,
            telegram: BRANDING.telegram,
            channel: BRANDING.channel,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            api: BRANDING.api_name,
            message: "API unreachable",
            error: error.message,
            developer: BRANDING.developer,
            youtube: BRANDING.youtube
        });
    }
}
