import express from 'express';
import { WebSocketServer } from 'ws';
import { ScramjetProxy } from './scramjet.proxy.js'; // 前回作成したもの
import path from 'path';

const app = express();
const port = 3000;

// 静的ファイルの提供 (public/scram ディレクトリを公開)
app.use(express.static('public'));

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// WebSocket Server のセットアップ
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    const proxy = new ScramjetProxy();

    ws.on('message', async (message) => {
        const request = JSON.parse(message);
        
        // クライアントからのデータストリームを Scramjet で処理
        if (request.type === 'START_STREAM') {
            console.log('Processing stream...');
            
            // 例: scramjet.worker.js を介した処理のシミュレーション
            // 本来はここで scramjet-transform 等を呼び出す
            ws.send(JSON.stringify({ status: 'processing', id: request.id }));
        }
    });

    ws.on('close', () => console.log('Client disconnected'));
});
