# JudaCargo Accounting — 需求整理（最新 2024-09-06）

## 環境與專案位置
- 本機專案：`/Users/pei-yinglin/Projects/accounting-system/frontend`
- GitHub 倉庫：`https://github.com/stacy-glitch/accounting-frontend`（main 分支）
- React + TypeScript，首頁為左側模組樹 + 右側內容區。

## 首頁模組
1. 零用金管理系統 — 表單：零用金新增、零用金表格、代墊款管理
2. 營業收入與銀行管理
3. 薪資管理系統
4. 各項費用管理系統
5. 車輛成本管理
6. 收支管理系統
7. 資料維護系統 — 表單：客戶、車輛、員工、會計科目

## 完成的介面與功能
- **頂端導覽列**：墨綠色「足達會計系統」+ 登出按鈕。
- **零用金新增 (`src/pages/cash/CashCreate.tsx`)**
  - 完整表單骨架；代號與會計科目欄位使用 `datalist` 列出已上傳的主檔資料。
- **資料維護系統 (`src/pages/maintenance/`)**
  - 使用 `MasterDataProvider` 管理主檔資料並存入 `localStorage`。
  - 四個表格皆支援上傳 CSV：
    * 客戶（欄位：code,name,taxId,contact,phone）
    * 車輛（欄位：code,plate,model,brand,driver,license,permit）
    * 員工（欄位：code,name,phone）
    * 會計科目（欄位：mapping,name）
  - 上傳成功後即時刷新表格，錯誤時顯示訊息。

## 仍為占位或待實作
- 零用金表格、代墊款管理 → 尚未設計。 
- 其他模組（銀行、薪資、費用…）仍為 placeholder。
- 目前僅在前端記錄主檔資料；尚未串接後端 API 或真正的檔案儲存。
- 未實作登入頁面/驗證流程。

## 下一步建議
1. 設計零用金表格與代墊款管理的實際操作畫面（可利用 `MasterDataContext` 的資料）。
2. 針對各模組逐步補足前端表單與後端 API 串接。
3. 建立登入頁面與使用者驗證流程，串接頂欄登出按鈕。
4. 規劃主檔資料的新增/編輯/刪除功能，以及批次下載匯出。

---
更新時間：2024-09-06 目前進度
