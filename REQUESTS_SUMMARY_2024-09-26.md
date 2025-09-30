# JudaCargo Accounting — 需求整理（最新 2024-09-26）

## 環境與專案位置
- 本機專案：`/Users/pei-yinglin/Projects/accounting-system/frontend`
- 後端（FastAPI + SQLite）：`/Users/pei-yinglin/Projects/accounting-system/backend`
- GitHub 倉庫：`https://github.com/stacy-glitch/accounting-frontend`（main 分支）

## 後端更新
- `backend/main.py` 新增主檔資料模型與 API：
  - 客戶、車輛、員工、會計科目對應資料表。
  - `GET /master/...` 取得資料；`POST /master/.../import` 匯入資料（先刪除再寫入）。
- `Base.metadata.create_all` 自動建立新資料表；資料存於 `backend/accounting.db`。

## 前端更新
- 新增 `MasterDataContext`：
  - 於 `src/context/MasterDataContext.tsx` 透過 API 讀寫主檔資料。
  - 前端解析 CSV 後呼叫後端 `import` API；成功後更新狀態。
- `src/api.ts` 擴充 master data API（客戶、車輛、員工、會計科目）。
- 資料維護系統四個頁籤顯示後端資料，提供 CSV 上傳與錯誤提示。
- 零用金新增表單 (`src/pages/cash/CashCreate.tsx`) 代號/會計科目欄位改引用主檔資料。

## 使用方式
1. 啟動後端：
   ```bash
   cd /Users/pei-yinglin/Projects/accounting-system/backend
   source venv/bin/activate  # 若需要
   uvicorn main:app --reload
   ```
2. 啟動前端：
   ```bash
   cd /Users/pei-yinglin/Projects/accounting-system/frontend
   npm start
   ```
3. 透過資料維護系統上傳 CSV：
   - 客戶：`code,name,tax_id,contact,phone`
   - 車輛：`code,plate,model,brand,driver,license,permit`
   - 員工：`code,name,phone`
   - 會計科目：`mapping,name`
   成功後即寫入 SQLite，並更新表格顯示。
4. 零用金新增畫面可直接挑選代號/會計科目。

## 待辦
- 零用金表格、代墊款管理尚未實作。
- 其他模組仍為 placeholder；需逐步設計前端與 API。
- 無登入流程；頂欄登出為占位。
- 未提供主檔資料下載/匯出或編輯功能。

---
更新時間：2024-09-26
