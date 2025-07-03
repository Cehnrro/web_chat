export default async function handler(req, res) {
  // 设置 CORS 头 - 允许你的网站域名
// 允许所有 Vercel 域名访问
  res.setHeader('Access-Control-Allow-Origin', 'https://*.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' });
  }
  
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: '缺少prompt参数' });
  }

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-3307b5301fae47c989c4c38dcf090127',
        'Content-Type': 'application/json',
        'X-DashScope-AppId': '9024d1a114ee4a4ba3dcf34def509f1b'
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: { prompt }
      })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '请求失败', detail: error.message });
  }
}
