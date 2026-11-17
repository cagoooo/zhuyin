# ㄅㄆㄇ 注音大挑戰 🎲 (Bopomofo Learning Game)

🌐 **線上使用：[ㄅㄆㄇ注音大挑戰](https://cagoooo.github.io/zhuyin/)**

> 📌 **目前版本：v1.0.1**（版本管理自 2026-09-06 起，依據 `version.json`）

## 📖 專案簡介
這是一個以純前端技術 (HTML, CSS, JavaScript) 開發的「ㄅㄆㄇ」注音學習小遊戲。完全不需安裝任何後端環境或依賴套件，只要透過瀏覽器打開 `index.html` 即可直接遊玩。這款遊戲專為兒童及初學注音設計，具備活潑的介面、闖關機制與簡單的音效回饋。

## ✨ 核心功能
1. **多樣化關卡挑戰**：
   - 內建 6 個主題關卡：包含「水果🍎」、「動物🐶」、「交通🚗」、「身體✋」、「家人👨‍👩‍👧‍👦」、「學校🏫」。
   - 漸進式解鎖設定：玩家必須成功通過前一關，才能接著挑戰下一關。
2. **生動的測驗互動**：
   - 每關從題庫中隨機抽取 5 題，以可愛圖片與單字提示，玩家需利用畫面下方的虛擬鍵盤，正確拼湊出對應的注音符號（聲母、韻母）與聲調。
   - 加入即時音效與視覺回饋（答對會觸發生動的彩色碎紙機動畫與綠色字體提示，答錯則會產生畫面震動並顯示正確答案）。
3. **學習回顧模組**：
   - 關卡結束後，玩家可點擊「學習回顧」查看該回合所有答對與答錯的題目紀錄，方便了解自身弱點並加深學習記憶。
4. **遊戲進度儲存 (Local Storage)**：
   - 玩家的遊戲進度（包含目前已解鎖的關卡、各關獲得的愛心數量評等）皆會自動儲存於瀏覽器的 `localStorage` 中。
   - 首頁提供「重置進度」按鈕，讓玩家可隨時清空成績重新挑戰。
5. **RWD 響應式設計**：
   - 遊戲介面完美支援手機、平板及桌上型電腦，畫面會根據裝置自動調整大小與排版配置，提供良好的跨平台視覺體驗。

## 🚀 GitHub Deploy 評估與部署指引

**評估結果：✅ 完全適配，可無縫移植並部署至 GitHub Pages！**

經過檢閱，由於本專案屬於純靜態網頁 (Static HTML Archive)，並無涉及任何伺服器端語言、資料庫牽連（純依賴瀏覽器端暫存），且靜態資源圖片（如 Apple, Banana）皆引用自外部 CDN，因此**極端適合**直接放置於 GitHub Pages 作為線上展示之用。

### 部署流程建議
1. **本地建立版本控制庫**：
   - 在您的資料夾中打開終端機，執行 `git init` (建議先行建立 `.gitignore` 檔案排除不需要追蹤的系統檔，雖此專案僅 `.html` 及 `.md`)。
2. **上傳至 GitHub**：
   - 將 `index.html` (及此 `README.md`) 打包 Commit 並 Push 到您名下建立的新 GitHub Repo (如 `Zhuyin-Challenge`) 中。
3. **啟用 GitHub Pages**：
   - 在 Repo 的 **Settings -> Pages** 設定中，將 **Build and deployment** 的 Source 指定為您剛推上傳的 `main` 或是 `master` 分支，存檔。
4. **線上存取**：等待數十秒後，系統即會派發一組對外公開的 URL 網址（通常類似 `https://[您的帳號].github.io/Zhuyin-Challenge`），該網址就可直接讓所有人進行遊玩！

---
> 💡 **自動化安全盤點：符合規範 (v2.7.0)**
> 1. 本次更新已將所有機密金鑰 (API Keys) 移至 `.env` 與 GitHub Secrets 進行隔離管理。
> 2. `firebase-config.js` 改為動態讀取環境變數。
> 3. 若您正在本地開發，請參考 `.env.template` 建立您的專屬 `.env` 檔案。

---

<!-- BEGIN:PROJECT_GUIDE -->
## 專案導覽

注音大挑戰

- 專案定位：互動遊戲／遊戲化學習專案
- Repository：`cagoooo/zhuyin`
- 可見性：公開
- 主要技術：HTML、Firebase
- 線上入口：<https://cagoooo.github.io/zhuyin/>

### 可以怎麼應用

- 課堂暖身、複習活動或學習站任務
- 校慶、闖關或社團活動中的互動挑戰
- 替換題庫、美術、音效與規則後，延伸成其他學科或主題遊戲

這些是依目前專案定位整理的延伸方向，不代表所有情境都已內建完成；實作前請先確認現有功能與資料格式。

### 技術與專案結構

- `README.md`
- `firebase.json`
- `index.html`

檔案結構會隨版本演進；若本節與程式碼不一致，以目前預設分支的原始碼為準。

### 本機執行

這是可直接由瀏覽器載入的靜態網站。可用任一靜態檔案伺服器預覽，例如：
```bash
python -m http.server 8000
```
接著開啟 `http://localhost:8000`。請避免直接以 `file://` 測試需要模組、請求或 Service Worker 的功能。

### 給 AI Agent 的接手指南

1. 先閱讀本 README、`AGENTS.md`（若有）、套件腳本與部署設定。
2. 先找出遊戲狀態、關卡／題庫資料與輸入控制的來源，再調整規則。
3. 更換素材時同步檢查授權、載入路徑、碰撞區域與不同螢幕比例。
4. 修改後至少驗證開始、遊玩、計分／勝負、重新開始，以及手機與桌面版面。
5. 不要捏造尚未存在的功能；README 與實作有落差時，應同時更新文件。
6. 提交前只納入本次任務檔案，並記錄實際執行過的驗證。

### 安全與資料注意事項

- 不要提交 `.env`、服務帳號、API 金鑰、token、學生個資或正式環境匯出資料。
- 使用 Firebase、Supabase、Google API 或其他雲端服務時，請建立自己的測試專案並套用最小權限。
- 若要公開衍生作品，請先確認程式碼、圖片、音訊、字型與教材內容的授權。

### 貢獻與客製化

歡迎依教學現場、活動或工作流程需求進行 fork／客製化。建議在變更說明中交代使用情境、主要修改、測試方式，以及是否影響資料格式或部署設定。
<!-- END:PROJECT_GUIDE -->

<!-- akai-edu-tools:backlink -->

---

## 🔗 阿凱老師教育工具集

這個專案是[阿凱老師教育工具集](https://cagoooo.github.io/Akai/)的 **#55 ㄅㄆㄇ注音大挑戰**，由桃園市龍潭區石門國民小學阿凱老師開發。

- 工具介紹頁：[https://cagoooo.github.io/Akai/tool/55/](https://cagoooo.github.io/Akai/tool/55/)
- 線上使用：[https://cagoooo.github.io/zhuyin/](https://cagoooo.github.io/zhuyin/)
- 教學情境文章：[https://cagoooo.github.io/Akai/blog/zhuyin-55-bopomofo-challenge/](https://cagoooo.github.io/Akai/blog/zhuyin-55-bopomofo-challenge/)
- 全部工具（上百個教育工具與原始碼）：[https://cagoooo.github.io/Akai/](https://cagoooo.github.io/Akai/)

想改造成自己的版本？到上面的教學情境文章，按左下角「複製 AI 開發提示詞」，貼給 ChatGPT、Claude、Gemini 等 AI 助手，就能參考這份原始碼開始規劃。
